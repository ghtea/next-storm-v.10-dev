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
}) => {
  
  return (
    <DivMap>
      {tIdMap}
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
   dictHeroBasic
   ,listAllMap
   
   ,listMap
   
   , addDeleteNotification
   
 }) => {
  
 
  
  return (
  
    <DivListMap>
    
     {listMap.map((tIdMap)=>{
        return (
          <Map
            key={tIdMap}
            tIdMap={tIdMap}
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
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}


export default connect(mapStateToProps, mapDispatchToProps)(ListMap);

