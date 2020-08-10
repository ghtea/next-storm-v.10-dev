import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../config';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { replaceData2 } from "../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery } from "../../redux/actions/comp_gallery";


import {  NavLink, useHistory } from 'react-router-dom';

import { Div, Input, Button } from '../../styles/DefaultStyles';
import Video from './Videos/Video'





const DivVideos = styled(Div)
`
  width: 100%;
  
  padding: 20px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
	  flex-direction: row;
	}
`;


const DivListVideo = styled(Div)
`
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  flex-wrap: wrap;
  
`





const Videos = ({

  language
  
  , listVideo
  , readyListVideo
  , loadingListVideo

  , replaceData2CompGallery, replaceData2

  , addDeleteNotification
}) => {


  useEffect(() => {

    (async() => {

      if (!readyListVideo) {

        try {
          
          replaceData2("ready", "listVideo", false);
          replaceData2("loading", "listVideo", true);
          
          const {
            data
          } = await axios.get(`${config.URL_API_NS}/video/`);
          
          console.log(data)
          
          replaceData2CompGallery("videos", "listVideo", data);
          replaceData2("ready", "listVideo", true);
          replaceData2("loading", "listVideo", false);

        } catch (error) {

          addDeleteNotification("basic01", language);
          console.log(error)
        }
      } // if

    })() // async

  }, [])


  return (

  <DivVideos>


    {(loadingListVideo) ? <Div> loading </Div> :
      <DivListVideo>

        {listVideo.map(element=>
          
          <Video 
            key={element._id}
            video={element} 
            />
          
        )}
       
      </DivListVideo>
    }

    </DivVideos>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language

    , listVideo: state.comp_gallery.videos.listVideo
    , readyListVideo: state.basic.ready.listVideo
    , loadingListVideo: state.basic.loading.listVideo
    
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
export default connect(mapStateToProps, mapDispatchToProps)(Videos);