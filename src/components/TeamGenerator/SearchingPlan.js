import dotenv from 'dotenv';
import React from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import addRemoveNotification from "../../redux/thunks/addRemoveNotification";
import {replaceWorking} from "../../redux/actions/basic";

import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, A} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import IconWorking from '../../svgs/IconWorking'


const DivSearchingPlan = styled(Div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;



 const SearchingPlan = ({addRemoveNotification, loading, ready, working, replaceWorking}) => {
  
  

  
  return (
  
  <DivSearchingPlan>
      
  </DivSearchingPlan>
  
  )

}
  
	  


function mapStateToProps(state) { 
  return { 
    ready: state.basic.ready 
    ,loading: state.basic.loading
    ,working: state.basic.working
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
    ,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(SearchingPlan);