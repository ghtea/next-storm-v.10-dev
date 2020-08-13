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
  
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;


const Set = styled(Div)`
  width: auto;
  max-width: 160px;
  
  background-color: ${props=> props.theme.COLOR_normal};
  border-radius: 10px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  
  padding-left: 8px; 
  padding-right: 8px; 
  
  padding-top: 3px; 
  padding-bottom: 3px; 
  
  margin: 4px;

`

const Texts = styled(Div)`
  width: auto;
  color: ${props=> props.theme.color_weak};
`

const Buttons = styled(Div)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  
  & > div:nth-child(n+2) {
    margin-left: 4px;
  }
  
`


const Reactions = ({

  language
  
  , focusingComp
  
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

  return (

    <DivReactions>
    
      <Div>
        <Set >
          <Texts> 
            
          </Texts>
        </Set>
      </Div>
      
      
      <Div>
        <Set
          onClick={onClick_MoreComments}
        >
          <Texts> 
           
          </Texts>
          
          <Buttons>
            <Div> {(() => {
                switch (language) {
                  case 'ko': 
                    return '더보기';
                  case 'ja': 
                    return 'もっと見る';
                  default: // eng
                    return 'see more';
                }
              })()} </Div>
            <IconPlus width = { "22px" } height = { "22px" }  color={"color_weak"} />
          </Buttons>
        </Set>
        
        
        <Set
          onClick={onClick_MoreVideos}
        > 
          <Texts> 
            {`${(() => {
                switch (language) {
                  case 'ko': 
                    return '동영상';
                  case 'ja': 
                    return '動画';
                  default: // eng
                    return 'Videos';
                }
              })()} ${numberVideo}`}
          </Texts>
          
          <Buttons>
            <Div> {(() => {
                switch (language) {
                  case 'ko': 
                    return '더보기';
                  case 'ja': 
                    return 'もっと見る';
                  default: // eng
                    return 'see more';
                }
              })()} </Div>
            <IconPlus width = { "22px" } height = { "22px" }  color={"color_weak"} />
          </Buttons>
        </Set>
      </Div>

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
export default connect(mapStateToProps, mapDispatchToProps)(Reactions);