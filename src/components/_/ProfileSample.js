import dotenv from 'dotenv';
import React, { useState, useEffect , Suspense, lazy } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';


import { connect } from "react-redux";
import * as config from '../../config';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { replaceData2 } from "../../redux/actions/basic";

import {  NavLink, useHistory } from 'react-router-dom';

import themes from "../../styles/themes"
import { Div, Input, Button } from '../../styles/DefaultStyles';

// for profile of user
import ProfileIcon from "./Profile/ProfileIcon";


const DivProfileSample = styled(Div)`
  
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

// ${props => borders[props.border] }
const DivIcon = styled(Div)`
  
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  
  
  border-radius: 6px; 
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`


const DivName = styled(Div)`
    
  font-size: 0.9rem;
  
  width: 70px;
  /*width: 90px;*/

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




const ProfileSample = ({

  language
  , themeName
 
  , user
  , readyUser
  
  , palette
  , badge
  , shape
  
  , size
  , layout
  
  , replaceData2
  , addDeleteNotification
}) => {
  
  const battletagName = "battletag";
  const battletagNumber = "#1234";
  
  size = size || 40;
  
  
  const onClick_ProfileSample = async (event) => {
    
    addDeleteNotification(
      undefined, language, `${shape}-${palette}`, 3000
    )
    
    if (readyUser) {
      try {
        const query = queryString.stringify({
          shape: shape
          , palette: palette
          , badge: badge
        })  
        await axios.put(`${config.URL_API_NS}/user/profile/${user._id}?` + query );
        replaceData2("ready", "user", false);
      }
      catch (error) {
        console.log(error);
        addDeleteNotification("basic01", language);
      }
    }// if readyUser
  }
  
  
  return (

    <DivProfileSample 
      size={size} layout={layout} 
      onClick={onClick_ProfileSample}
      >
      
      
      <DivIcon size={size} layout={layout} badge={badge} >
        
        <ProfileIcon 
          width = { `${size-6}px` } height = { `${size-6}px` } 
          shape={shape} 
          palette={palette} 
        />

        
      </DivIcon>
    
      <DivName layout={layout}>
        {battletagName}
      </DivName>


    </DivProfileSample>

  )
}




function mapStateToProps(state) {
  return {

    language: state.basic.language
    , themeName: state.basic.themeName
    
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
    replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    , addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(ProfileSample);