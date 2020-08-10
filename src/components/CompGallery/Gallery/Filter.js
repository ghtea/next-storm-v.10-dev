import dotenv from 'dotenv';
import React, {
  useState, useEffect
}
from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive'

import axios from 'axios';

import {
  connect
}
from "react-redux";

import * as config from '../../../config';


import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../others/dictCode'

import { replaceDataCompGallery, replaceData2CompGallery, replaceListPosition }
from "../../../redux/actions/comp_gallery";


import {
  Div, Input, Button, Img, Textarea
}
from '../../../styles/DefaultStyles';

import ListMap from './Comp/ListMap';
import Position from './Comp/Position';
//import MapsReady from './Create/MapsReady';
//import TagsReady from './Create/TagsReady';

import useInput from '../../../tools/hooks/useInput';
import {
  getTimeStamp
}
from '../../../tools/vanilla/time';

import * as imgHero from '../../../images/heroes'
import * as imgMap from '../../../images/maps'


import IconExpand from '../../../svgs/basic/IconExpand'

import IconFun from '../../../svgs/tags/IconFun'
import IconSerious from '../../../svgs/tags/IconSerious'

import IconKill from '../../../svgs/tags/IconKill'
import IconPush from '../../../svgs/tags/IconPush'

import IconCombo from '../../../svgs/tags/IconCombo'
import IconTheme from '../../../svgs/tags/IconTheme'




const DivFilter = styled(Div)
`
  
  
  overflow-y: auto;
  height: calc(100% - 30px);
  
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  flex-wrap: nowrap;

  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
	  flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    
    height: 100%;
    
    & > div { margin-top: 10px; margin-bottom: 10px; }
    & > div:first-child {margin-top: 20px;}
    & > div:last-child {margin-bottom: 20px;}
	}
`
// 870


const DivFilterEachGroup = styled(Div)`
  witdh: 100%; /* mobile first */

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  @media (min-width:  ${props => (props.theme.media.md) }px) {
	  width: 100%;
	  
	  display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
	}
	
	& > div:nth-child(1) {  /* 'tags' , 'maps' */
    color: ${props =>  props.theme.color_normal };
    font-size: 1.1rem;
    margin-bottom: 5px;
    font-weight: bold;
    width: auto;
  }
`


const DivFilterSize = styled(DivFilterEachGroup)`
  
  
  & > div:nth-child(2) {   /* buttons */
    witdh: auto;
    
    flex-direction: row;
    justify-content: flex-start;
    
    @media (min-width:  ${props => (props.theme.media.md) }px) {
      flex-direction: column;
	  }
  }
`

const DivFilterTag = styled(DivFilterEachGroup)`
  
  & > div:nth-child(2) {   /* buttons */
    witdh: auto;
    
    flex-direction: row;
    justify-content: flex-start;
    
    @media (min-width:  ${props => (props.theme.media.md) }px) {
      flex-direction: column;
	  }
  }
`

const DivFilterMap = styled(DivFilterEachGroup)`
 
  flex-direction: column;
  justify-content: flex-start;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    flex-direction: column;
  }
 
 
  & > div:nth-child(2), div:nth-child(3) {   /* buttons set */
    witdh: 100%;
    
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    
    @media (min-width:  ${props => (props.theme.media.md) }px) {
      flex-direction: column;
	  }
  }
`




const ButtonSize = styled(Button)`
  width: auto;
  
  height: 26px;
  
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 4px;
  padding-right: 4px;
  
  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: 2px;
  margin-left: 2px;
  
  background-color: ${props => (props.active)? props.theme.COLOR_normal : props.theme.COLOR_middle};
  color:  ${props => (props.active)? props.theme.color_active : props.theme.color_weak};
  border: 1px solid ${props => (props.active)? props.theme.color_active : props.theme.color_weak};
`



const DivTagPair = styled(Div)`
  witdh: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonTag = styled(Button)`
  width: 40px;
  height: 30px;
  
  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: 2px;
  margin-left: 2px;
  
  background-color: ${props => (props.active)? props.theme.COLOR_normal : props.theme.COLOR_middle};
  border: 1px solid ${props => (props.active)? props.theme.color_active : props.theme.color_weak};
`


const ButtonMap = styled(Button)`
  
  font-size: 0.8rem;
  
  width: auto;
  max-width: 130px;
  
  height: 28px;
  
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 5px;
  padding-right: 5px;
  
  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: 2px;
  margin-left: 2px;
  
  background-color: ${props => (props.active)? props.theme.COLOR_normal : props.theme.COLOR_middle};
  color:  ${props => (props.active)? props.theme.color_active : props.theme.color_weak};
  border: 1px solid ${props => (props.active)? props.theme.color_active : props.theme.color_weak};
  
  
  & > div {
    display: block;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`


/*
const Tag = styled(Div)
`
  width: 32px;
  height: 32px;
  margin-left: 3px;
  margin-right: 3px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
*/

const DivListRating = styled(Div)
`
  
`
const DivListComment = styled(Div)
`
  
`




const Filter = ({
    language
    
    , dictAllHeroBasic
    , listAllMap
    , listMapStandardRanked
    
    , listAllTag
    
    , readyListAllMap
    , readyListMapStandardRanked
    
    , filterSize
    , filterTag
    , filterMap
    
    , replaceData2CompGallery
    
    , addDeleteNotification

  }) => {
    
    const isBigMidScreen = useMediaQuery({ query: `(min-device-width: ${props => (props.theme.media.mid_big) }px)` });
    
    //const [listMapStandardRanked, setListMapStandardRanked] = useState([]);
    
    useEffect(()=>{
      if(readyListMapStandardRanked === true) {
        replaceData2CompGallery("gallery", "filterMap", readyListMapStandardRanked );
      }
    },[readyListMapStandardRanked])



    const returnIconTag = (tag) => {
        switch (tag) {
          case "ToWin":
            return ( < IconSerious width = { "20px" } height = { "20px" } color = {  "color_weak" } />)
          case "ForFun":
            return ( < IconFun width = { "20px" } height = { "20px" }  color = { "color_weak" } />)
            
          case "Kill":
            return ( < IconKill width = { "20px" } height = { "20px" } color = { "color_weak" } />)
          case "Push":
            return ( < IconPush width = {  "19px" } height = {  "19px" } color = {  "color_weak" } />)
            
          case "Combo":
            return ( < IconCombo width = { "20px" } height = { "20px" } color = { "color_weak" } />)
          case "Theme":
            return ( < IconTheme width = {  "19px" } height = {  "19px" } color = {  "color_weak" } />)
    

          }
      }
    
    

    return (
      <DivFilter>
      
        <DivFilterSize>
          <Div> Size </Div>
          <Div> 
            <ButtonSize> 2 players </ButtonSize>
            <ButtonSize> 3 players  </ButtonSize>
            <ButtonSize> Full Team  </ButtonSize>
          </Div>
        </DivFilterSize>
        
        
        
        <DivFilterTag>
        
          <Div> Tags </Div>
          
        <Div> 
          <DivTagPair>
            <ButtonTag> {returnIconTag("ToWin")} </ButtonTag>
            <ButtonTag> {returnIconTag("ForFun")} </ButtonTag>
          </DivTagPair>
          
          <DivTagPair>
            <ButtonTag> {returnIconTag("Kill")} </ButtonTag>
            <ButtonTag> {returnIconTag("Push")} </ButtonTag>
          </DivTagPair>
          
          <DivTagPair>
            <ButtonTag> {returnIconTag("Combo")} </ButtonTag>
            <ButtonTag> {returnIconTag("Theme")} </ButtonTag>
          </DivTagPair>
        </Div>
        
        </DivFilterTag>
        
        
        <DivFilterMap>
          <Div> Map </Div>
          
          <Div>
            <ButtonMap> all </ButtonMap>
            <ButtonMap> 2 lines </ButtonMap>
            <ButtonMap> 3 lines </ButtonMap>
          </Div>
          
          <Div>
            {(readyListMapStandardRanked)? listMapStandardRanked.map(element=>(
                <ButtonMap key={element.name[language].short} > <Div>{element.name[language].full}</Div> </ButtonMap>
              ))
              :
              <Div> loading...  </Div>
            }
          </Div>
          
        </DivFilterMap>
      
      
      </DivFilter>
    )

}




  function mapStateToProps(state) {
    return {
      
      language: state.basic.language
      
      , dictAllHeroBasic: state.hots.dictAllHeroBasic
      ,listAllMap: state.hots.listAllMap
      , listMapStandardRanked:  state.hots.listMapStandardRanked
      
      ,listAllTag: state.comp_gallery.gallery.listAllTag
      
      ,readyListAllMap: state.basic.ready.listAllMap
      , readyListMapStandardRanked: state.basic.ready.listMapStandardRanked
      
    
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
    
    replaceDataCompGallery : (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    ,replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    ,addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    };
  }


  export
default connect(mapStateToProps, mapDispatchToProps)(Filter);