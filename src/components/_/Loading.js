import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import * as config from '../../config';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { replaceData2 } from "../../redux/actions/basic";

import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../styles/DefaultStyles';

import IconLoading from '../../svgs/basic/IconLoading'


const ContainerLoading = styled(Div)`
  
  width: 200px;
  height: 200px; 
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


const Loading = ({

  language
  
  
  , addDeleteNotification
}) => {
  
  
  return (

    <ContainerLoading>
      
      <IconLoading width={"140px"} height={"140px"} color={"color_very_weak"} />
      
    </ContainerLoading>

  )
  
}
 



function mapStateToProps(state) {
  return {

    language: state.basic.language
  };
}

function mapDispatchToProps(dispatch) {
  return {

    addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Loading);