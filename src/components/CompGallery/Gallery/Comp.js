import dotenv from 'dotenv';
import React, {
  useState, useEffect
}
from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import * as config from '../../../config';


import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../others/dictCode'

import { replaceDataCompGallery, replaceData2CompGallery, replaceListPosition } from "../../../redux/actions/comp_gallery";


import { Div, Input, Button, Img, Textarea, LinkDefault } from '../../../styles/DefaultStyles';

import ListMap from './Comp/ListMap';
import Position from './Comp/Position';
//import MapsReady from './Create/MapsReady';
//import TagsReady from './Create/TagsReady';

import useInput from '../../../tools/hooks/useInput';
import { getTimeStamp } from '../../../tools/vanilla/time';

import * as imgHero from '../../../images/heroes'
import * as imgMap from '../../../images/maps'

import UserPublic from '../../_/UserPublic';

import IconExpand from '../../../svgs/basic/IconExpand'
import IconEnter from '../../../svgs/basic/IconEnter'

import IconLink from '../../../svgs/basic/IconLink'
import IconVideo from '../../../svgs/basic/IconVideo'
import IconComment from '../../../svgs/basic/IconComment'


import IconFun from '../../../svgs/tags/IconFun';
import IconSerious from '../../../svgs/tags/IconSerious';

import IconCombo from '../../../svgs/tags/IconCombo';
import IconTheme from '../../../svgs/tags/IconTheme';

import IconKill from '../../../svgs/tags/IconKill';
import IconPush from '../../../svgs/tags/IconPush';

import IconUser from '../../../svgs/basic/IconUser';
import IconHeart from '../../../svgs/basic/IconHeart';



const DivComp = styled(Div)
`
  width: 300px; /* 6 + ddd + ddd + 6  */
  height: auto;
  
  position: relative;
  
  background-color: ${props => props.theme.COLOR_normal};
  
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  /* 여백 */
  & > div:nth-child(n+2){
    margin-top: 8px;
  }
`

const LinkFocus = styled(LinkDefault)`
  z-index: 2;
  position: absolute;
  right: 0;
  top: 0;
  
  background-color: ${props=> props.theme.COLOR_normal};
  
  width: 36px;
  height: 36px;
  border-radius: 10px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`


// title, author
const DivHeader = styled(Div)`

  width: 100%;
  height: 40px;
  
  
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  
  & > div:nth-child(n+2){
    margin-left: 5px;
  }
`



const DivTitle = styled(Div)`
  width: auto;
  max-width: 130px;
  line-height: 1.1rem;
  
  display: block;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const DivListTag = styled(Div)`
  width: auto;
  max-width: 100px;
  
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const Tag = styled(Div)
`
  width: 32px;
  height: 32px;
  margin-left: 1px;
  margin-right: 1px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`



/*
//map, hero (position)
const DivMain = styled(Div)
`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`
*/

const DivMain = styled(Div)
` 
  height: auto;
  
  background-color: ${props => props.theme.COLOR_middle};
  color: ${props => props.theme.color_normal};
  border-radius: 10px;
  
  padding: 5px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`



// tag, rating
const DivFooter = styled(Div)`
  
  height: 40px;
  background-color: ${props => props.theme.COLOR_normal};
  
  
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`


const DivUser = styled(Div)`

  width: 40px;
  heiht: 40px;
`


const DivOthers = styled(Div)
` 
  width: 180px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  
  & > div {
    width: auto;
  }

`

const DivLike = styled(Div)`

  width: 40px;
  height: 40px;
  
  & > div {
    
    width: 40px;
    height: 40px;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`



const Comp = ({
  
  
   listAllMap
    , listAllTag
    , tComp

    , addDeleteNotification

  }) => {


    const listIdMap = tComp.listIdMap;
    const listPosition = tComp.listPosition;
    const listTag = tComp.listTag;
    const listComment = tComp.listComment;

    const listTagSorted = listAllTag.filter(tag => listTag.includes(tag));

    console.log(listTagSorted);


    const returnIcon = (tag) => {
        switch (tag) {
          case "ToWin":
            return (<IconSerious width = { "24px" } height = { "24px" } color = {  "color_weak" } />)
          case "ForFun":
            return (<IconFun width = { "24px" } height = { "24px" }  color = { "color_weak" } />)
            
          case "Kill":
            return (<IconKill width = { "22px" } height = { "22px" } color = { "color_weak" } />)
          case "Push":
            return (<IconPush width = {  "23px" } height = {  "23px" } color = {  "color_weak" } />)
      
          case "Combo":
            return (<IconCombo width = { "24px" } height = { "24px" } color = { "color_weak" } />)
          case "Theme":
            return (<IconTheme width = {  "24px" } height = {  "24px" } color = {  "color_weak" } />)

          }
      }



    return (

   <DivComp>
    
    <LinkFocus to={`/comp-gallery/focus/${tComp._id}`} > <IconEnter width={"24px"} height={"24px"} color={"color_very_weak"}  /> </LinkFocus>
      
     <DivHeader>
        
       <DivTitle> {tComp["title"] }</DivTitle> 
        
       <DivListTag> 
       { listTagSorted.map(tag => {
            return ( 
             <Tag key = { tag }> { returnIcon(tag) }</Tag>)
          })
        }
        </DivListTag>
        
     </DivHeader>


     <DivMain>
      
       {
          listPosition.map((position, index) => {
            const tPosition = position;
  
            return (
  
             <Position key = { index }
              tPosition = { tPosition }
              /> 
            )
          })
        }
        
     </DivMain>

     <DivFooter>
      
      <DivUser >
        <UserPublic idUser={tComp.author} layout={"icon only"} />
      </DivUser>
      
      
      <DivOthers>
      
        <Div> 
          <IconComment width = { "18px" } height = { "18px" } color = { "color_very_weak" } />
        </Div>
        
        
        <Div> 
          <IconVideo width = { "20px" } height = { "20px" } color = { "color_very_weak" } />
        </Div>
        
      </DivOthers>
      
      
      
      <DivLike>
        <Div>
          <IconHeart width = { "25x" } height = { "25px" } color = { "color_very_weak" } filled={false} />
        </Div>
      </DivLike> 
        
     </DivFooter>


   </DivComp>

    )

}


/*

< DivListComment> {
          tComp["listComment"].map((comment, index) => {
            const tComment = comment;
  
            return (
  
             <Div 
                key = { index }
                tComment = { tComment }
              />
            )
          })
        }</DivListComment>

*/


  function mapStateToProps(state) {
    return {
      
      listAllTag: state.comp_gallery.gallery.listAllTag
      
      ,listAllMap: state.hots.listAllMap
      

    };
  }

  function mapDispatchToProps(dispatch) {
    return {

     addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    };
  }


  export
default connect(mapStateToProps, mapDispatchToProps)(Comp);