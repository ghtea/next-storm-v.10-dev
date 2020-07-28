import React from 'react';
import styled from 'styled-components';
//import { withCookies, Cookies, useCookies } from 'react-cookie';
import { Route, Switch } from "react-router-dom";

import { NavLink } from 'react-router-dom';
import {Div} from '../styles/DefaultStyles';

import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';


import IconSignWay from '../svgs/basic/IconSignWay';



const DivAuth = styled(Div)`
  
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;




function Auth() {
  
  // console.log(document.cookie) not work
  
  return (
    <DivAuth>
      
      <Switch>
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register"  component={Register} />
      </Switch>
        
    </DivAuth>
  );
}

export default Auth;



