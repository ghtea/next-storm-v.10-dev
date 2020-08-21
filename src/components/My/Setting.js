import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../config';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { replaceData2 } from "../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../redux/actions/comp_gallery";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../styles/DefaultStyles';



const DivSetting = styled(Div)
`
  width: 350px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  
`;







const Setting = ({

  language
  
  , location
  
  , user
  , readyUser
  
  
  , replaceData2
  
  , addDeleteNotification
}) => {

  const history = useHistory();
  
  return (

  <DivSetting>

    
    <Div> 
      <Button onClick={(event)=>{history.push('/auth/change-password')}}> 
        {(() => {
            switch (language) {
              case 'ko': 
                return '비밀번호 변경';
              case 'ja': 
                return 'パスワード変更';
              default: // eng
                return 'Change Password';
            }
          })()}  
      </Button>
      
      {(!user.battletag) && 
        <Button onClick={(event)=>{history.push("auth/apply-battletag");}} >  {(() => {
          switch (language) {
            case 'ko': 
              return '배틀태그 등록';
            case 'ja': 
              return 'バトルタグ登録';
            default: // eng
              return 'Register Battletag';
          }
        })()}  </Button> 
      }
      
      
    </Div>
      
      

  </DivSetting>

  )

}



 

function mapStateToProps(state) {
  return {

    language: state.basic.language
    
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
export default connect(mapStateToProps, mapDispatchToProps)(Setting);