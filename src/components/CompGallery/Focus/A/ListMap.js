import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import * as config from '../../../../config';

import addDeleteNotification from "../../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../../others/dictCode'

import { replaceData2 } from "../../../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../../../redux/actions/comp_gallery";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../../../styles/DefaultStyles';

import IconWorking from '../../../../svgs/basic/IconWorking'

import * as imgMap from '../../../../images/maps'





const DivMap = styled(Div)`
  font-size: 0.9rem;
  
  width: auto;
  height: 30px;
  margin-left: 2px;
  margin-right: 2px;
  
  display: flex;
  flex-direction: row;
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
  overflow: auto;
  
  width: 100%;
  height: 60px;
  
  background-color: ${props => props.theme.COLOR_middle};
  
  border-radius: 10px 10px 0 0;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`





 const listMap = ({
   
   language
  
   ,listAllMap
   
   ,focusingComp
   
   , addDeleteNotification
   
 }) => {
  
 
  
  return (
  
    <DivListMap>
    
     {focusingComp.listIdMap.map((tIdMap)=>{
     
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
    
    , focusingComp: state.comp_gallery.focus.comp
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}


export default connect(mapStateToProps, mapDispatchToProps)(listMap);

