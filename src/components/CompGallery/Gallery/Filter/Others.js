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

import * as config from '../../../../config';


import addDeleteNotification from "../../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../../others/dictCode'

import { replaceDataCompGallery, replaceData2CompGallery, replaceListPosition }
from "../../../../redux/actions/comp_gallery";


import {
  Div, Input, Button, Img, Textarea
}
from '../../../../styles/DefaultStyles';

import ListMap from '../Comp/ListMap';
import Position from '../Comp/Position';
//import MapsReady from './Create/MapsReady';
//import TagsReady from './Create/TagsReady';

import useInput from '../../../../tools/hooks/useInput';
import {
  getTimeStamp
}
from '../../../../tools/vanilla/time';

import * as imgHero from '../../../../images/heroes'
import * as imgMap from '../../../../images/maps'


import IconExpand from '../../../../svgs/basic/IconExpand'

import IconFun from '../../../../svgs/tags/IconFun'
import IconSerious from '../../../../svgs/tags/IconSerious'

import IconKill from '../../../../svgs/tags/IconKill'
import IconPush from '../../../../svgs/tags/IconPush'

import IconCombo from '../../../../svgs/tags/IconCombo'
import IconTheme from '../../../../svgs/tags/IconTheme'




const DivOthers = styled(Div)
`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`
// 870



const DivFilterEach = styled(Div)`
	
	margin-top: 10px;
	
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
	  
	  display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
	}
	
`

const GroupButtonSize = styled(Div)`
  width: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  
  background-color: ${props => (props.selected)? props.theme.COLOR_normal : props.theme.COLOR_middle};
  color:  ${props => (props.selected)? props.theme.color_active : props.theme.color_weak};
  border: 1px solid ${props => (props.selected)? props.theme.color_active : props.theme.color_weak};
`



const DivTagPair = styled(Div)`
  width: auto;
  
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
  
  background-color: ${props => (props.selected)? props.theme.COLOR_normal : props.theme.COLOR_middle};
  border: 1px solid ${props => (props.selected)? props.theme.color_active : props.theme.color_weak};
`




const Others = ({
    language
    
    
    , listAllTag
    
    , filterSize
    , filterTag
    
    , replaceData2CompGallery
    
    , addDeleteNotification

  }) => {
    

  const returnIconTag = (tag, selected) => {
    switch (tag) {
      case "ToWin":
        return ( < IconSerious width = { "20px" } height = { "20px" } color = { selected? "color_active": "color_weak" } />)
      case "ForFun":
        return ( < IconFun width = { "20px" } height = { "20px" }  color = {selected? "color_active": "color_weak" } />)
        
      case "Kill":
        return ( < IconKill width = { "20px" } height = { "20px" } color = {selected? "color_active": "color_weak" } />)
      case "Push":
        return ( < IconPush width = {  "19px" } height = {  "19px" } color = {selected? "color_active": "color_weak" } />)
        
      case "Combo":
        return ( < IconCombo width = { "20px" } height = { "20px" } color = {selected? "color_active": "color_weak" } />)
      case "Theme":
        return ( < IconTheme width = {  "19px" } height = {  "19px" } color = { selected? "color_active": "color_weak" } />)

      }
  }
      
  
  const onClick_Size = (event, filterSize) => {
    replaceData2CompGallery("gallery", "filterSize", filterSize)
  }
  
  const onClick_Tag = (event, tag) => {
    
    let filterTagTemp = filterTag;
    
    if (tag === "ToWin"){
      filterTagTemp = filterTagTemp.filter(element => element !== "ToWin");
      filterTagTemp = filterTagTemp.filter(element => element !== "ForFun");
      filterTagTemp.push("ToWin");
    }
    else if (tag === "ForFun"){
      filterTagTemp = filterTagTemp.filter(element => element !== "ToWin");
      filterTagTemp = filterTagTemp.filter(element => element !== "ForFun");
      filterTagTemp.push("ForFun");
    }
    
    else if (tag === "Kill"){
      filterTagTemp = filterTagTemp.filter(element => element !== "Kill");
      filterTagTemp = filterTagTemp.filter(element => element !== "Push");
      filterTagTemp.push("Kill");
    }
    else if (tag === "Push"){
      filterTagTemp = filterTagTemp.filter(element => element !== "Kill");
      filterTagTemp = filterTagTemp.filter(element => element !== "Push");
      filterTagTemp.push("Push");
    }
    
    else {
      if(filterTag.includes(tag)){
        filterTagTemp = filterTagTemp.filter(element => element !== tag)
      }
      else {
        filterTagTemp.push(tag)
      }
    }
    
    replaceData2CompGallery("gallery", "filterTag", filterTagTemp)
  }
  
    

    return (
      <DivOthers>
      
        <DivFilterEach>
        
          <GroupButtonSize>
          
           <ButtonSize
            onClick={(event)=> onClick_Size(event, [2,3,5])}
            selected = {filterSize.includes(2) && filterSize.includes(3)  && filterSize.includes(5) }
          > {(() => {
              switch (language) {
                case 'ko': 
                  return '전체';
                case 'ja': 
                  return '全部';
                default: // eng
                  return 'all';
              }
            })()}   </ButtonSize>
          
          </GroupButtonSize>
            
            
        <GroupButtonSize>
          <ButtonSize
            onClick={(event)=> onClick_Size(event, [2])}
            selected = {filterSize.includes(2) && !filterSize.includes(3)  && !filterSize.includes(5) }
          > {(() => {
              switch (language) {
                case 'ko': 
                  return '2인';
                case 'ja': 
                  return '2人';
                default: // eng
                  return '2 players';
              }
            })()}   </ButtonSize>
          
          
          <ButtonSize
            onClick={(event)=> onClick_Size(event, [2,3])}
            selected = {filterSize.includes(2) && filterSize.includes(3)  && !filterSize.includes(5) }
          > {(() => {
              switch (language) {
                case 'ko': 
                  return '2~3인';
                case 'ja': 
                  return '2~3人';
                default: // eng
                  return '2~3';
              }
            })()}   </ButtonSize>
            
        </GroupButtonSize>
        
        
        <GroupButtonSize>  
          <ButtonSize
            onClick={(event)=> onClick_Size(event, [3])}
            selected = {!filterSize.includes(2) && filterSize.includes(3)  && !filterSize.includes(5) }
          > {(() => {
              switch (language) {
                case 'ko': 
                  return '3인';
                case 'ja': 
                  return '3人';
                default: // eng
                  return '3 players';
              }
            })()}    </ButtonSize>
          
          <ButtonSize
            onClick={(event)=> onClick_Size(event, [3,5])}
            selected = {!filterSize.includes(2) && filterSize.includes(3)  && filterSize.includes(5) }
          > {(() => {
              switch (language) {
                case 'ko': 
                  return '3~5인';
                case 'ja': 
                  return '3~5人';
                default: // eng
                  return '3~5';
              }
            })()}   </ButtonSize>
        
        </GroupButtonSize>
        
        
        <GroupButtonSize>  
          <ButtonSize
            onClick={(event)=> onClick_Size(event, [5])}
            selected = {!filterSize.includes(2) && !filterSize.includes(3)  && filterSize.includes(5) }
          > {(() => {
              switch (language) {
                case 'ko': 
                  return '5인 팀';
                case 'ja': 
                  return '5人チーム';
                default: // eng
                  return 'full team';
              }
            })()}    </ButtonSize>
          </GroupButtonSize>
        
        </DivFilterEach>
        
        
        
        <DivFilterEach>
        
          <DivTagPair>
            <ButtonTag
              onClick={(event)=> onClick_Tag(event, "ToWin")}
              selected = {filterTag.includes("ToWin")}
              >
              {returnIconTag("ToWin", filterTag.includes("ToWin"))} </ButtonTag>
            
            <ButtonTag
              onClick={(event)=> onClick_Tag(event, "ForFun")}
              selected = {filterTag.includes("ForFun")}
              >
              {returnIconTag("ForFun", filterTag.includes("ForFun"))} </ButtonTag>
          </DivTagPair>
          
          <DivTagPair>
            <ButtonTag
              onClick={(event)=> onClick_Tag(event, "Kill")}
              selected = {filterTag.includes("Kill")}
              >
              {returnIconTag("Kill", filterTag.includes("Kill"))} </ButtonTag>
            
            <ButtonTag
              onClick={(event)=> onClick_Tag(event, "Push")}
              selected = {filterTag.includes("Push")}
              >
              {returnIconTag("Push", filterTag.includes("Push"))} </ButtonTag>
          </DivTagPair>
          
          <DivTagPair>
            <ButtonTag
              onClick={(event)=> onClick_Tag(event, "Combo")}
              selected = {filterTag.includes("Combo")}
              >
              {returnIconTag("Combo", filterTag.includes("Combo"))} </ButtonTag>
            
            <ButtonTag
              onClick={(event)=> onClick_Tag(event, "Theme")}
              selected = {filterTag.includes("Theme")}
              >
              {returnIconTag("Theme", filterTag.includes("Theme"))} </ButtonTag>
          </DivTagPair>
       
        </DivFilterEach>
        

      
      </DivOthers>
    )

}




  function mapStateToProps(state) {
    return {
      
      language: state.basic.language
      
      , dictAllHeroBasic: state.hots.dictAllHeroBasic
      
      ,listAllTag: state.comp_gallery.gallery.listAllTag
      
      , filterSize: state.comp_gallery.gallery.filterSize
      , filterTag: state.comp_gallery.gallery.filterTag
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
default connect(mapStateToProps, mapDispatchToProps)(Others);