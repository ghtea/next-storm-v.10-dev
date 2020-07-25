import React from 'react';
import styled from 'styled-components';

import { connect } from "react-redux";
import {addNotification, removeNotification} from "../redux/actions/basic";
import addRemoveNotification from "../redux/thunks/addRemoveNotification";


import {Div} from '../styles/DefaultStyles';



const DivNotification = styled(Div)`
	
  position: fixed;
  z-index: 100;
  
  left: 50%;
  transform: translateX(-50%);
  
  display: flex;
  flex-direction: column;
	justify-content: center;
	align-items: center;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  
  	width: 100%;
  	max-width: 360px;
  	height: auto;
  	
  	top: 60px;
	}
 
	@media (min-width:  ${props => (props.theme.media.mid_big) }px) {
		width: 360px;
	  height: auto;
	  
	  top: 10px;
	 
		
	 }
  
`;





const DivNotificationItem = styled(Div)`
	
	box-sizing: border-box;
	padding: 8px;
	
	magin-bottom: 2px;
	margin-top: 2px;
	
	border-radius: 8px;
`;




// img (svg) https://www.svgrepo.com/svg/154720/hexagon
const Notification = ({notification}) => {
	return (
 
	
  <DivNotification>
  	
  	{notification.map( (element, i) =>
  	
  		<DivNotificationItem key = {element.idNotification} className={element.situation}>
  				{element.message}
  		</DivNotificationItem>
  		
  	)}
  	
	</DivNotification>
	
	)
}


function mapStateToProps(state) { 
  return { 
    notification: state.basic.notification
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
    ,addNotification: (situation, message, idNotification) => dispatch( addNotification(situation, message, idNotification) )
    ,removeNotification: (idNotification) => dispatch(removeNotification(idNotification))
  }; 
}


export default connect(mapStateToProps, mapDispatchToProps)(Notification);