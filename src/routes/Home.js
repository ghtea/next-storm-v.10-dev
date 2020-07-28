import React from 'react';
import styled from 'styled-components';
import { withCookies, Cookies, useCookies } from 'react-cookie';

import { NavLink } from 'react-router-dom';
import {Div} from '../styles/DefaultStyles';

import IconSignWay from '../svgs/basic/IconSignWay';



const DivHome = styled(Div)`
  
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;


const NavLinkStyled = styled(NavLink)`
  width: 200px;
  height: 180px;
  
	color: ${props => props.theme.color_normal};
	background-color: ${props => props.theme.COLOR_normal};
	
	border-radius: 30px;
	
	
	text-decoration: none;
	text-align: center;
	
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	
	& > div {
	  font-size: 1.2rem;
	  font-weight: bold;
	  color: ${props => props.theme.color_normal };
	}
`;




function Home() {
  
  // console.log(document.cookie) not work
  
  return (
    <DivHome>
      
      <NavLinkStyled to="/team-generator" > 
        
        
        <IconSignWay width={"80px"} height={"80px"} />
        
        <Div> Go to </Div>
        <Div> Team Generator </Div>
        
        <Div> {document.cookie}</Div>
        
      </NavLinkStyled>
      
    </DivHome>
  );
}

export default Home;



