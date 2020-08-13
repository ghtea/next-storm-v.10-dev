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
import {replaceDataReaction, replaceData2Reaction} from "../../../../redux/actions/reaction";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../../../styles/DefaultStyles';

import IconHeart from '../../../../svgs/basic/IconHeart';
import IconComment from '../../../../svgs/basic/IconComment';
import IconVideo from '../../../../svgs/basic/IconVideo';

import IconEye from '../../../../svgs/basic/IconEye';
import IconPlus from '../../../../svgs/basic/IconPlus';


const DivReactions = styled(Div)
`
  width: auto;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;


const Set = styled(Div)`
  
  background-color: ${props=> props.theme.COLOR_normal};
  border-radius: 10px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 6px;
  padding-right: 6px;
  
  margin: 4px;
  
  &:nth-child(1)  {
    width: 80px;
  }
  &:nth-child(2)  {
    width: 200px;
  }
  &:nth-child(3)  {
    width: 200px;
  }
  
`

const Status = styled(Div)`
  width: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  color: ${props=> props.theme.color_weak};
  
  & > div:nth-child(1)  {
    width: 30px;
  }
  & > div:nth-child(2)  {
    width: 40px;
    padding-left: 4px;
    padding-right: 4px;
  }
`

const Actions = styled(Div)`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  
  font-size: 0.9rem;
  color: ${props=> props.theme.color_weak};
  
  & > div:nth-child(n+2) {
    margin-left: 4px;
  }
  
  
  & > div:nth-child(1)  {
    width: auto;
    cursor: pointer;
  }
  & > div:nth-child(2)  {
    width: 30px;
    cursor: pointer;
  }
`


const Reactions = ({

  language
  
  , user, readyUser
  , focusingComp
  
  , replaceDataReaction
  , replaceData2Reaction
  
  , addDeleteNotification
}) => {
  
  const history = useHistory(); 
  
  const numberLike = focusingComp.listUserLike.length;
  const numberComment = focusingComp.listIdComment.length;
  const numberVideo = focusingComp.listIdVideo.length;
  
  
  const onClick_MoreComments = () => {
    
    const query = queryString.stringify({
      idSubject: focusingComp._id
      , modelSubject: "Comp"
    });
    
    history.push(`/comp-gallery/comments?` + query);
  }
  
  const onClick_MoreVideos = () => {
    
    const query = queryString.stringify({
      idSubject: focusingComp._id
      , modelSubject: "Comp"
    });
    
    history.push(`/comp-gallery/videos?` + query);
  }
  
  
  const onClick_AddComment = (event) => {
    
    if (!readyUser) {
      addDeleteNotification("auth31", language);
      
      const query = queryString.stringify({
        "shouldGoBack": "yes"
      });
      history.push('/auth/log-in?' + query)
    }
    
    else {
      replaceDataReaction("mode", "create");
      replaceDataReaction("which", "comment");
      
      replaceDataReaction("authorReaction", user._id);
      replaceDataReaction("idReaction", "");
      replaceDataReaction("idSubject", focusingComp._id);
      replaceDataReaction("modelSubject", "Comp");
      
      replaceData2Reaction("comment", "content", "");
      
      replaceDataReaction("visibility", "visible");
    }
    
  }
  
  const onClick_AddVideo = (event) => {
    
    if (!readyUser) {
      addDeleteNotification("auth31", language);
      
      const query = queryString.stringify({
        "shouldGoBack": "yes"
      });
      history.push('/auth/log-in?' + query)
    }
    
    else {
      replaceDataReaction("mode", "create");
      replaceDataReaction("which", "video");
      
      replaceDataReaction("authorReaction", user._id);
      replaceDataReaction("idReaction", "");
      replaceDataReaction("idSubject", focusingComp._id);
      replaceDataReaction("modelSubject", "Comp");
      
      replaceData2Reaction("video", "urlContent", "");
      
      replaceDataReaction("visibility", "visible");
    }
    
  }
  
  

  return (

    <DivReactions>
    
      
        <Set >
          <Status> 
            <Div> <IconHeart width = { "20px" } height = { "20px" }  filled={numberLike>0} /> </Div>
            <Div> {numberLike} </Div>
              
          </Status>
        </Set>
      
      
        <Set>
          <Status> 
            <Div> <IconComment width = { "20px" } height = { "20px" }  color={"color_weak"} /> </Div>
            <Div> {numberComment} </Div>
          </Status>
          
          <Actions>
            <Div
              onClick={onClick_MoreComments}
            > {(() => {
                switch (language) {
                  case 'ko': 
                    return '더보기';
                  case 'ja': 
                    return 'もっと見る';
                  default: // eng
                    return 'see more';
                }
              })()} </Div>
            <Div
              onClick={onClick_AddComment}
            > <IconPlus width = { "22px" } height = { "22px" }  color={"color_weak"} /></Div>
          </Actions>
        </Set>
        
        
        
        <Set> 
          <Status> 
            <Div> <IconVideo width = { "22px" } height = { "22px" }  color={"color_weak"} /></Div>
            <Div> {numberVideo} </Div>
          </Status>
          
          <Actions>
            <Div
              onClick={onClick_MoreVideos}
            > {(() => {
                switch (language) {
                  case 'ko': 
                    return '더보기';
                  case 'ja': 
                    return 'もっと見る';
                  default: // eng
                    return 'see more';
                }
              })()} </Div>
            <Div
              onClick={onClick_AddVideo}
            > <IconPlus width = { "22px" } height = { "22px" }  color={"color_weak"} /> </Div>
          </Actions>
        </Set>
   

    </DivReactions>

  )

}

/*
 {`${(() => {
                switch (language) {
                  case 'ko': 
                    return '댓글';
                  case 'ja': 
                    return 'コメント';
                  default: // eng
                    return 'Comments';
                }
              })()} ${numberComment}`}
*/


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

    replaceDataCompGallery: (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    , replaceData2CompGallery: (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))

    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , replaceDataReaction : (which, replacement) => dispatch(replaceDataReaction(which, replacement))
    , replaceData2Reaction : (which1, which2, replacement) => dispatch(replaceData2Reaction(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Reactions);