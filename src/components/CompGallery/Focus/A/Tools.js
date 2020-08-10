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

import IconWorking from '../../../../svgs/basic/IconWorking'




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
  
  , listComp
  , readyListComp, loadingListComp

  , replaceData2CompGallery, replaceData2

  , addDeleteNotification
}) => {


  return (

    <DivTools>
      
      <ButtonTool> back  </ButtonTool>
      <ButtonTool> copy link </ButtonTool>
      <ButtonTool> like </ButtonTool>
      <ButtonTool> edit  </ButtonTool>

    </DivTools>

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
export default connect(mapStateToProps, mapDispatchToProps)(Tools);