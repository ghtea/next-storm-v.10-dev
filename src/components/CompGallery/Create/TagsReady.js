import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import { connect } from "react-redux";

import * as config from '../../../config';


import addRemoveNotification from "../../../redux/thunks/addRemoveNotification";
import {replaceWorking} from "../../../redux/actions/basic";
import {replaceDataCompGallery, replaceData2CompGallery} from "../../../redux/actions/comp_gallery";

import {Div, Input, Button, Img} from '../../../styles/DefaultStyles';


//import useInput from '../../../tools/hooks/useInput';

import IconFun from '../../../svgs/tags/IconFun'
import IconSerious from '../../../svgs/tags/IconSerious'
import IconFast from '../../../svgs/tags/IconFast'
import IconSlow from '../../../svgs/tags/IconSlow'
import IconKill from '../../../svgs/tags/IconKill'
import IconPush from '../../../svgs/tags/IconPush'


//
const DivTagsReady = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`

const ButtonTag = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  &:focus {
    outline: none;
  }
`

const DivTagName = styled(Div)`
  margin-left: 2px;
  margin-right: 2px;
    
  font-size: 0.9 rem;
  
  color: ${props => props.theme.color_weak};
`

const DivWhy = styled(Div)`
  width: auto;
  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`

const DivTime = styled(Div)`
  width: auto;
   
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`

const DivHow = styled(Div)`
  width: auto;
   
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
`


// image rerendering problem
//https://stackoverflow.com/questions/47922687/force-react-to-reload-an-image-file
// https://www.npmjs.com/package/react-image
const TagsReady = ({
  
   listTag
  
   
   , replaceDataCompGallery
   , replaceData2CompGallery
   
   , addRemoveNotification
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
  
  
  // only Fast or Slow or nothing
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
  
  
  
  
  let dictColorTag = {};
  
  if (listTag.includes("ToWin") ) { dictColorTag["ToWin"] = "color_active" }
  else { dictColorTag["ToWin"] = "color_very_weak" }
  
  if (listTag.includes("ForFun") ) { dictColorTag["ForFun"] = "color_active" }
  else { dictColorTag["ForFun"] = "color_very_weak" }
  
  if (listTag.includes("Early") ) { dictColorTag["Early"] = "color_active" }
  else { dictColorTag["Early"] = "color_very_weak" }
  
  if (listTag.includes("Late") ) { dictColorTag["Late"] = "color_active" }
  else { dictColorTag["Late"] = "color_very_weak" }
  
  if (listTag.includes("Kill") ) { dictColorTag["Kill"] = "color_active" }
  else { dictColorTag["Kill"] = "color_very_weak" }
  
  if (listTag.includes("Push") ) { dictColorTag["Push"] = "color_active" }
  else { dictColorTag["Push"] = "color_very_weak" }
  
  
  
  return (
  
    <DivTagsReady>
      
      <DivWhy>
      
        <ButtonTag 
          onClick={onClick_Tag_ToWin}
          > <IconSerious width={"30px"}  height={"30px"} color={dictColorTag.ToWin} /> 
          
          <DivTagName> to win </DivTagName> 
        </ButtonTag>
          
        <ButtonTag 
          onClick={onClick_Tag_ForFun}
          > <IconFun width={"28px"}  height={"28px"} color={dictColorTag.ForFun} /> 
          
          <DivTagName> for fun </DivTagName> 
        </ButtonTag>
        
      </DivWhy>
      
      
      
      <DivTime>
      
        <ButtonTag 
          onClick={onClick_Tag_Early}
          > <IconFast width={"30px"}  height={"30px"} color={dictColorTag.Early} />  
          
          <DivTagName> early game </DivTagName> 
          </ButtonTag>
          
        <ButtonTag 
          onClick={onClick_Tag_Late}
          > <IconSlow width={"30px"}  height={"30px"} color={dictColorTag.Late} /> 
          
          <DivTagName> late game </DivTagName>  
          </ButtonTag>
      
      </DivTime>
      
      
      <DivHow>
      
        <ButtonTag 
          onClick={onClick_Tag_Kill}
          > <IconKill width={"30px"}  height={"30px"} color={dictColorTag.Kill} />  
          
          <DivTagName> kill </DivTagName> 
          </ButtonTag>
          
        <ButtonTag 
          onClick={onClick_Tag_Push}
          > <IconPush width={"24px"}  height={"24px"} color={dictColorTag.Push} /> 
          
          <DivTagName> push </DivTagName>  
          </ButtonTag>
      
      </DivHow>
      
      
    </DivTagsReady>
  )
}





  


function mapStateToProps(state) { 
  return { 
    
   listTag: state.comp_gallery.create.listTag
    
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceDataCompGallery : (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    ,replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    ,addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(TagsReady);