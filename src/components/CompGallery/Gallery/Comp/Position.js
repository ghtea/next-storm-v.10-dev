import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import * as config from '../../../../config';


import addRemoveNotification from "../../../../redux/thunks/addRemoveNotification";


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
  ,dictAllHeroBasic
}) => {
  
  const tHeroBasic = dictAllHeroBasic.find(element => element._id === tIdHero)
  
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
  width: 48px;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`


 const Position = ({
   dictAllHeroBasic
   
   , tPosition
   
   , addRemoveNotification
   
 }) => {
  
 
  
  return (
  
    <DivPosition>
    
     {tPosition["listIdHero"].map((tIdHero)=>{
        return (
          <Hero
            key={tIdHero}
            tIdHero={tIdHero}
            dictAllHeroBasic={dictAllHeroBasic}
          />
        ) 
      })
     }
    
    </DivPosition>
        
  )

}

  
  


function mapStateToProps(state) { 
  return { 
  dictAllHeroBasic: state.hots.dictAllHeroBasic
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
  }; 
}


export default connect(mapStateToProps, mapDispatchToProps)(Position);

