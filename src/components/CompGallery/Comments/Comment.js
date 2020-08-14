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

import IconEdit from '../../../svgs/basic/IconEdit'
import IconPlus from '../../../svgs/basic/IconPlus'
import IconHeart from '../../../svgs/basic/IconHeart'

import IconEnter from '../../../svgs/basic/IconEnter'
import IconEye from '../../../svgs/basic/IconEye'
import IconLayers from '../../../svgs/basic/IconLayers'



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
  right: 0;
  top: 0;
  
  background-color: ${props=> props.theme.COLOR_normal};
  
  width: 36px;
  height: 36px;
  border-radius: 5px;
  
  cursor: pointer;
`



const DivView = styled(Div)`
  height: auto;
  min-height: 60px;
  max-height: 150px;
  overflow: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
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
  
  , replaceDataReaction
  , replaceData2Reaction
  
  , addDeleteNotification
}) => {
  
  const history = useHistory(); 
  
  const [like, setLike] = useState(false);
  const [plus, setPlus] = useState(0);
  
  
  useEffect(()=>{
    if ( comment.listUserLike.includes(user._id) ) { setLike(true)}
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
        await axios.put(`${config.URL_API_NS}/comment/like?` + query );
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
  
  

  return (

    <DivComment>
      
      { (where==="comments")&&  
        <DivToSubject
          onClick={event=>{history.push(`/comp-gallery/focus/${comment.subject._id}`)}}
        > <IconEye width={"24px"} height={"24px"} color={"color_weak"}  /> </DivToSubject>
      }
      
      
      
      <DivView> 
      
        <Div> 
          {comment.content}
        </Div>
      
      </DivView>
      
      <DivFooter>  
        <Div> <Profile size={36} idUser={comment.author} layout={"right"}/> </Div>
        
        { user._id && (comment.author === user._id) && 
          <Div
            onClick={onClick_Edit}
          > <IconEdit  width={"24px"} height={"24px"} color={"color_weak"} />  </Div>
        }
        
        <DivLike onClick={onClick_Like} >
          <Div number={comment.listUserLike.length + plus}> {comment.listUserLike.length + plus} </Div>
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
    
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Comment);