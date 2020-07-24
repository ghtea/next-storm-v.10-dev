import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import * as config from '../../../config';


import addRemoveNotification from "../../../redux/thunks/addRemoveNotification";
//import {replaceWorking} from "../../../redux/store";

//import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, Img} from '../../../styles/DefaultStyles';



import useInput from '../../../tools/hooks/useInput';
import {getTimeStamp} from '../../../tools/vanilla/time';

import IconPlus from '../../../svgs/basic/IconPlus'
import * as imgHero from '../../../images/heroes'





const DivEachMap = styled(Div)`

  margin: 2px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  &:nth-child(n+2) img {
    opacity: 0.66;
  }
  
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  } 
  
  
`

const ContainerImgEachMap = styled(Div)`

  cursor: pointer;
  
  position: relative;
  
  
  &[data-is-focused='true'] {
    border: 3px solid ${props => (props.theme.COLOR_delete) };
    border-radius: 6px 6px 0 0;
  }
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    width: 50px;
    height: 50px;
  } 
  
  
`
const ImgEachMap = styled(Img)`
  border-radius: 50%;
  
  position: absolute;
  z-index:2;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    object-fit: cover;
    width: 50px;
    height: 50px;
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    object-fit: cover;
    width: 50px;
    height: 50px;
  } 
`
const ButtonDelete = styled(Button)`
  color: ${props => (props.theme.color_delete) };
  background-color: ${props => (props.theme.COLOR_delete) };
  
  width: 50px;
  height: 20px;
  
  border-radius: 0 0 6px 6px;
  
  &:focus {outline:none;}
`
/*
const BackgroundEachHero = styled(Div)`
  background-color: ${props => (props.theme.COLOR_bg) };
  border-radius: 50px;
  position: absolute;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    width: 50px;
    height: 50px;
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    width: 50px;
    height: 50px;
  } 
  
`
*/

const DivPlus = styled(Div)`
  margin: 2px;
  
  width: 50px;
  height: 50px;
  
  &[data-is-focused='true'] > div {
    background-color: ${props => (props.theme.COLOR_save) };
  }
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  } 
`

const DivIconPlus = styled(Div)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  
  background-color: ${props => (props.theme.color_very_weak) };
`



const Map = ({
  idMap, indexMap
  
  ,returnIsFocused
  
  ,idMapChosen
  , indexPosition, listPosition, setListPositionForChild, dictHeroBasic
  , setWhichAddingForChild, locationAddingHero, setLocationAddingHeroForChild
  
}) => {
        
  
  //const [trigger, setTrigger] = useState("");
  
  const onClick_Map = (event, indexMap) => {
    setLocationAddingMapForChild(indexMap);
    setWhichAddingForChild("Map");
    
  }
  
  
  
  const onClick_ButtonDelete = (event, idMap) => {
    let listPositionTemp = listPosition;
    listPositionTemp[indexPosition]["listIdHero"] = listPositionTemp[indexPosition]["listIdHero"].filter(tIdHero => tIdHero !== idHero);
    
    setListPositionForChild(listPositionTemp);
  }
  
  
  
  
  const tHeroBasic = dictHeroBasic.find(element => element._id === idHero)
  
  const key_HeroesTalents = tHeroBasic['key_HeroesTalents']
  const isFocused = returnIsFocused(indexPosition, indexHero);
  
  
  return (
    <DivEachMap
      key={`${indexPosition}-${indexHero}-${idHero}`}
    >
      <ContainerImgEachMap 
        
        onClick = {(event) => onClick_Hero(event, indexPosition, indexHero)}
        data-is-focused = {isFocused}
      > 
      
        <ImgEachHero 
          src={imgHero[key_HeroesTalents]}
          />
        
      </ContainerImgEachMap>
      { (isFocused==='true')? 
        <ButtonDelete
          onClick={(event)=>onClick_ButtonDelete(event, indexPosition, idHero)}
        > 
          delete 
        </ButtonDelete> 
        : <> </> 
        }
    </DivEachMap >
  )
}



//
const DivMapReady = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`



// image rerendering problem
//https://stackoverflow.com/questions/47922687/force-react-to-reload-an-image-file
// https://www.npmjs.com/package/react-image
const MapReady = ({
  idMapChosen
  , listMap
  , setWhichAddingForChild, locationAddingHero, setLocationAddingHeroForChild
}) => {
  
  
  
  const [trigger, setTrigger] = useState("");
  
  const listIsFocusedHeroDefault = new Array(5);
  const [listIsFocusedHero, setListIsFocusedHero] = useState(listIsFocusedHeroDefault);
  const [doesHaveFocusedHero, setDoesHaveFocusedHero] = useState(false);
  
  useEffect(()=>{
    console.log(listIsFocusedHero)
    if (listIsFocusedHero.includes(true)){
      setDoesHaveFocusedHero(true);
      
    }
    else {
      setDoesHaveFocusedHero(false);
    }
  },[listIsFocusedHero])
  
  
  useEffect(()=>{
    if (locationAddingHero[0] ===  indexPosition && locationAddingHero[1] < listPosition[indexPosition].length) {
      setDoesHaveFocusedHero(true);
    }
    else {
      setDoesHaveFocusedHero(false);
    }
  }, [ locationAddingHero[0], locationAddingHero[1] ])
  
  const onClick_Plus = (event, indexPosition, indexHero) => {
    setLocationAddingHeroForChild([indexPosition, indexHero]);
    setWhichAddingForChild("Hero");
  }
  
  const returnIsFocused = (indexPosition, indexItem) => {
    if (indexPosition === locationAddingHero[0] && indexItem === locationAddingHero[1]) {

      return 'true';
    }
    else {
      
      return 'false';
    }
  }
  
  
  return (
  
    <DivMapReady>
      {listPosition[indexPosition]["listIdHero"].map((idHero, indexHero) => 
        (
        <Map 
          key={idMap}
          idMap={idMap}
          indexMap={indexMap}
          
          returnIsFocused={returnIsFocused}
          
          idMapChosen={idMapChosen}
          
          listMap={listMap}
          setWhichAddingForChild={setWhichAddingForChild}
          
          locationAddingMap={locationAddingMap}
          setLocationAddingMapForChild={setLocationAddingMapForChild}
        />
        )
      )}
      
      
      <DivPlus
        onClick = {(event) => onClick_Plus(event, indexPosition, listPosition[indexPosition].length)}
        data-is-focused = {returnIsFocused(indexPosition, listPosition[indexPosition].length)}
      > 
        <DivIconPlus>
          <IconPlus width={"30px"} height={"30px"} color={"COLOR_bg"} /> 
        </DivIconPlus>
        
      </DivPlus>
      
      
      
    </DivMapReady>
  )
}





  


function mapStateToProps(state) { 
  return { 
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    //readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
    //,addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
    //,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(MapReady);