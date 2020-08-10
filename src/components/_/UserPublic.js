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

import IconUser from '../../svgs/basic/IconUser'


const DivUserPublic = styled(Div)`
  
  width: auto;
  height: 40px;
  
  /*border-left: 4px solid ${props => props.theme.COLOR_bg};*/
  
  display: flex;
  flex-direction: 
    ${props => {
        if (!props.layout || props.layout === 'icon only' || props.layout === 'right') {
          return 'row'
        }
        else if (props.layout === 'left') {
          return 'row-reverse'
        }
      }
    };
    
  justify-content: space-between;
  align-items: center;
`

const DivName = styled(Div)`
    
  font-size: 0.9rem;
  
  width: 100px;

  display: 
    ${props => {
        if (props.layout === 'icon only') {
          return 'none'
        }
        else {
          return 'block'
        }
      }
    };
  
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
`

const DivIcon = styled(Div)`
  
  width: 40px;
  height: 40px;
  
  background-color: #fec84e;
  background-image: linear-gradient(315deg, #fec84e 0%, #ffdea8 74%);
  
  
  border-radius: 4px; 
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`





const UserPublic = ({

  language
  
  , idUser
  , layout
  
  , addDeleteNotification
}) => {
  
  const [readyUser, setReadyUser] = useState(false);
  const [User, setUser] = useState({});
  
  
  useEffect(() => {

    (async() => {
      
      try {
        setReadyUser(false);
        const resUser = await axios.get(`${config.URL_API_NS}/user/public/${idUser}`);
        
        setUser(resUser.data);
        setReadyUser(true);
        console.log(User)
        
      } catch (error) {
        setReadyUser(false);
        //addDeleteNotification("basic01", language);
        console.log(error)
      }
        
    })() // async

  }, [])

  
  return (

    <DivUserPublic layout={layout}>
      
      {(!readyUser)? 'loading' :
        <>
        
          <DivIcon layout={layout}>
            <IconUser width = { "32px" } height = { "32px" } color = { "color_weak" } />
          </DivIcon>
        
          <DivName layout={layout}>
            {User.battletag}
          </DivName>

        </>
      }

    </DivUserPublic>

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
export default connect(mapStateToProps, mapDispatchToProps)(UserPublic);