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

import {
  replaceDataCompGallery, replaceData2CompGallery, replaceListPosition
}
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
import IconFast from '../../../svgs/tags/IconFast'
import IconSlow from '../../../svgs/tags/IconSlow'
import IconKill from '../../../svgs/tags/IconKill'
import IconPush from '../../../svgs/tags/IconPush'



const DivFilter = styled(Div)
`
  /*
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  */
  
  width: 350px; 
  height: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) { 
    top: 110px;
  }

  @media (min-width:  ${props => (props.theme.media.mid_big) }px) { 
    top: 60px;
  }
`
// 870


const DivFilterItem = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  
  margin-top: 3px;
  margin-bottom: 3px;
  margin-right: 3px;
  margin-left: 3px;
`


const DivFilterSize = styled(DivFilterItem)`
  
`

const DivFilterTag = styled(DivFilterItem)`
  
`

const DivFilterMap = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  flex-wrap: wrap;
`


const ButtonMap = styled(Button)`
  
  font-size: 0.8rem;
  
  width: 70px;
  height: 2.0rem;
  
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  
  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: 2px;
  margin-left: 2px;
  
  border-radius: 0.3rem;
  
  
  & > div {
    display: block;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: clip;
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
    , listAllTag
    
    , readyListAllMap

    , addDeleteNotification

  }) => {

    const isBigMidScreen = useMediaQuery({ query: `(min-device-width: ${props => (props.theme.media.comp_gallery.mid_big) }px)` });
    
    const [listMapStandardRanked, setListMapStandardRanked] = useState([]);
    
    useEffect(()=>{
      if(readyListAllMap === true) {
        let listMapStandardRankedTemp = listAllMap.filter(element => element.type === "standard" && element.rankedRotation === true);
        setListMapStandardRanked(listMapStandardRankedTemp);
      }
    },[readyListAllMap])



    const returnIconTag = (tag) => {
        switch (tag) {
          case "ToWin":
            return ( < IconSerious width = { "24px" } height = { "24px" } color = {  "color_weak" } />)
          case "ForFun":
            return ( < IconFun width = { "24px" } height = { "24px" }  color = { "color_weak" } />)
          case "Kill":
            return ( < IconKill width = { "24px" } height = { "24px" } color = { "color_weak" } />)
          case "Push":
            return ( < IconPush width = {  "23px" } height = {  "23px" } color = {  "color_weak" } />)
          case "Early":
            return ( < IconFast width = { "27px" } height = { "27px" } color = { "color_weak"  } />)
        case "Late":
          return ( < IconSlow width = { "24px" } height = { "24px" } color = { "color_weak" } />)

          }
      }
    
    

    return (
      <DivFilter>
      
       
        
        <DivFilterSize> 
          <Button> Duo </Button>
          <Button> Trio  </Button>
          <Button> Full Team  </Button>
        </DivFilterSize>
        
        
        <DivFilterTag> 
        
          <Div> {returnIconTag("ToWin")} </Div>
          <Div> {returnIconTag("ForFun")} </Div>
          
          <Div> {returnIconTag("Kill")} </Div>
          <Div> {returnIconTag("Push")} </Div>
          
          <Div> {returnIconTag("Early")} </Div>
          <Div> {returnIconTag("Late")} </Div>
          
        </DivFilterTag>
        
        
        <DivFilterMap>
          {(readyListAllMap)? listMapStandardRanked.map(element=>(
              <ButtonMap key={element.name}> <Div>{element.name}</Div> </ButtonMap>
            ))
            :
            <Div> loading...  </Div>
          }
        </DivFilterMap>
      
      
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
      ,listAllTag: state.comp_gallery.listAllTag
      
      ,readyListAllMap: state.basic.ready.listAllMap
      
    
    };
  }

  function mapDispatchToProps(dispatch) {
    return {

     addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    };
  }


  export
default connect(mapStateToProps, mapDispatchToProps)(Filter);