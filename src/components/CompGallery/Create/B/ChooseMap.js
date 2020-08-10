import dotenv from 'dotenv';
import React, {useState} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import addDeleteNotification from "../../../../redux/thunks/addDeleteNotification"
import {replaceDataCompGallery, replaceData2CompGallery} from "../../../../redux/actions/comp_gallery";

import {Div, Input, Button, Img} from '../../../../styles/DefaultStyles';


import useInput from '../../../../tools/hooks/useInput';
import {getTimeStamp} from '../../../../tools/vanilla/time';


import * as imgMap from '../../../../images/maps'


const DivChooseMap = styled(Div)`
  height: auto;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

`


const InputSearch = styled(Input)`
  width: 200px;
  height: 30px;
`

const DivGroups = styled(Div)`
  height: auto;
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`



const GroupMaps = styled(Div)`
  margin-top: 5px;
  margin-bottom: 5px;
  
  height: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
`



const DivLineNumber = styled(Div)`
  width: 50px;
  background-color: ${props => props.theme.COLOR_normal};
  border-radius: 12px 0 0 12px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  
`

const ContainerMap = styled(Div)`

  width: calc(100% - 50px);
  padding: 9px;
  
  background-color: ${props => props.theme.COLOR_middle};
  border-radius: 0 12px 12px 0;
  
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

  margin: 4px;
  
  width: 89px;
  height: 50px;
  
  & > div { /* for sets */
    height: 100%;
    border: 2px solid ${props => props.theme.color_weak};
    border-radius: 8px;
  }
`


const ImgEachMap = styled(Img)`
  border-radius: 8px;
  
  object-fit: cover;
  width: 89px;
  height: 50px;
  
`


 const ChooseMap = ({
   
   language
   
   , listAllMap
   
  , listIdMap
  
  , whichAdding
  , locationAddingMap
 
  , replaceData2CompGallery 
 
  , addDeleteNotification
   
 } ) => {
    
    
    // type: "standard", playable:true , ( rankedRotation:true )
    
    const listShowingMap = listAllMap.filter(objMap => objMap.type === "standard" && objMap.playable === true );
    const list2LineMap = listShowingMap.filter(objMap => objMap.lines === 2 );
    const list3LineMap = listShowingMap.filter(objMap => objMap.lines === 3 );
    
    const listIdAllMap = listShowingMap.map(element=> element._id);
    const listId2LineMap = list2LineMap.map(element=> element._id);
    const listId3LineMap = list3LineMap.map(element=> element._id);
    
    const onClick_Map = (event, set, idMap) => {
      
      if (set === "all"){
        replaceData2CompGallery("create", "listIdMap", listIdAllMap);
      }
      else if (set === "2lines"){
        replaceData2CompGallery("create", "listIdMap", listId2LineMap);
      }
      else if (set === "3lines"){
        replaceData2CompGallery("create", "listIdMap", listId3LineMap);
      }
      
      else if (set === "manual") {
        if (whichAdding === "Map" && !(listIdMap.includes(idMap)) ) {
          let listIdMapTemp = listIdMap;
          listIdMapTemp[locationAddingMap[0]] = idMap;
          
          replaceData2CompGallery("create", "listIdMap", listIdMapTemp);
          
          replaceData2CompGallery("create", "triggerPosition", Date.now().toString());
        }
        else if ( listIdMap.includes(idMap) ) {
          addDeleteNotification("comp11", language);
        }
      }
      
    }
  
  return (
    <DivChooseMap>
    
      
      
      <DivGroups>
        
        <GroupMaps>
          <DivLineNumber> <Div> set </Div> </DivLineNumber>
          <ContainerMap> 
            
            <DivEachMap  onClick={(event)=> onClick_Map(event, "all", null)} > 
              <Div> all  </Div> 
            </DivEachMap>
            
            <DivEachMap  onClick={(event)=> onClick_Map(event, "2lines", null)} > 
              <Div> 2 lines </Div> 
            </DivEachMap>
            
            <DivEachMap  onClick={(event)=> onClick_Map(event, "3lines", null)} > 
              <Div> 3 lines </Div> 
            </DivEachMap>
           
          </ContainerMap>
        </GroupMaps>
        
        
        <GroupMaps>
          <DivLineNumber> <Div> 2 </Div> <Div> lines </Div> </DivLineNumber>
          <ContainerMap> 
            {list2LineMap.map((tMap) => {
        
              const idMap = tMap["_id"]
              const nameImg = `map${tMap._id}`
              //const playable = tMap["playable"];
              
              return (
              
                <DivEachMap 
                  key={idMap}
                  onClick={(event)=> onClick_Map(event, "manual", idMap)}
                > 
                  <ImgEachMap src={imgMap[nameImg]} />
                </DivEachMap>
              )
            })}
          </ContainerMap>
        </GroupMaps>
        
        
        <GroupMaps>
          <DivLineNumber> <Div> 3 </Div> <Div> lines </Div> </DivLineNumber>
          <ContainerMap> 
            {list3LineMap.map((tMap) => {
        
              const idMap = tMap["_id"]
              const nameImg = `map${tMap._id}`
              
              return (
              
                <DivEachMap 
                  key={idMap}
                  onClick={(event)=> onClick_Map(event, "manual", idMap)}  
                > 
                  <ImgEachMap src={imgMap[nameImg]} />
                </DivEachMap>
              )
            })}
          </ContainerMap>
        </GroupMaps>
        
        
        
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
    
    , listIdMap: state.comp_gallery.create.listIdMap
    
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