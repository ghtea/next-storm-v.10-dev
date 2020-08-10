import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import * as config from '../../../../../config';

import addDeleteNotification from "../../../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../../../others/dictCode'

import { replaceData2 } from "../../../../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../../../../redux/actions/comp_gallery";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button, Img } from '../../../../../styles/DefaultStyles';

import IconWorking from '../../../../../svgs/basic/IconWorking';

import * as imgHero from '../../../../../images/heroes';

import Hero from './Position/Hero';





const DivPosition = styled(Div)
`
  width: 60px;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`;




const Position = ({

  language
  
  , position
  , focusingComp, readyFocusingComp, loadingFocusingComp
    
  , replaceData2CompGallery, replaceData2

  , addDeleteNotification
}) => {
  

  return (

    <DivPosition>
      
      {position.listIdHero.map( (element, index) => 
        <Hero
          key={`position-${index}-${element}`} 
          idHero = {element}  
        />
      )}

    </DivPosition>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language
    
    , focusingComp: state.comp_gallery.gallery.comp
    , readyFocusingComp: state.basic.ready.fComp
    , loadingFocusingComp: state.basic.loading.fComp
    
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
export default connect(mapStateToProps, mapDispatchToProps)(Position);