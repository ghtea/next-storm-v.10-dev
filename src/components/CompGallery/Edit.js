import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';
import { v4 as uuidv4 } from 'uuid';

import { connect } from "react-redux";
import storage from '../../tools/vanilla/storage';

import * as config from '../../config';


import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { replaceData2 } from "../../redux/actions/basic";
import {replaceDataCompGallery, replaceData2CompGallery, replaceListPosition} from "../../redux/actions/comp_gallery";


import { NavLink, useHistory, useParams } from 'react-router-dom';

import {Div, Input, Button, Img, Textarea} from '../../styles/DefaultStyles';

import ChooseHero from './Edit/B/ChooseHero';
import ChooseMap from './Edit/B/ChooseMap';
import ListMapReady from './Edit/A/ListMapReady';
import ListTagReady from './Edit/A/ListTagReady';
import PositionReady from './Edit/A/ListPositionReady/PositionReady';

import useInput from '../../tools/hooks/useInput';
import useInput_CompGallery from '../../tools/hooks/useInput_CompGallery';

import {getTimeStamp} from '../../tools/vanilla/time';

import IconPlus from '../../svgs/basic/IconPlus';
import IconVideo from '../../svgs/basic/IconVideo';
import IconLink from '../../svgs/basic/IconLink';

import * as imgHero from '../../images/heroes'



const DivEdit = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  height: 100%;
  overflow: hidden;
 
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    
    max-width: 900px;
  
  }
`;



const DivA = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  width: 360px;      /*  768  */
  height: 360px;
  overflow: auto;
  
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  
  position: relative;
  
  @media (min-width:  ${props => props.theme.media.md }px) {
    height: 100%;
    margin: 5px;
  }
  
  & > div {
    margin: 5px;
  }
`

const DivB = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  width: 360px; 
  
  margin-top: 5px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  
  @media (min-width:  ${props => props.theme.media.md }px) {
    height: 100%;
    margin: 5px;
  }
  
  & > div {
    margin: 5px;
  }
`



//
const GroupButton = styled(Div)`
  
  width: auto;
  
  position: fixed;
  top: 120px;
  z-index: 100;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  @media (min-width:  ${props => props.theme.media.md }px) {
    position: static;
    z-index: 0;
  }
`

const ButtonEdit = styled(Button)`
  background-color: ${props => props.theme.color_active};
  color: ${props => props.theme.COLOR_normal};
  
  width: 90px;
  height: 30px;
  
  border-radius: 9px;
  
`


//
const ButtonDelete = styled(Button)`
  background-color: ${props => (props.stage === 0)? props.theme.COLOR_normal : props.theme.COLOR_delete};
  color: ${props => (props.stage === 0)? props.theme.color_weak : props.theme.color_delete};
  
  width: 90px;
  height: 30px;
  
  border-radius: 9px;
  
`



const DivEditingComp = styled(Div)`
  
  height: auto;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & > div:first-child {border-radius: 12px 12px 0 0;}
  & > div:last-child {border-radius: 0 0 12px 12px;}
  
  padding-top: 60px;
  
  @media (min-width:  ${props => props.theme.media.md }px) {
    padding-top: 0px;
  }
`


// title, author
const DivOne = styled(Div)`
  
  height: 60px;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

`

// 정렬 방식 고민중 https://css-tricks.com/vertically-center-multi-lined-text/

// maps + positions
const DivTwo = styled(Div)`
  
  background-color: ${props => props.theme.COLOR_normal};
  
  border: 10px solid  ${props => props.theme.COLOR_normal};

  
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  & > div:nth-child(1) {
    height: 55px;
  }
  
  & > div:nth-child(2) {
    height: 270px;
  }
  
`


const ContainerMapsReady = styled(Div)`
  
  background-color: ${props => props.theme.COLOR_middle};
  border-radius: 9px 9px 0 0;
  overflow-x: auto;
`

const DivListPositionReady = styled(Div)`
  
  
  background-color: ${props => props.theme.COLOR_middle};
  
  border-radius: 0 0 9px 9px;
  
  overflow: auto;
  
  flex-shrink: 0;
  
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`



// 'tags'
const DivThree = styled(Div)`
  height: 70px;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`



// Own
const InputCommon = styled(Input)`
  height: 30px;
  
  background-color: ${props => props.theme.COLOR_middle};
  
  border: 1px solid ${props => props.theme.color_very_weak};
  margin-left: 8px;
  margin-right: 8px;
  
  margin-bottom: 4px;
  margin-top: 4px;

  border-radius: 4px;
`







 const Edit = ({
   
   language
   
   , user
   , readyUser, loadingUser
   
   
   ,dictHeroBasic
   ,listAllMap
   
  , title
  , listIdMap
  , listPosition
  , listTag
  
  , comment
  , video
  
  
   , whichAdding
   , locationAddingMap
   , locationAddingHero
   
   
   , replaceData2
   
   , replaceDataCompGallery
   , replaceData2CompGallery
   , replaceListPosition
   
   , addDeleteNotification
   
 }) => {
  
  const listHeroDefault = [];
  
  const { idComp } = useParams();
  const history = useHistory(); 
  
  const [stageDelete, setStageDelete] =useState(0);
  
  useEffect(() => {

    (async() => {
      
      try {
          
        replaceData2("ready", "editingComp", false);
        replaceData2("loading", "editingComp", true);
        
        const { data } = await axios.get(`${config.URL_API_NS}/comp/${idComp}`);
        
        if (!user._id) { history.push( `/auth/log-in` ) } 
        else if (data.author !== user._id) { history.push( `${config.URL_THIS}/comp-gallery/focus/${idComp}` ) } 
        
        let listPositionTemp = data.listPosition;
        const numberRemaining = 5 - listPositionTemp.length;
        for (var i = numberRemaining; i>0; i--) {
          listPositionTemp.push({ listIdHero: [] });
        }
        
        const editingCompTemp = {
          
          _id: data._id
          , title: data.title
          , listIdMap: data.listIdMap
          
          , listPosition: listPositionTemp
          
          , listTag: data.listTag
          
          , whichAdding: "Hero"
          
          , locationAddingMap: [0]
          , locationAddingHero: [0,0]
          
          , triggerPosition: ""
          , triggerMap: ""
          
        }
        
        
        replaceDataCompGallery("edit", editingCompTemp);
        replaceData2("loading", "editingComp", false);
        replaceData2("ready", "editingComp", true);
        

      } catch (error) {

        addDeleteNotification("basic01", language);
        console.log(error)
      }
     
    })() // async

  }, [])
  

  
  // 입력중인 내용을 redux -> localstorage 저장하기 위해서!
  const useInput_redux_CompGallery = (value, which1, which2) => {
  
  	const onChange = event => {
  		//console.log(event.target.value)
  		replaceData2CompGallery(which1, which2, event.target.value);
  	}
  	return {value, onChange};
  }
  
  
  // information of comp
  // just use useState for simple inputs (which don't need communication with child components)
  const inputTitle = useInput_redux_CompGallery(title, "edit", "title"); // {value, setValue, onChange};
  //const inputAuthor = useInput("");
  
  
  const onClick_ButtonEdit = async (event) => {
    
    try {
      
      let listExistingPosition = [];
      // 비어있는 position 들은 제거
      for (const position of listPosition) {
        if (position.listIdHero.length >0) {
          listExistingPosition.push(position);
        }
      }
      
      let size = listExistingPosition.length;
      
      const listIdMainHero = listExistingPosition.map(element => element.listIdHero[0]);
      const setIdMainHero = new Set(listIdMainHero)

      
      if (!readyUser) {
        addDeleteNotification("auth31", language);
        const query = queryString.stringify({
          "destination": "/comp-gallery/create"
        });
        history.push('/auth/log-in?' + query)
      }
      
      else if ( inputTitle === "" ) {
        addDeleteNotification("comp03", language);
      }
      
      else if ( ![2,3,5].includes(size) ) {
        addDeleteNotification("comp04", language);
      }
      
      else if ( listIdMap.length === 0 ) {
        addDeleteNotification("comp05", language);
      }
      else if ( listIdMainHero.length !== setIdMainHero.size ) {
        addDeleteNotification("comp06", language);
      }
    
      
      else  {
        
        
        
        let compRequest = {
          
          author: user._id
          
          ,title: inputTitle.value
          
          ,listPosition: listPosition
          
          ,listIdMap: listIdMap
          ,listTag: listTag
    
        }
        
        
        await axios.put(`${config.URL_API_NS}/comp/${idComp}`, compRequest);
        
        addDeleteNotification("comp011", language);
        history.push(`/comp-gallery/focus/${idComp}`);
        }
        
    } catch (error) {
      addDeleteNotification("comp021", language);
    }
  }
  
  
  const onClick_ButtonDelete = async (event) => {
    
    if (stageDelete === 0) {
      setStageDelete(1);
      setTimeout( ()=>{ setStageDelete(0) }, 5000);
    }
    
    else {
      
      try {
          
        await axios.delete(`${config.URL_API_NS}/comp/${idComp}`);
        
        addDeleteNotification("comp012", language);
        history.push('/comp-gallery/');
          
      } catch (error) {
        addDeleteNotification("comp022", language);
      }
    } // else
  }
  
  const returnChoose = (whichAdding) => {
    switch (whichAdding) {
      case "Hero":
        return (<ChooseHero />);
        break;
      case "Map":
        return (<ChooseMap />);
        break;
      case "Tag":
        return (<Div> choose tag </Div>);
        break;
    }
  }
  
  return (
  
  <DivEdit>

      <DivA> 
        
        <GroupButton>
        
          <ButtonEdit
            onClick={(event) => onClick_ButtonEdit(event)}
          >
            {(() => {
                switch (language) {
                  case 'ko': 
                    return '수정';
                  case 'ja': 
                    return '修正';
                  default: // eng
                    return 'Edit';
                }
              })()}
          </ButtonEdit>
          
          <ButtonDelete
            onClick={(event) => onClick_ButtonDelete(event)}
            stage={stageDelete}
          >
            {(() => {
                switch (language) {
                  case 'ko': 
                    return '삭제';
                  case 'ja': 
                    return '削除';
                  default: // eng
                    return 'Delete';
                }
              })()}
          </ButtonDelete>
          
        </GroupButton>
      
      
        <DivEditingComp>
        
        
          <DivOne> 
            <Div>  <InputCommon  {...inputTitle} placeholder={(() => {
              switch (language) {
                case 'ko': 
                  return '제목';
                case 'ja': 
                  return 'タイトル';
                default: // eng
                  return 'Title';
              }
            })()} />  </Div>
          </DivOne>
          
          <DivThree> 
            < ListTagReady />
          </DivThree>
        
        
          <DivTwo> 
            
            <ContainerMapsReady>
              <ListMapReady />
            </ContainerMapsReady>
            
            <DivListPositionReady>
              {[0,1,2,3,4].map((element, index) => {
                return (
                
                  <PositionReady 
                    
                    key={index}  
                    indexPosition={element} 
                    
                    />
                ) 
              })}
            </DivListPositionReady>
            
          </DivTwo>
        
        
        </DivEditingComp>
        
      
      </DivA>

    

      <DivB>
        {returnChoose(whichAdding)} 
      </DivB>

  </DivEdit>
  
  )

}




function mapStateToProps(state) { 
  return {
    
    language: state.basic.language
    
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    , loadingUser: state.basic.loading.user
    
    
    , idComp: state.comp_gallery.edit._id
    , title: state.comp_gallery.edit.title
    , listIdMap: state.comp_gallery.edit.listIdMap
    , listPosition: state.comp_gallery.edit.listPosition
    , listTag: state.comp_gallery.edit.listTag
    
    
    , editingComp: state.comp_gallery.edit
    , readyEditingComp: state.basic.ready.editingComp
    , loadingEditingComp: state.basic.loading.editingComp
    
    , whichAdding: state.comp_gallery.edit.whichAdding
    , locationAddingMap: state.comp_gallery.edit.locationAddingMap
    , locationAddingHero: state.comp_gallery.edit.locationAddingHero
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    , replaceDataCompGallery : (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    ,replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    ,replaceListPosition : (replacement) => dispatch(replaceListPosition(replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}


export default connect(mapStateToProps, mapDispatchToProps)(Edit);

