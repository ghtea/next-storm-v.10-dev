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
import {areEqualSets} from '../../../../tools/vanilla/set';

import { Div, Input, Button, Img } from '../../../../styles/DefaultStyles';


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
  
  &:nth-child(n+2) img {
    opacity: 0.8;
  }
`

const ImgEachMap = styled(Img)`
  border-radius: 6px;
  object-fit: cover;
  width: 54px;
  height: 30px;
  
  z-index:0;
 `


const Map = ({
  listAllMap
  ,tIdMap
  ,tNameMap
}) => {
  
  const nameImg = `map${tIdMap}`;
  
  return (
    <DivMap>
      <ImgEachMap 
          src={imgMap[nameImg]}
          />
    </DivMap>
  )
}


const DivListMap = styled(Div)`
  overflow: auto;
  
  width: 100%;
  height: 50px;
  
  background-color: ${props => props.theme.COLOR_middle};
  
  border-radius: 10px 10px 0 0;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`


const DivSummaryMap = styled(Div)`
  width: 72px;
  height: 30px;
  
  margin: 3px;
  margin-left: 6px;
  
  border: 2px solid ${props => props.theme.color_weak };
  border-radius: 6px;
  
  font-size: 0.9rem;
  line-height: 0.9rem;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`




 const ListMap = ({
   
   language
  
   ,listAllMap
   
   ,focusingComp
   
   , addDeleteNotification
   
 }) => {
  
  const listShowingMap = listAllMap.filter(objMap => objMap.type === "standard" && objMap.playable === true );
  const list2LineMap = listShowingMap.filter(objMap => objMap.lines === 2 );
  const list3LineMap = listShowingMap.filter(objMap => objMap.lines === 3 );
  
  const listIdAllMap = listShowingMap.map(element=> element._id);
  const listId2LineMap = list2LineMap.map(element=> element._id);
  const listId3LineMap = list3LineMap.map(element=> element._id);
  
  const setIdAllMap = new Set(listIdAllMap);
  const setId2LineMap = new Set(listId2LineMap);
  const setId3LineMap = new Set(listId3LineMap);
  
  
  const [summary, setSummary] = useState(``);
  
  
  useEffect(()=>{
    const numberCurrentMap = focusingComp.listIdMap.length;
    const setIdMap = new Set(focusingComp.listIdMap);
    
    if ( areEqualSets(setIdMap, setIdAllMap)  ) { setSummary(`${(() => {
              switch (language) {
                case 'ko': 
                  return '모든 맵';
                case 'ja': 
                  return '全マップ';
                default: // eng
                  return 'all maps';
              }
            })()}`) }
    else if ( areEqualSets(setIdMap, setId2LineMap) ) { setSummary(`${(() => {
              switch (language) {
                case 'ko': 
                  return '2라인';
                case 'ja': 
                  return '2ライン';
                default: // eng
                  return '2 lines';
              }
            })()}`) }
    else if ( areEqualSets(setIdMap, setId3LineMap)  ) { setSummary(`${(() => {
              switch (language) {
                case 'ko': 
                  return '3라인';
                case 'ja': 
                  return '3ライン';
                default: // eng
                  return '3 lines';
              }
            })()}`) }
    else {
        setSummary(`${(() => {
          switch (language) {
            case 'ko': 
              return `${numberCurrentMap}맵`
            case 'ja': 
              return `${numberCurrentMap}マップ`
            default: // eng
              return `${numberCurrentMap} maps`
          }
        })()}`) }
    
  }, [focusingComp.listIdMap])
 
  
  return (
  
    <DivListMap>
      
      <DivSummaryMap>
        <Div> { summary } </Div>
      </DivSummaryMap>
      
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


export default connect(mapStateToProps, mapDispatchToProps)(ListMap);

