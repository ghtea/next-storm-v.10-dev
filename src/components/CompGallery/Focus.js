import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../config';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { replaceData2 } from "../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../redux/actions/comp_gallery";


import {  NavLink, useHistory, useParams } from 'react-router-dom';

import { Div, Input, Button } from '../../styles/DefaultStyles';

import Loading from '../_/Loading'

import Tools from './Focus/A/Tools';
import Header from './Focus/A/Header';
import ListMap from './Focus/A/ListMap';
import ListPosition from './Focus/A/ListPosition';

import Likes from './Focus/B/Likes';
import Comments from './Focus/B/Comments';
import Videos from './Focus/B/Videos';



import useInput from '../../tools/hooks/useInput';
import {  getTimeStamp } from '../../tools/vanilla/time';

import IconWorking from '../../svgs/basic/IconWorking'




const DivFocus = styled(Div)
`
  width: 100%;
 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
	  display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    
    width: 100%;
	}
`;


const DivA = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  width: 360px;      /*  768  */
  height: 360px;
  
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
  
  @media (min-width:  ${props => props.theme.media.md }px) {
    margin: 5px;
  }
  
  & > div {
    margin: 5px;
  }
`

const DivBody = styled(Div)`
  background-color: ${props => props.theme.COLOR_normal };
  border-radius: 10px;
  
  padding: 15px;
`


const DivB = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  width: 360px;      /*  768  */
  height: auto;
  
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
  
  
  @media (min-width:  ${props => props.theme.media.md }px) {
    margin: 5px;
  }
  
  & > div {
    margin: 5px;
  }
`





const Focus = ({

  language
  
  , location
  
  , listComp
  , readyListComp, loadingListComp
  
  , focusingComp
  , readyFocusingComp, loadingFocusingComp
  
  , readyFocusingCompBonus, loadingFocusingCompBonus

  , replaceData2CompGallery, replaceData2

  , addDeleteNotification
}) => {

  const { idComp } = useParams();
  
  useEffect(() => {

    (async() => {
      
      try {
          
        replaceData2("ready", "focusingComp", false);
        replaceData2("loading", "focusingComp", true);
        
        const {
          data
        } = await axios.get(`${config.URL_API_NS}/comp/${idComp}`);

        replaceData2CompGallery("focus", "comp", data);
        replaceData2("loading", "focusingComp", false);
        replaceData2("ready", "focusingComp", true);
        

      } catch (error) {

        //addDeleteNotification("basic01", language);
        console.log(error)
      }
     
    })() // async

  }, [])
  
  
  useEffect(() => {

    (async() => {
      
      if (readyFocusingComp) {
        try {
            
          replaceData2("ready", "focusingCompBonus", false);
          replaceData2("loading", "focusingCompBonus", true);
          
          
          const resComment = await axios.get( `${config.URL_API_NS}/comment/${focusingComp.listIdComment[0] } `);
          replaceData2CompGallery("focus", "comment", resComment.data);
          
          
          const resVideo = await axios.get( `${config.URL_API_NS}/video/${focusingComp.listIdVideo[0]}` );
          replaceData2CompGallery("focus", "video", resVideo.data);
          
          
          
          
          
          
          replaceData2("loading", "focusingCompBonus", false);
          replaceData2("ready", "focusingCompBonus", true);
          
          console.log(resVideo.data)
          
          
        } catch (error) {
  
          addDeleteNotification("basic01", language);
          console.log(error)
        }
        
      } //if   
     
    })() // async

  }, [readyFocusingComp])
  /*
    <DivA> title, author, tags   maps, positions  </DivA>
    <DivB> likes, comments, videos, links </DivB>
  */

  return (
    <>
    { (loadingFocusingComp || !readyFocusingComp) ? <DivFocus> <Loading /> </DivFocus>
      :<DivFocus>
        
        <DivA> 
        
          <Tools />
          
          <DivBody>
            <Header />
            <ListMap />
            <ListPosition />
          </DivBody>  
          
        </DivA>
        
        <DivB>  
        
          <Likes />
          
          { (loadingFocusingCompBonus || !readyFocusingCompBonus) ? <DivFocus> loading </DivFocus>
            : <>
              <Comments />
              <Videos />
            </>
          }
          
        </DivB>
  
      </DivFocus>
    }
    </>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language

    , listComp: state.comp_gallery.gallery.listComp
    , readyListComp: state.basic.ready.listComp
    , loadingListComp: state.basic.loading.listComp
    
    , focusingComp: state.comp_gallery.focus.comp
    , readyFocusingComp: state.basic.ready.focusingComp
    , loadingFocusingComp: state.basic.loading.focusingComp
    
    
    , readyFocusingCompBonus: state.basic.ready.focusingCompBonus
    , loadingFocusingCompBonus: state.basic.loading.focusingCompBonus
    
  };
}

function mapDispatchToProps(dispatch) {
  return {

    replaceDataCompGallery: (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    , replaceData2CompGallery: (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))

    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    , addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Focus);