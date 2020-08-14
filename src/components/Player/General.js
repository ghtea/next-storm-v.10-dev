import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../config';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { replaceData2 } from "../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../redux/actions/comp_gallery";


import {  NavLink, useHistory, useParams } from 'react-router-dom';

import { Div, Input, Button } from '../../styles/DefaultStyles';

import Loading from '../_/Loading'

import Tools from './Focus/A/Tools';
import Header from './Focus/A/Header';
import ListMap from './Focus/A/ListMap';
import ListPosition from './Focus/A/ListPosition';

import Reactions from './Focus/B/Reactions';
import Comment from './Comments/Comment';
import Video from './Videos/Video';



import useInput from '../../tools/hooks/useInput';
import {  getTimeStamp } from '../../tools/vanilla/time';





const DivFocus = styled(Div)
`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  height: 100%;
  overflow: hidden;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
	  display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    
    max-width: 900px;
	}
`;


const DivA = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  width: 360px;      /*  768  */
  height: 360px;
  overflow: auto;
  
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  
  position: relative;
  
  @media (min-width:  ${props => props.theme.media.md }px) {
    height: 100%;
    margin: 5px;
  }
  
  & > div {
    margin: 5px;
  }
`



const DivB = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  width: 360px; 
  
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  
  @media (min-width:  ${props => props.theme.media.md }px) {
    height: 100%;
    margin: 5px;
  }
  
  & > div {
    margin: 5px;
  }
`




const Focus = ({

  language
  
  , location
  
  
  
  , replaceData2

  , addDeleteNotification
}) => {

  const { idComp } = useParams();
  
  
  useEffect(() => {

    (async() => {
      
      if (!readyFocusingComp) {
        try {
            
          replaceData2("ready", "focusingComp", false);
          replaceData2("loading", "focusingComp", true);
          
          const {
            data
          } = await axios.get(`${config.URL_API_NS}/comp/${idComp}`);
          
          
          replaceData2CompGallery("focus", "comp", data);
          replaceData2("loading", "focusingComp", false);
          replaceData2("ready", "focusingComp", true);
          
    
        } catch (error) {
          replaceData2("ready", "focusingComp", false);
          replaceData2("loading", "focusingComp", false);
          
          addDeleteNotification("basic01", language);
          console.log(error)
        }
        
      }
     
    })() // async

  }, [readyFocusingComp, idComp])
  
  


  return (
    <>
    { (loadingFocusingComp || !readyFocusingComp) ? <DivFocus> <Loading /> </DivFocus>
      :<DivFocus>
        
        <DivA> 
        
          <Tools />
          
          <DivBody>
            <Header />
            <ListMap />
            <ListPosition />
          </DivBody>  
          
        </DivA>
        
        <DivB>  
        
        
          <Reactions />
          
        
          { (readyFocusingComp && readyFocusingCompComment && focusingComp.listIdComment.length > 0) && 
            <Comment 
              comment={focusingComment}
              where="focus"
            />
          }
          
           { (readyFocusingComp && readyFocusingCompVideo && focusingComp.listIdVideo.length > 0) && 
            <Video 
              video={focusingVideo}
              where="focus"
            />
          }
          
          { (loadingFocusingCompComment || loadingFocusingCompVideo) && <DivFocus> loading </DivFocus> }
          
          
        </DivB>
  
      </DivFocus>
    }
    </>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language

    
    
    , loadingFocusingCompComment: state.basic.loading.focusingCompComment
    , readyFocusingCompComment: state.basic.ready.focusingCompComment
    
    , loadingFocusingCompVideo: state.basic.loading.focusingCompVideo
    , readyFocusingCompVideo: state.basic.ready.focusingCompVideo
    
  };
}

function mapDispatchToProps(dispatch) {
  return {

    replaceDataCompGallery: (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    , replaceData2CompGallery: (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))

    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    , addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Focus);