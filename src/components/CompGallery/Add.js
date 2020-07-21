import dotenv from 'dotenv';
import React, {useState} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import addRemoveNotification from "../../redux/thunks/addRemoveNotification";
import {replaceWorking} from "../../redux/store";

import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconWorking from '../../svgs/IconWorking'




const DivAdd = styled(Div)`
  width: 100%;
  height:100%;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  flex-wrap: wrap;
`;



 const Add = ({}) => {
  

  
  return (
  
  <DivAdd>
    ...
  </DivAdd>
  
  )

}
  
  


function mapStateToProps(state) { 
  return { 
    //ready: state.ready 
   // ,loading: state.loading
    ///,working: state.working
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    //readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
    //,addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
    //,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Add);