import dotenv from 'dotenv';
import React, {
  useState, useEffect
}
from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";

import * as config from '../../../config';

import {useHistory } from 'react-router-dom';

import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../others/dictCode'
import { replaceData2 } from "../../../redux/actions/basic";
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

import Profile from '../../_/Profile';

import IconExpand from '../../../svgs/basic/IconExpand'
import IconEnter from '../../../svgs/basic/IconEnter'
import IconEye from '../../../svgs/basic/IconEye'


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
  width: 300px; 
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
    margin-top: 10px;
  }
`

const DivFocus = styled(Div)`
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
  
  cursor: pointer;
`


// title, author
const DivHeader = styled(Div)`

  width: 100%;
  height: 30px;
  
  
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
  max-width: 150px;
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
  justify-content: space-evenly;
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
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`


const DivOthers = styled(Div)
` 
  width: 140px;

  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  
  & > div {
    
    cursor: pointer;
    
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
    & > div:nth-child(2){
      width: auto;
      margin-left: 8px;
      
      font-size: 0.9rem;
      font-weight: bold;
      
      padding-left: 4px;
      padding-right: 4px;
      
      background-color: ${props => props.theme.color_very_weak};
      color: ${props => props.theme.COLOR_normal};
      border-radius: 4px;
    }
  }

`


const DivLike = styled(Div)`

  width: auto;
  height: 40px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  
    
  & > div:nth-child(1){
    width: auto;
    
    font-size: 0.9rem;
    font-weight: bold;
    
    padding-left: 4px;
    padding-right: 4px;
    
    background-color: ${props => props.theme.color_very_weak};
    color: ${props => props.theme.COLOR_normal};
    border-radius: 4px;
  }
  
  & > div:nth-child(2) {
    
    width: 40px;
    height: 40px;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`



const Comp = ({
  
  user
  , readyUser
  
  , language
  
  , listAllMap
  , listAllTag
  , tComp
  
  , replaceData2
  , addDeleteNotification

  }) => {
    
    const history=useHistory();
    
    const [like, setLike] = useState(false);
    const [plus, setPlus] = useState(0);
    useEffect(()=>{
      if ( tComp.listUserLike.includes(user._id) ) { 
        setLike(true)
      }
      else {
        setLike(false)
      };
    },[])
    
    const listIdMap = tComp.listIdMap;
    const listPosition = tComp.listPosition;
    const listTag = tComp.listTag;
    const listComment = tComp.listComment;

    const listTagSorted = listAllTag.filter(tag => listTag.includes(tag));

  

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
    
    
    const onClick_Like = async (event) => {
      
      try {
        
        if(!readyUser) { addDeleteNotification("auth31", language); }
        else {
          let queryTemp = {
            idUser: user._id
            //, idComp: tComp._id
            , how: false
          };
          
          // 클릭하기 이전의 like!
          if (like) {
            queryTemp.how = false;
            setPlus(plus-1);
          }
          else { 
            queryTemp.how = true; 
            setPlus(plus+1);
          }
          setLike(!like);
          const query = queryString.stringify(queryTemp)  
          await axios.put(`${config.URL_API_NS}/comp/like/${tComp._id}?` + query );
        } // else
      }
      catch(error) {
        console.log(error);
        addDeleteNotification("basic01", language);
      }
    }
  
  
  const onClick_Focus = (event) => {
    replaceData2("ready", "focusingComp", false);
    history.push(`/comp-gallery/focus/${tComp._id}`)
  }
  
  
  const onClick_MoreComments = () => {
    
    const query = queryString.stringify({
      idSubject: tComp._id
      , modelSubject: "Comp"
    });
    
    history.push(`/comp-gallery/comments?` + query);
  }
  
  const onClick_MoreVideos = () => {
    
    const query = queryString.stringify({
      idSubject: tComp._id
      , modelSubject: "Comp"
    });
    
    history.push(`/comp-gallery/videos?` + query);
  }

    return (

   <DivComp>
    
    <DivFocus onClick={onClick_Focus} > <IconEye width={"24px"} height={"24px"} color={"color_weak"}  /> </DivFocus>
      
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
        <Profile size={36} idUser={tComp.author} layout={"icon only"} />
      </DivUser>
      
      
      <DivOthers>
      
        <Div
          onClick={onClick_MoreComments}
        > 
          <IconComment width = { "20px" } height = { "20px" } color = { "color_very_weak" } />
          <Div number={tComp.listIdComment.length}> {tComp.listIdComment.length} </Div>
        </Div>
        
        <Div
          onClick={onClick_MoreVideos}
        > 
          <IconVideo width = { "22px" } height = { "22px" } color = { "color_very_weak" } />
          <Div number={tComp.listIdVideo.length}> {tComp.listIdVideo.length} </Div>
        </Div>
        
      </DivOthers>
      
      
      
      <DivLike onClick={onClick_Like} >
        <Div number={tComp.listUserLike.length + plus}> {tComp.listUserLike.length + plus} </Div>
        <IconHeart width = { "25x" } height = { "25px" }  filled={like} />
      </DivLike> 
        
     </DivFooter>


   </DivComp>

    )

}


  function mapStateToProps(state) {
    return {
      
      user: state.auth.user
      , readyUser: state.basic.ready.user
      
      ,listAllTag: state.comp_gallery.gallery.listAllTag
      
      
      ,listAllMap: state.hots.listAllMap
      
      , language: state.basic.language

    };
  }

  function mapDispatchToProps(dispatch) {
    return {
    
      replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

      , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    };
  }


  export
default connect(mapStateToProps, mapDispatchToProps)(Comp);