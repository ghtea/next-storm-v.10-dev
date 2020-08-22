
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../../config';
import storage from '../../../tools/vanilla/storage';

import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../others/dictCode'

import { replaceData2 } from "../../../redux/actions/basic";
import { replaceDataPlayer, replaceData2Player } from "../../../redux/actions/player";


import {  NavLink, useHistory, useParams } from 'react-router-dom';

import { Div, Input, Button, Img } from '../../../styles/DefaultStyles';

import Loading from '../../_/Loading'

//import useInput from '../../../tools/hooks/useInput';
import {blendColor} from '../../../tools/vanilla/color'

import * as imgHero from '../../../images/heroes'
import palettesTier from '../../../styles/palettes/tier'



const DivHero = styled(Div)`
  width: 54px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  
  margin-left: 2px;
  margin-right: 2px;
  margin-bottom: 10px;
  
  & > * {
    width: auto;
  }
`

const ContainerGames = styled(Div)`
  width: auto;
  margin-bottom: 3px;
  
  & > div {
    width: auto;
    height: auto;
    font-size: 0.9rem;
    
    &:nth-child(2){
      color: ${props => props.theme.color_weak};
      font-size: 0.8rem;
      margin-top: -4px;
    }
  }
  
`


const ContainerGraph = styled(Div)`
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  
  & > div { /*this is actual bar graph, current max height = 120         */
  
    background-color: ${props => props.colorBar};
    
    height: ${props => props.ratioAgainstMax * 120 + 20}px;
    width: ${props => {
      if (props.games_played < 50){
        return props.games_played / 50 * 40
      } 
      else {
        return 40
      }
    }}px;
    
    margin-bottom: -20px;
  }
`



const ContainerImage = styled(Div)`
  width: 40px;
  height: 40px;
  z-index: 10;
`
const ImgHero = styled(Img)`
  border-radius: 50%;
  
  object-fit: cover;
  width: 40px;
  height: 40px;
    
`

const ContainerMmrWinrate = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  font-size: 0.9rem;
  
  margin-top: 2px;
  
  width: 52px;
  height: auto;
  
  
  border-radius: 7px;
  
  ${props => {
  
    if (props.mode === "Both") {
      return  `
        color: ${props.theme.COLOR_normal};
        background-color: ${props.theme.color_weak};`
    }
    else {
      return  `
        color: ${props.theme.COLOR_normal};
        border: 1px solid ${palettesTier[props.tier][1]}; 
        background-color: ${palettesTier[props.tier][1]}; 
        background-image: linear-gradient(135deg, ${palettesTier[props.tier][0]}, ${palettesTier[props.tier][1]}, ${palettesTier[props.tier][2]});`
      }
    }
  }
  
  & > div {
    width: auto;
    height: auto;
    
    font-size: 0.8rem;
    
    &:first-child{ padding-top: 1px; }
    &:last-child{ padding-bottom: 1px; padding-right: 2px;}
    &:nth-child(2){margin-top: -2px;}
  }
  
`

const DivWinRate =styled(Div)`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  
  & > div:nth-child(2){
    width: auto;
    font-size: 0.8rem;
    margin-left: -1px;
  }
`


/*
const DivRank = styled(Div)`
  width: 90px;
  height: 50px;
  
  border-radius: 9px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  color: ${props => props.theme.COLOR_normal};
  ${props => {
    switch (props.league_tier) {
      case 'bronze':
        return borders['Bronze'];
      case 'silver':
        return borders['Silver'];
      case 'gold':
        return borders['Gold'];
      case 'platinum':
        return borders['Platinum'];
      case 'diamond':
        return borders['Diamond'];
      case 'master':
        return borders['Master'];
      default:
        return `background-color: ${props => props.theme.color_very_weak};`
    }
  }}
  
  & > div:nth-child(1){
    height: 18px;
    font-size: 1rem;
  }
  & > div:nth-child(2){
    height: 18px;
    font-size: 1rem;
  }
`




// 현재 최대 width px: 50
const DivBar = styled(Div)`
  border-radius: 3px 3px 0 0;
  
  background-color: ${props => {
    if (props.ratio > 0.3) { return props.theme.color_active }
    else if (props.ratio > 0.16) { return props.theme.color_weak }
    else { return props.theme.color_very_weak }
  }};
  
  
  height: ${props => props.ratioAgainstMax * 90 }px;
  width: ${props => {
    if (props.games < 50){
      return props.games / 50 * 50
    } 
    else {
      return 50
    }
  }}px;
`



const DivMmr = styled(Div)`
  height: 30px;
  width: 40px;
  border-radius: 5px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  
  ${props => {
    switch (props.league_tier) {
      case 'bronze':
        return borders['Bronze'];
      case 'silver':
        return borders['Silver'];
      case 'gold':
        return borders['Gold'];
      case 'platinum':
        return borders['Platinum'];
      case 'diamond':
        return borders['Diamond'];
      case 'master':
        return borders['Master'];
      default:
        return `background-color: ${props => props.theme.color_very_weak};`
    }
  }}
    
  
  color: ${props => props.theme.COLOR_normal};
  
  & > div:nth-child(1) { font-size: 0.8rem;  height: 12px; }  
  & > div:nth-child(2) { font-size: 0.9rem;  height: 15px; }  
`
*/




/* 참고 info
  key_HeroesProfile: "Stukov"
  key_HeroesTalents: "stukov"
  name: "Stukov"
  role: "Healer"
  search: "stukov stukov stukov stiukow stukov стуков 斯托科夫 斯杜科夫 스투코프 healer 치유사 힐러 메인 힐러"
  short_name_HeroesProfile: "stukov"
  tags: (5) ["AllyHealer", "EnergyImportant", "Helper", "RoleSupport", "SelfHealer"]
  translations: (6) ["stiukow", "stukov", "стуков", "斯托科夫", "斯杜科夫", "스투코프"]
  type: "Melee"
  _id: "Stukov"

*/
/* 참고, stats 
 {
    games_played: 153
    losses: 70
    ratio: 0.36428571428571427
    winrate: 54.248366013071895
    wins: 83 
    mmr: 2341.44
    // mode: "Both" 의 경우에는 mmr 없다!
        },

*/
const Hero = ({

  language
  , addDeleteNotification
  
  , key_HeroesProfile
  
  , info
  , stats
  
  , mode
  
  , readyPlayerHeroesShowing
  , ratioMax
  
}) => {
  
  
  const history = useHistory();
  const [tier, setTier] = useState("Default");
  const [colorBar, setColorBar] = useState("rgb(210, 210, 210)");
  
  // https://heroesprofile.com/MMR/?blizz_id=758941&battletag=mbcat&region=1
  useEffect(()=>{
    if(!mode || !stats || !stats.mmr || !readyPlayerHeroesShowing) { setTier("Default") }
    else if(mode ==="Both"){
      setTier("Default");
    }
    else{
      if (stats.mmr > 2852) { setTier("Master") }
      else if (stats.mmr > 2708) { setTier("Diamond") }
      else if (stats.mmr > 2566) { setTier("Platinum") }
      else if (stats.mmr > 2416) { setTier("Gold") }
      else if (stats.mmr > 2232) { setTier("Silver") }
      else if (stats.mmr > 0) { setTier("Bronze") }
      else { setTier("Default") }
    }
  },[mode, readyPlayerHeroesShowing])
  
  
  //console.log(stats)
  const key_HeroesTalents = info['key_HeroesTalents']
  const ratioAgainstMax = stats.ratio / ratioMax;
  
  
  useEffect(()=>{
    let wZeroToOne = 0;
   
    if (stats['win_rate'] < 37) {
      wZeroToOne = -1;
    } else if (stats['win_rate'] > 63) {
      wZeroToOne = 1;
    } else {
      wZeroToOne = (stats['win_rate'] - 50) / 13;
    }
    
    // rgb(0,0,255);
    if (wZeroToOne >= 0) {
      const rgbListW = blendColor(wZeroToOne, [210,210,210], [0,200,50]);
      setColorBar(`rgb(${rgbListW[0]}, ${rgbListW[1]}, ${rgbListW[2]})`);
    } else {
      const rgbListW = blendColor(-wZeroToOne, [210,210,210], [200,0,50]);
      setColorBar(`rgb(${rgbListW[0]}, ${rgbListW[1]}, ${rgbListW[2]})`);
  }
  })
  
  
  
  
  return (
    
      <DivHero>
        
        <ContainerGames>
          <Div> {stats.games_played} </Div>
          <Div> {(() => {
                      switch (language) {
                        case 'ko': 
                          return '게임';
                        case 'ja': 
                          return 'ゲーム';
                        default: // eng
                          return 'games';
                      }
                    })()}  </Div>
        </ContainerGames>
        
        <ContainerGraph 
          ratioAgainstMax={ratioAgainstMax}
          games_played={stats.games_played}
          colorBar={colorBar}
          > 
            <Div /> 
        </ContainerGraph>
            
        <ContainerImage> <ImgHero src={imgHero[key_HeroesTalents]} /> </ContainerImage>
        
        <ContainerMmrWinrate
          tier={tier}
          mode={mode}
        >
          {(mode !== 'Both') && <Div> { Math.round(stats.mmr) } </Div> }
          <DivWinRate>
            <Div> {Math.round(stats.win_rate * 10)/10} </Div>
            <Div> % </Div>
          </DivWinRate>
        </ContainerMmrWinrate>
    
      </DivHero>

  )

}



function mapStateToProps(state) {
  return {

    language: state.basic.language
    
    , mode: state.player.heroes.mode
    , readyPlayerHeroesShowing: state.basic.ready.playerHeroesShowing
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
export default connect(mapStateToProps, mapDispatchToProps)(Hero);