import dotenv from 'dotenv';
import React, {
  useState, useEffect
}
from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive'

import axios from 'axios';

import {
  connect
}
from "react-redux";

import * as config from '../../../../config';


import addDeleteNotification from "../../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../../others/dictCode'

import { replaceDataCompGallery, replaceData2CompGallery, replaceListPosition }
from "../../../../redux/actions/comp_gallery";


import { Div, Input, Button, Img, Textarea } from '../../../../styles/DefaultStyles';

import * as imgHero from '../../../../images/heroes'
import {areEqualSets} from '../../../../tools/vanilla/set';


const DivHeroes = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  
`

const DivSelected = styled(Div)`

  margin-top: 10px;
  
  width: auto;
  min-width: 60px;
  max-width: 360px;
  
  padding-left: 5px;
  padding-right: 5px;
  
  height: 60px;
  overflow: auto;
  
  background-color: ${props => props.theme.COLOR_middle};
  
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  flex-wrap: nowrap;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    flex-wrap: wrap;
    width: auto;
    min-width: 60px;
    max-width: 180px;
  }
  
`

const DivResultSearching = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  
  margin-top: 10px;
`



const DivEachHero = styled(Div)`

  margin: 3px;
  width: 36px;
  height: 36px;
  ${props=> (props.selected)?
    `border: 2px solid ${props.theme.color_strong};`
    : "border: none;"
  }
  
  cursor: pointer;
`
const ImgEachHero = styled(Img)`
  border-radius: 50%;
  
  object-fit: cover;
  width: 36px;
  height: 36px;
    
`


const Heroes = ({
    language
    
    , dictAllHeroBasic // 사실 list 다!
    
    , filterHero
    , searchHero
    
    , replaceData2CompGallery
    
    , addDeleteNotification

  }) => {

  const [resultSearchingHero, setResultSearchingHero] = useState([]);
  useEffect(()=>{
    
    console.log(searchHero)
    
    const reg = new RegExp(searchHero);
    
    const resultSearchingHeroTemp1 = dictAllHeroBasic.filter( (element, index) => reg.test(element['search']) );
    const resultSearchingHeroTemp2 =  resultSearchingHeroTemp1.slice(0,16); //  검색결과 20개까지!
    
    setResultSearchingHero(resultSearchingHeroTemp2);
  }, [searchHero])
    
  
  const onClick_Hero = (event, idHero) => {
    if(filterHero.includes(idHero)){
      let filterHeroTemp = filterHero;
      filterHeroTemp = filterHeroTemp.filter(element => element !== idHero)
      replaceData2CompGallery("gallery", "filterHero", filterHeroTemp)
    }
    else {
      let filterHeroTemp = filterHero;
      filterHeroTemp.push(idHero)
      replaceData2CompGallery("gallery", "filterHero", filterHeroTemp)
    }
  }

    return (

      <DivHeroes>
        
         <DivSelected>
        {filterHero.map(element=>{
          const tObjHero = dictAllHeroBasic.find(obj => obj._id === element)
          const idHero = element;
          const key_HeroesTalents = tObjHero['key_HeroesTalents'];
          
          return (<DivEachHero 
            key={`filter_${idHero}`}
            onClick={(event)=> onClick_Hero(event, idHero)}
            selected = {filterHero.includes(idHero)}
          > 
            <ImgEachHero src={imgHero[key_HeroesTalents]} />
          </DivEachHero>)
        })}
        </DivSelected>
        
        
        <DivResultSearching>
        {resultSearchingHero.map(element=>{
          const tObjHero = dictAllHeroBasic.find(obj => obj._id === element._id)
          const idHero = tObjHero._id;
          const key_HeroesTalents = tObjHero['key_HeroesTalents'];
          
          return (<DivEachHero 
            key={`resultSearching_${idHero}`}
            onClick={(event)=> onClick_Hero(event, idHero)}
            selected = {filterHero.includes(idHero)}
          > 
            <ImgEachHero src={imgHero[key_HeroesTalents]} />
          </DivEachHero>)
        })}
        </DivResultSearching>
        
      
        
      </DivHeroes>

    )

}




  function mapStateToProps(state) {
    return {
      
      language: state.basic.language
      
      , dictAllHeroBasic: state.hots.dictAllHeroBasic
      
      , filterHero: state.comp_gallery.gallery.filterHero
      , searchHero: state.comp_gallery.gallery.searchHero
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
    
    replaceDataCompGallery : (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    ,replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    ,addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    };
  }


  export
default connect(mapStateToProps, mapDispatchToProps)(Heroes);