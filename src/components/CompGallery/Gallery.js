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
import Comp from './Gallery/Comp';
import Filter from './Gallery/Filter';
import Loading from '../_/Loading';

import useInput from '../../tools/hooks/useInput';
import IconAngleLeft from '../../svgs/basic/IconAngleLeft';
import IconAngleRight from '../../svgs/basic/IconAngleRight';





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
  justify-content: center;
  align-items: center;
  
  flex-wrap: wrap;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    justify-content: flex-start;
  }
`;

const GroupButtonViewBeforeNext = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: auto;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    padding-right: 180px;
	}
  
`

const ButtonViewBeforeNext = styled(Button)`
  
  &:nth-child(n+2) {margin-left: 10px;}
  
  width: 160px;
  height: 60px;
  
  padding-right: 5px;
  padding-left: 5px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  
  
`
const DivViewBeforeNextIcon = styled(Div)`
  width: 50px;
`
const DivViewBeforeNextText = styled(Div)`
  width: 100px;
  font-size: 1.4rem;
`




const Gallery = ({

  language
  
  , location
  
  , listComp
  , readyListComp, loadingListComp
  
  , optionSort
  , limitEach
  , skipEntire 
  
  , filterSize
  , filterMap
  , filterTag
  , filterHero
  
  , replaceData2CompGallery, replaceData2

  , addDeleteNotification
}) => {
  
  const history = useHistory();


  useEffect(() => {

    (async() => {

      // 내 서버에서 comp 여러개 가져오기
      if (!readyListComp) {

        try {
          
          const queryRecieved = queryString.parse(location.search);
          
          replaceData2CompGallery("gallery", "limitEach", parseInt(queryRecieved.limitEach) || limitEach);
          replaceData2CompGallery("gallery", "skipEntire", parseInt(queryRecieved.skipEntire) || skipEntire);
          
          
          // query 로 보내면 숫자가 string 이 되는 것에 주의! (받아서 이용하는 쪽에서 parse 해야 한다)
          // list 등은 왠만하면 JSON.stringify 해서 보내자, 아래에서는 이미 Filter 에서 그렇게해서 받았기 때문에 그냥 보내도 된다 (백엔드에서 JSON.parse해야 한다)
          const queryRequest = queryString.stringify({
            
            listSort: queryRecieved.listSort || ["createdNew"]  // 기본 정렬 설정
            , limitEach: queryRecieved.limitEach || limitEach  // 
            , skipEntire: queryRecieved.skipEntire || skipEntire
            
            , idAuthor: queryRecieved.idAuthor
            
            , idUserLike: queryRecieved.idUserLike
            
            , filterSize: queryRecieved.filterSize
            , filterMap: queryRecieved.filterMap
            , filterTag: queryRecieved.filterTag
            , filterHero: queryRecieved.filterHero
          });
          
          replaceData2("ready", "listComp", false);
          replaceData2("loading", "listComp", true);
              
          const { data } = await axios.get(`${config.URL_API_NS}/comp/?` + queryRequest );
          console.log(data)

          replaceData2CompGallery("gallery", "listComp", data);
          replaceData2("ready", "listComp", true);
          replaceData2("loading", "listComp", false);

        } catch (error) {

          addDeleteNotification("basic01", language);
          console.log(error)
        }
      } // if

    })() // async

  }, [readyListComp])



  const onClick_ViewBeforeNext = (event, isNext) => {
    
      let listSort = [];
      
      switch (optionSort) {
        case '1': 
          listSort = ['numberLike', 'createdNew']; break;
        case '2': 
          listSort = ['numberLike', 'updatedNew']; break;
        case '3': 
          listSort = ['createdNew']; break;
        case '4': 
          listSort = ['updatedNew']; break;
        default: 
          listSort = ['createdNew']; break;  
      }
      
      const skipEntireUsing = (isNext)? (skipEntire + limitEach) : (skipEntire - limitEach);
      console.log(skipEntireUsing)
      
      const query = queryString.stringify({
        
        listSort: listSort
        , limitEach: limitEach
        , skipEntire: skipEntireUsing
        
        , filterSize: filterSize
        , filterMap: filterMap
        , filterTag: filterTag
        , filterHero: filterHero
      });
        
      
      history.push(`/comp-gallery/?` + query );
      replaceData2("ready", "listComp", false);
      replaceData2CompGallery("gallery", "skipEntire", skipEntireUsing ) ;
    }
  
  
  
  return (

    < DivGallery >

      <Filter />

    <ContainerListComp> 
      
      {
      (loadingListComp) ? < Loading/>:
        < DivListComp >

        {
          listComp.map((comp, index) => {

              return ( 
                < Comp 
                key = { index }
                tComp = { comp }
                />
              )
            }) //map
        }

      < /DivListComp>
      }
    
      <GroupButtonViewBeforeNext>
      {( skipEntire !== 0 )&&
        
        <ButtonViewBeforeNext
          onClick={(event)=> onClick_ViewBeforeNext(event, false)}
        > 
          <DivViewBeforeNextIcon><IconAngleLeft width={'20px'}  height={'40px'} color={'color_weak'} /></DivViewBeforeNextIcon>
          <DivViewBeforeNextText> {(() => {
            switch (language) {
              case 'ko': 
                return '이전';
              case 'ja': 
                return '以前';
              default: // eng
                return 'Before';
            }
          })()} </DivViewBeforeNextText>
          
        </ButtonViewBeforeNext>
      }  
      
      {(listComp.length === limitEach )&&
        <ButtonViewBeforeNext
          onClick={(event)=> onClick_ViewBeforeNext(event, true)}
        > 
          <DivViewBeforeNextText> 
            {(() => {
            switch (language) {
              case 'ko': 
                return '다음';
              case 'ja': 
                return '次';
              default: // eng
                return 'Next';
            }
          })()} </DivViewBeforeNextText>
          <DivViewBeforeNextIcon><IconAngleRight width={'20px'}  height={'40px'} color={'color_weak'} /></DivViewBeforeNextIcon>
        </ButtonViewBeforeNext>
      }
      </GroupButtonViewBeforeNext>
       
    
    </ContainerListComp>
      
      

    </DivGallery>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language

    , listComp: state.comp_gallery.gallery.listComp
    , readyListComp: state.basic.ready.listComp
    , loadingListComp: state.basic.loading.listComp
    
    , optionSort: state.comp_gallery.gallery.optionSort
    , limitEach: state.comp_gallery.gallery.limitEach
    , skipEntire: state.comp_gallery.gallery.skipEntire
    
    , filterSize: state.comp_gallery.gallery.filterSize
    , filterMap: state.comp_gallery.gallery.filterMap
    , filterTag: state.comp_gallery.gallery.filterTag
    , filterHero: state.comp_gallery.gallery.filterHero
  };
}

function mapDispatchToProps(dispatch) {
  return {

    replaceDataCompGallery: (which, replacement) => dispatch(replaceDataCompGallery(which, replacement)),
    replaceData2CompGallery: (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))

    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    , addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Gallery);