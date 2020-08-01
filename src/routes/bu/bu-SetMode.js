import React from 'react';
import styled from 'styled-components';
import {
  withCookies, Cookies, useCookies
} from 'react-cookie';

import {
  NavLink, useHistory
} from 'react-router-dom';
import * as config from '../config';

import {
  Div, Button
} from '../styles/DefaultStyles';
import storage from '../tools/vanilla/storage';

//import IconSignWay from '../svgs/basic/IconSignWay';



const DivSetMode = styled(Div)
`
  
  width: 100%;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;




const SetMode = () => {
  
  const history = useHistory();
  // console.log(document.cookie) not work

  const onClick_ViewMode = (event) => {
    storage.set('mode', 'view');
    storage.set('updated', Date.now());
    console.log("you have chosen view mode");
    history.goBack();
  }

  const onClick_AutoLoginMode = (event) => {
    storage.set('mode', 'auto');
    storage.set('updated', Date.now());
    console.log("you have chosen auto login mode");
    window.location.href = `${config.URL_API_NS}/auth-bnet/login`;
    //history.goBack();
  }

  return ( < DivSetMode >

    <Button onClick = {
      onClick_ViewMode
    } > View Mode < /Button>

    <Button onClick = {
      onClick_AutoLoginMode
    } > Auto Login Mode < /Button>

    </DivSetMode>
  );
}

export default SetMode;