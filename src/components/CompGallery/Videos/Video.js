import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { TwitchClip } from 'react-twitch-embed';
//import YouTube from 'react-youtube';

import axios from 'axios';
import queryString from 'query-string';


import { connect } from "react-redux";
import * as config from '../../../config';

import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../others/dictCode'

import { replaceData2 } from "../../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../../redux/actions/comp_gallery";
import {replaceDataReaction, replaceData2Reaction} from "../../../redux/actions/reaction";



import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../../styles/DefaultStyles';

import UserPublic from '../../_/UserPublic';

import IconEdit from '../../../svgs/basic/IconEdit'
import IconPlus from '../../../svgs/basic/IconPlus'
import IconHeart from '../../../svgs/basic/IconHeart'

import IconEnter from '../../../svgs/basic/IconEnter'
import IconEye from '../../../svgs/basic/IconEye'
import IconLayers from '../../../svgs/basic/IconLayers'



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


const DivToSubject = styled(Div)`
  z-index: 2;
  position: absolute;
  right: 0;
  top: 0;
  
  background-color: ${props=> props.theme.COLOR_normal};
  
  width: 36px;
  height: 36px;
  border-radius: 5px;
  
  cursor: pointer;
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
  , readyUser
  
  , video
  
  , where
    
    
  , replaceDataReaction
  , replaceData2Reaction
  
  , addDeleteNotification
}) => {
  
  const history = useHistory(); 
  
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


  const onClick_Edit = (event) => {
    
    if (!readyUser) {
      addDeleteNotification("auth31", language);
      
      const query = queryString.stringify({
        "shouldGoBack": "yes"
      });
      history.push('/auth/log-in?' + query)
    }
    
    else {
      
      replaceDataReaction("mode", "edit");
      replaceDataReaction("which", "video");
      
      replaceDataReaction("authorReaction", video.author);
      replaceDataReaction("idReaction", video._id);
      replaceDataReaction("idSubject", video.subject._id);
      replaceDataReaction("modelSubject", video.subject.model);
      
      replaceDataReaction("visibility", "visible");
    }
    
  }

  return (

    <DivVideo>
    
      { (where==="videos")&&  
        <DivToSubject
          onClick={event=>{history.push(`/comp-gallery/focus/${video.subject._id}`)}}
        > <IconEye width={"24px"} height={"24px"} color={"color_weak"}  /> </DivToSubject>
      }
      
      
      <DivView> 
    
      {video.type === "Youtube" &&
        <ReactPlayer
          url={`${video.urlContent}`}
          width='270px'
          height='100%'
        />
      }
      
      {video.type === "Twitch Clip" &&
       <TwitchClip 
        clip={`${video.idContent}`}
        width='270px'
        height='100%'
        autoplay={false}
        />
      }
      
      {video.type === "Others" &&
        <ReactPlayer
          url={`${video.urlContent}`}
          width='270px'
          height='100%'
        />
      }
      
      </DivView>
      
      <DivFooter>  
        <Div> <UserPublic size={36} idUser={video.author} layout={"right"}/> </Div>
        
        
        { user._id && (video.author === user._id) && 
          <Div
            onClick={onClick_Edit}
          > <IconEdit  width={"24px"} height={"24px"} color={"color_weak"} />  </Div>
        }
        
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
    , readyUser: state.basic.ready.user
  };
}

function mapDispatchToProps(dispatch) {
  return {

    replaceDataCompGallery: (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    , replaceData2CompGallery: (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))

    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    ,replaceDataReaction : (which, replacement) => dispatch(replaceDataReaction(which, replacement))
    ,replaceData2Reaction : (which1, which2, replacement) => dispatch(replaceData2Reaction(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Video);