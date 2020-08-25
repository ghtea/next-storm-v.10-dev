import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';

import Media from 'react-media';

import { v4 as uuidv4 } from 'uuid';
import * as config from '../config';
import { useHistory } from 'react-router-dom';

import { connect } from "react-redux";
import {replaceData, replaceData2} from "../redux/actions/basic";
import {replaceDataReaction, replaceData2Reaction} from "../redux/actions/reaction";

import addDeleteNotification from "../redux/thunks/addDeleteNotification";
import dictCode from '../others/dictCode';

import { NavLink } from 'react-router-dom';
import {Div, Button, Textarea, Input} from '../styles/DefaultStyles';
import storage from '../tools/vanilla/storage';

import IconComment from '../svgs/basic/IconComment';
import IconVideo from '../svgs/basic/IconVideo';

import understandUrlVideo from '../tools/others/understandUrlVideo';


const DivReaction = styled(Div)`
	
	visibility: ${props => (props.visibility==="visible")? "visible" : "hidden"};
	
	
  z-index: 400; 
  
  width: 360px;
  height: auto;
  
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
 `

const GroupButton = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  margin-bottom: 20px;
`

const ButtonUpload = styled(Button)`
  
  width: 150px;
`

const ButtonDelete = styled(Button)`
  background-color: ${props => (props.stage === 0)? props.theme.COLOR_normal : props.theme.COLOR_delete};
  color: ${props => (props.stage === 0)? props.theme.color_weak : props.theme.color_delete};
  
  width: 150px;
`

const ButtonCancel = styled(Button)`
  margin-top: 20px;
  width: 150px;
`

const DivContent = styled(Div)`
  background-color: ${props => props.theme.COLOR_normal};
  border-radius: 10px;
  
  padding-top: 10px;
  padding-bottom: 10px;
  
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  & > div {
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    
  }
`


const InputVideoLink = styled(Input)`
  border-radius: 4px;
  
  width: 340px;
  
  background-color: ${props => props.theme.COLOR_middle};
  border: 1px solid ${props => props.theme.color_very_weak};
`

const TextareaComment =  styled(Textarea)`
  height: 180px;
  width: 340px;
  
  border-radius: 4px;
  background-color: ${props => props.theme.COLOR_middle};
  border: 1px solid ${props => props.theme.color_very_weak};
  
  margin-left: 8px;
  margin-right: 8px;
  
  margin-top: 8px;
  margin-bottom: 4px;

  
`


const Reaction = ({
	
	location
	
	, visibility
	
  , mode
  , which
  
  , authorReaction
  , idReaction
  , idSubject
  , modelSubject

	
	, language
	, user, readyUser
	
	
	, comment_content
	, video_urlContent
	
	,replaceData, replaceData2
	
	, addDeleteNotification
	
	, replaceDataReaction, replaceData2Reaction
	
	, loading_reactionToEdit, ready_reactionToEdit
	}) => {
	
	
	const history = useHistory();
	
	const [stageDelete, setStageDelete] =useState(0);
	
	 useEffect(() => {

    (async() => {
      
      if (visibility === "visible" && mode === "edit") {
  	    
  	    if (!readyUser) { 
  	      addDeleteNotification("auth31", language);
  	    }
  	    else if (user._id !== authorReaction) { 
  	      addDeleteNotification("auth32", language);
  	    }
  	    
  	    
  	    else {
          try {
        		
            replaceData2("ready", "reactionToEdit", false);
            replaceData2("loading", "reactionToEdit", true);
                
            const { data } = await axios.get(`${config.URL_API_NS}/${which}/${idReaction}`);
              
            console.log(data);
            
            replaceDataReaction(`${which}`, data);
            
            replaceData2("loading", "reactionToEdit", false);
            replaceData2("ready", "reactionToEdit", true);
  
          } catch (error) {
  
            addDeleteNotification("basic01", language);
            console.log(error)
          }
  	    }
			
      } // if visibility...
      
    })() // async
  }, [visibility])

	
	
	const useInput_redux_reaction= (value, which1, which2) => {
  	const onChange = event => {
  		replaceData2Reaction(which1, which2, event.target.value);
  	}
  	return {value, onChange};
  }
  
  const inputComment = useInput_redux_reaction(comment_content, "comment", "content");
  const inputVideo = useInput_redux_reaction(video_urlContent, "video", "urlContent");
	
	
	
	const onClick_Cancel = (event) => {
	  replaceDataReaction("visibility", "hidden");
	}
	
	
	
  const onClick_ButtonDelete = async (event) => {
    
    if (stageDelete === 0) {
      setStageDelete(1);
      setTimeout( ()=>{ setStageDelete(0) }, 5000);
    }
    
    else if (which === "comment" && mode === "edit") {
      
      try {
        
        await axios.delete(`${config.URL_API_NS}/comment/${idReaction}`);
        
        addDeleteNotification("reaction013", language);
        replaceDataReaction("visibility", "hidden");
        replaceData2("ready", "listComment", false); // for rerender (re-axios)
        replaceData2("ready", "focusingComp", false); // for rerender (re-axios)
        
      } catch (error) {
        addDeleteNotification("reaction023", language);
      }
    } 
    
    else if (which === "video" && mode === "edit") {
      
      try {
        
        await axios.delete(`${config.URL_API_NS}/video/${idReaction}`);
        
        addDeleteNotification("reaction113", language);
        replaceDataReaction("visibility", "hidden");
        replaceData2("ready", "listVideo", false); 
        replaceData2("ready", "focusingComp", false);
      } catch (error) {
        addDeleteNotification("reaction123", language);
      }
    } 
  }
  
  
	
	const onClick_Upload = async (event) => {
	  
	  try {
	    
	    if (!readyUser) {
        addDeleteNotification("auth31", language);
        
        const query = queryString.stringify({
          "shouldGoBack": "yes"
        });
        history.push('/auth/log-in?' + query)
      }
      else if ( which === "comment" && comment_content  === "" ) {
        addDeleteNotification("reaction03", language);
      }
      else if ( which === "video" && video_urlContent === "" ) {
        addDeleteNotification("reaction13", language);
      }
  	    
	  
	    
  	  else if (mode === "create" && which==="comment") {
  	    const request = {
          _id: uuidv4()
          , subject: {_id: idSubject, model: modelSubject}
          
          , author: user._id
          
          , content: comment_content
        }
        // 
        try {
          await axios.post(`${config.URL_API_NS}/comment/`, request);
          addDeleteNotification("reaction011", language);
          replaceDataReaction("visibility", "hidden");
          replaceData2("ready", "listComment", false);
          replaceData2("ready", "focusingComp", false);
        }
        catch {
          addDeleteNotification("reaction021", language);
        }
  	  }
  	  
  	  else if (mode === "create" && which==="video") {
  	    const request = {
          _id: uuidv4()
          , subject: {_id: idSubject, model: modelSubject}
          
          , author: user._id
          
          , type: understandUrlVideo(video_urlContent)[0]
          , urlContent: video_urlContent
          , idContent: understandUrlVideo(video_urlContent)[1]
        }
        try {
          await axios.post(`${config.URL_API_NS}/video/`, request);
          addDeleteNotification("reaction111", language);
          replaceDataReaction("visibility", "hidden");
          replaceData2("ready", "listVideo", false);
          replaceData2("ready", "focusingComp", false);
        }
        catch {
          addDeleteNotification("reaction121", language);
        }
  	  }
  	  
  	  else if (mode === "edit" && which==="comment") {
  	    const request = {
          subject: {_id: idSubject, model: modelSubject}
          
          , author: user._id
          , content: comment_content
        }
        try {
          await axios.put(`${config.URL_API_NS}/comment/${idReaction}`, request);
          addDeleteNotification("reaction012", language);
          replaceDataReaction("visibility", "hidden");
          replaceData2("ready", "listComment", false);
          replaceData2("ready", "focusingComp", false);
        }
        catch {
          addDeleteNotification("reaction022", language);
        }
  	  }
  	  
  	  else if (mode === "edit" && which==="video") {
	      const request = {
          subject: {_id: idSubject, model: modelSubject}
          
          , author: user._id
          
          , type: understandUrlVideo(video_urlContent)[0]
          , urlContent: video_urlContent
          , idContent: understandUrlVideo(video_urlContent)[1]
        }
        try {
          await axios.put(`${config.URL_API_NS}/video/${idReaction}`, request);
          addDeleteNotification("reaction112", language);
          replaceDataReaction("visibility", "hidden");
          replaceData2("ready", "listVideo", false);
          replaceData2("ready", "focusingComp", false);
        }
        catch {
          addDeleteNotification("reaction122", language);
        }
	    }
	  } catch(error) {
	    console.log(error);
	    addDeleteNotification("basic01", language);
	  }
	  
	}
	
	
	return (

  <DivReaction visibility={visibility}>
  	
  	<GroupButton>
  	
  	{(mode==="create")? 
    	<ButtonUpload
    	  onClick={onClick_Upload}
    	>  {(() => {
              switch (language) {
                case 'ko': 
                  return '생성';
                case 'ja': 
                  return '作成';
                default: // eng
                  return 'Create';
              }
            })()} </ButtonUpload>
  	: <ButtonUpload
    	  onClick={onClick_Upload}
    	>  {(() => {
              switch (language) {
                case 'ko': 
                  return '업데이트';
                case 'ja': 
                  return 'アップデート';
                default: // eng
                  return 'Update';
              }
            })()} </ButtonUpload>}
  	
  	{( mode === "edit") &&
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
  	}
          
    </GroupButton>
  	
  	{ ( (mode === "create") ||  ready_reactionToEdit) && (which === "comment") &&
  		<DivContent>
  		  <Div>
      		<Div> {(() => {
              switch (language) {
                case 'ko': 
                  return '댓글';
                case 'ja': 
                  return 'コメント';
                default: // eng
                  return 'Comment';
              }
            })()} </Div>
    		</Div> 
    		
    		<Div>
    		  <TextareaComment {...inputComment} placeholder={(() => {
              switch (language) {
                case 'ko': 
                  return '댓글';
                case 'ja': 
                  return 'コメント';
                default: // eng
                  return 'comment';
                }
              })()} /> 
    		</Div>
    	</DivContent>
  	}
		
		
		{ ( (mode === "create") ||  ready_reactionToEdit) && (which === "video") &&
  		<DivContent>  
  		  <Div> 
  		    <Div> Youtube or Twitch 'Clip'</Div>
  		  </Div>
  		  
        <Div> 
          <InputVideoLink  {...inputVideo} placeholder={(() => {
                switch (language) {
                  case 'ko': 
                    return '링크 (단축 링크 제외)';
                  case 'ja': 
                    return 'リンク(短縮リンクを除く)';
                  default: // eng
                    return 'link (no shortened link)';
                }
              })()} /> 
        </Div>
  		</DivContent>
  	}
  	
  	<ButtonCancel
  	  onClick={onClick_Cancel}
  	> {(() => {
              switch (language) {
                case 'ko': 
                  return '취소';
                case 'ja': 
                  return 'キャンセル';
                default: // eng
                  return 'Cancel';
              }
            })()} </ButtonCancel>
		
	</DivReaction>
	
	)
}


function mapStateToProps(state) { 
  return { 
  	
    language: state.basic.language
 
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    
    , visibility: state.reaction.visibility
    
    , mode:  state.reaction.mode
    , which: state.reaction.which
    
    , authorReaction: state.reaction.authorReaction
    , idReaction: state.reaction.idReaction
    , idSubject: state.reaction.idSubject
    , modelSubject: state.reaction.modelSubject
    
    , ready_reactionToEdit: state.basic.ready.reactionToEdit
    , loading_reactionToEdit: state.basic.loading.reactionToEdit
    
    
    , comment_content: state.reaction.comment.content
    , video_urlContent: state.reaction.video.urlContent
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceData: (which, replacement) => dispatch( replaceData(which, replacement) ) 
    , replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    
    ,replaceDataReaction : (which, replacement) => dispatch(replaceDataReaction(which, replacement))
    ,replaceData2Reaction : (which1, which2, replacement) => dispatch(replaceData2Reaction(which1, which2, replacement))
  }; 
}



// TableEntry 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Reaction);




/*

useEffect(() => {

    (async() => {
      
        try {
          
          const queryRecieved = queryString.parse(location.search);
   
          const modeReact = queryRecieved.mode
          const whichReact = queryRecieved.which
      		
          const queryRequest = queryString.stringify({
            idSubject: idSubject
            , modelSubject: modelSubject
          });
          
          replaceData2("ready", "listVideo", false);
          replaceData2("loading", "listVideo", true);
              
          const { data } = await axios.get(`${config.URL_API_NS}/video/?` + queryRequest );
            
          console.log(data)
          
          replaceData2CompGallery("videos", "listVideo", data);
          replaceData2("ready", "listVideo", true);
          replaceData2("loading", "listVideo", false);

        } catch (error) {

          addDeleteNotification("basic01", language);
          console.log(error)
        }

    })() // async

  }, [])
  
  
*/