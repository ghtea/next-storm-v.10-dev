import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import * as config from '../../../../config';

import addDeleteNotification from "../../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../../others/dictCode'

import { replaceData2 } from "../../../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../../../redux/actions/comp_gallery";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../../../styles/DefaultStyles';

import UserPublic from '../../../_/UserPublic';

import IconUser from '../../../../svgs/basic/IconUser'

import IconFun from '../../../../svgs/tags/IconFun';
import IconSerious from '../../../../svgs/tags/IconSerious';

import IconCombo from '../../../../svgs/tags/IconCombo';
import IconTheme from '../../../../svgs/tags/IconTheme';

import IconKill from '../../../../svgs/tags/IconKill';
import IconPush from '../../../../svgs/tags/IconPush';



const DivHeader = styled(Div)
`
  width: 100%;
  padding: 5px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

`;


const DivFirst = styled(Div)`
  
  height: 30px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  background-color: ${props => props.theme.COLOR_normal};
  border-radius: 9px 9px 0 0;
`

const DivSecond = styled(Div)`

  height: 40px;
  
  background-color: ${props => props.theme.COLOR_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`

const DivListTag = styled(Div)

` width: auto;
  max-width: 180px;
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



const DivUser = styled(Div)`
  
  width: auto;
  height: 100%;
  
  border-left: 4px solid ${props => props.theme.COLOR_bg};
  
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  
  & > div:nth-child(1) {
    
    font-size: 0.9rem;
    width: 100px;
    
    display: block;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  & > div:nth-child(2) {
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



const Header = ({

  language
  
  , listComp
  , readyListComp, loadingListComp
  
  , focusingComp, readyFocusingComp, loadingFocusingComp
  
  , focusingAuthor
  , readyFocusingCompBonus
  , loadingFocusingCompBonus
    
  
  , replaceData2CompGallery, replaceData2

  , addDeleteNotification
}) => {
  
  
  
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

    <DivHeader>
      
      <DivFirst> 
        {focusingComp.title}  
      </DivFirst>
      
      <DivSecond> 
      
        <DivListTag> 
          { focusingComp.listTag.map(tag => {
            return ( 
             <Tag key = { tag }> { returnIcon(tag) }</Tag>)
            })
          }
        </DivListTag>
        
        <UserPublic  idUser={focusingComp.author} layout={"left"} />
        
      </DivSecond>

    </DivHeader>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language

    , listComp: state.comp_gallery.gallery.listComp
    , readyListComp: state.basic.ready.listComp
    , loadingListComp: state.basic.loading.listComp
    
    , focusingComp: state.comp_gallery.focus.comp
    , readyFocusingComp: state.basic.ready.fComp
    , loadingFocusingComp: state.basic.loading.fComp
    
    , readyFocusingCompBonus: state.basic.ready.focusingCompBonus
    , loadingFocusingCompBonus: state.basic.loading.focusingCompBonus
    
    
    , readyAuthorFocusingComp: state.basic.ready.authorFocusingComp
    , loadingAuthorFocusingComp: state.basic.loading.authorFocusingComp
  };
}

function mapDispatchToProps(dispatch) {
  return {

    replaceDataCompGallery: (which, replacement) => dispatch(replaceDataCompGallery(which, replacement)),
    replaceData2CompGallery: (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))

    ,
    replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    ,
    addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Header);