import dotenv from 'dotenv';
import React, {
  useState, useEffect
}
from 'react';
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


const ButtonFilter = styled(Button)`
  height: 30px;
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
  width: 160px;
  height: 30px;
  font-size: 0.9rem;
  
  margin: 4px;
`

const ButtonMapOthers = styled(Button)`
  width: auto;
  font-size: 0.9rem;
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
    
    , readyListAllMap
    , readyListMapStandardRanked
    
    , replaceData2
    , replaceData2CompGallery
    
    , addDeleteNotification

  }) => {
    
    
    const [which, setWhich] = useState("others"); // heroes, map, others (size, tags)
    
    
    // 입력중인 내용을 redux -> localstorage 저장하기 위해서!
    const useInput_Heroes = (value) => {
    	const onChange = event => {
    		//console.log(event.target.value)
    		setWhich("heroes");
    		replaceData2CompGallery("gallery", "searchHero", event.target.value);
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
      <DivFilter>
        
        <ButtonFilter> FILTER </ButtonFilter>
        
        <GroupWhich>
          <Div> <InputHeroes {...inputHeroes} placeholder="Heroes" /> </Div>
          <Div> <ButtonMapOthers onClick={(event=>{setWhich("maps")})}> Maps </ButtonMapOthers> <ButtonMapOthers onClick={(event=>{setWhich("others")})}> Others </ButtonMapOthers> </Div>
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