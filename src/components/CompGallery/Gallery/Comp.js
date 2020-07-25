import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import * as config from '../../../config';


import addRemoveNotification from "../../redux/thunks/addRemoveNotification";

import {replaceDataCompGallery, replaceData2CompGallery, replaceListPosition} from "../../redux/actions/comp_gallery";


import {Div, Input, Button, Img, Textarea} from '../../../styles/DefaultStyles';

//import PositionReady from './Create/PositionReady';
//import MapsReady from './Create/MapsReady';
//import TagsReady from './Create/TagsReady';

import useInput from '../../../tools/hooks/useInput';
import {getTimeStamp} from '../../../tools/vanilla/time';

import IconPlus from '../../../svgs/basic/IconPlus'
import * as imgHero from '../../../images/heroes'




const DivCreatingComp = styled(Div)`
  width: 100%;
  height:100%;
  
  margin-top: 5px;
  margin-bottom: 20px;
  margin-left: 5px;
  margin-right: 5px;
  
  display: grid;
  grid-template-columns: 70px 300px;
  grid-template-rows: 90px 300px 70px 270px;
  grid-template-areas: 
    "One One"
    "Two Three"
    "Four Four"
    "Five Five"
  ;
  align-items: start;
  
  
  & > div:first-child {border-radius: 10px 10px 0 0;}
  & > div:last-child {border-radius: 0 0 10px 10px;}
  
  
`


// title, author
const DivOne = styled(Div)`
  grid-area: One;
  
  height: 100%;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  }
`

// 정렬 방식 고민중 https://css-tricks.com/vertically-center-multi-lined-text/

// map, difficulty
const DivTwo = styled(Div)`
  grid-area: Two;
  height: 100%;
  
  background-color: ${props => props.theme.COLOR_middle};
  border-left: 6px solid  ${props => props.theme.COLOR_normal};
  
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  & > div {
    
  }
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
  
   
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
   
  
    
  }
`

// list of positions (heroes)
const DivThree = styled(Div)`
  grid-area: Three;
  height: 100%;
 
  overflow-x: auto;
  
  background-color: ${props => props.theme.COLOR_bg};
  
  border-right: 6px solid  ${props => props.theme.COLOR_normal};
  
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  }
`

// actions 'create'
const DivFour = styled(Div)`
  grid-area: Four;
  height: 100%;
  
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  }
`

// comments
const DivFive = styled(Div)`
  grid-area: Five;
  height: 100%;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  }
`







 const Comp = ({
   dictHeroBasic
   ,listAllMap
   
   ,listMap
    , listPosition
    ,listTag
  
   , whichAdding
   , locationAddingMap
   , locationAddingHero
   
   
   
   , replaceDataCompGallery
   , replaceData2CompGallery
   , replaceListPosition
   
   , addRemoveNotification
   
 }) => {
  
 
  
  return (
  
    <DivComp>
    
      <DivOne> 
      
        <Div>  <InputCommon  {...inputTitle} placeholder="title of composition" />  </Div>
        <Div> 
          <InputCommon type="password" {...inputPassword1} placeholder="password" /> 
          <InputCommon type="password" {...inputPassword2} placeholder="password again" /> 
        </Div>
        
      </DivOne>
    
      <DivTwo> 
        <MapsReady />
      </DivTwo>
    
      <DivThree>
        {[0,1,2,3,4].map((element, index) => {
          return (
          
            <PositionReady 
              
              key={index}  
              indexPosition={element} 
              
              />
          ) 
        })}
      </DivThree>
      
      <DivFour> 
        < TagsReady />
      </DivFour>
      
      <DivFive>
        <Div> <TextareaContentComment {...inputContentComment} placeholder="comment" /> </Div>
        <Div> <InputLink  {...inputLinkComment} placeholder="link (ex: twitch/youtube, replay match page)" /> </Div>
      </DivFive>
    
    </DivComp>
        
  )

}

/*
<MapReady 
              
              idMapChosen={idMapChosen}
              
              listMap={listMap} 
              setListMapForChild={setListMapForChild} 
              
              listAllMap={listAllMap} 
              
              setWhichAddingForChild={setWhichAddingForChild}
              locationAddingMap={locationAddingMap}
              setLocationAddingMapForChild={setLocationAddingMapForChild}
            
            /> 
*/
  
  


function mapStateToProps(state) { 
  return { 
    listMap: state.comp_gallery.create.listMap
    , listPosition: state.comp_gallery.create.listPosition
    , listTag: state.comp_gallery.create.listTag
    
    , whichAdding: state.comp_gallery.create.whichAdding
    , locationAddingMap: state.comp_gallery.create.locationAddingMap
    , locationAddingHero: state.comp_gallery.create.locationAddingHero
    
    //, idMapChosen: state.comp_gallery.create.idMapChosen
    //, idHeroChosen: state.comp_gallery.create.idHeroChosen
    
    //, triggerPosition: state.comp_gallery.create.triggerPosition
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    replaceDataCompGallery : (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    ,replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    ,replaceListPosition : (replacement) => dispatch(replaceListPosition(replacement))
    
    
    ,addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
  }; 
}


export default connect(mapStateToProps, mapDispatchToProps)(Comp);

