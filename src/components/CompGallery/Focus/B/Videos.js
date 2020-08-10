import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player'

import axios from 'axios';

import { connect } from "react-redux";
import * as config from '../../../../config';

import addDeleteNotification from "../../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../../others/dictCode'

import { replaceData2 } from "../../../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../../../redux/actions/comp_gallery";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../../../styles/DefaultStyles';

import UserPublic from '../../../_/UserPublic';

import IconEdit from '../../../../svgs/basic/IconEdit'
import IconPlus from '../../../../svgs/basic/IconPlus'
import IconHeart from '../../../../svgs/basic/IconHeart'




const DivVideos = styled(Div)
`

  height: 240px;
  
  background-color: ${props=> props.theme.COLOR_normal};
  border-radius: 9px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
 
`;


const DivHeader = styled(Div)`
  height: 60px;
  
  padding-left: 15px;
  padding-right: 15px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  & > div:nth-child(2) {
    width: auto;
  }
`

const DivView = styled(Div)`
  height: calc(100% - 100px);
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const DivFooter = styled(Div)`
  height: 40px;
  
  padding-left: 15px;
  padding-right: 15px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  & > div {
    width: auto;
  }
`



const Videos = ({

  language
  
  , focusingComp
  , replaceData2CompGallery, replaceData2

  , focusingVideo
  
  , addDeleteNotification
}) => {


  return (

    <DivVideos>
      
      <DivHeader> 
        <UserPublic idAuthor={focusingVideo.author} direction={"right"}/>
        <Div> more </Div>
      </DivHeader>
      
      <DivView> 
        <ReactPlayer
          className='react-player'
          url={`${focusingVideo.content}`}
          width='270px'
          height='100%'
        />
      </DivView>
      
      <DivFooter>  
        <Div> <IconEdit width={"24px"} height={"24px"} color={"color_very_weak"}  /> </Div>
        <Div> <IconPlus width={"24px"} height={"24px"} color={"color_very_weak"}  /> </Div>
        <Div> <IconHeart width={"24px"} height={"24px"} color={"color_very_weak"} filled={false} /> </Div>
      </DivFooter>

    </DivVideos>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language

    , focusingComp: state.comp_gallery.focus.comp
    
    , focusingVideo: state.comp_gallery.focus.video
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
export default connect(mapStateToProps, mapDispatchToProps)(Videos);