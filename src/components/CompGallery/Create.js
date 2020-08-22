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

import {replaceData2, replaceWorking} from "../../redux/actions/basic";
import {replaceDataCompGallery, replaceData2CompGallery, replaceListPosition} from "../../redux/actions/comp_gallery";


import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, Img, Textarea} from '../../styles/DefaultStyles';

import ChooseHero from './Create/B/ChooseHero';
import ChooseMap from './Create/B/ChooseMap';


import ListMapReady from './Create/A/ListMapReady';
import ListTagReady from './Create/A/ListTagReady';
import PositionReady from './Create/A/ListPositionReady/PositionReady';

import useInput from '../../tools/hooks/useInput';
import useInput_CompGallery from '../../tools/hooks/useInput_CompGallery';

import {getTimeStamp} from '../../tools/vanilla/time';

import IconPlus from '../../svgs/basic/IconPlus';
import IconVideo from '../../svgs/basic/IconVideo';
//import IconLink from '../../svgs/basic/IconLink';

import * as imgHero from '../../images/heroes'



const DivCreate = styled(Div)`
  
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
const ButtonCreate = styled(Button)`
  background-color: ${props => props.theme.color_active};
  color: ${props => props.theme.COLOR_normal};
  
  width: 90px;
  height: 30px;
  
  border-radius: 9px;
  
  position: fixed;
  top: 120px;
  z-index: 100;
  
  @media (min-width:  ${props => props.theme.media.md }px) {
    position: static;
    z-index: 0;
  }
`

const DivCreatingComp = styled(Div)`
  
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
    height: 200px;
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

// comments
const DivFour = styled(Div)`
  height: auto;
  min-height: 100px;
  
  background-color: ${props => props.theme.COLOR_normal};
  border: 10px solid  ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
`

// video, link
const DivFive = styled(Div)`
  height: 70px;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & > div:nth-child(1) {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    padding-left: 15px;
    font-size: 0.9rem;
  }
  
  & > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    & > *:nth-child(1) { width: 40px; margin-left: 10px;}
    & > *:nth-child(2) { width: 300px; margin-right: 10px;}
  }
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

const InputVideoLink = styled(InputCommon)`
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: 4px;
  margin-right: 4px;
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





 const Create = ({
   
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
  //const listPositionDefault = new Array(5).fill(listHeroDefault);
  // for test
  
  
  
  // error!!, Position 은 object 여야 한다?! 
  
  const history = useHistory(); 
  
  
  useEffect(()=>{
    const compCreating = storage.get("comp-creating");
    if (compCreating) {
      console.log(typeof(compCreating))
      console.log(compCreating)
      replaceDataCompGallery("create", compCreating);
    }
  },[])
  
  
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
  const inputTitle = useInput_redux_CompGallery(title, "create", "title"); // {value, setValue, onChange};
  //const inputAuthor = useInput("");
  
  const inputComment = useInput_redux_CompGallery(comment, "create", "comment");
  const inputVideo = useInput_redux_CompGallery(video, "create", "video");
  
 
  
  const onClick_ButtonCreate = async (event) => {
    
    try {
      
      let listExistingPosition = [];
      //  영웅이 들어있는 포지션만 입력
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
        
        let bodyRequest = {};
        
        const idComp = uuidv4();
        
        
        let compRequest = {
          
          _id: idComp
          ,author: user._id
          
          ,title: inputTitle.value
          
          ,listPosition: listExistingPosition
          
          ,listIdMap: listIdMap
          ,listTag: listTag
          
          ,listIdComment: []
          ,listIdVideo: []
          
          ,listUserLike: []
          ,listUserReport: []
        }
        
        
        let idComment;
        let commentRequest={};
        if (inputComment.value) {
          idComment = uuidv4();
          
          commentRequest = {
          
            _id: idComment
            , subject: {_id: idComp, model: "Comp"}
            
            , author: user._id
            
            //, language: String
            , content: inputComment.value
            // , listLike:
          }
          
          compRequest["listIdComment"]=[idComment];
          bodyRequest["comment"] = commentRequest;
        }
        
        
        let idVideo; // for _id in Mongodb
        
        let typeVideo;
        let idContentVideo = "";
        
        let videoRequest={};
        if (inputVideo.value) {
          idVideo = uuidv4();
          
          // https://regexr.com/3akf5
          const isYoutube = /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/;
          
          const isTwitchClip1 = /[\W\w]*www.twitch.tv\/[\W\w]*\/clip\//; // https://www.twitch.tv/akr114/clip/SassyEagerHamBibleThump?filter=clips&range=30d&sort=time
          const isTwitchClip2 = /[\W\w]*clips.twitch.tv\//; // https://clips.twitch.tv/RudeCrispyPheasantAllenHuhu
          
          
          if (isYoutube.test(inputVideo.value)){
            typeVideo = "Youtube";
            
            
          // https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
            const matchIdContent = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = (inputVideo.value).match(matchIdContent);
            if (match&&match[7].length==11) {
              idContentVideo = match[7];
            }
            
          }
          
          else if (isTwitchClip1.test(inputVideo.value)){
            typeVideo = "Twitch Clip";
            // https://stackoverflow.com/questions/31262539/how-can-i-extract-text-from-the-middle-of-a-string-with-javascript
            const regexFront = /[\W\w]*www.twitch.tv\/[\W\w]*\/clip\//;
            const regexBack = /(\?[^\?]*)$/
            
            idContentVideo = inputVideo.value.replace(regexFront, "");
            idContentVideo = idContentVideo.replace(regexBack, "");
          }
          
          else if (isTwitchClip2.test(inputVideo.value)){
            typeVideo = "Twitch Clip";
            // https://stackoverflow.com/questions/31262539/how-can-i-extract-text-from-the-middle-of-a-string-with-javascript
            const regexFront = /[\W\w]*clips.twitch.tv\//;
            const regexBack = /(\?[^\?]*)$/
            
            idContentVideo = inputVideo.value.replace(regexFront, "");
            idContentVideo = idContentVideo.replace(regexBack, "");
          }
          
          
          else {
            typeVideo = "Others";
          }
          
          videoRequest = {
          
            _id: idVideo
            , subject: {_id: idComp, model: "Comp"}
            
            , author: user._id
            
            , type: typeVideo
            , urlContent: inputVideo.value
            , idContent: idContentVideo
            // , listLike:
          }
          
          compRequest["listIdVideo"]=[idVideo];
          bodyRequest["video"] = videoRequest;
        }
      
        
        bodyRequest["comp"] = compRequest
        
        await axios.post(`${config.URL_API_NS}/comp/`, bodyRequest);
        
        
        addDeleteNotification("comp01", language);
        //replaceData2("loading", "listComp", false);
        replaceData2("ready", "focusingComp", false);
        replaceData2("ready", "focusingCompComment", false);
        replaceData2("ready", "focusingCompVideo", false);
        
        history.push(`/comp-gallery/focus/${idComp}`);
        
        storage.remove("comp-creating");
        
        const reset = {
          title: ""
          , listIdMap: []
          , listPosition: [ { listIdHero: [] }, { listIdHero: [] }, { listIdHero: [] }, { listIdHero: [] }, { listIdHero: [] } ]
          , listTag: ["ToWin", "Kill"]
          
          , comment: ""
          , video: ""
          
          , whichAdding: "Hero"
          
          , locationAddingMap: [0]
          , locationAddingHero: [0,0]
          
          , triggerPosition: ""
          , triggerMap: ""
        }
        
        replaceDataCompGallery("create", reset);
        
        
      } // else
        
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

      <DivA> 
        
        <ButtonCreate
          onClick={(event) => onClick_ButtonCreate(event)}
        >
          {(() => {
              switch (language) {
                case 'ko': 
                  return '공개';
                case 'ja': 
                  return '公開';
                default: // eng
                  return 'Publish';
              }
            })()}
        </ButtonCreate>
      
      
      
        <DivCreatingComp>
        
        
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
        
          
          
          <DivFour> 
            <Div> <TextareaComment {...inputComment} placeholder="comment" /> </Div>
          </DivFour>
          
          <DivFive>
            <Div> Youtube or Twitch 'Clip'</Div>
            <Div> 
              <Div> <IconVideo width={'20px'}  height={'20px'} color={'color_very_weak'} /> </Div>
              <InputVideoLink  {...inputVideo} placeholder="link" /> 
            </Div>
            
          </DivFive>
        
        </DivCreatingComp>
        
      
      </DivA>

    

      <DivB>
        {returnChoose(whichAdding)} 
      </DivB>

  </DivCreate>
  
  )

}

/*
<MapReady 
              
              idMapChosen={idMapChosen}
              
              listIdMap={listIdMap} 
              setlistIdMapForChild={setlistIdMapForChild} 
              
              listAllMap={listAllMap} 
              
              setWhichAddingForChild={setWhichAddingForChild}
              locationAddingMap={locationAddingMap}
              setLocationAddingMapForChild={setLocationAddingMapForChild}
            
            /> 
*/
  
  


function mapStateToProps(state) { 
  return {
    
    language: state.basic.language
    
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    , loadingUser: state.basic.loading.user
    
    ,listIdMap: state.comp_gallery.create.listIdMap
    , listPosition: state.comp_gallery.create.listPosition
    , listTag: state.comp_gallery.create.listTag
    
    , title: state.comp_gallery.create.title
    , comment : state.comp_gallery.create.comment
    , video: state.comp_gallery.create.video
    
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
    
    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}


export default connect(mapStateToProps, mapDispatchToProps)(Create);

