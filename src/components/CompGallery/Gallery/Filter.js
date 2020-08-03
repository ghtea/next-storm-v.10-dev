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

import IconFast from '../../../svgs/tags/IconFast'
import IconSlow from '../../../svgs/tags/IconSlow'




const DivFilter = styled(Div)
`
  /*
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  */
  
  width: 100%; 
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  
`
// 870


const DivFilterEachGroup = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  margin-top: 10px;
  margin-bottom: 10px;
`


const ButtonSize = styled(Button)`
  width: auto;
  
  height: 30px;
  
  margin-top: 1px;
  margin-bottom: 1px;
  margin-right: 2px;
  margin-left: 2px;
  
  background-color: ${props => (props.active)? props.theme.COLOR_normal : 'transparent'};
  color:  ${props => (props.active)? props.theme.color_active : props.theme.color_weak};
  border: 1px solid ${props => (props.active)? props.theme.color_active : props.theme.color_weak};
`



const DivTagPair = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonTag = styled(Button)`
  width: 40px;
  height: 30px;
  
  margin-top: 1px;
  margin-bottom: 1px;
  margin-right: 2px;
  margin-left: 2px;
  
  background-color: ${props => (props.active)? props.theme.COLOR_normal : 'transparent'};
  border: 1px solid ${props => (props.active)? props.theme.color_active : props.theme.color_weak};
`


const ButtonMap = styled(Button)`
  
  font-size: 0.8rem;
  
  width: 130px;
  height: 30px;
  
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 5px;
  padding-right: 5px;
  
  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: 2px;
  margin-left: 2px;
  
  background-color: ${props => (props.active)? props.theme.COLOR_normal : 'transparent'};
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
  
    dictAllHeroBasic
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
            
          case "Early":
            return ( < IconFast width = { "23px" } height = { "23px" } color = { "color_weak"  } />)
          case "Late":
            return ( < IconSlow width = { "20px" } height = { "20px" } color = { "color_weak" } />)

          }
      }
    
    

    return (
      <DivFilter>
      
       
        
        <DivFilterEachGroup> 
          <ButtonSize> Duo </ButtonSize>
          <ButtonSize> Trio  </ButtonSize>
          <ButtonSize> Full Team  </ButtonSize>
        </DivFilterEachGroup>
        
        
        <DivFilterEachGroup> 
          
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
          
          <DivTagPair>
            <ButtonTag> {returnIconTag("Early")} </ButtonTag>
            <ButtonTag> {returnIconTag("Late")} </ButtonTag>
          </DivTagPair>
          
        </DivFilterEachGroup>
        
        
        <DivFilterEachGroup>
          {(readyListMapStandardRanked)? listMapStandardRanked.map(element=>(
              <ButtonMap key={element.name} > <Div>{element.name}</Div> </ButtonMap>
            ))
            :
            <Div> loading...  </Div>
          }
        </DivFilterEachGroup>
      
      
      </DivFilter>
    )

}


/*

< DivListComment > {
          tComp["listComment"].map((comment, index) => {
            const tComment = comment;
  
            return (
  
              < Div 
                key = { index }
                tComment = { tComment }
              />
            )
          })
        } < /DivListComment>

*/


  function mapStateToProps(state) {
    return {
      
      
      dictAllHeroBasic: state.hots.dictAllHeroBasic
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