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


import { Div, Input, Button, Img, Textarea } from '../../../styles/DefaultStyles';

import ListMap from './Comp/ListMap';
import Position from './Comp/Position';
//import MapsReady from './Create/MapsReady';
//import TagsReady from './Create/TagsReady';

import useInput from '../../../tools/hooks/useInput';
import { getTimeStamp } from '../../../tools/vanilla/time';

import * as imgHero from '../../../images/heroes'
import * as imgMap from '../../../images/maps'


import IconExpand from '../../../svgs/basic/IconExpand'

import IconLink from '../../../svgs/basic/IconLink'
import IconVideo from '../../../svgs/basic/IconVideo'
import IconComment from '../../../svgs/basic/IconComment'


import IconFun from '../../../svgs/tags/IconFun'
import IconSerious from '../../../svgs/tags/IconSerious'

import IconCombo from '../../../svgs/tags/IconCombo'
import IconTheme from '../../../svgs/tags/IconTheme'

import IconKill from '../../../svgs/tags/IconKill'
import IconPush from '../../../svgs/tags/IconPush'

import IconUser from '../../../svgs/basic/IconUser'
import IconHeart from '../../../svgs/basic/IconHeart'



const DivComp = styled(Div)
`
  width: 300px; /* 6 + ddd + ddd + 6  */
  height: auto;
  
  margin: 10px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`


// title, author
const DivHeader = styled(Div)`

  border-radius: 15px 15px 0 0;
  
  width: 100%;
  height: 45px;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  padding-left: 10px;
  padding-right: 10px;
  
  display: grid;
  grid-template-rows: 50px;
  grid-template-columns: minmax(auto, 150px) minmax(80px, 1fr) 30px;
  grid-template-areas:
    "title tags button";

`



const DivTitle = styled(Div)`
  grid-area: title;
  
  padding: 3px;
  line-height: 1.1rem;
  
  display: block;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const DivListTag = styled(Div)
`
  grid-area: tags;
  
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

const DivExpand = styled(Div)`
  grid-area: button;
  
  /* justify-self: flex-end; not available yet */

`




//map, hero (position)
const DivMain = styled(Div)
`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  background-color: ${props => props.theme.COLOR_normal};
  
  border: 10px solid  ${props => props.theme.COLOR_normal};
  
  color: ${props => props.theme.color_normal};
`



const ContainerListMap = styled(Div)
`
  height: 50px;
  
  background-color: ${props => props.theme.COLOR_middle};
  color: ${props => props.theme.color_normal};
  border-radius: 9px 9px 0 0;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`


const DivListPosition = styled(Div)
`
  height: 70px;
  
  background-color: ${props => props.theme.COLOR_middle};
  color: ${props => props.theme.color_normal};
  border-radius: 0 0 9px 9px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
`


// tag, rating
const DivFooter = styled(Div)`
  
  border-radius: 0 0 15px 15px;
  
  height: 55px;
  background-color: ${props => props.theme.COLOR_normal};
  
  
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  &> div:nth-child(1) {
    width: 25%;
  }
  &> div:nth-child(2) {
    width: 50%;
  }
  &> div:nth-child(3) {
    width: 25%;
  }
`


const DivUser = styled(Div)`

  border-right: 4px solid ${props => props.theme.COLOR_bg};
  
  & > div {
    background-color: #fec84e;

    background-image: linear-gradient(315deg, #fec84e 0%, #ffdea8 74%);
    
    width: 40px;
    height: 40px;
    
    border-radius: 50%;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
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

  border-left: 4px solid ${props => props.theme.COLOR_bg};
  
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

     <DivHeader>
        
       <DivTitle> {tComp["title"] }</DivTitle> 
        
       <DivListTag> 
       { listTagSorted.map(tag => {
            return ( 
             <Tag key = { tag }> { returnIcon(tag) }</Tag>)
          })
        }
        </DivListTag>
        
       <DivExpand><IconExpand width = { "24px" } height = { "24px" } color = { "color_very_weak" } /> </DivExpand>

     </DivHeader>



     <DivMain>
      
      <ContainerListMap>
        <ListMap listIdMap = { listIdMap } />
      </ContainerListMap>
      
       <DivListPosition> {
          listPosition.map((position, index) => {
            const tPosition = position;
  
            return (
  
             <Position key = { index }
              tPosition = { tPosition }
              /> 
            )
          })
        }
  
       </DivListPosition>

     </DivMain>


     <DivFooter>
      
      <DivUser >
        <Div>
          <IconUser width = { "32px" } height = { "32px" } color = { "color_weak" } />
        </Div>
      </DivUser>
      
      
      <DivOthers>
      
        <Div> 
          <IconComment width = { "18px" } height = { "18px" } color = { "color_very_weak" } />
        </Div>
        
        
        <Div> 
          <IconVideo width = { "20px" } height = { "20px" } color = { "color_very_weak" } />
        </Div>
        
        
        <Div> 
          <IconLink width = { "18px" } height = { "18px" } color = { "color_very_weak" } />
        </Div>
        
        
      </DivOthers>
      
      
      <DivLike>
        <Div>
          <IconHeart width = { "25x" } height = { "25px" } color = { "color_very_weak" } filled={true} />
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