import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import * as config from '../../../config';


import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import {replaceWorking} from "../../../redux/actions/basic";
import {replaceDataCompGallery, replaceData2CompGallery} from "../../../redux/actions/comp_gallery";

import {Div, Input, Button, Img} from '../../../styles/DefaultStyles';


//import useInput from '../../../tools/hooks/useInput';
//import {getTimeStamp} from '../../../tools/vanilla/time';

import IconPlus from '../../../svgs/basic/IconPlus'
import * as imgMap from '../../../images/maps'





const DivEachMap = styled(Div)`
  
  &:first-child {
    margin-top: 6px;
  }
  
  margin: 3px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  &:nth-child(n+2) img {
    opacity: 0.8;
  }
  
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  } 
  
  
`

const ContainerImgEachMap = styled(Div)`

  cursor: pointer;
  
  position: relative;
  
  width: 54px;
  height: 30px;
  
  &[data-is-focused='true'] > div:first-child{
    border: 3px solid ${props => (props.theme.COLOR_delete) };
    border-radius: 6px 6px 0 0;
  }
  
  
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {

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
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
 
  } 
`

const ButtonDelete = styled(Button)`
  color: ${props => (props.theme.color_delete) };
  background-color: ${props => (props.theme.COLOR_delete) };
  
  width: 54px;
  height: 20px;
  
  border-radius: 0 0 6px 6px;
  
  &:focus {outline:none;}
`

const DivPlus = styled(Div)`
  margin: 3px;
  
  width: 54px;
  height: 30px;
  
  &[data-is-focused='true'] > div {
    background-color: ${props => (props.theme.COLOR_save) };
  }
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
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
  
  , listMap
  
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
    let listMapTemp = listMap;
    listMapTemp = listMapTemp.filter(tIdMap => tIdMap !== idMap);
    
    replaceData2CompGallery("create", "listMap", listMapTemp);
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
          onClick={(event)=>onClick_ButtonDelete(event, indexMap)}
        > 
          delete 
        </ButtonDelete> 
        : <> </> 
        }
    </DivEachMap >
  )
}



//
const DivMapsReady = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`



// image rerendering problem
//https://stackoverflow.com/questions/47922687/force-react-to-reload-an-image-file
// https://www.npmjs.com/package/react-image
const MapsReady = ({
  indexMap
  
  , listAllMap
  
  , listMap
  
   , whichAdding
  
   , locationAddingMap
   
   , triggerMap
   
   
   , replaceDataCompGallery
   , replaceData2CompGallery
   
   , addDeleteNotification
}) => {
  
  
  
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
      {listMap.map((idMap, indexMap) => 
        (
        <Map 
          key={idMap}
          idMap={idMap}
          indexMap={indexMap}
          
          returnIsFocused={returnIsFocused}
          
          triggerMap={triggerMap}
          
          //listMap={listMap}
          
          //locationAddingMap={locationAddingMap}
          
          
          replaceData2CompGallery={replaceData2CompGallery}
          replaceDataCompGallery={replaceDataCompGallery}
          
          addDeleteNotification={addDeleteNotification}
          listAllMap={listAllMap}
          
        />
        )
      )}
      
      
      <DivPlus
        onClick = {(event) => onClick_Plus(event, listMap.length)}
        data-is-focused = {returnIsFocused(listMap.length)}
      > 
        <DivIconPlus>
          <IconPlus width={"24px"} height={"24px"} color={"COLOR_normal"} /> 
        </DivIconPlus>
        
      </DivPlus>
      
      
      
    </DivMapsReady>
  )
}





  


function mapStateToProps(state) { 
  return { 
    listAllMap: state.hots.listAllMap
    
    , listMap: state.comp_gallery.create.listMap
    
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