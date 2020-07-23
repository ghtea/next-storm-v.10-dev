import React, {useEffect, useRef} from 'react';
import dotenv from 'dotenv';

import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';
import { Route, NavLink, Switch } from 'react-router-dom';

import * as config from '../config';

import Gallery, {SubGallery} from "../components/CompGallery/Gallery"
import Focus, {SubFocus} from "../components/CompGallery/Focus"
import Create, {SubCreate} from "../components/CompGallery/Create"

import { connect } from "react-redux";

import {replaceData, replaceReady, replaceLoading, replaceWorking, replaceAuthority, replaceData2} from "../redux/store";

import addRemoveNotification from "../redux/thunks/addRemoveNotification";

import {Div, Input, Button} from '../styles/DefaultStyles';

import IconLoading from '../svgs/basic/IconLoading'



const DivCompGallery = styled(Div)`
  width: 100%;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }

  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  }
`;


const SubCompGallery = styled(Div)`

  background-color: ${props => props.theme.COLOR_middle};
  color: ${props => props.theme.color_normal};
  
  position: fixed;
  
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    top: 50px;
    left: 0px;
    
    width: 100%;
  	height: 50px; 
    
    flex-direction: row;
  	border-bottom: 1px solid ${props => props.theme.color_very_weak};
  }

  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    top: 0px;
    left: 0px;
    z-index: 10;
    
    width: 100%;
  	height: 50px; 
    
    flex-direction: row;
  	border-bottom: 1px solid ${props => props.theme.color_very_weak};
  }
  
  
`

const Main = styled(Div)`
  
  width: calc(100% - 120px);
  height: calc(100% - 50px);
  
  position: fixed;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  
  
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
    top: 50px; /* SubCompGallery */
  	left: 120px;
	}
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
    top: 50px; 
    left: 120px;
    
  }
`




const CompGallery = ({
  
  match, location
  
  , authority
  
  , readyDictHeroBasic
  , readyListMap
  
  , replaceAuthority
  , replaceData2
  , addRemoveNotification
  
}) => {
  
  // comp-gallery 접속하자 마자, HeroBasic 가져오기
  useEffect( () => { 
    (async () => {
    
      // 내 서버에서 히오스 영웅들 정보 가져오기
      if (!readyDictHeroBasic ) {
        
        try { 
          
          const {data} = await axios.get (`${config.URL_API_NS}/hero-basic/`);
          
          replaceData2("hots", "dictHeroBasic", data)
          replaceData2("ready", "dictHeroBasic", true)
          
        } 
        catch (error) { 
          
          addRemoveNotification("error", `server is not working`);
          console.log(error) 
        }
      }
      
      // Heroes Profile API 로 맵 정보 가져오기
      if (!readyListMap ) {
        
        try { 
          
          const {data} = await axios.get (`${config.URL_API_NS}/map/`);
          
          replaceData2("hots", "listMap", data)
          replaceData2("ready", "listMap", true)
          
        } 
        catch (error) { 
          
          addRemoveNotification("error", `server is not working`);
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
      //addRemoveNotification("success", "welcome viewer!");
    }
    
    else if ( listKeyMaster.includes(keyMasterTrying)  ) {
      replaceAuthority("comp_gallery", "master");
      addRemoveNotification("success", "welcome master!");
      
      // 여기서 해당 키로 다시 서버에서 마스터 유저 정보 가져오기
    }
    

    // if keyMaster is wrong
    else {
      replaceAuthority("comp_gallery", "viewer");
      addRemoveNotification("error", "master key is wrong");
    }
    
  }, [] )
    */
    
  
   return (
   <DivCompGallery>
    
      <SubCompGallery>
        <Switch>
          <Route path="/comp-gallery/" exact={true} component={SubGallery} />
          <Route path="/comp-gallery/focus"  component={SubFocus} />
          <Route path="/comp-gallery/create"  component={SubCreate} />
        </Switch>
      </SubCompGallery>
      
    {!readyDictHeroBasic?
      <Div> loading </Div>
     :
      <Main>
        <Switch>
          <Route path="/comp-gallery/" exact={true} component={Gallery} />
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
    authority: state.authority.comp_gallery
    
    , readyDictHeroBasic: state.ready.dictHeroBasic
    , readyListMap: state.ready.listMap
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    //readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
    
    //,replaceData: (which, newData) => dispatch(replaceData(which, newData))
    //,replaceLoading: (which, true_false) => dispatch(replaceLoading(which, true_false)) 
    //,replaceReady: (which, true_false) => dispatch(replaceReady(which, true_false)) 
    
    replaceAuthority: (which, authority) => dispatch(replaceAuthority(which, authority))
    ,replaceData2 : (which1, which2, newData) => dispatch(replaceData2(which1, which2, newData))
    ,addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(CompGallery);
