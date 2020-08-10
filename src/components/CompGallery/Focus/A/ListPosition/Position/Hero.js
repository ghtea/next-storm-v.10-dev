import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import * as config from '../../../../../../config';


import addDeleteNotification from "../../../../../../redux/thunks/addDeleteNotification";
import {replaceWorking} from "../../../../../../redux/actions/basic";
import {replaceDataCompGallery, replaceData2CompGallery, replaceListPosition} from "../../../../../../redux/actions/comp_gallery";


import {Div, Input, Button, Img} from '../../../../../../styles/DefaultStyles';



import useInput from '../../../../../../tools/hooks/useInput';
import {getTimeStamp} from '../../../../../../tools/vanilla/time';

import IconPlus from '../../../../../../svgs/basic/IconPlus'
import * as imgHero from '../../../../../../images/heroes'





const DivHero = styled(Div)`

  width: 60px;
  height: 60px;
  
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  
  &:nth-child(n+2) {
    width: 60px;
    height: 55px;
  }
  
  
  
  & img {
    border-radius: 50%;
  
    z-index:2;
    
    object-fit: cover;
    
    width: 50px;
    height: 50px;
    margin: 5px;
  }
  
  
  &:nth-child(n+2) img {
    opacity: 0.8;
    width: 45px;
    height: 45px;
  }
  
`



const Hero = ({
  
  idHero
  , dictAllHeroBasic
  
  , addDeleteNotification
}) => {
        
  
  
  const tHeroBasic = dictAllHeroBasic.find(element => element._id === idHero)
  const key_HeroesTalents = tHeroBasic['key_HeroesTalents']
  
  
  return (
    <DivHero>
      
      <Img
        src={imgHero[key_HeroesTalents]}
      />
        
    </DivHero>
  )
}



function mapStateToProps(state) { 
  return { 
    
    dictAllHeroBasic: state.hots.dictAllHeroBasic
    
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    replaceDataCompGallery : (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    ,replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    ,replaceListPosition : (replacement) => dispatch(replaceListPosition(replacement))
    
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}


export default connect(mapStateToProps, mapDispatchToProps)(Hero);