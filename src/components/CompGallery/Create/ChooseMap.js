import dotenv from 'dotenv';
import React, {useState} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import addDeleteNotification from "../../../redux/thunks/addDeleteNotification"
import {replaceDataCompGallery, replaceData2CompGallery} from "../../../redux/actions/comp_gallery";

import {Div, Input, Button, Img} from '../../../styles/DefaultStyles';


import useInput from '../../../tools/hooks/useInput';
import {getTimeStamp} from '../../../tools/vanilla/time';


import * as imgMap from '../../../images/maps'


const DivChooseMap = styled(Div)`
  margin-top: 20px;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
    
  }
`


const InputSearch = styled(Input)`
  width: 200px;
  height: 30px;
`

const DivGroups = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const GroupSameLines = styled(Div)`
  margin-top: 5px;
  margin-bottom: 5px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  
  padding: 5px;
`



const DivLineNumber = styled(Div)`
  width: 50px;
  background-color: ${props => props.theme.COLOR_middle};
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  
`

const ContainerMap = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  flex-wrap: wrap;
`

/*

  &> img {
    opacity: ${props=> (props.playable)? "1.0" : "0.5"};
  }
*/
const DivEachMap = styled(Div)`

  margin: 2px;
  
  width: 114px;
  height: 64px;
  
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {

  } 
`
const ImgEachMap = styled(Img)`
  border-radius: 8px;
  
  object-fit: cover;
  width: 114px;
  height: 64px;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {

  } 
`


 const ChooseMap = ({
   
   language
   
   , listAllMap
   
  , listMap
  
  , whichAdding
  , locationAddingMap
 
  , replaceData2CompGallery 
 
  , addDeleteNotification
   
 } ) => {
  
    const dict2LineMap = listAllMap.filter(objMap => objMap.lines === 2 && objMap.playable === true);
    const dict3LineMap = listAllMap.filter(objMap => objMap.lines === 3 && objMap.playable === true);
    
    
    const onClick_Map = (event, idMap) => {
      if (whichAdding === "Map" && !(listMap.includes(idMap)) ) {
        let listMapTemp = listMap;
        listMapTemp[locationAddingMap[0]] = idMap;
        
        replaceData2CompGallery("create", "listMap", listMapTemp);
        
        replaceData2CompGallery("create", "triggerPosition", Date.now().toString());
      }
      else if ( listMap.includes(idMap) ) {
        addDeleteNotification("comp11", language);
      }
    }
  
  return (
    <DivChooseMap>
    
      
      
      <DivGroups>
        
        <GroupSameLines>
          <DivLineNumber> <Div> 2 </Div> <Div> lines </Div> </DivLineNumber>
          <ContainerMap> 
            {dict2LineMap.map((tMap) => {
        
              const idMap = tMap["_id"]
              const nameImg = `map${tMap._id}`
              //const playable = tMap["playable"];
              
              return (
              
                <DivEachMap 
                  key={idMap}
                  onClick={(event)=> onClick_Map(event, idMap)}
                > 
                  <ImgEachMap src={imgMap[nameImg]} />
                </DivEachMap>
              )
            })}
          </ContainerMap>
        </GroupSameLines>
        
        <GroupSameLines>
          <DivLineNumber> <Div> 3 </Div> <Div> lines </Div> </DivLineNumber>
          <ContainerMap> 
            {dict3LineMap.map((tMap) => {
        
              const idMap = tMap["_id"]
              const nameImg = `map${tMap._id}`
              
              return (
              
                <DivEachMap 
                  key={idMap}
                  onClick={(event)=> onClick_Map(event, idMap)}  
                > 
                  <ImgEachMap src={imgMap[nameImg]} />
                </DivEachMap>
              )
            })}
          </ContainerMap>
        </GroupSameLines>
        
        
        
      </DivGroups>
      
    </DivChooseMap>
  )

}
  

/*

      <Div> 
        <Div> 
          <InputSearch placeholder="search"/>  
        </Div>
      </Div>
    
      <Div> 
        filters
      </Div>
*/


function mapStateToProps(state) { 
  return { 
    language: state.basic.language
    
    , listAllMap: state.hots.listAllMap
    
    , listMap: state.comp_gallery.create.listMap
    
    , whichAdding: state.comp_gallery.create.whichAdding
    , locationAddingMap: state.comp_gallery.create.locationAddingMap
    
    //, locationAddingHero: state.comp_gallery.locationAddingHero
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    //,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
  }; 
}


export default connect(mapStateToProps, mapDispatchToProps)(ChooseMap);