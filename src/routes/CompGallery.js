import React, {useEffect, useRef} from 'react';
import dotenv from 'dotenv';

import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';
import { Route, NavLink, Switch } from 'react-router-dom';

import * as config from '../config';

import Gallery from "../components/CompGallery/Gallery"
import Focus  from "../components/CompGallery/Focus"
import Create  from "../components/CompGallery/Create"
import SubCompGallery from "../components/CompGallery/SubCompGallery"

import { connect } from "react-redux";

import {replaceData, replaceReady, replaceLoading, replaceWorking, replaceAuthority, replaceData2} from "../redux/actions/basic";

import {replaceDataHots, replaceData2Hots} from "../redux/actions/hots";


import addDeleteNotification from "../redux/thunks/addDeleteNotification";
import dictCode from '../others/dictCode';

import {Div, Input, Button} from '../styles/DefaultStyles';

import IconLoading from '../svgs/basic/IconLoading'



const DivCompGallery = styled(Div)`
  width: 100%;
  height: 100%; /* App의 DivContent 에서 height: calc(100vh - 50px); 로 설정해놨다 */
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    
  }

  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
    
  }
`;



const Main = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  width: 100%;
  height: 100%;
  
  margin-top: 50px; 
  /*height: calc(100% - 100px);*/
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    
    margin-top: 60px; 
    /*height: calc(100vh - 120px);*/
    
  }
`




const CompGallery = ({
  
  match, location
  
  , authority, language
  
  , readyDictAllHeroBasic
  , readyListAllMap
  
  //, replaceAuthority
  
  , replaceDataHots
  , replaceData2Hots
  
  , replaceData
  , replaceData2
  
  , addDeleteNotification
  
}) => {
  
  // comp-gallery 접속하자 마자, HeroBasic 가져오기
  useEffect( () => { 
    (async () => {
    
      // 내 서버에서 히오스 영웅들 정보 가져오기
      if (!readyDictAllHeroBasic ) {
        
        try { 
          
          const {data} = await axios.get (`${config.URL_API_NS}/hero-basic/`);
          
          replaceDataHots("dictAllHeroBasic", data)
          replaceData2("ready", "dictAllHeroBasic", true)
          
        } 
        catch (error) { 
          
          addDeleteNotification("basic01",  language);
          console.log(error) 
        }
      }
      
      // Heroes Profile API 로 맵 정보 가져오기
      if (!readyListAllMap ) {
        
        try { 
          
          const {data} = await axios.get (`${config.URL_API_NS}/map/`);
          
          replaceDataHots("listAllMap", data);
          replaceData2("ready", "listAllMap", true);
          
          let listMapStandardRankedTemp = data.filter(element => element.type === "standard" && element.rankedRotation === true);
          replaceDataHots( "listMapStandardRanked", listMapStandardRankedTemp );
          replaceData2("ready", "listMapStandardRanked", true);
          
        } 
        catch (error) { 
          
          addDeleteNotification("basic01", language);
          console.log(error) 
        }
      }
      
    }) ()
  
  },[])
 
  const listKeyMaster = [];
  
  /*
  // 처음 마운트는 무시, readyPlanTeam X -> O 일때 플랜 비번확인
  useEffect(()=>{
    
    const query = queryString.parse(location.search);
    const keyMasterTrying = query.master;
    
    //if (isFirstRun.current) {isFirstRun.current = false; return; } // 처음 렌더링 넘어가기 (아직 스토어 업데이트 반영 잘 못해서..)
    // 참고1 https://stackoverflow.com/questions/53351517/react-hooks-skip-first-run-in-useeffect
    // 참고2 https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables
    
    
 
      
    if (!keyMasterTrying) {
      replaceAuthority("comp_gallery", "viewer");
      //addDeleteNotification("success", "welcome viewer!");
    }
    
    else if ( listKeyMaster.includes(keyMasterTrying)  ) {
      replaceAuthority("comp_gallery", "master");
      addDeleteNotification("success", "welcome master!");
      
      // 여기서 해당 키로 다시 서버에서 마스터 유저 정보 가져오기
    }
    

    // if keyMaster is wrong
    else {
      replaceAuthority("comp_gallery", "viewer");
      addDeleteNotification("error", "master key is wrong");
    }
    
  }, [] )
    */
    
  
   return (
   <DivCompGallery>
    
      <SubCompGallery/>
      
    {(!readyDictAllHeroBasic || !readyListAllMap)?
      <Div> loading </Div>
     :
      <Main>
        <Switch>
          <Route path="/comp-gallery" exact={true} component={Gallery} />
          <Route path="/comp-gallery/focus"  component={Focus} />
          <Route path="/comp-gallery/create"  component={Create} />
        </Switch>
      </Main>
    }
  
    </DivCompGallery>
    )
}
  
 
    
 //CompGallery



function mapStateToProps(state) { 
  return { 
    authority: state.basic.authority.comp_gallery
    , language: state.basic.language
    
    , readyDictAllHeroBasic: state.basic.ready.dictAllHeroBasic
    , readyListAllMap: state.basic.ready.listAllMap
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    //readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
    
    //,replaceData: (which, newData) => dispatch(replaceData(which, newData))
    //,replaceLoading: (which, true_false) => dispatch(replaceLoading(which, true_false)) 
    //,replaceReady: (which, true_false) => dispatch(replaceReady(which, true_false)) 
    
    //replaceAuthority: (which, authority) => dispatch(replaceAuthority(which, authority))
    
    replaceDataHots : (which, replacement) => dispatch(replaceDataHots(which, replacement))
    ,replaceData2Hots : (which1, which2, replacement) => dispatch(replaceData2Hots(which1, which2, replacement))
    
    ,replaceData : (which, replacement) => dispatch(replaceData(which, replacement))
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(CompGallery);

