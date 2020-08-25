import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../../config';

import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../others/dictCode'

import { replaceData2 } from "../../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../../redux/actions/comp_gallery";
import {replaceDataReaction, replaceData2Reaction} from "../../../redux/actions/reaction";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../../styles/DefaultStyles';

import Profile from '../../_/Profile';

import IconEdit from '../../../svgs/basic/IconEdit';
import IconPlus from '../../../svgs/basic/IconPlus';
import IconHeart from '../../../svgs/basic/IconHeart';
import IconReportTriangle from '../../../svgs/basic/IconReportTriangle';


import IconEnter from '../../../svgs/basic/IconEnter';
import IconEye from '../../../svgs/basic/IconEye';
import IconLayers from '../../../svgs/basic/IconLayers';



const DivComment = styled(Div)
`
  width: 300px;
  height: auto;
  margin: 10px;
  
  position: relative;
   
  padding: 15px;
  
  background-color: ${props=> props.theme.COLOR_normal};
  border-radius: 5px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
 
`;


const DivToSubject = styled(Div)`
  z-index: 2;
  position: absolute;
  left: 5px;
  top: 5px;
  
  background-color: ${props=> props.theme.COLOR_normal};
  
  width: 30px;
  height: 30px;
  border-radius: 15px;
  
  cursor: pointer;
`

const DivReport = styled(Div)`
  z-index: 2;
  position: absolute;
  right: 6px;
  top: 6px;
  
  background-color: ${props=> props.theme.COLOR_normal};
  
  width: 30px;
  height: 30px;
  border-radius: 15px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  cursor: pointer;
`




const DivView = styled(Div)`
  height: auto;
  min-height: 60px;
  max-height: 150px;
  overflow: auto;
  
  display: block;
  
  & > div {
    font-size: 0.9rem;
  }
`

const DivFooter = styled(Div)`
  height: 40px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  & > div {
    width: auto;
  }
`
const DivLike = styled(Div)`

  width: auto;
  height: 40px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  
    
  & > div:nth-child(1){
    width: auto;
    
    font-size: 0.9rem;
    font-weight: bold;
    
    padding-left: 4px;
    padding-right: 4px;
    
    background-color: ${props => props.theme.color_very_weak};
    color: ${props => props.theme.COLOR_normal};
    border-radius: 4px;
  }
  
  & > div:nth-child(2) {
    
    width: 40px;
    height: 40px;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`


const Comment = ({

  language
  , user, readyUser
  
  , comment
  , where
  
  , replaceData2
  , replaceDataReaction
  , replaceData2Reaction
  
  , addDeleteNotification
}) => {
  
  const history = useHistory(); 
  
  const [stageReport, setStageReport] =useState(0);
    
  const [like, setLike] = useState(false);
  const [plus, setPlus] = useState(0);
  
  
  useEffect(()=>{
    if ( comment.listUserLike && comment.listUserLike.includes(user._id) ) { setLike(true)}
    else {setLike(false)};
  },[])
    
  const onClick_Like = async (event) => {
      
      try {
        let queryTemp = {
          idUser: user._id
          , idComment: comment._id
          , how: false
        };
        
        // 클릭하기 이전의 like!
        if (like) {
          queryTemp.how = false;
          setPlus(plus-1);
        }
        else { 
          queryTemp.how = true; 
          setPlus(plus+1);
        }
        setLike(!like);
        
        
        const query = queryString.stringify(queryTemp)  
        await axios.put(`${config.URL_API_NS}/comment/like/${comment._id}?` + query );
      }
      catch(error) {
        console.log(error);
        addDeleteNotification("basic01", language);
      }
    }



  const onClick_Edit = (event) => {
    
    if (!readyUser) {
      addDeleteNotification("auth31", language);
      
      const query = queryString.stringify({
        "shouldGoBack": "yes"
      });
      history.push('/auth/log-in?' + query)
    }
    
    else {
      
      replaceDataReaction("mode", "edit");
      replaceDataReaction("which", "comment");
      
      replaceDataReaction("authorReaction", comment.author);
      replaceDataReaction("idReaction", comment._id);
      replaceDataReaction("idSubject", comment.subject._id);
      replaceDataReaction("modelSubject", comment.subject.model);
      
      replaceDataReaction("visibility", "visible");
    }
    
  }
  
  const onClick_Report = async (event) => {
      
      try {
        
        if(!readyUser) { addDeleteNotification("auth31", language); }
        else {
          
          if (stageReport === 0) {
            setStageReport(1);
            setTimeout( ()=>{ setStageReport(0) }, 5000);
            addDeleteNotification("basic06", language);
          }
          
          else {
            
            try {
              
              let queryTemp = {
                idUser: user._id 
                , typeUser: user.type
              };
              const query = queryString.stringify(queryTemp)  
              await axios.put(`${config.URL_API_NS}/comment/report/${comment._id}?` + query );
              
              addDeleteNotification("basic07", language);
              replaceData2("ready", "listComment", false);
              //history.push('/comp-gallery/');
                
            } catch (error) {
              addDeleteNotification("basic01", language);
            }
          } // else
    
        }
      }
      catch(error) {
        console.log(error);
        addDeleteNotification("basic01", language);
      }
    }
  //console.log(comment);

  return (

    <DivComment>
      
      { (where==="comments")&&  
        <DivToSubject
          onClick={event=>{history.push(`/comp-gallery/focus/${comment.subject._id}`)}}
        > <IconEye width={"24px"} height={"24px"} color={"color_weak"}  /> </DivToSubject>
      }
      <DivReport onClick={onClick_Report} > <IconReportTriangle width={"24px"} height={"24px"} color={ (stageReport===0)? "color_very_weak" : "color_warning"}  /> </DivReport>
      
      
      
      <DivView> 
   
          {comment.content}
        
      </DivView>
      
      <DivFooter>  
        <Div> <Profile size={36} idUser={comment.author} layout={"right"}/> </Div>
        
        { user._id && (comment.author === user._id) && 
          <Div
            onClick={onClick_Edit}
          > <IconEdit  width={"24px"} height={"24px"} color={"color_weak"} />  </Div>
        }
        
        <DivLike onClick={onClick_Like} >
          <Div number={(comment.listUserLike)? (comment.listUserLike.length + plus) : plus}> {(comment.listUserLike)? (comment.listUserLike.length + plus) : plus} </Div>
          <IconHeart width = { "25x" } height = { "25px" }  filled={like} />
        </DivLike>
        
      </DivFooter>

    </DivComment>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    
    , focusingComp: state.comp_gallery.focus.comp
    
    //, comment: state.comp_gallery.focus.comment
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
    replaceDataReaction : (which, replacement) => dispatch(replaceDataReaction(which, replacement))
    ,replaceData2Reaction : (which1, which2, replacement) => dispatch(replaceData2Reaction(which1, which2, replacement))
    
    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    , addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Comment);