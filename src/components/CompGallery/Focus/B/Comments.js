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




const DivComments = styled(Div)
`

  height: 240px;
  
  background-color: ${props=> props.theme.COLOR_normal};
  border-radius: 9px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
 
`;


const DivView = styled(Div)`
  height: calc(100% - 50px);
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const DivAdd = styled(Div)`
  height: 50px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`



const Comments = ({

  language
  
  , focusingComp
  , replaceData2CompGallery, replaceData2

  , focusingComment
  
  , addDeleteNotification
}) => {


  return (

    <DivComments>
      
      <DivView> 
     
        {`${focusingComment.content}`}
        
      </DivView>
      
    <DivAdd> add </DivAdd>

    </DivComments>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language

    , focusingComp: state.comp_gallery.focus.comp
    
    , focusingComment: state.comp_gallery.focus.comment
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
export default connect(mapStateToProps, mapDispatchToProps)(Comments);