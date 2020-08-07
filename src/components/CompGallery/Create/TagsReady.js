import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import { connect } from "react-redux";

import * as config from '../../../config';


import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import {replaceWorking} from "../../../redux/actions/basic";
import {replaceDataCompGallery, replaceData2CompGallery} from "../../../redux/actions/comp_gallery";

import {Div, Input, Button, Img} from '../../../styles/DefaultStyles';


//import useInput from '../../../tools/hooks/useInput';

import IconFun from '../../../svgs/tags/IconFun'
import IconSerious from '../../../svgs/tags/IconSerious'

import IconKill from '../../../svgs/tags/IconKill'
import IconPush from '../../../svgs/tags/IconPush'

import IconCombo from '../../../svgs/tags/IconCombo'
import IconTheme from '../../../svgs/tags/IconTheme'
//import IconFast from '../../../svgs/tags/IconFast'
//import IconSlow from '../../../svgs/tags/IconSlow'

//
const DivTagsReady = styled(Div)`
  height: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

const DivEachGroup = styled(Div)`
  width: auto;
  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`

const ButtonTag = styled(Button)`
  width: 80px;
  height: 30px;
  
  padding: 0;
  margin-top: 1px;
  margin-bottom: 1px;
  margin-right: 1px;
  margin-left: 1px;
  
  border-radius: 6px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  &:focus {
    outline: none;
  }
`

const DivIcon = styled(Div)`
  width: 30px;
  height: 100%;
`

const DivTagName = styled(Div)`
  width: 45px;
  height: 100%;
    
  font-size: 0.8rem;
  
  color: ${props => props.theme[props.color]};
`





// image rerendering problem
//https://stackoverflow.com/questions/47922687/force-react-to-reload-an-image-file
// https://www.npmjs.com/package/react-image
const TagsReady = ({
  
   listTag
  
   
   , replaceDataCompGallery
   , replaceData2CompGallery
   
   , addDeleteNotification
}) => {
  
  // should be towin or Fun or towin && forfun
  const onClick_Tag_ToWin = (event) => {
    
    let listTagTemp = listTag;
    
    if (listTagTemp.includes("ToWin") && listTagTemp.includes("ForFun") ) {
      listTagTemp = listTagTemp.filter(element => element !== "ToWin");
    }
    else if ( !listTagTemp.includes("ToWin") ) {
      listTagTemp.push("ToWin")
    }
    else if (!listTagTemp.includes("ToWin") && !listTagTemp.includes("ForFun") ) {
      // do nothing
    }
    replaceData2CompGallery("create", "listTag", listTagTemp);
  }
  
  const onClick_Tag_ForFun = (event) => {
    
    let listTagTemp = listTag;
    
    if (listTagTemp.includes("ForFun") && listTagTemp.includes("ToWin") ) {
      listTagTemp = listTagTemp.filter(element => element !== "ForFun");
    }
    else if ( !listTagTemp.includes("ForFun") ) {
      listTagTemp.push("ForFun")
    }
    else if (!listTagTemp.includes("ForFun") && !listTagTemp.includes("ToWin") ) {
      // do nothing
    }
    replaceData2CompGallery("create", "listTag", listTagTemp);
  }
  
  
  
  
  
  // only Kill or Push 
  const onClick_Tag_Kill = (event) => {
    let listTagTemp = listTag;
    if ( listTagTemp.includes("Kill") ) {
      listTagTemp = listTagTemp.filter(element => element !== "Kill");
      listTagTemp.push("Push");
    }
    else  {
      listTagTemp = listTagTemp.filter(element => element !== "Push");
      listTagTemp.push("Kill");
    }
    replaceData2CompGallery("create", "listTag", listTagTemp);
  }
  
  const onClick_Tag_Push = (event) => {
    let listTagTemp = listTag;
    if ( listTagTemp.includes("Kill") ) {
      listTagTemp = listTagTemp.filter(element => element !== "Kill");
      listTagTemp.push("Push");
    }
    else  {
      listTagTemp = listTagTemp.filter(element => element !== "Push");
      listTagTemp.push("Kill");
    }
    replaceData2CompGallery("create", "listTag", listTagTemp);
  }
  
  
  
  // any combination of Combo & Theme
  const onClick_Tag_Combo = (event) => {
    let listTagTemp = listTag;
    if (listTagTemp.includes("Combo")) {
      listTagTemp = listTagTemp.filter(element => element !== "Combo")
    }
    else  {
      listTagTemp.push("Combo")
    }
    replaceData2CompGallery("create", "listTag", listTagTemp);
  }
  
  const onClick_Tag_Theme = (event) => {
    let listTagTemp = listTag;
    if (listTagTemp.includes("Theme")) {
      listTagTemp = listTagTemp.filter(element => element !== "Theme")
    }
    else {
      listTagTemp.push("Theme")
    }
    replaceData2CompGallery("create", "listTag", listTagTemp);
  }
  
  
  /*
  // only Early or Late or nothing
  const onClick_Tag_Early = (event) => {
    let listTagTemp = listTag;
    if (listTagTemp.includes("Early")) {
      listTagTemp = listTagTemp.filter(element => element !== "Early")
    }
    else  {
      listTagTemp = listTagTemp.filter(element => element !== "Late")
      listTagTemp.push("Early")
    }
    replaceData2CompGallery("create", "listTag", listTagTemp);
  }
  
  const onClick_Tag_Late = (event) => {
    let listTagTemp = listTag;
    if (listTagTemp.includes("Late")) {
      listTagTemp = listTagTemp.filter(element => element !== "Late")
    }
    else {
      listTagTemp = listTagTemp.filter(element => element !== "Early")
      listTagTemp.push("Late")
    }
    replaceData2CompGallery("create", "listTag", listTagTemp);
  }
  */
  
  
  
  let dictColorTag = {};
  
  if (listTag.includes("ToWin") ) { dictColorTag["ToWin"] = "color_active" }
  else { dictColorTag["ToWin"] = "color_very_weak" }
  if (listTag.includes("ForFun") ) { dictColorTag["ForFun"] = "color_active" }
  else { dictColorTag["ForFun"] = "color_very_weak" }
  
  if (listTag.includes("Kill") ) { dictColorTag["Kill"] = "color_active" }
  else { dictColorTag["Kill"] = "color_very_weak" }
  if (listTag.includes("Push") ) { dictColorTag["Push"] = "color_active" }
  else { dictColorTag["Push"] = "color_very_weak" }
  
  if (listTag.includes("Combo") ) { dictColorTag["Combo"] = "color_active" }
  else { dictColorTag["Combo"] = "color_very_weak" }
  if (listTag.includes("Theme") ) { dictColorTag["Theme"] = "color_active" }
  else { dictColorTag["Theme"] = "color_very_weak" }
  /*
  if (listTag.includes("Early") ) { dictColorTag["Early"] = "color_active" }
  else { dictColorTag["Early"] = "color_very_weak" }
  if (listTag.includes("Late") ) { dictColorTag["Late"] = "color_active" }
  else { dictColorTag["Late"] = "color_very_weak" }
  */
  
  
  
  
  return (
  
    <DivTagsReady>
      
      <DivEachGroup>
      
        <ButtonTag  onClick={onClick_Tag_ToWin} > 
        
          <DivIcon>  <IconSerious width={"28px"}  height={"28px"} color={dictColorTag.ToWin} /> </DivIcon>
          <DivTagName color={dictColorTag.ToWin}> to win </DivTagName> 
          
        </ButtonTag>
          
        <ButtonTag  onClick={onClick_Tag_ForFun} > 
        
          <DivIcon>  <IconFun width={"26px"}  height={"26px"} color={dictColorTag.ForFun} /></DivIcon>
          <DivTagName color={dictColorTag.ForFun}> for fun </DivTagName> 
          
        </ButtonTag>
        
      </DivEachGroup>
      
      
      
      <DivEachGroup>
      
        <ButtonTag  onClick={onClick_Tag_Kill} > 
          
          <DivIcon>  <IconKill width={"28px"}  height={"28px"} color={dictColorTag.Kill} /> </DivIcon>
          <DivTagName color={dictColorTag.Kill}> kill </DivTagName>
          
        </ButtonTag>
          
          
        <ButtonTag  onClick={onClick_Tag_Push} > 
        
          <DivIcon> <IconPush width={"23px"}  height={"23px"} color={dictColorTag.Push} />  </DivIcon>
          <DivTagName color={dictColorTag.Push}> push </DivTagName> 
          
        </ButtonTag>
      
      </DivEachGroup>
      
      
      
      <DivEachGroup>
      
        <ButtonTag  onClick={onClick_Tag_Combo} > 
          <DivIcon>  <IconCombo width={"28px"}  height={"28px"} color={dictColorTag.Combo} />  </DivIcon>
          <DivTagName color={dictColorTag.Combo}> combo </DivTagName> 
        </ButtonTag>
          
        <ButtonTag  onClick={onClick_Tag_Theme} > 
          <DivIcon> <IconTheme width={"21px"}  height={"21px"} color={dictColorTag.Theme} /> </DivIcon>
          <DivTagName color={dictColorTag.Theme}> theme </DivTagName>  
        </ButtonTag>
      
      </DivEachGroup>
      
      
      
      
      
    </DivTagsReady>
  )
}


/*
<DivEachGroup>
      
        <ButtonTag  onClick={onClick_Tag_Early} > 
          <DivIcon> <IconFast width={"30px"}  height={"30px"} color={dictColorTag.Early} /> </DivIcon> 
          <DivTagName color={dictColorTag.Early}> early </DivTagName> 
        </ButtonTag>
          
        <ButtonTag  onClick={onClick_Tag_Late} > 
          <DivIcon> <IconSlow width={"30px"}  height={"30px"} color={dictColorTag.Late} />  </DivIcon>
          <DivTagName color={dictColorTag.Late}> late </DivTagName>  
        </ButtonTag>
      
      </DivEachGroup>
*/


  


function mapStateToProps(state) { 
  return { 
    
   listTag: state.comp_gallery.create.listTag
    
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceDataCompGallery : (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    ,replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(TagsReady);