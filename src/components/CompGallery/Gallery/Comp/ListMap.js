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


const DivMap = styled(Div)`
  font-size: 0.9rem;
  
  width: 60px;
  height: 36px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  
`

const Map = ({
  listAllMap
  ,tIdMap
  ,tNameMap
}) => {
  
  
  
  return (
    <DivMap>
      {tNameMap.short}
    </DivMap>
  )
}


const DivListMap = styled(Div)`
  width: 60px;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`


 const ListMap = ({
   
   language
   
   ,dictHeroBasic
   ,listAllMap
   
   ,listMap
   
   , addDeleteNotification
   
 }) => {
  
 
  
  return (
  
    <DivListMap>
    
     {listMap.map((tIdMap)=>{
      const tMap = listAllMap.find(element => element._id === tIdMap);
      
      const tNameMap = tMap.name[language]
      
        return (
          <Map
            key={tIdMap}
            tIdMap={tIdMap}
            tNameMap={tNameMap}
            listAllMap={listAllMap}
          />
        ) 
      })
     }
    
    </DivListMap>
        
  )

}

  
  


function mapStateToProps(state) { 
  return { 
    listAllMap: state.hots.listAllMap
    
    , language: state.basic.language
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}


export default connect(mapStateToProps, mapDispatchToProps)(ListMap);

