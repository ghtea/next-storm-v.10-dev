import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import * as config from '../../../config';


import addRemoveNotification from "../../../redux/thunks/addRemoveNotification";

import {replaceDataCompGallery, replaceData2CompGallery, replaceListPosition} from "../../../redux/actions/comp_gallery";


import {Div, Input, Button, Img, Textarea} from '../../../styles/DefaultStyles';

import ListMap from './Comp/ListMap';
import Position from './Comp/Position';
//import MapsReady from './Create/MapsReady';
//import TagsReady from './Create/TagsReady';

import useInput from '../../../tools/hooks/useInput';
import {getTimeStamp} from '../../../tools/vanilla/time';

import * as imgHero from '../../../images/heroes'
import * as imgMap from '../../../images/maps'

import IconFun from '../../../svgs/tags/IconFun'
import IconSerious from '../../../svgs/tags/IconSerious'
import IconFast from '../../../svgs/tags/IconFast'
import IconSlow from '../../../svgs/tags/IconSlow'
import IconKill from '../../../svgs/tags/IconKill'
import IconPush from '../../../svgs/tags/IconPush'



const DivComp = styled(Div)`
  width: 300px; /* 6 + ddd + ddd + 6  */
  height: auto;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`


// title, author
const DivHeader = styled(Div)`
  width: 100%;
  height: 36px;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

//map, hero (position)
const DivMain = styled(Div)`
  
  height: 70px;
  background-color: ${props => props.theme.COLOR_middle};
  
  border-left: 6px solid  ${props => props.theme.COLOR_normal};
  border-right: 6px solid  ${props => props.theme.COLOR_normal};
  
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
`



const DivListMap = styled(Div)`
  height: 100%;
  
  background-color: ${props => props.theme.COLOR_bg};
  color: ${props => props.theme.color_normal};
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`


const DivListPosition = styled(Div)`
  height: 100%;
  
  background-color: ${props => props.theme.COLOR_bg};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
`


// tag, rating
const DivSecond = styled(Div)`
  
  height: 36px;
  background-color: ${props => props.theme.COLOR_normal};
  
  padding-left: 3px;
  padding-right: 3px;
  
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  & > div {
    width: 50%;
  }
`


const DivListTag = styled(Div)`
  height: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const Tag = styled(Div)`
  width: 32px;
  height: 32px;
  margin-left: 3px;
  margin-right: 3px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const DivListRating = styled(Div)`
  
`
const DivListComment = styled(Div)`
  
`




 const Comp = ({
   dictHeroBasic
   ,listAllMap
  
   , tComp
   
   , addRemoveNotification
   
 }) => {
  
  
  const listMap = tComp.listMap;
  const listPosition = tComp.listPosition;
  const listTag =  tComp.listTag;
  const listComment =  tComp.listComment;
  
  const listAllTag = ["ToWin", "ForFun", "Kill", "Push", "Early", "Late"];
  const listTagSorted = listAllTag.filter(tag => listTag.includes(tag));
  
  console.log(listTagSorted);
  
  
  const returnIcon = (tag) => {
    switch (tag) {
      case "ToWin":
        return (<IconSerious width={"24px"} height={"24px"} color={"color_weak"} />)
      case "ForFun":
        return (<IconFun width={"24px"} height={"24px"} color={"color_weak"} />)
      case "Kill":
        return (<IconKill width={"24px"} height={"24px"} color={"color_weak"} />)
      case "Push":
        return (<IconPush width={"23px"} height={"23px"} color={"color_weak"} />)
      case "Early":
        return (<IconFast width={"27px"} height={"27px"} color={"color_weak"} />)
      case "Late":
        return (<IconSlow width={"24px"} height={"24px"} color={"color_weak"} />)
      
    }
  }
  


  return (
  
    <DivComp>
    
      <DivHeader> 
        <Div>  {tComp["title"]} </Div>
      </DivHeader>
    
    
    
      <DivMain> 
        
        <ListMap 
          listMap={listMap}
        />
    
        <DivListPosition>
          { listPosition.map((position, index) => {
            const tPosition = position;
            
            return (
            
              <Position
                key={index}  
                tPosition={tPosition} 
                /> 
            ) 
          })}
          
        </DivListPosition>
      
      </DivMain>
      
      
      <DivSecond >
        <DivListTag> 
          {listTagSorted.map(tag=>{
            return (
              <Tag
                key={tag}
                > {returnIcon(tag)} </Tag>
              )
            })
          }
        </DivListTag>
      
        <DivListRating> 
          rating
        </DivListRating>
      </DivSecond>
      
      <DivListComment>
        { tComp["listComment"].map((comment, index) => {
          const tComment = comment;
          
          return (
          
            <Div
              key={index}  
              tComment={tComment} 
              />
          ) 
        })}
      </DivListComment>
    
    </DivComp>
        
  )

}

  
  


function mapStateToProps(state) { 
  return { 
    
    listMap: state.comp_gallery.create.listMap
    , listPosition: state.comp_gallery.create.listPosition
    , listTag: state.comp_gallery.create.listTag
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
  }; 
}


export default connect(mapStateToProps, mapDispatchToProps)(Comp);

