
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../config';
//import storage from '../../tools/vanilla/storage';

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import { replaceData2 } from "../../redux/actions/basic";
import { replaceDataHero, replaceData2Hero } from "../../redux/actions/hero";


import {  NavLink, useHistory, useParams } from 'react-router-dom';

import { Div, Input, Button, Img } from '../../styles/DefaultStyles';

import Loading from '../_/Loading';
import Build from './BuildsStats/Build';
import useInput from '../../tools/hooks/useInput';

import IconSearch from '../../svgs/basic/IconSearch';


import IconTank from '../../svgs/roles/IconTank'
import IconBruiser from '../../svgs/roles/IconBruiser'
import IconMelee from '../../svgs/roles/IconMeleeAssassin'
import IconRanged from '../../svgs/roles/IconRangedAssassin'
import IconHealer from '../../svgs/roles/IconHealer'
import IconSupport from '../../svgs/roles/IconSupport'

import * as imgHero from '../../images/heroes'


const DivHero = styled(Div)
`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`;


const DivInputKeyHero = styled(Div)`
  width: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > *:nth-child(1){
    border-radius: 8px 0 0 8px;
    width: 180px;
    height: 40px;
    margin: 0;
  }
  
  & > *:nth-child(2){
    background-color: ${props => props.theme.color_very_weak};
    border-radius: 0 8px 8px 0;
    width: 40px;
    height: 40px;
    margin: 0;
  }
  
`

const DivUpdated = styled(Div)`
  margin-top: 20px;
  margin-bottom: 5px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > div {
    width: auto;
    color: ${props => props.theme.color_weak};
  }
  
  & > div:nth-child(n+2){ margin-left: 8px;}
`


const DivContainer = styled(Div)`

  width: 350px;
  border-radius: 15px;
  
  margin-bottom: 20px;
  
  background-color: ${props => props.theme.COLOR_normal};
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const DivHeader = styled(Div)`
  width: 100%;
  height: 60px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  & > div {
    width: auto;
    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    
    &:first-child { margin-left: 10px; }
    &:last-child {margin-right: 10px; }
    
    & > div {
      width: auto;
      margin: 2px;
    }
  }
  
`

const DivIdentification = styled(Div)`
  & > *:nth-child(2) {
    font-size: 1.2rem;
    font-weight: bold;
    
    width: auto;
    max-width: 140px;
    display: block;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  & > *:nth-child(3) {
    font-size: 1rem;
    font-weight: normal;
  }
`



/////
const DivBody = styled(Div)`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  padding-left: 15px;
  padding-right: 15px;
  
  padding-bottom: 10px;
`



const DivListTopBuild = styled(Div)`
  
  width: auto;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  &>div:nth-child(n+2){
    margin-top: 20px;
  }
  
  /* tootip 이 잘리는 문제 해결 */
  margin-bottom: 160px;
`



const BuildsStats = ({

  language
  , user
  
  
  , listAllHeroBasic
  , listAllHeroDetail
  
  , focusingHero
  , listTopBuild
  , readyListTopBuild
  , loadingListTopBuild
  
  
  
  , replaceData2
  , replaceDataHero
  , replaceData2Hero

  , addDeleteNotification
}) => {
  
  // input 안의 battletag 있는 상태로 update 버튼 ->   history.push() ? 
  
  // params 에 battletag 있으면 ->
    // local storage 에 있고, 업데이트 하루 안이면 local storage 꺼 읽기
    // local sotrge에 없거나 업데이트 오래전이면 -> @업데이트
    
  // input 에 battletag 담긴 상태에서 유저가 update 버튼 누르면 -> @업데이트
  
  const history = useHistory();
  const params = useParams();
  console.log(listTopBuild)
  const maxPlayedGames = Math.max(...listTopBuild.map(element=>element['games_played']));
              
  //let unmounted = false;
  
  // clean up function! 이렇게 따로 만들어야 잘 작동한다!
  useEffect(()=>{
    return ()=> {
      //unmounted = true;
      replaceData2('ready', 'listTopBuild', false);
    };
  },[])
  
  
  
  useEffect(()=>{
    
    if (params.keyHeroEncoded && params.keyHeroEncoded !== "" ){
      
        const keyHero = decodeURIComponent(params.keyHeroEncoded)
        replaceDataHero("focusingHero", keyHero); // 나중에 다른곳에서 쓰기 위해서
        
    } // if
    
  },[])
  
  
  
  
  useEffect(() => {

    (async() => {
      
      if (!readyListTopBuild && focusingHero !== "") {
        try {
            
          replaceData2("ready", "heroBuildsStats", false);
          replaceData2("loading", "heroBuildsStats", true);
          
          const keyHeroEncoded = encodeURIComponent(focusingHero);
          const { data } = await axios.get(`${config.URL_API_NS}/hero-stats/${keyHeroEncoded}`);
          
          console.log(data);
          
          
          replaceDataHero("listTopBuild", data['listTopBuild']);
          
          replaceData2("loading", "listTopBuild", false);
          replaceData2("ready", "listTopBuild", true);
          
    
        } catch (error) {
          replaceData2("ready", "listTopBuild", false);
          replaceData2("loading", "listTopBuild", false);
          
          addDeleteNotification("basic01", language);
          console.log(error)
        }
        
      }
     
    })() // async

  }, [readyListTopBuild, focusingHero])
  
  

  

  
  return (
    
      <DivHero>
        
        {loadingListTopBuild && <Loading/>}
        
        
        <DivListTopBuild>
          {
            (readyListTopBuild) && 
              
              listTopBuild.map((build, index)=>{
                return (
                  <Build
                    key={`BuildsStats-${focusingHero}-${index}`}
                    build={build}
                    indexBuild={index}
                    maxPlayedGames={maxPlayedGames}
                  /> 
                )
              })
              
          }
        </DivListTopBuild>
  
      </DivHero>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language
    
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    
    
    
    , listAllHeroBasic: state.hots.listAllHeroBasic
    , listAllHeroDetail: state.hots.listAllHeroDetail
    
    , focusingHero: state.hero.focusingHero
    , listTopBuild: state.hero.listTopBuild
    , readyListTopBuild: state.basic.ready.listTopBuild
    , loadingListTopBuild: state.basic.loading.listTopBuild
    
  };
}

function mapDispatchToProps(dispatch) {
  return {
  
    replaceDataHero: (which, replacement) => dispatch(replaceDataHero(which, replacement))
    , replaceData2Hero: (which1, which2, replacement) => dispatch(replaceData2Hero(which1, which2, replacement))

    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    , addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(BuildsStats);
