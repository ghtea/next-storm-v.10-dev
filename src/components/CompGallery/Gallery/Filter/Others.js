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
  
  background-color: ${props => (props.active)? props.theme.COLOR_normal : props.theme.COLOR_middle};
  border: 1px solid ${props => (props.active)? props.theme.color_active : props.theme.color_weak};
`




const Others = ({
    language
    
    , dictAllHeroBasic
    , listAllMap
    , listMapStandardRanked
    
    , listAllTag
    
    , readyListAllMap
    , readyListMapStandardRanked
    
    , filterSize
    , filterTag
    
    , replaceData2CompGallery
    
    , addDeleteNotification

  }) => {
    

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
      <DivOthers>
      
        <DivFilterEach>
 
          <ButtonSize> 2 players </ButtonSize>
          <ButtonSize> 3 players  </ButtonSize>
          <ButtonSize> Full Team  </ButtonSize>
 
        </DivFilterEach>
        
        
        
        <DivFilterEach>
        
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
       
        </DivFilterEach>
        

      
      </DivOthers>
    )

}




  function mapStateToProps(state) {
    return {
      
      language: state.basic.language
      
      , dictAllHeroBasic: state.hots.dictAllHeroBasic
      
      ,listAllTag: state.comp_gallery.gallery.listAllTag
      
    
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