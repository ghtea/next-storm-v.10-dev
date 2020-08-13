import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import * as config from '../../../../config';


import addDeleteNotification from "../../../../redux/thunks/addDeleteNotification";
import {replaceWorking} from "../../../../redux/actions/basic";
import {replaceDataCompGallery, replaceData2CompGallery} from "../../../../redux/actions/comp_gallery";

import {Div, Input, Button, Img} from '../../../../styles/DefaultStyles';


//import useInput from '../../../../tools/hooks/useInput';
import {areEqualSets} from '../../../../tools/vanilla/set';

import IconPlus from '../../../../svgs/basic/IconPlus'
import IconMinusCircle from '../../../../svgs/basic/IconMinusCircle'

import * as imgMap from '../../../../images/maps'



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

const DivEachMap = styled(Div)`
  
  width: auto;
  margin: 3px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  &:nth-child(n+2) img {
    opacity: 0.8;
  }
  
`

const ContainerImgEachMap = styled(Div)`

  cursor: pointer;
  
  position: relative;
  
  width: 54px;
  height: 30px;
  
  &[data-is-focused='true'] > div:first-child{
    border: 3px solid ${props => (props.theme.COLOR_delete) };
    /*border-right: 0;*/
    border-radius: 6px  0 0 6px;
  }
  
  
`

const DivForBorder = styled(Div)`
  width: 54px;
  height: 30px;
  
  position: absolute;
  z-index:2;
`

const ImgEachMap = styled(Img)`
  border-radius: 6px;
  object-fit: cover;
  width: 54px;
  height: 30px;
  
  position: absolute;
  z-index:0;
 
`

const ButtonDelete = styled(Button)`
  color: ${props => (props.theme.color_delete) };
  background-color: ${props => (props.theme.COLOR_delete) };
  
  margin: 0;
  width: 30px;
  height: 30px;
  
  border-radius: 0 6px 6px 0;
  
  &:focus {outline:none;}
`

const DivPlus = styled(Div)`
  margin: 3px;
  
  width: 54px;
  height: 30px;
  
  &[data-is-focused='true'] > div {
    background-color: ${props => (props.theme.COLOR_save) };
  }
  
`

const DivIconPlus = styled(Div)`
  width: 43px;
  height: 24px;
  border-radius: 6px;
  
  background-color: ${props => (props.theme.color_very_weak) };
`





const Map = ({
 idMap, indexMap
  , returnIsFocused
  
  , listAllMap
  
  , listIdMap
  
   , whichAdding
   
  
   , locationAddingMap
   
  
   , replaceDataCompGallery
   , replaceData2CompGallery
   
   , addDeleteNotification
}) => {
        
  
  //const [trigger, setTrigger] = useState("");
  
  const onClick_Map = (event, indexMap) => {
    replaceData2CompGallery("create", "locationAddingMap", [indexMap]);
    replaceData2CompGallery("create", "whichAdding", "Map");
    
  }
  
  
  
  const onClick_ButtonDelete = (event, idMap) => {
    let listIdMapTemp = listIdMap;
    listIdMapTemp = listIdMapTemp.filter(tIdMap => tIdMap !== idMap);
    
    replaceData2CompGallery("create", "listIdMap", listIdMapTemp);
  }
  
  
  
  
  const tMap = listAllMap.find(element => element._id === idMap)
  
  const nameImg = `map${tMap._id}`
  const isFocused = returnIsFocused(indexMap);
  
  
  return (
    <DivEachMap
      key={`${indexMap}-${idMap}`}
    >
      <ContainerImgEachMap 
        
        onClick = {(event) => onClick_Map(event, indexMap)}
        data-is-focused = {isFocused}
      > 
        <DivForBorder> </DivForBorder>
        <ImgEachMap 
          src={imgMap[nameImg]}
          />
        
      </ContainerImgEachMap>
      { (isFocused==='true')? 
        <ButtonDelete
          onClick={(event)=>onClick_ButtonDelete(event, idMap)}
        > 
          <IconMinusCircle width={"20px"} height={"20px"} color={"COLOR_bg"} /> 
        </ButtonDelete> 
        : <> </> 
        }
    </DivEachMap >
  )
}



//
const DivMapsReady = styled(Div)`
  height: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`



// image rerendering problem
//https://stackoverflow.com/questions/47922687/force-react-to-reload-an-image-file
// https://www.npmjs.com/package/react-image
const MapsReady = ({
  
  language
  , indexMap
  
  , listAllMap
  
  , listIdMap
  
   , whichAdding
  
   , locationAddingMap
   
   , triggerMap
   
   
   , replaceDataCompGallery
   , replaceData2CompGallery
   
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
    const numberCurrentMap = listIdMap.length;
    const setIdMap = new Set(listIdMap);
    
    
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
    
  }, [listIdMap])
  
  const onClick_Plus = (event, indexItem) => {
    replaceData2CompGallery("create", "locationAddingMap", [indexItem]);
    replaceData2CompGallery("create", "whichAdding", "Map");
  }
  
  const returnIsFocused = (indexItem) => {
    if (indexItem === locationAddingMap[0] && whichAdding === "Map") {

      return 'true';
    }
    else {
      
      return 'false';
    }
  }
  
  
  return (
  
    <DivMapsReady>
    
      <DivSummaryMap>
        <Div> { summary } </Div>
      </DivSummaryMap>
    
    
      {listIdMap.map((idMap, indexMap) => 
        (
        <Map 
          key={idMap}
          idMap={idMap}
          indexMap={indexMap}
          
          returnIsFocused={returnIsFocused}
          
          triggerMap={triggerMap}
          
          listIdMap={listIdMap}
          
          //locationAddingMap={locationAddingMap}
          
          
          replaceData2CompGallery={replaceData2CompGallery}
          replaceDataCompGallery={replaceDataCompGallery}
          
          addDeleteNotification={addDeleteNotification}
          listAllMap={listAllMap}
          
        />
        )
      )}
      
      {(summary !=='all maps') &&
        <DivPlus
          onClick = {(event) => onClick_Plus(event, listIdMap.length)}
          data-is-focused = {returnIsFocused(listIdMap.length)}
        > 
          <DivIconPlus>
            <IconPlus width={"24px"} height={"24px"} color={"COLOR_bg"} /> 
          </DivIconPlus>
          
        </DivPlus>
      }
      
      
      
    </DivMapsReady>
  )
}





  


function mapStateToProps(state) { 
  return { 
    
    language: state.basic.language
    
    , listAllMap: state.hots.listAllMap
    
    , listIdMap: state.comp_gallery.create.listIdMap
    
    , whichAdding: state.comp_gallery.create.whichAdding
    , locationAddingMap: state.comp_gallery.create.locationAddingMap
    
    , triggerMap: state.comp_gallery.create.triggerMap
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceDataCompGallery : (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    ,replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(MapsReady);