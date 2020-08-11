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


import {
  Div, Input, Button, Img, Textarea
}
from '../../../../styles/DefaultStyles';

import ListMap from '../Comp/ListMap';
import Position from '../Comp/Position';
//import MapsReady from './Create/MapsReady';
//import TagsReady from './Create/TagsReady';

import useInput from '../../../../tools/hooks/useInput';


import * as imgHero from '../../../../images/heroes'
import * as imgMap from '../../../../images/maps'


import IconExpand from '../../../../svgs/basic/IconExpand'

import IconFun from '../../../../svgs/tags/IconFun'
import IconSerious from '../../../../svgs/tags/IconSerious'

import IconKill from '../../../../svgs/tags/IconKill'
import IconPush from '../../../../svgs/tags/IconPush'

import IconCombo from '../../../../svgs/tags/IconCombo'
import IconTheme from '../../../../svgs/tags/IconTheme'




const DivMaps = styled(Div)
`
  width: 100%;
  
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  
  padding-top: 5px;
  padding-bottom: 5px;
  
  & > div {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  
  & > div:nth-child(n+2) {
    margin-top: 10px;
  }
  
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    height: calc(100vh - 240px);
    min-height: 240px;
    overflow: auto;
    
    & > div {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    & > div:nth-child(n+2) {
      margin-top: 10px;
    }
    
  }
`



const ButtonMap = styled(Button)`
  
  font-size: 0.8rem;
  
  width: auto;
  max-width: 130px;
  
  height: 28px;
  
  padding-top: 1px;
  padding-bottom: 1px;
  padding-left: 5px;
  padding-right: 5px;
  
  margin-top: 2px;
  margin-bottom: 2px;
  margin-right: 2px;
  margin-left: 2px;
  
  background-color: ${props => (props.active)? props.theme.COLOR_normal : props.theme.COLOR_middle};
  color:  ${props => (props.active)? props.theme.color_active : props.theme.color_weak};
  border: 1px solid ${props => (props.active)? props.theme.color_active : props.theme.color_weak};
  
  
  & > div {
    display: block;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`





const Maps = ({
    language
    
    , dictAllHeroBasic
    , listAllMap
    , listMapStandardRanked
    
    
    , filterMap
    
    , replaceData2CompGallery
    
    , addDeleteNotification

  }) => {
    
    


    return (
      <DivMaps>
  
          
          <Div>
            <ButtonMap> {(() => {
              switch (language) {
                case 'ko': 
                  return '모든 맵';
                case 'ja': 
                  return '全マップ';
                default: // eng
                  return 'all maps';
              }
            })()}  
            </ButtonMap>
            
            <ButtonMap> {(() => {
              switch (language) {
                case 'ko': 
                  return '2라인';
                case 'ja': 
                  return '2ライン';
                default: // eng
                  return '2 lanes';
              }
            })()}  
            </ButtonMap>
            
            <ButtonMap> {(() => {
              switch (language) {
                case 'ko': 
                  return '3라인';
                case 'ja': 
                  return '3ライン';
                default: // eng
                  return '3 lanes';
              }
            })()}  
            </ButtonMap>
            
          </Div>
          
          <Div>
            {
              listMapStandardRanked.map(element=>(
                <ButtonMap key={element.name[language].short} > <Div>{element.name[language].full}</Div> </ButtonMap>
              ))
            }
          </Div>
      
      
      </DivMaps>
    )

}




  function mapStateToProps(state) {
    return {
      
      language: state.basic.language
      
      , dictAllHeroBasic: state.hots.dictAllHeroBasic
      ,listAllMap: state.hots.listAllMap
      , listMapStandardRanked:  state.hots.listMapStandardRanked
      
      ,listAllTag: state.comp_gallery.gallery.listAllTag
      
      ,readyListAllMap: state.basic.ready.listAllMap
      , readyListMapStandardRanked: state.basic.ready.listMapStandardRanked
      
    
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
default connect(mapStateToProps, mapDispatchToProps)(Maps);