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

const DivBody = styled(Div)`
  background-color: ${props => props.theme.COLOR_normal };
  border-radius: 10px;
  
  padding: 15px;
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
  
  , user, readyUser
  
  , location
  
  , listComp
  , readyListComp, loadingListComp
  
  , focusingComp
  , readyFocusingComp, loadingFocusingComp
  
  , focusingComment
  , focusingVideo
  
  , loadingFocusingCompComment
  , readyFocusingCompComment
  , loadingFocusingCompVideo
  , readyFocusingCompVideo
  
  , replaceData2CompGallery, replaceData2

  , addDeleteNotification
}) => {

  const { idComp } = useParams();
  
  /* makes error
  useEffect(()=>{
    replaceData2("ready", "focusingComp", false);
  },[])
  */
  
  
  // clean up function! 이렇게 따로 만들어야 잘 작동한다!
  useEffect(()=>{
    return ()=> {
      replaceData2('ready', 'focusingComp', false);
      replaceData2('ready', 'focusingCompComment', false);
      replaceData2('ready', 'focusingCompVideo', false);
    };
  },[])
  
  
  
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
          
          replaceData2("ready", "focusingCompComment", false);
          replaceData2("ready", "focusingCompVideo", false);
          
    
        } catch (error) {
          replaceData2("ready", "focusingComp", false);
          replaceData2("loading", "focusingComp", false);
          
          addDeleteNotification("basic01", language);
          console.log(error)
        }
        
      }
     
    })() // async

  }, [readyFocusingComp, idComp])
  
  
  useEffect(() => {

    (async() => {
      
      if (readyFocusingComp && !readyFocusingCompComment) {
        try {
          
          replaceData2CompGallery("focus", "comment", {});
          
          replaceData2("ready", "focusingCompComment", false);
          replaceData2("loading", "focusingCompComment", true);
          
          // comment
          if (focusingComp.listIdComment.length === 0) {
            replaceData2CompGallery("focus", "comment", undefined);
          }
          else {
            
            
            
            const queryRequestBefore = {
              
              listSort: ["createdNew"]
              , limitEach: 10  // test로서 3개씩 가져와 보자
              , skipEntire: 0
              
              , idSubject: idComp
              , modelSubject: "Comp"
  
            };
            
            
            if (readyUser) { queryRequestBefore['idUser'] = user._id; }
            
            const queryRequest = queryString.stringify(queryRequestBefore);
            
            replaceData2("ready", "listComment", false);
            replaceData2("loading", "listComment", true);
                
            const { data } = await axios.get(`${config.URL_API_NS}/comment/?` + queryRequest );
            
            if (data[0]) {
              replaceData2CompGallery("focus", "comment", data[0]);
            }
            else {
              replaceData2CompGallery("focus", "comment", undefined);
            }
             
            
            
          }
          
          replaceData2("loading", "focusingCompComment", false);
          replaceData2("ready", "focusingCompComment", true);
          
        } catch (error) {
          
          addDeleteNotification("basic01", language);
          console.log(error)
        }
        
      } //if   
     
    })() // async

  }, [readyFocusingComp, readyFocusingCompComment])
  
  
  
  useEffect(() => {

    (async() => {
      
      if (readyFocusingComp && !readyFocusingCompVideo) {
        try {
          
          replaceData2CompGallery("focus", "video", {});
          
          replaceData2("ready", "focusingCompVideo", false);
          replaceData2("loading", "focusingCompVideo", true);
          
          
          // video
          if (focusingComp.listIdVideo.length === 0) {
            replaceData2CompGallery("focus", "video", undefined);
          }
          else {
            
            
            
            const queryRequestBefore = {
              
              listSort: ["createdNew"]
              , limitEach: 10  // test로서 3개씩 가져와 보자
              , skipEntire: 0
              
              , idSubject: idComp
              , modelSubject: "Comp"
  
            };
            
            
            if (readyUser) { queryRequestBefore['idUser'] = user._id; }
            
            const queryRequest = queryString.stringify(queryRequestBefore);
            
            replaceData2("ready", "listVideo", false);
            replaceData2("loading", "listVideo", true);
                
            const { data } = await axios.get(`${config.URL_API_NS}/video/?` + queryRequest );
            
            if (data[0]) {
              replaceData2CompGallery("focus", "video", data[0]);
            }
            else {
              replaceData2CompGallery("focus", "video", undefined);
            }
            
          }
          
          
          replaceData2("loading", "focusingCompVideo", false);
          replaceData2("ready", "focusingCompVideo", true);
          
        } catch (error) {
          
          addDeleteNotification("basic01", language);
          console.log(error)
        }
        
      } //if   
     
    })() // async

  }, [readyFocusingComp, readyFocusingCompVideo])
  /*
    <DivA> title, author, tags   maps, positions  </DivA>
    <DivB> likes, comments, videos, links </DivB>
  */


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
          
        
          { (readyFocusingComp && readyFocusingCompComment && focusingComp.listIdComment.length > 0 && focusingComment) && 
            <Comment 
              comment={focusingComment}
              where="focus"
            />
          }
          
           { (readyFocusingComp && readyFocusingCompVideo && focusingComp.listIdVideo.length > 0 && focusingVideo) && 
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
    
    
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    
    , listComp: state.comp_gallery.gallery.listComp
    , readyListComp: state.basic.ready.listComp
    , loadingListComp: state.basic.loading.listComp
    
    , focusingComp: state.comp_gallery.focus.comp
    , readyFocusingComp: state.basic.ready.focusingComp
    , loadingFocusingComp: state.basic.loading.focusingComp
    
    
    , focusingComment: state.comp_gallery.focus.comment
    , focusingVideo: state.comp_gallery.focus.video
    
    
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