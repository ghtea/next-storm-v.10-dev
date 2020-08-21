
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


import * as imgHero from '../../../images/heroes'



const DivOption = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
`

const DivFilter = styled(Div)`
  width: auto;
  
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
  , sort
  
  , triggerUpdateHeroes
  
  , replaceData2
  , replaceDataPlayer
  , replaceData2Player

  , addDeleteNotification
}) => {
  
  
  return (
    
    <DivOption>
    
    
      <DivFilter>
        <Div>
          filter icon
        </Div>
        
        <Div>
          More than 10 games
        </Div>
      </DivFilter>
      
      
      
      <DivSort>
        <Div>
          sort icon
        </Div>
        
        <Div>
          Winrate
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
