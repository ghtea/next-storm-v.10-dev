import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../../../config';

import addDeleteNotification from "../../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../../others/dictCode'

import { replaceData2 } from "../../../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../../../redux/actions/comp_gallery";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../../../styles/DefaultStyles';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import IconCopy from '../../../../svgs/basic/IconCopy'
import IconBack from '../../../../svgs/basic/IconBack'
import IconEdit from '../../../../svgs/basic/IconEdit'
import IconHeart from '../../../../svgs/basic/IconHeart'
import IconReportTriangle from '../../../../svgs/basic/IconReportTriangle'




const DivTools = styled(Div)
`
  width: auto;
  height: 40px;
 
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`;

const ButtonTool = styled(Button)`
  margin: 0;
  border-radius: 0;
  
  &: first-child {
    border-radius: 9px 0 0 9px;
  }
  &: last-child {
    border-radius: 0 9px 9px 0 ;
  }
`




const Tools = ({

  language
  , user
  , readyUser
  
  , focusingComp
  
  , addDeleteNotification
}) => {
  
  const [stageReport, setStageReport] =useState(0);
  
  const [like, setLike] = useState(false);
  const [plus, setPlus] = useState(0);
  useEffect(()=>{
    if ( focusingComp.listUserLike.includes(user._id) ) { 
      setLike(true)
    }
    else {
      setLike(false)
    };
  },[])
    
    
  const history = useHistory(); 
  
  const onClick_Back = (event) => {
    history.goBack();
  }
  
  
  
  const onClick_Like = async (event) => {
      
      try {
        
        if(!readyUser) { addDeleteNotification("auth31", language); }
        else {
          let queryTemp = {
            idUser: user._id
            //, idComp: focusingComp._id
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
          await axios.put(`${config.URL_API_NS}/comp/like/${focusingComp._id}?` + query );
        } // else
      }
      catch(error) {
        console.log(error);
        addDeleteNotification("basic01", language);
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
              await axios.put(`${config.URL_API_NS}/comp/report/${focusingComp._id}?` + query );
              
              addDeleteNotification("basic07", language);
              replaceData2("ready", "listComp", false);
              history.push('/comp-gallery/');
                
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
  
  return (

    <DivTools>
      
      <ButtonTool onClick={onClick_Back} > <IconBack  width={"24px"} height={"24px"} color={"color_weak"} />  </ButtonTool>
      
      
      <CopyToClipboard 
          text={`${config.URL_THIS}/comp-gallery/focus/${focusingComp._id}`}
          onCopy={ () => { addDeleteNotification("basic03", language); } } >
          
          <ButtonTool> <IconCopy width={"24px"} height={"24px"} color={"color_weak"} /> </ButtonTool>
          
      </CopyToClipboard>
      
      <ButtonTool onClick={onClick_Like} > <IconHeart  width={"24px"} height={"24px"} filled={like} /> </ButtonTool>
      
      { readyUser && (focusingComp.author === user._id) && 
        <ButtonTool
          onClick={(event=>{history.push(`/comp-gallery/edit/${focusingComp._id}`)})}
        > <IconEdit  width={"24px"} height={"24px"} color={"color_weak"} />  </ButtonTool>
      }
      
      { readyUser && 
        <ButtonTool
          onClick={onClick_Report}
        > <IconReportTriangle width={"24px"} height={"24px"} color={ (stageReport===0)? "color_very_weak" : "color_warning"}  />  </ButtonTool>
      }

    </DivTools>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language
    
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    
    , focusingComp: state.comp_gallery.focus.comp
    
  };
}

function mapDispatchToProps(dispatch) {
  return {

    replaceDataCompGallery: (which, replacement) => dispatch(replaceDataCompGallery(which, replacement)),
    replaceData2CompGallery: (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))

    ,
    replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    ,
    addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Tools);