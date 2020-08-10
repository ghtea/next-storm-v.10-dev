import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import axios from 'axios';

import { connect } from "react-redux";
import * as config from '../../../config';

import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../others/dictCode'

import { replaceData2 } from "../../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../../redux/actions/comp_gallery";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../../styles/DefaultStyles';

import UserPublic from '../../_/UserPublic';

import IconEdit from '../../../svgs/basic/IconEdit'
import IconPlus from '../../../svgs/basic/IconPlus'
import IconEnter from '../../../svgs/basic/IconEnter'
import IconHeart from '../../../svgs/basic/IconHeart'




const DivVideo = styled(Div)
`
  width: 300px;
  height: 260px;
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


const DivEnter = styled(Div)`
  z-index: 2;
  position: absolute;
  right: 0;
  top: 0;
  
  background-color: ${props=> props.theme.COLOR_normal};
  
  width: 36px;
  height: 36px;
  border-radius: 5px;
`


const DivView = styled(Div)`
  height: 180px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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



const Video = ({

  language
  
  , video
  
  , addDeleteNotification
}) => {


  return (

    <DivVideo>
      
      <DivEnter> <IconEnter width={"24px"} height={"24px"} color={"color_very_weak"}  /> </DivEnter>
      
      <DivView> 
        <ReactPlayer
          className='react-player'
          url={`${video.content}`}
          width='270px'
          height='100%'
        />
      </DivView>
      
      <DivFooter>  
        <Div> <UserPublic idUser={video.author} layout={"right"}/> </Div>
        
        <Div> <IconEdit width={"24px"} height={"24px"} color={"color_very_weak"}  /> </Div>
        <Div> <IconHeart width={"24px"} height={"24px"} color={"color_very_weak"} filled={false} /> </Div>
      </DivFooter>

    </DivVideo>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language

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
export default connect(mapStateToProps, mapDispatchToProps)(Video);