
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../config';
import storage from '../../tools/vanilla/storage';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { replaceData2 } from "../../redux/actions/basic";
import { replaceDataPlayer, replaceData2Player } from "../../redux/actions/player";


import {  NavLink, useHistory, useParams } from 'react-router-dom';

import { Div, Input, Button } from '../../styles/DefaultStyles';

import Loading from '../_/Loading'

import useInput from '../../tools/hooks/useInput';

import IconSync from '../../svgs/basic/IconSync';





const DivGeneral = styled(Div)
`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`;


const DivInputBattletag = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > *:nth-child(1){
    border-radius: 8px 0 0 8px;
    width: 180px;
    height: 40px;
    margin-right: 2px;
  }
  
  & > *:nth-child(2){
    background-color: ${props => props.theme.color_very_weak};
    border-radius: 0 8px 8px 0;
    width: 40px;
    height: 40px;
    margin-left: 2px;
  }
  
`


const DivContainer = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`


const General = ({

  language
  , user
  
  , readyPlayerGeneral
  , loadingPlayerGeneral
  
  , replaceData2
  , replaceDataPlayer
  , replaceData2Player

  , addDeleteNotification
}) => {
  
  // input 안의 battletag 있는 상태로 update 버튼 ->   history.push() ? 
  
  // params 에 battletag 있으면 ->
    // local storage 에 있고, 업데이트 하루 안이면 local storage 꺼 읽기
    // local sotrge에 없거나 업데이트 오래전이면 -> @업데이트
    
  // input 에 battletag 담긴 상태에서 유저가 update 버튼 누르면 -> @업데이트
  
  const history = useHistory();
  
  const params = useParams();
  console.log(params);
  
  const inputBattletag = useInput("");
  
  //const [battletag, setBattletag] = useState("");
  const [triggerUpdate, setTriggerUpdate] = useState("")
  
  // const urlBattletag = encodeURIComponent(battletag);
  
  useEffect(()=>{
    if (params.battletagEncoded){
      
      replaceData2("ready", "playerGeneral", false);
      replaceData2("loading", "playerGeneral", true);
      
      
      inputBattletag.setValue( decodeURIComponent(params.battletagEncoded) );
      
      //const updated = Date.parse( storage.get("updatedPlayerGeneral") );
      const updated = storage.get("updatedPlayerGeneral"); // 우선 JSON.parse 는 거친다
      
      
      if (updated && ( updated > new Date().getTime() - 1000 * 60 * 60 * 24 * 1 ) ) {
        
        replaceDataPlayer("general", storage.get("playerGeneral") )
        replaceData2("loading", "playerGeneral", false);
        replaceData2("ready", "playerGeneral", true);
      }
      
      else {
        
        setTriggerUpdate(Date.now().toString());
        
      }
      
    }
  },[])
  
  
  const onClick_Update = () => {
    if (inputBattletag.value) {
      history.push(`/player/general/${encodeURIComponent(inputBattletag.value)}`);
      setTriggerUpdate(Date.now().toString());
    }
  }
  
  
  // trigger 변하면 무조건 업데이트
  useEffect(() => {
    (async() => {
      
      if ( inputBattletag.value ) {
        try {
          
          
          replaceData2("ready", "playerGeneral", false);
          replaceData2("loading", "playerGeneral", true);
          
          const resRegions = await axios.get(`${config.URL_API_NS}/player/regions/${encodeURIComponent(inputBattletag.value)}`);
          const listNameRegion = resRegions.data.listNameRegion;
          // [ 'NA', 'KR' ]
          
          //console.log(listNameRegion);
          
          const query = queryString.stringify({
            listNameRegion: listNameRegion
          });
          
          
          const resPlayerGeneral = await axios.get(`${config.URL_API_NS}/player/general/${encodeURIComponent(inputBattletag.value)}?` + query);
          const playerGeneralNew = resPlayerGeneral.data;
          
          
          
          replaceDataPlayer("general", playerGeneralNew );
          storage.set("playerGeneral", playerGeneralNew );
          storage.set("updatedPlayerGeneral", Date.now() );
          
          
          replaceData2("loading", "playerGeneral", false);
          replaceData2("ready", "playerGeneral", true);
          
    
        } catch (error) {
          replaceData2("ready", "playerGeneral", false);
          replaceData2("loading", "playerGeneral", false);
          
          addDeleteNotification("basic01", language);
          console.log(error)
        }
        
      }
     
    })() // async

  }, [ triggerUpdate ])


  
  return (
    
      <DivGeneral>
        
        <DivInputBattletag>
          <Input {...inputBattletag} placeholder="battletag#1234" />
          <Button onClick={onClick_Update} > <IconSync width={'24px'}  height={'24px'} color={'COLOR_normal'} /> </Button>
        </DivInputBattletag>
        
        
        { loadingPlayerGeneral && <Loading/> }
        
        { (!loadingPlayerGeneral && readyPlayerGeneral) &&
          <DivContainer>
          
            <Div> header </Div>
            <Div> qm vs sl </Div>
            <Div> roles </Div>
          
          </DivContainer>
        }
  
      </DivGeneral>

  )

}

/*

const { idComp } = useParams();
  
  
  useEffect(() => {

    (async() => {
      
      if (!readyFocusingComp) {
        try {
            
          replaceData2("ready", "focusingComp", false);
          replaceData2("loading", "focusingComp", true);
          
          const {
            data
          } = await axios.get(`${config.URL_API_NS}/comp/${idComp}`);
          
          
          replaceData2CompGallery("focus", "comp", data);
          replaceData2("loading", "focusingComp", false);
          replaceData2("ready", "focusingComp", true);
          
    
        } catch (error) {
          replaceData2("ready", "focusingComp", false);
          replaceData2("loading", "focusingComp", false);
          
          addDeleteNotification("basic01", language);
          console.log(error)
        }
        
      }
     
    })() // async

  }, [readyFocusingComp, idComp])
  
  
  
  */


/*
<>
    { (loadingFocusingComp || !readyFocusingComp) ? <DivFocus> <Loading /> </DivFocus>

*/



function mapStateToProps(state) {
  return {

    language: state.basic.language
    
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    
    , readyPlayerGeneral: state.basic.ready.playerGeneral
    , loadingPlayerGeneral: state.basic.loading.playerGeneral
  };
}

function mapDispatchToProps(dispatch) {
  return {
  
    replaceDataPlayer: (which, replacement) => dispatch(replaceDataPlayer(which, replacement))
    , replaceData2Player: (which1, which2, replacement) => dispatch(replaceData2Player(which1, which2, replacement))

    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    , addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(General);