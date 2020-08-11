import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import axios from 'axios';
import queryString from 'query-string';


import { connect } from "react-redux";
import * as config from '../../../config';

import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../others/dictCode'

import { replaceData2 } from "../../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../../redux/actions/comp_gallery";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../../styles/DefaultStyles';

import UserPublic from '../../_/UserPublic';

import IconEdit from '../../../svgs/basic/IconEdit'
import IconPlus from '../../../svgs/basic/IconPlus'
import IconEnter from '../../../svgs/basic/IconEnter'
import IconHeart from '../../../svgs/basic/IconHeart'




const DivVideo = styled(Div)
`
  width: 300px;
  height: 260px;
  margin: 10px;
  
  position: relative;
   
  padding: 15px;
  
  background-color: ${props=> props.theme.COLOR_normal};
  border-radius: 5px;
  
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
 
`;


const DivEnter = styled(Div)`
  z-index: 2;
  position: absolute;
  right: 0;
  top: 0;
  
  background-color: ${props=> props.theme.COLOR_normal};
  
  width: 36px;
  height: 36px;
  border-radius: 5px;
`


const DivView = styled(Div)`
  height: 180px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const DivFooter = styled(Div)`
  height: 40px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  & > div {
    width: auto;
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



const Video = ({

  language
  , user
  
  , video
  
  , addDeleteNotification
}) => {
  
  const [like, setLike] = useState(false);
  const [plus, setPlus] = useState(0);
    useEffect(()=>{
      if ( video.listUserLike.includes(user._id) ) { setLike(true)}
      else {setLike(false)};
    },[])
    
  const onClick_Like = async (event) => {
      
      try {
        let queryTemp = {
          idUser: user._id
          , idVideo: video._id
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
        await axios.put(`${config.URL_API_NS}/video/like?` + query );
      }
      catch(error) {
        console.log(error);
        addDeleteNotification("basic01", language);
      }
    }

  return (

    <DivVideo>
      
      <DivEnter> <IconEnter width={"24px"} height={"24px"} color={"color_very_weak"}  /> </DivEnter>
      
      <DivView> 
        <ReactPlayer
          className='react-player'
          url={`${video.content}`}
          width='270px'
          height='100%'
        />
      </DivView>
      
      <DivFooter>  
        <Div> <UserPublic idUser={video.author} layout={"right"}/> </Div>
        
        <Div> <IconEdit width={"24px"} height={"24px"} color={"color_very_weak"}  /> </Div>
        
        <DivLike onClick={onClick_Like} >
          <Div number={video.listUserLike.length + plus}> {video.listUserLike.length + plus} </Div>
          <IconHeart width = { "25x" } height = { "25px" }  filled={like} />
        </DivLike>
        
      </DivFooter>

    </DivVideo>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language
    , user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {

    replaceDataCompGallery: (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    , replaceData2CompGallery: (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))

    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    , addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Video);