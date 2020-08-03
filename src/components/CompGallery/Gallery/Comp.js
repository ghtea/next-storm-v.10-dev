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



const DivComp = styled(Div)
`
  width: 300px; /* 6 + ddd + ddd + 6  */
  height: auto;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`


// title, author
const DivHeader = styled(Div)`

  border-radius: 12px 12px 0 0;
  
  width: 100%;
  height: 36px;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`



const DivTitle = styled(Div)`
  margin-left: 10px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const DivExpand = styled(Div)`
  width: 30px;
  
  margin-right: 10px;
`




//map, hero (position)
const DivMain = styled(Div)
`
  
  height: 70px;
  background-color: ${props => props.theme.COLOR_middle};
  
  border-left: 6px solid  ${props => props.theme.COLOR_normal};
  border-right: 6px solid  ${props => props.theme.COLOR_normal};
  
  color: ${props => props.theme.color_normal};
  
  
`



const DivListMap = styled(Div)
`
  height: 100%;
  
  background-color: ${props => props.theme.COLOR_bg};
  color: ${props => props.theme.color_normal};
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`


const DivListPosition = styled(Div)
`
  height: 100%;
  
  background-color: ${props => props.theme.COLOR_bg};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
`


// tag, rating
const DivFooter = styled(Div)`
  
  border-radius: 0 0 12px 12px;
  
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


const DivListTag = styled(Div)
`
  height: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

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

const DivListRating = styled(Div)
`
  
`
const DivListComment = styled(Div)
`
  
`




const Comp = ({
    dictHeroBasic
    , listAllMap
    , listAllTag
    , tComp

    , addDeleteNotification

  }) => {


    const listMap = tComp.listMap;
    const listPosition = tComp.listPosition;
    const listTag = tComp.listTag;
    const listComment = tComp.listComment;

    const listTagSorted = listAllTag.filter(tag => listTag.includes(tag));

    console.log(listTagSorted);


    const returnIcon = (tag) => {
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

    < DivComp >

      < DivHeader >
      
        < DivTitle > {tComp["title"] } < /DivTitle> 
        < DivExpand > < IconExpand width = { "20px" } height = { "20px" } color = { "color_very_weak" } /> </DivExpand >

      < /DivHeader>



      < DivMain >

      < ListMap listMap = { listMap } />

      < DivListPosition > {
        listPosition.map((position, index) => {
          const tPosition = position;

          return (

            < Position key = { index }
            tPosition = { tPosition }
            /> 
          )
        })
      }

      < /DivListPosition>

      < /DivMain>


      < DivFooter >
        < DivListTag > {
          listTagSorted.map(tag => {
            return ( 
              < Tag key = { tag } > { returnIcon(tag) } < /Tag>)
          })
        } < /DivListTag>
  
        < DivListRating >
        rating < /DivListRating> 
      < /DivFooter>


    < /DivComp>

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
      
      listAllTag: state.comp_gallery.gallery.listAllTag
      
      ,listMap: state.comp_gallery.create.listMap
      ,listPosition: state.comp_gallery.create.listPosition
      ,listTag: state.comp_gallery.create.listTag

    };
  }

  function mapDispatchToProps(dispatch) {
    return {

     addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    };
  }


  export
default connect(mapStateToProps, mapDispatchToProps)(Comp);