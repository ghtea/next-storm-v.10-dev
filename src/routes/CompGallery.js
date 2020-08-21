import React, {useEffect, useRef} from 'react';
import dotenv from 'dotenv';

import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';
import { Route, NavLink, Switch } from 'react-router-dom';

import * as config from '../config';

import Gallery from "../components/CompGallery/Gallery"
import Videos from "../components/CompGallery/Videos"
import Comments from "../components/CompGallery/Comments"

import Focus  from "../components/CompGallery/Focus"
import Create  from "../components/CompGallery/Create"
import Edit  from "../components/CompGallery/Edit"
import SubCompGallery from "../components/CompGallery/SubCompGallery"

import { connect } from "react-redux";

import {replaceData, replaceReady, replaceLoading, replaceWorking, replaceAuthority, replaceData2} from "../redux/actions/basic";

import {replaceDataHots, replaceData2Hots} from "../redux/actions/hots";


import addDeleteNotification from "../redux/thunks/addDeleteNotification";
import dictCode from '../others/dictCode';

import {Div, Input, Button} from '../styles/DefaultStyles';

import Loading from '../components/_/Loading'



const DivCompGallery = styled(Div)`
  width: 100%;
  /* height: 100%;  App의 DivContent 에서 height: calc(100vh - 50px); 로 설정해놨다 */
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (min-width:  ${props => props.theme.media.md }px) {
    
  }
`;





const Main = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  width: 360px; /* 여기서 부터 360 고정! */ 
  height: auto;
  
  
  margin-top: 50px; 
  
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    
    width: 100%;
    margin-top: 60px; 
    /*height: calc(100vh - 120px);*/
    
    overflow: auto; /* important!!! */
    
  }
`




const CompGallery = ({
  
  match, location
  
  , authority, language
  
  
  
  , replaceDataHots
  , replaceData2Hots
  
  , replaceData
  , replaceData2
  
  , addDeleteNotification
  
}) => {
  
  
 
  const listKeyMaster = [];
  
  
  
   return (
   <DivCompGallery>
    
      <SubCompGallery/>
      
      <Main>
        <Switch>
          <Route path="/comp-gallery" exact={true} component={Gallery} />
          <Route path="/comp-gallery/focus/:idComp"  component={Focus} />
          <Route path="/comp-gallery/videos"  component={Videos} />
          <Route path="/comp-gallery/comments"  component={Comments} />
          <Route path="/comp-gallery/create"  component={Create} />
          
          <Route path="/comp-gallery/edit/:idComp"  component={Edit} />
        </Switch>
      </Main>
  
    </DivCompGallery>
    )
}
  
 
    
 //CompGallery



function mapStateToProps(state) { 
  return { 
    authority: state.basic.authority.comp_gallery
    , language: state.basic.language
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    replaceDataHots : (which, replacement) => dispatch(replaceDataHots(which, replacement))
    ,replaceData2Hots : (which1, which2, replacement) => dispatch(replaceData2Hots(which1, which2, replacement))
    
    ,replaceData : (which, replacement) => dispatch(replaceData(which, replacement))
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(CompGallery);

