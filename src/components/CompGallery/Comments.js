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
import Comment from './Comments/Comment'





const DivComments = styled(Div)
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


const DivListComment = styled(Div)
`
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  flex-wrap: wrap;
  
`





const Comments = ({

  language
  
  , location
  
  , listComment
  , readyListComment
  , loadingListComment

  , replaceData2CompGallery, replaceData2
  

  , addDeleteNotification
}) => {

  
  useEffect(() => {

    (async() => {
      
      if (!readyListComment) {

        try {
          
          const queryRecieved = queryString.parse(location.search);
   
          const idSubject = queryRecieved.idSubject
          const modelSubject = queryRecieved.modelSubject
      
          const queryRequest = queryString.stringify({
            idSubject: idSubject
            , modelSubject: modelSubject
          });
          
          replaceData2("ready", "listComment", false);
          replaceData2("loading", "listComment", true);
              
          const { data } = await axios.get(`${config.URL_API_NS}/comment/?` + queryRequest );
            
          console.log(data)
          
          replaceData2CompGallery("comments", "listComment", data);
          replaceData2("ready", "listComment", true);
          replaceData2("loading", "listComment", false);

        } catch (error) {

          addDeleteNotification("basic01", language);
          console.log(error)
        }
      } // if

    })() // async

  }, [readyListComment])


  return (

  <DivComments>


    {(loadingListComment ) ? <Div> loading </Div> :
      <DivListComment>

        {listComment.map(element=>
          
          <Comment 
            key={element._id}
            comment={element}
            where="Comments"
            />
          
        )}
       
      </DivListComment>
    }

    </DivComments>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language

    , listComment: state.comp_gallery.comments.listComment
    , readyListComment: state.basic.ready.listComment
    , loadingListComment: state.basic.loading.listComment
    
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
export default connect(mapStateToProps, mapDispatchToProps)(Comments);