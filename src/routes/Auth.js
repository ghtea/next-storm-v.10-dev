import React from 'react';
import styled from 'styled-components';
//import { withCookies, Cookies, useCookies } from 'react-cookie';
import { Route, Switch } from "react-router-dom";

import { NavLink } from 'react-router-dom';
import {Div} from '../styles/DefaultStyles';

import LogIn from '../components/Auth/LogIn';
import SignUp from '../components/Auth/SignUp';
import ApplyBattletag from '../components/Auth/ApplyBattletag';
import ChangePassword from '../components/Auth/ChangePassword';
import ForgotPassword from '../components/Auth/ForgotPassword';

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
        <Route path="/auth/sign-up"  component={SignUp} />
        <Route path="/auth/log-in" component={LogIn} />
        <Route path="/auth/apply-battletag"  component={ApplyBattletag} />
        <Route path="/auth/change-password"  component={ChangePassword} />
        <Route path="/auth/forgot-password"  component={ForgotPassword} />
      </Switch>
        
    </DivAuth>
  );
}

export default Auth;



