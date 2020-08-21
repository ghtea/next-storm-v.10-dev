import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import * as config from '../../../../config';


import addDeleteNotification from "../../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../../others/dictCode'

import {Div, Input, Button, Img, Textarea} from '../../../../styles/DefaultStyles';

//import PositionReady from './Create/PositionReady';
//import MapsReady from './Create/MapsReady';
//import TagsReady from './Create/TagsReady';

import useInput from '../../../../tools/hooks/useInput';
import {getTimeStamp} from '../../../../tools/vanilla/time';


import * as imgHero from '../../../../images/heroes'


const DivHero = styled(Div)`
  width: 48px;
  height: 48px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  font-size: 0.6rem;
`

const ImgHero = styled(Img)`
  border-radius: 50%;
  
  object-fit: cover;
  width: 44px;
  height: 44px;
  
`


const Hero = ({
  tIdHero
  ,listAllHeroBasic
}) => {
  
  const tHeroBasic = listAllHeroBasic.find(element => element._id === tIdHero)
  
  const key_HeroesTalents = tHeroBasic['key_HeroesTalents']
  
  return (
    <DivHero>
      <ImgHero 
        src={imgHero[key_HeroesTalents]}
        />
    </DivHero>
  )
}


const DivPosition = styled(Div)`
  width: 46px;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  & > div:nth-child(2), & > div:nth-child(3) {
    height: 16px;
  }
`

const DivRemaining = styled(Div)`
  background-color: ${props => props.theme.color_very_weak};
  color: ${props => props.theme.COLOR_normal};
  
  width: 80%;
  
  border-radius: 4px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  padding-bottom: 1px;
  
  font-size: 0.9rem;
  font-weight: bold;
`

 const Position = ({
   listAllHeroBasic
   
   , tPosition
   
   , addDeleteNotification
   
   , option
 }) => {
  
  const listIdHero = tPosition["listIdHero"];
  let listIdHeroShowing = [];
  
  switch(option){
    case "small":
      // 특정 position 이나 index 에 영웅이 없는 상황도 고려해야 한다.
      listIdHeroShowing = listIdHero.filter((element, index) => !( [1,2,3,4].includes(index) ) ); 
      break;
  }
  
  const numberRemainingHero = listIdHero.length - listIdHeroShowing.length;
  
  return (
  
    <DivPosition>
    
     {listIdHeroShowing.map((tIdHero)=>{
        return (
          <Hero
            key={tIdHero}
            tIdHero={tIdHero}
            listAllHeroBasic={listAllHeroBasic}
          />
        ) 
      })
     }
     
     {(numberRemainingHero >= 1)? <DivRemaining> {`${numberRemainingHero}+`} </DivRemaining> : <Div> </Div>}
    
    </DivPosition>
        
  )

}

  
  


function mapStateToProps(state) { 
  return { 
  listAllHeroBasic: state.hots.listAllHeroBasic
    , option: state.comp_gallery.gallery.option
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
   addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}


export default connect(mapStateToProps, mapDispatchToProps)(Position);

