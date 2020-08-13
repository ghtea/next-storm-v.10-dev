import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import * as config from '../../../../../config';


import addDeleteNotification from "../../../../../redux/thunks/addDeleteNotification";
import {replaceWorking} from "../../../../../redux/actions/basic";
import {replaceDataCompGallery, replaceData2CompGallery, replaceListPosition} from "../../../../../redux/actions/comp_gallery";


import {Div, Input, Button, Img} from '../../../../../styles/DefaultStyles';



import useInput from '../../../../../tools/hooks/useInput';
import {getTimeStamp} from '../../../../../tools/vanilla/time';

import IconPlus from '../../../../../svgs/basic/IconPlus'
import * as imgHero from '../../../../../images/heroes'





const DivEachHero = styled(Div)`

  
  margin: 2px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  &:nth-child(n+2) img {
    opacity: 0.66;
  }
  
  
`

const ContainerImgEachHero = styled(Div)`

  cursor: pointer;
  
  position: relative;
  
  width: 50px;
  height: 50px;
  
  &[data-is-focused='true'] {
    border: 3px solid ${props => (props.theme.COLOR_delete) };
    border-radius: 6px 6px 0 0;
  }
  
  
`
const ImgEachHero = styled(Img)`
  border-radius: 50%;
  
  position: absolute;
  z-index:2;
  
  object-fit: cover;
  width: 50px;
  height: 50px;
  
`


const ButtonDelete = styled(Button)`
  color: ${props => (props.theme.color_delete) };
  background-color: ${props => (props.theme.COLOR_delete) };
  
  width: 50px;
  height: 20px;
  margin: 0;
  border-radius: 0 0 6px 6px;
  
  &:focus {outline:none;}
`
/*
const BackgroundEachHero = styled(Div)`
  background-color: ${props => (props.theme.COLOR_bg) };
  border-radius: 50px;
  position: absolute;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    width: 50px;
    height: 50px;
  }
 
  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
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
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
    
  } 
`

const DivIconPlus = styled(Div)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  
  background-color: ${props => (props.theme.color_very_weak) };
`



const Hero = ({
  idHero, indexHero, indexPosition
  , returnIsFocused
  
  , dictAllHeroBasic
  
  
   
  , listPosition
  
   , whichAdding
   
  
   , locationAddingHero
   
  
   , replaceDataCompGallery
   , replaceData2CompGallery
   , replaceListPosition
   
   , addDeleteNotification
}) => {
        
  
  const [triggerPositionReady, setTriggerPositionReady] = useState(0);
  
  
  
  
  const onClick_Hero = (event, indexPosition, indexHero) => {
    replaceData2CompGallery("edit", "locationAddingHero", [indexPosition, indexHero]);
    replaceData2CompGallery("edit", "whichAdding", "Hero");
    
  }
  
  
  
  const onClick_ButtonDelete = (event, indexPosition, idHero) => {
   
    let listPositionTemp = listPosition;
    listPositionTemp[indexPosition]["listIdHero"] = listPositionTemp[indexPosition]["listIdHero"].filter(tIdHero => tIdHero !== idHero);
    
    replaceListPosition(listPositionTemp);
    
    setTriggerPositionReady(triggerPositionReady + 1);
    
    replaceData2CompGallery("edit", "locationAddingHero", [indexPosition, listPosition[indexPosition]['listIdHero'].length]);
    replaceData2CompGallery("edit", "whichAdding", "Hero");
  }
  
  
  
  
  const tHeroBasic = dictAllHeroBasic.find(element => element._id === idHero)
  
  const key_HeroesTalents = tHeroBasic['key_HeroesTalents']
  const isFocused = returnIsFocused(indexPosition, indexHero);
  
  
  return (
    <DivEachHero
      key={`${indexPosition}-${indexHero}-${idHero}`}
    >
      <ContainerImgEachHero 
        
        onClick = {(event) => onClick_Hero(event, indexPosition, indexHero)}
        data-is-focused = {isFocused}
      > 
      
        <ImgEachHero 
          src={imgHero[key_HeroesTalents]}
          />
        
      </ContainerImgEachHero>
      { (isFocused==='true')? 
        <ButtonDelete
          onClick={(event)=>onClick_ButtonDelete(event, indexPosition, idHero)}
        > 
          delete 
        </ButtonDelete> 
        : <> </> 
        }
    </DivEachHero >
  )
}



//
const DivPositionReady = styled(Div)`

  width: 50px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
  margin-left: 3px;
  margin-right: 3px;
`



// image rerendering problem
//https://stackoverflow.com/questions/47922687/force-react-to-reload-an-image-file
// https://www.npmjs.com/package/react-image
const PositionReady = ({
  indexPosition
  
  , dictAllHeroBasic
  
  , listPosition
  
   , whichAdding
  
   , locationAddingHero
   
   , triggerPosition
   
   
   , replaceDataCompGallery
   , replaceData2CompGallery
   , replaceListPosition
   
   , addDeleteNotification
}) => {
  
  
  //const [trigger, setTrigger] = useState("");
  
  /*
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
  */
  
  
  const onClick_Plus = (event, indexPosition, indexItem) => {
    replaceData2CompGallery("edit", "locationAddingHero", [indexPosition, indexItem]);
    replaceData2CompGallery("edit", "whichAdding", "Hero");
  }
  
  const returnIsFocused = (indexPosition, indexItem) => {
    if (indexPosition === locationAddingHero[0] && indexItem === locationAddingHero[1] && whichAdding === "Hero") {

      return 'true';
    }
    else {
      
      return 'false';
    }
  }
  
  return (
  
    <DivPositionReady>
      {listPosition[indexPosition]["listIdHero"].map((idHero, indexHero) => 
        (
        <Hero 
          key={idHero}
          idHero={idHero}
          indexHero={indexHero}
          
          
          indexPosition={indexPosition}
          listPosition={listPosition}
          
          replaceData2CompGallery={replaceData2CompGallery}
          replaceDataCompGallery={replaceDataCompGallery}
          replaceListPosition={replaceListPosition}
          
          addDeleteNotification={addDeleteNotification}
   
          triggerPosition={triggerPosition}
          
          dictAllHeroBasic={dictAllHeroBasic}
          returnIsFocused = {returnIsFocused}
        />
        )
      )}
      
      {(listPosition[indexPosition]["listIdHero"].length < 5)?
        <DivPlus
          onClick = {(event) => onClick_Plus(event, indexPosition, listPosition[indexPosition]["listIdHero"].length)}
          data-is-focused = {returnIsFocused(indexPosition, listPosition[indexPosition]["listIdHero"].length)}
        > 
          <DivIconPlus>
            <IconPlus width={"30px"} height={"30px"} color={"COLOR_bg"} /> 
          </DivIconPlus>
          
        </DivPlus>
      : <Div> </Div>
      }
      
      
      
    </DivPositionReady>
  )
}





  


function mapStateToProps(state) { 
  return { 
    
    dictAllHeroBasic: state.hots.dictAllHeroBasic
    
    , listPosition: state.comp_gallery.edit.listPosition
    
    , whichAdding: state.comp_gallery.edit.whichAdding
    , locationAddingMap: state.comp_gallery.edit.locationAddingMap
    , locationAddingHero: state.comp_gallery.edit.locationAddingHero
    
    , triggerPosition: state.comp_gallery.edit.triggerPosition
    //, idMapChosen: state.comp_gallery.edit.idMapChosen
    // , idHeroChosen: state.comp_gallery.edit.idHeroChosen
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


export default connect(mapStateToProps, mapDispatchToProps)(PositionReady);