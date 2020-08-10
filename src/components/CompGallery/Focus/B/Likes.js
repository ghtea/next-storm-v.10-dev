import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import * as config from '../../../../config';

import addDeleteNotification from "../../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../../others/dictCode'

import { replaceData2 } from "../../../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../../../redux/actions/comp_gallery";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../../../styles/DefaultStyles';

import IconHeart from '../../../../svgs/basic/IconHeart'




const DivLikes = styled(Div)
`
  width: 200px;
  height: 40px;
  
  background-color: ${props=> props.theme.COLOR_normal};
  border-radius: 9px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  & > div:nth-child(1) {
    width: 40px;
  }
  & > div:nth-child(2) {
    width: auto;
    font-size: 0.8rem;
  }
`;



const Likes = ({

  language
  
  , listComp
  , readyListComp, loadingListComp

  , replaceData2CompGallery, replaceData2

  , addDeleteNotification
}) => {


  return (

    <DivLikes>
      
      <Div> <IconHeart width = { "25x" } height = { "25px" } color = { "color_very_weak" } filled={true} /> </Div>
      <Div> 6 players like this comp </Div>

    </DivLikes>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language

    , listComp: state.comp_gallery.gallery.listComp
    , readyListComp: state.basic.ready.listComp
    , loadingListComp: state.basic.loading.listComp
    
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
export default connect(mapStateToProps, mapDispatchToProps)(Likes);