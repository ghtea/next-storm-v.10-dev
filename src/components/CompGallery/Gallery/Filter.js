
import React, { useState, useEffect} from 'react';
import {  useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive'

import axios from 'axios';
import queryString from 'query-string';


import {
  connect
}
from "react-redux";

import * as config from '../../../config';


import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../others/dictCode'

import { replaceData2 } from "../../../redux/actions/basic";
import { replaceDataCompGallery, replaceData2CompGallery, replaceListPosition }
from "../../../redux/actions/comp_gallery";


import { Div, Input, Button, Img, Textarea } from '../../../styles/DefaultStyles';


import Heroes from './Filter/Heroes';
import Maps from './Filter/Maps';
import Others from './Filter/Others';


import useInput from '../../../tools/hooks/useInput';
import {
  getTimeStamp
}
from '../../../tools/vanilla/time';

import * as imgHero from '../../../images/heroes'
import * as imgMap from '../../../images/maps'


import IconExpand from '../../../svgs/basic/IconExpand'
import IconHero from '../../../svgs/basic/IconHero'
import IconMap from '../../../svgs/basic/IconMap'
import IconMore from '../../../svgs/basic/IconMore'
import IconSort from '../../../svgs/basic/IconSort'


import IconFun from '../../../svgs/tags/IconFun'
import IconSerious from '../../../svgs/tags/IconSerious'

import IconKill from '../../../svgs/tags/IconKill'
import IconPush from '../../../svgs/tags/IconPush'

import IconCombo from '../../../svgs/tags/IconCombo'
import IconTheme from '../../../svgs/tags/IconTheme'




const DivFilter = styled(Div)
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
    top: 80px;
    left: 0;
    
	  width: 180px;
	  
	}
  
`

const GroupButton = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  font-size: 0.9rem;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const ButtonSort = styled(Button)`
  height: 36px;
  width: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  padding-left: 2px;
  padding-right: 2px;
  
  & > div {
    font-size: 0.9rem;
    width: auto;
    &:nth-child(n+2) {margin-left: 3px;}
  }
`

const ButtonApply = styled(Button)`
  height: 36px;
  width: auto;
  
  padding-left: 6px;
  padding-right: 6px;
  
  margin-left: 5px;
  background-color: ${props => props.theme.color_weak};
  color: ${props => props.theme.COLOR_normal};
`



const GroupWhich = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    flex-direction: column;
  }
  
  & > div {
    width: auto;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
  }
`

const InputHeroes = styled(Input)`
  width: 140px;
  height: 30px;
  font-size: 0.9rem;
  
  margin: 4px;
`

const ButtonWhich = styled(Button)`
  width: auto;
  height: 30px;
  
  margin: 4px;
`





const Filter = ({
    language
    
    , dictAllHeroBasic
    , listAllMap
    , listMapStandardRanked
    
    , listAllTag
    , searchHero
    
    
    
    , optionSort
    , limitEach
    , skipEntire
    
    , filterSize
    , filterTag
    , filterHero
    , filterMap
    
    
    
    , readyListAllMap
    , readyListMapStandardRanked
    
    , replaceData2
    , replaceData2CompGallery
    
    , addDeleteNotification

  }) => {
    
    const history = useHistory();
    const [which, setWhich] = useState("others"); // heroes, map, others (size, tags)
    
    const [textOptionSort, setTextOptionSort] = useState("");
    
    // 입력중인 내용을 redux -> localstorage 저장하기 위해서!
    const useInput_Heroes = (value) => {
    	const onChange = event => {
    		//console.log(event.target.value)
    		setWhich("heroes");
    		const searchHeroTemp = (event.target.value).toLowerCase();
    		replaceData2CompGallery("gallery", "searchHero", searchHeroTemp);
    	}
    	return {value, onChange};
    }
    const inputHeroes = useInput_Heroes(searchHero);
    
    
    const returnWhich = (which) => {
      switch(which){
        case 'heroes':
          return <Heroes />
        case 'maps':
          return <Maps />
        default:
          return <Others />
      }
    }
    
    
    const onClick_Apply = (event) => {
     
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
     
      const query = queryString.stringify({
        
        listSort: listSort
        , limitEach: limitEach
        , skipEntire: skipEntire
        
        , filterSize: filterSize
        , filterMap: filterMap
        , filterTag: filterTag
        , filterHero: filterHero
      });
        
      
      history.push(`/comp-gallery/?` + query );
      replaceData2("ready", "listComp", false);
    }
    
    
    useEffect(()=>{
      switch (optionSort) {
        
        case '1': 
          switch (language) {
            case 'ko': 
              setTextOptionSort('좋아요 & 최근 작성'); break;
            case 'ja': 
              setTextOptionSort('いいね & 最近作成'); break;
            default: // eng
              setTextOptionSort('Likes & Created'); break;
          }
          break;
          
        case '2': 
          switch (language) {
            case 'ko': 
              setTextOptionSort('좋아요 & 최근 수정'); break;
            case 'ja': 
              setTextOptionSort('いいね & 最近修正'); break;
            default: // eng
              setTextOptionSort('Likes & Updated'); break;
          }
          break;
          
        case '3': 
          switch (language) {
            case 'ko': 
              setTextOptionSort('최근 작성'); break;
            case 'ja': 
              setTextOptionSort('最近作成'); break;
            default: // eng
              setTextOptionSort('Created newly'); break;
          }
          break;
          
        case '4': 
          switch (language) {
            case 'ko': 
              setTextOptionSort('최근 수정'); break;
            case 'ja': 
              setTextOptionSort('最近修正'); break;
            default: // eng
              setTextOptionSort('Updated newly'); break;
          }
          break;
          
      } // big switch
        
    }, [optionSort, language])
    
    
    
    const onClick_OptionSort = (event) => {
      
      // "numberLike-createdNew", "numberLike-updatedNew", "createdNew", "updatedNew" 순서로!
      
      if (optionSort === "1") { // 이전이 이거였다면, 아래와 같이 바꾼다
        replaceData2CompGallery("gallery", "optionSort", "2");
      }
      else if (optionSort === "2") { // 이전이 이거였다면, 아래와 같이 바꾼다
        replaceData2CompGallery("gallery", "optionSort", "3");
      }
      else if (optionSort === "3") { // 이전이 이거였다면, 아래와 같이 바꾼다
        replaceData2CompGallery("gallery", "optionSort", "4");
      }
      else if (optionSort === "4") { // 이전이 이거였다면, 아래와 같이 바꾼다
        replaceData2CompGallery("gallery", "optionSort", "1");
      }
    }
    
    

    return (
      <DivFilter>
        
        <GroupButton>
          
          <ButtonApply
            onClick={onClick_Apply}
          > {(() => {
                switch (language) {
                  case 'ko': 
                    return '적용';
                  case 'ja': 
                    return '適用';
                  default: // eng
                    return 'Apply';
                }
              })()}  </ButtonApply>
              
          <ButtonSort
            onClick={onClick_OptionSort} >  
            <Div> <IconSort width={'20px'} height={'20px'} color={'color_weak'} /> </Div>
            <Div> {textOptionSort}  </Div>
          </ButtonSort>
        
          
              
        </GroupButton>
        
        <GroupWhich>
          <Div> 
            <InputHeroes {...inputHeroes} placeholder={(() => {
                switch (language) {
                  case 'ko': 
                    return '영웅';
                  case 'ja': 
                    return 'Heroes';
                  default: // eng
                    return 'Heroes';
                }
              })()}   /> 
            </Div>
            
            
          <Div> 
            <ButtonWhich onClick={(event=>{setWhich("others")})}> 
              <IconMore width={'20px'} height={'20px'} color={'color_weak'} />     
            </ButtonWhich> 
                 
            <ButtonWhich onClick={(event=>{setWhich("heroes")})}> 
              <IconHero width={'20px'} height={'20px'} color={'color_weak'} />     
            </ButtonWhich> 
            
            <ButtonWhich onClick={(event=>{setWhich("maps")})}> 
              <IconMap width={'20px'} height={'20px'} color={'color_weak'} />     
            </ButtonWhich> 
            
          </Div>
        </GroupWhich>
        
        {returnWhich(which)}
        
      </DivFilter>
    )

}




  function mapStateToProps(state) {
    return {
      
      language: state.basic.language
      
      , dictAllHeroBasic: state.hots.dictAllHeroBasic
      ,listAllMap: state.hots.listAllMap
      , listMapStandardRanked:  state.hots.listMapStandardRanked
      
      ,listAllTag: state.comp_gallery.gallery.listAllTag
      
      , searchHero: state.comp_gallery.gallery.searchHero
      
      , optionSort: state.comp_gallery.gallery.optionSort
      , limitEach: state.comp_gallery.gallery.limitEach
      , skipEntire: state.comp_gallery.gallery.skipEntire
      
      , filterSize: state.comp_gallery.gallery.filterSize
      , filterTag: state.comp_gallery.gallery.filterTag
      , filterHero: state.comp_gallery.gallery.filterHero
      , filterMap: state.comp_gallery.gallery.filterMap
    
    
      ,readyListAllMap: state.basic.ready.listAllMap
      , readyListMapStandardRanked: state.basic.ready.listMapStandardRanked
      
    
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
    
    replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    , replaceDataCompGallery : (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    , replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    };
  }


  export default connect(mapStateToProps, mapDispatchToProps)(Filter);