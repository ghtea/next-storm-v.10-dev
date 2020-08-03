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

import {replaceWorking} from "../../redux/actions/basic";
import {replaceDataCompGallery, replaceData2CompGallery, replaceListPosition} from "../../redux/actions/comp_gallery";


import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, Img, Textarea} from '../../styles/DefaultStyles';

import ChooseHero from './Create/ChooseHero';
import ChooseMap from './Create/ChooseMap';

import PositionReady from './Create/PositionReady';
import MapsReady from './Create/MapsReady';
import TagsReady from './Create/TagsReady';

import useInput from '../../tools/hooks/useInput';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconPlus from '../../svgs/basic/IconPlus'
import * as imgHero from '../../images/heroes'



const DivCreate = styled(Div)`
  
  display: grid;
  align-items: start;
  
  position: fixed;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    grid-template-columns: minmax(370px, 1fr);
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 
      "A"
      "B";
    grid-gap: 20px;
    
    width: 100%;
    height: calc(100% - 100px);
  }
 

  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
    
    grid-template-columns: minmax(370px, 1fr) minmax(370px, 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: 
      "A B";
    grid-gap: 20px;
    
    
    width: calc(100% - 120px);
    height: calc(100% - 50px);
  
  }
`;


const ContainerA = styled(Div)`
  grid-area: A;
  
  position: relative;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    height: 100%;
  }
 

  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
    height: 100%;
  }
`

const ContainerB = styled(Div)`
  grid-area: B;
  
  position: relative;
  
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    height: 100%;
  }
 

  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
    height: 100%;
  }
`




const DivA = styled(Div)`
  overflow: auto;
  position: absolute;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    height: 100%;
  }
 
  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
    height: 100%;
  }
`

const DivB = styled(Div)`
  overflow: auto;
  position: absolute;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    height: 100%;
  }
 
  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
    height: 100%;
  }
`



//
const ButtonCreate = styled(Button)`
  width: 150px;
  height: 36px;
  
  border-radius: 8px;
  
  margin-top: 10px;
  margin-bottom: 5px;
`

const DivCreatingComp = styled(Div)`
  width: 360px;
  height: auto;
  
  margin-top: 5px;
  margin-bottom: 20px;
  margin-left: 5px;
  margin-right: 5px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & > div:first-child {border-radius: 10px 10px 0 0;}
  & > div:last-child {border-radius: 0 0 10px 10px;}
  
`


// title, author
const DivOne = styled(Div)`
  
  height: 50px;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
    
  }
`

// 정렬 방식 고민중 https://css-tricks.com/vertically-center-multi-lined-text/

// maps + positions
const DivTwo = styled(Div)`
  height: 200px;
  
  background-color: ${props => props.theme.COLOR_middle};
  border-left: 6px solid  ${props => props.theme.COLOR_normal};
  
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  
  & > div {
    
  }
  
`



const DivPositionsReady = styled(Div)`
  width: 300px;
  height: 100%;
 
  overflow-x: auto;
  
  background-color: ${props => props.theme.COLOR_bg};
  
  border-right: 6px solid  ${props => props.theme.COLOR_normal};
  
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
`



// 'tags'
const DivThree = styled(Div)`
  height: 80px;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`

// comments
const DivFour = styled(Div)`
  height: 180px;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
`

// links
const DivFive = styled(Div)`
  height: 90px;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
`





export const SubCreate = ({}) => {
  
  return (
  <Div>
    create!
  </Div>
  
  )
}






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

const InputLink = styled(InputCommon)`
  margin-top: 2px;
  margin-bottom: 2px;
`


const TextareaComment =  styled(Textarea)`
  height: 180px;
  
  background-color: ${props => props.theme.COLOR_middle};
  
  border: 1px solid ${props => props.theme.color_very_weak};
  margin-left: 8px;
  margin-right: 8px;
  
  margin-top: 8px;
  margin-bottom: 4px;

  border-radius: 4px;
`


// Two
const DivEachMap = styled(Div)`
  width: auto;
  margin-left: auto;
  margin-right: auto;
`







 const Create = ({
   
   language
   , readyUser, loadingUser
   , auth
   
   ,dictHeroBasic
   ,listAllMap
   
   ,listMap
    , listPosition
    ,listTag
  
   , whichAdding
   , locationAddingMap
   , locationAddingHero
   
   
   
   , replaceDataCompGallery
   , replaceData2CompGallery
   , replaceListPosition
   
   , addDeleteNotification
   
 }) => {
  
  const listHeroDefault = [];
  //const listPositionDefault = new Array(5).fill(listHeroDefault);
  // for test
  
  
  
  // error!!, Position 은 object 여야 한다?! 
  
  const history = useHistory(); 
  
  
  useEffect(()=>{
    const compCreating = storage.get("comp-creating");
    if (compCreating) {
      console.log(typeof(compCreating))
      console.log(compCreating)
      //replaceDataCompGallery("create", compCreating);
    }
  },[])
  
  
  // information of comp
  // just use useState for simple inputs (which don't need communication with child components)
  const inputTitle = useInput(""); // {value, setValue, onChange};
  //const inputAuthor = useInput("");
  
  const inputPassword1 = useInput("");
  const inputPassword2 = useInput("");
  
  const [rating, setRating] = useState({});
  
  const inputComment = useInput("");
  
  const inputLink1 = useInput("");
  const inputLink2 = useInput("");
  
 
  
  const onClick_ButtonCreate = async (event) => {
    
    try {
      
      let size = 0;
      for (const position of listPosition) {
        if (position["listIdHero"].length > 0) {
          size = size + 1;
        }
      }
      console.log(size)
      
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
      
      else if ( listMap.length === 0 ) {
        addDeleteNotification("comp05", language);
      }
      
      else  {
      
        const idComp = uuidv4();
        const idComment = uuidv4();
        const idLink1 = uuidv4();
        const idLink2 = uuidv4();
      
      
        const commentRequest = {
          
          _id: idComment
          , subject: {_id: idComp, model: "Comp"}
          
          , author: auth._id
          
          //, language: String
          , content: inputComment.value
          // , listLike:
        }
        
        const link1Request = {
          
          _id: idLink1
          , subject: {_id: idComp, model: "Comp"}
          
          , author: auth._id
          
          , type: "" // video, guide, 
          , content: inputLink1.value
          
          //, listLike: [String] 
        }
        
        const link2Request = {
          _id: idLink2
          , subject: {_id: idComp, model: "Comp"}
          
          , author: auth._id
          
          , type: "" // video, guide, 
          , content: inputLink2.value
          
          //, listLike: [String] 
        }
        
       
        let bodyRequest = {};
        
        const compRequest = {
          
          _id: idComp
          ,author: auth._id
          
          ,title: inputTitle.value
          
          ,listPosition: listPosition
          ,listMap: listMap
          ,listTag: listTag
          
          ,listComment: []
          ,listLink: []
          
          ,listLike: []
        }
        
        
        
        
        if (commentRequest.content !== "") {
          bodyRequest["comment"] = commentRequest;
          compRequest["listComment"].push(idComment);
        }
        
        if (link1Request.content !== "") {
          bodyRequest["link1"] = link1Request;
          compRequest["listLink"].push(idLink1);
        }
        
        if (link2Request.content !== "") {
          bodyRequest["link2"] = link2Request;
          compRequest["listLink"].push(idLink2);
        }
        
        bodyRequest["comp"] = compRequest
        
        await axios.post(`${config.URL_API_NS}/comp/`, bodyRequest);
        
        addDeleteNotification("comp01", language);
        
        }
        
    } catch (error) {
      addDeleteNotification("comp02", language);
    }
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
  
  <DivCreate>
    <ContainerA>
      <DivA> 
        
        <ButtonCreate
          onClick={(event) => onClick_ButtonCreate(event)}
        >
          CREATE
        </ButtonCreate>
      
        <DivCreatingComp>
        
          <DivOne> 
          
            <Div>  <InputCommon  {...inputTitle} placeholder="title of composition" />  </Div>
            <Div> {`${auth.battletag}`} </Div>
            
          </DivOne>
        
          <DivTwo> 
            <MapsReady />
            
            <DivPositionsReady>
              {[0,1,2,3,4].map((element, index) => {
                return (
                
                  <PositionReady 
                    
                    key={index}  
                    indexPosition={element} 
                    
                    />
                ) 
              })}
            </DivPositionsReady>
          </DivTwo>
        
          <DivThree> 
            < TagsReady />
          </DivThree>
          
          <DivFour> 
            <Div> <TextareaComment {...inputComment} placeholder="comment" /> </Div>
          </DivFour>
          
          <DivFive>
            <Div> <InputLink  {...inputLink1} placeholder="link (ex: twitch, youtube)" /> </Div>
            <Div> <InputLink  {...inputLink2} placeholder="link (ex: screenshot, guide)" /> </Div>
          </DivFive>
        
        </DivCreatingComp>
        
      
      </DivA>
    </ContainerA>
    
    <ContainerB>
      <DivB>
        {returnChoose(whichAdding)} 
      </DivB>
    </ContainerB>
  </DivCreate>
  
  )

}

/*
<MapReady 
              
              idMapChosen={idMapChosen}
              
              listMap={listMap} 
              setListMapForChild={setListMapForChild} 
              
              listAllMap={listAllMap} 
              
              setWhichAddingForChild={setWhichAddingForChild}
              locationAddingMap={locationAddingMap}
              setLocationAddingMapForChild={setLocationAddingMapForChild}
            
            /> 
*/
  
  


function mapStateToProps(state) { 
  return {
    
    auth: state.auth
    , language: state.basic.language
    , readyUser: state.basic.ready.user
    , loadingUser: state.basic.loading.user
    
    ,listMap: state.comp_gallery.create.listMap
    , listPosition: state.comp_gallery.create.listPosition
    , listTag: state.comp_gallery.create.listTag
    
    , whichAdding: state.comp_gallery.create.whichAdding
    , locationAddingMap: state.comp_gallery.create.locationAddingMap
    , locationAddingHero: state.comp_gallery.create.locationAddingHero
    
    //, idMapChosen: state.comp_gallery.create.idMapChosen
    //, idHeroChosen: state.comp_gallery.create.idHeroChosen
    
    //, triggerPosition: state.comp_gallery.create.triggerPosition
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    replaceDataCompGallery : (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    ,replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    ,replaceListPosition : (replacement) => dispatch(replaceListPosition(replacement))
    
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}


export default connect(mapStateToProps, mapDispatchToProps)(Create);

