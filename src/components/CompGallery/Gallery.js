import dotenv from 'dotenv';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
import Comp from './Gallery/Comp'
import Filter from './Gallery/Filter'

import useInput from '../../tools/hooks/useInput';
import {  getTimeStamp } from '../../tools/vanilla/time';

import IconWorking from '../../svgs/basic/IconWorking'




const DivGallery = styled(Div)
`
  width: 100%;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
	  flex-direction: row;
	}
`;


const ContainerFilter = styled(Div)
`
  position: static;
  
  width: 100%; 
	height: 240px;
	
	margin-bottom: 10px;
	
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    margin: 0px;
    
    position: fixed;
    top: 120px;
    left: 0;
    overflow: auto;
    
	  width: 180px;
	  
	  height: auto;
	  max-height: calc(100vh - 120px);
	  
	}
`

const ButtonFilter = styled(Button)`
  height: 30px;
  margin-top: 5px;
  margin-left: 5px;
`



const ContainerListComp = styled(Div)
`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    margin-left: 180px;
	  width: calc(100% - 180px);
	}
`


const DivListComp = styled(Div)
`
  width: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  flex-wrap: wrap;
`;






const Gallery = ({

  language
  
  , listComp
  , readyListComp, loadingListComp

  , replaceData2CompGallery, replaceData2

  , addDeleteNotification
}) => {


  useEffect(() => {

    (async() => {

      // 내 서버에서 comp 여러개 가져오기
      if (!readyListComp) {

        try {
          
          replaceData2("ready", "listComp", false);
          replaceData2("loading", "listComp", true);
          
          const {
            data
          } = await axios.get(`${config.URL_API_NS}/comp/`);

          replaceData2CompGallery("gallery", "listComp", data);
          replaceData2("ready", "listComp", true);
          replaceData2("loading", "listComp", false);

        } catch (error) {

          addDeleteNotification("basic01", language);
          console.log(error)
        }
      } // if

    })() // async

  }, [])


  const onClick_Filtered = async (event) => {
    try {
      
      const filterSize = [2, 3]; // 이 리스트 항목 중 하나의 값을 가져야한다
      const filterMap = ['2', '3']; // 이 리스트의 모든 항목을 가져야 한다
      const filterTag = ['ToWin', 'Kill']; // 이 리스트의 모든 항목을 가져야 한다
      
      const query = queryString.stringify({
        filterSize: filterSize
        , filterMap: filterMap
        , filterTag: filterTag
      });
      
      replaceData2("ready", "listComp", false);
      replaceData2("loading", "listComp", true);
          
      const { data } = await axios.get(`${config.URL_API_NS}/comp/filtered?` + query );

      replaceData2CompGallery("gallery", "listComp", data);
      replaceData2("ready", "listComp", true);
      replaceData2("loading", "listComp", false);

    } catch (error) {

      addDeleteNotification("basic01", language);
      console.log(error)
    }
  }
  
  return (

    < DivGallery >

    < ContainerFilter >
    
      <ButtonFilter onClick={onClick_Filtered} > search </ButtonFilter>
      < Filter / >
      
    < /ContainerFilter>  
    

    < ContainerListComp > {
      (loadingListComp) ? < Div > loading < /Div>:
        < DivListComp >

        {
          listComp.map((comp, index) => {

              return ( < Comp key = {
                  index
                }
                tComp = {
                  comp
                }
                />
              )
            }) //map
        }

      < /DivListComp>
    } < /ContainerListComp>


    < /DivGallery>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language

    , listComp: state.comp_gallery.gallery.listComp
    , readyListComp: state.basic.ready.listComp
    , loadingListComp: state.basic.loading.listComp
    
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
export default connect(mapStateToProps, mapDispatchToProps)(Gallery);