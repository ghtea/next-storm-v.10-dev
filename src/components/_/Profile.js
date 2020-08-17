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

const DivProfile = styled(Div)`
  
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
  
  ${props => borders[props.border] || borders['Default']}
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




const Profile = ({

  language
  , themeName
  
  , idUser
  
  , size
  , layout

  , addDeleteNotification
}) => {
  
  const [readySomeone, setReadySomeone] = useState(false);
  const [someone, setSomeone] = useState({});
  
  const [battletagName, setBattletagName] = useState("");
	const [battletagNumber, setBattletagNumber] = useState("");
 
  
  size = size || 40;
  //const sizeUsing = size || 40;
  
  useEffect(() => {

    (async() => {
      
      try {
        setReadySomeone(false);
        const resSomeone = await axios.get(`${config.URL_API_NS}/user/public/${idUser}`);
        //console.log(resUser.data.listIdShape)
        
        const someone = resSomeone.data; // 현재 사이트 상의 유저가 아니라, 해당 아이콘의 유저!
        const regexBattletag = /(#\d*)$/;
  		  const listNumberBattletag = someone.battletag.match(regexBattletag);
  		  
  		  const battletagNameTemp = someone.battletag.replace(regexBattletag, "");
  		  const battletagNumberTemp = listNumberBattletag[0];
  		  
  		  setBattletagName(battletagNameTemp)
  		  setBattletagNumber(battletagNumberTemp)
        
        setSomeone(resSomeone.data);
        setReadySomeone(true);
        //console.log(User)
        
        
      } catch (error) {
        setReadySomeone(false);
        //addDeleteNotification("basic01", language);
        console.log(error)
      }
        
    })() // async

  }, [])

  // Suspense 로 변수를 이용한 컴포넌트 import!
  return (

    <DivProfile size={size} layout={layout} >
      
      {(!readySomeone)? 'loading' :
        <>
        
          <DivIcon size={size} layout={layout} border={someone.profile.listIdBorder[0]} >
            
            <IconProfile 
              width = { `${size-6}px` } height = { `${size-6}px` } 
              shape={someone.profile.listIdShape[0]} 
              palette={someone.profile.listIdPalette[0]} 
             
            />

            
          </DivIcon>
        
          <DivName layout={layout}>
            {battletagName}
          </DivName>

        </>
      }

    </DivProfile>

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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);