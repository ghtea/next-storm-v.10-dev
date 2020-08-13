import dotenv from 'dotenv';
import React, { useState, useEffect , Suspense, lazy } from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import * as config from '../../config';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { replaceData2 } from "../../redux/actions/basic";

import {  NavLink, useHistory } from 'react-router-dom';

import themes from "../../styles/themes"
import { Div, Input, Button } from '../../styles/DefaultStyles';

// for profile of user
import IconProfile from "./Profile/Icon";
import borders from "../../profile/borders";

const DivUserPublic = styled(Div)`
  
  width: auto;
  height: ${props => props.size}px;
  
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
  
  & > div:nth-child(2) {
    margin-left: 5px;
  }
`

const DivIcon = styled(Div)`
  
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  
  ${props => borders[props.border]}
  border-radius: 6px; 
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`


const DivName = styled(Div)`
    
  font-size: 0.9rem;
  
  width: 90px;

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




const UserPublic = ({

  language
  , themeName
  
  , idUser
  
  , size
  , layout

  , addDeleteNotification
}) => {
  
  const [readyUser, setReadyUser] = useState(false);
  const [User, setUser] = useState({});
  
  size = size || 40;
  //const sizeUsing = size || 40;
  
  useEffect(() => {

    (async() => {
      
      try {
        setReadyUser(false);
        const resUser = await axios.get(`${config.URL_API_NS}/user/public/${idUser}`);
        //console.log(resUser.data.listIdShape)
        
        setUser(resUser.data);
        setReadyUser(true);
        //console.log(User)
        
      } catch (error) {
        setReadyUser(false);
        //addDeleteNotification("basic01", language);
        console.log(error)
      }
        
    })() // async

  }, [])

  // Suspense 로 변수를 이용한 컴포넌트 import!
  return (

    <DivUserPublic size={size} layout={layout} >
      
      {(!readyUser)? 'loading' :
        <>
        
          <DivIcon size={size} layout={layout} border={User.profile.listIdBorder[0]} >
            
            <IconProfile 
              width = { `${size-6}px` } height = { `${size-6}px` } 
              shape={User.profile.listIdShape[0]} 
              palette={User.profile.listIdPalette[0]} 
            />

            
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
    , themeName: state.basic.themeName
    
  };
}

function mapDispatchToProps(dispatch) {
  return {

    addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(UserPublic);