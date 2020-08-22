
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import * as config from '../../../config';
//import storage from '../../../tools/vanilla/storage';

import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../others/dictCode'

import { replaceData2 } from "../../../redux/actions/basic";
import { replaceDataPlayer, replaceData2Player } from "../../../redux/actions/player";


import {  NavLink, useHistory, useParams } from 'react-router-dom';

import { Div, Input, Button, Img } from '../../../styles/DefaultStyles';

import Loading from '../../_/Loading';

import useInput from '../../../tools/hooks/useInput';


import * as imgHero from '../../../images/heroes';
import IconFilter from '../../../svgs/basic/IconFilter';
import IconSort from '../../../svgs/basic/IconSort';


const DivOption = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  height: 30px;
`

const DivGames = styled(Div)`
  width: auto;
  font-size: 0.9rem;
  cursor: pointer;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  & > div {
    width: auto;
  }
  
`

const DivSort = styled(Div)`
  width: auto;
  font-size: 0.9rem;
  cursor: pointer;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  & > div {
    width: auto;
  }
  
`



const Option = ({

  language
  , user
  
  
  , readyPlayerBattletag
  , dataPlayerHeroes
  , readyPlayerHeroes
  , loadingPlayerHeroes
  
  , player
  
  , region
  , mode
  , role
  , games
  , sort
  
  , triggerUpdateHeroes
  
  , replaceData2
  , replaceDataPlayer
  , replaceData2Player

  , addDeleteNotification
}) => {
  
  
  const onClick_Games = (event) => {
    switch(games){
      case 1: replaceData2Player('heroes', 'games', 5); break;
      case 5: replaceData2Player('heroes', 'games', 10); break;
      case 10: replaceData2Player('heroes', 'games', 50); break;
      case 50: replaceData2Player('heroes', 'games', 1); break;
      default: replaceData2Player('heroes', 'games', 1); break;
    }
    replaceData2("ready", "playerHeroesShowing", false); 
  }
  
  const onClick_Sort = (event) => { 
    if (sort === "games" && mode === 'Both') { replaceData2Player('heroes', 'sort', "win_rate"); }
    else if (sort === "games") { replaceData2Player('heroes', 'sort', "mmr"); }
    else if (sort === "mmr") { replaceData2Player('heroes', 'sort', "win_rate"); }
    else if (sort === "win_rate") { replaceData2Player('heroes', 'sort', "games"); }
    else { replaceData2Player('heroes', 'sort', "games"); }
    
    replaceData2("ready", "playerHeroesShowing", false); 
  }
  
  return (
    
    <DivOption>
    
    
      <DivGames
        onClick={onClick_Games}
      >
        <Div>
          <IconFilter width={"18px"} height={"18px"} color={'color_weak'} />
        </Div>
        
        <Div>
          {(() => {
            if (games === 1) {
              switch (language) {
                case 'ko': 
                  return '플레이한 모든 영웅';
                case 'ja': 
                  return 'プレーしたヒーロー';
                default: // eng
                  return 'All Heroes Played';
              }
            }
            
            else {
              switch (language) {
                case 'ko': 
                  return `${games}게임 이상`;
                case 'ja': 
                  return `${games}ゲーム以上`;
                default: // eng
                  return `More than ${games}games`;
              }
            }
            
          })()}
        </Div>
      </DivGames>
      
      
      
      <DivSort
        onClick={onClick_Sort}
      >
        <Div>
          <IconSort width={"22px"} height={"22px"} color={'color_weak'} />
        </Div>
        
        <Div>
          {(() => {
          
            switch(sort){
            
              case 'games':
                switch (language) {
                  case 'ko': 
                    return '플레이한 게임';
                  case 'ja': 
                    return 'プレイしたゲーム';
                  default: // eng
                    return 'Games Played';
                }
                break;
              case 'win_rate':
                switch (language) {
                  case 'ko': 
                    return '승률';
                  case 'ja': 
                    return '勝率';
                  default: // eng
                    return 'Winrate';
                }
                break;
              case 'mmr':
                switch (language) {
                  case 'ko': 
                    return 'MMR';
                  case 'ja': 
                    return 'MMR';
                  default: // eng
                    return 'MMR';
                }
                break;
              default:
                switch (language) {
                  case 'ko': 
                    return '플레이한 게임';
                  case 'ja': 
                    return 'プレイしたゲーム';
                  default: // eng
                    return 'Games Played';
                }
                break;
            }
          
          })()}
        </Div>
      </DivSort>
      
      
    </DivOption>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language
    
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    
    
    
  
    
    , player: state.player.player
    
    , region: state.player.heroes.region
    , mode: state.player.heroes.mode
    , role: state.player.heroes.role
    , games: state.player.heroes.games
    , sort: state.player.heroes.sort
    
    , triggerUpdateHeroes: state.player.heroes.triggerUpdate
    
    
    , readyPlayerBattletag: state.basic.ready.playerBattletag
    , dataPlayerHeroes: state.player.heroes.data
    , readyPlayerHeroes: state.basic.ready.playerHeroes
    , loadingPlayerHeroes: state.basic.loading.playerHeroes
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
export default connect(mapStateToProps, mapDispatchToProps)(Option);
