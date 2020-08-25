
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
import { replaceDataPlayer, replaceData2Player } from "../../redux/actions/player";


import {  NavLink, useHistory, useParams } from 'react-router-dom';

import { Div, Input, Button, Img } from '../../styles/DefaultStyles';

import Loading from '../_/Loading'

import useInput from '../../tools/hooks/useInput';

import IconSearch from '../../svgs/basic/IconSearch';
import flagNA from '../../images/flags/NA.png';
import flagEU from '../../images/flags/EU.png';
import flagKR from '../../images/flags/KR.png';
import flagCN from '../../images/flags/CN.png';

import IconTank from '../../svgs/roles/IconTank'
import IconBruiser from '../../svgs/roles/IconBruiser'
import IconMelee from '../../svgs/roles/IconMeleeAssassin'
import IconRanged from '../../svgs/roles/IconRangedAssassin'
import IconHealer from '../../svgs/roles/IconHealer'
import IconSupport from '../../svgs/roles/IconSupport'

//import borders from "../../profile/borders";
import palettesTier from '../../styles/palettes/tier'


const DivGeneral = styled(Div)
`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`;


const DivInputBattletag = styled(Div)`
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

const ImgFlagMain = styled(Img)`
  width: auto;
  height: 30px;
`

const DivFlagNormal = styled(Div)`
  padding-top: 6px;
  padding-bottom: 2px;
  border-bottom: 4px solid  ${props => (props.active)? props.theme.color_active : "transparent"};
`

const ImgFlagNormal = styled(Img)`
  width: auto; /* 26.667 로 예상 */
  height: 20px;
`



/////
const DivBody = styled(Div)`
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  padding-bottom: 10px;
`


const DivStatAll = styled(Div)`
  width: 100%;
  height: 200px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  &>div {
    width: 50%;
  }
  
`

const DivModeTitle = styled(Div)`
  font-size: 1.2rem;
  font-weight: bold;

  color: ${props => props.theme.color_normal};

`



const DivGamesAll = styled(Div)`
  
  margin-top: 5px;
  margin-bottom: 5px;
  
  width: auto;
  height: 40px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > div:nth-child(1){
    width: auto;
    display: block;
    text-align: right;
    font-weight: bold;
    
    color: ${props => props.theme.color_normal};
    
    font-size: ${props => {
      if (props.games_played > 1000) { return 1.6; }  
      else if (props.games_played > 700) { return 1.5; }  
      else if (props.games_played > 400) { return 1.3; }  
      else if (props.games_played > 200) { return 1.1; }  
      else if (props.games_played > 50) { return 1; }  
    }}rem;
  }
  
  & > div:nth-child(2){
    width: auto;
    display: block;
    text-align: left;
    margin-left: 3px;
    font-size: 0.8rem;
    color: ${props => props.theme.color_weak}
  }
`


const DivRank = styled(Div)`
  width: 90px;
  height: 50px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  
  border-radius: 9px;
  color: ${props => props.theme.COLOR_normal};
  ${props => {
    let tier = "";
    switch(props.league_tier){
      case('bronze'): tier="Bronze"; break;
      case('silver'): tier="Silver"; break;
      case('gold'): tier="Gold"; break;
      case('platinum'): tier="Platinum"; break;
      case('diamond'): tier="Diamond"; break;
      case('master'): tier="Master"; break;
      default: tier="Default"; break;
    }
    
    return  `
      border: 1px solid ${palettesTier[tier][1]}; 
      background-color: ${palettesTier[tier][1]}; 
      background-image: linear-gradient(135deg, ${palettesTier[tier][0]}, ${palettesTier[tier][1]}, ${palettesTier[tier][2]});`
    }
  }
  
  & > div:nth-child(1){
    height: 18px;
    font-size: 1rem;
  }
  & > div:nth-child(2){
    height: 18px;
    font-size: 1rem;
  }
`


const DivStatRoles = styled(Div)`
  width: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  
`

const DivEachRole = styled(Div)`
  width: 50px;
    
  &:nth-child(n+2){ margin-left: 5px; }
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  cursor: pointer;
  
`

const DivGraph = styled(Div)`
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`

const DivGames = styled(Div)`
  color: ${props => props.theme.color_weak};
  width: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & > div:nth-child(1) {
    font-size: 1rem;
    height: 16px;
  }
  & > div:nth-child(2) {
    font-size: 0.8rem;
    height: 12px;
  }
  margin-bottom: 4px;
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



const DivIconRole = styled(Div)`
  height: 40px;
  /*border-top: 2px solid ${props => props.theme.color_weak};*/
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
    let tier = "";
    switch(props.league_tier){
      case('bronze'): 
        tier="Bronze"; break;
      case('silver'): 
        tier="Silver"; break;
      case('gold'): 
        tier="Gold"; break;
      case('platinum'): 
        tier="Platinum"; break;
      case('diamond'): 
        tier="Diamond"; break;
      case('master'): 
        tier="Master"; break;
      default: 
        tier="Default"; break;
    }
    
    console.log(tier)
    
    return  `
      border: 1px solid ${palettesTier[tier][1]}; 
      background-color: ${palettesTier[tier][1]}; 
      background-image: linear-gradient(135deg, ${palettesTier[tier][0]}, ${palettesTier[tier][1]}, ${palettesTier[tier][2]});`
    }
  }
  
    
  
  color: ${props => props.theme.COLOR_normal};
  
  & > div:nth-child(1) { font-size: 0.8rem;  height: 12px; }  
  & > div:nth-child(2) { font-size: 0.9rem;  height: 15px; }  
`



const DivChooseMode = styled(Div)`
  
  margin-top: 10px;
  
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > * {
    font-size: 0.9rem;
    width: auto;
    height: 24px;
    &:nth-child(n+2) { margin-left: 4px; }
  }
`

const ButtonChooseMode = styled(Button)`
  background-color: transparent;
  border-radius: 0;
  padding: 0;
  margin:0;
  &:nth-child(n+2) { margin-left: 8px; }
  
  font-size: 1rem;
  width: auto;
  height: 24px;
  
  font-weight: ${props => (props.active)? "bold" : "normal"};
  color: ${props => (props.active)? props.theme.color_active : props.theme.color_weak};
  
  padding-top: 2px;
  
  border: none;
  border-bottom: 2px solid  ${props => (props.active)? props.theme.color_active : "transparent"};
`


const General = ({

  language
  , user
  //, loadingUser, readyUser
  
  
  , readyPlayerBattletag
  , dataPlayerGeneral
  , readyPlayerGeneral
  , loadingPlayerGeneral
  
  , readyPlayerGeneralShowing
  
  , player
  
  , region
  , mode
  , role
  , sort
  
  , triggerUpdateGeneral
  
  , replaceData2
  , replaceDataPlayer
  , replaceData2Player

  , addDeleteNotification
}) => {
  
  
  const history = useHistory();
  const params = useParams();
  let unmounted = false;
  
  const inputBattletag = useInput("");
  //const [triggerUpdate, setTriggerUpdate] = useState("")
  const [updatedText, setUpdatedText] = useState("")
  
  // 화면에 표시할 정보 정리
  //const [region, setregion] = useState("");
  //const [mode, setmode] = useState("Both"); // for roles 
  
  //const [readyShowing, setReadyShowing] = useState(false);
  
  const [showing, setShowing] = useState({
    
     stats : {
      "All": {}
      ,  "Tank": {}
      ,  "Bruiser": {}
      ,  "Melee Assassin": {}
      ,  "Ranged Assassin": {}
      ,  "Healer": {}
      ,  "Support": {}
    }
  })
  
  // clean up function! 이렇게 따로 만들어야 잘 작동한다!
  useEffect(()=>{
    return ()=> {
      //console.log("final moment of General")
      unmounted = true;
      replaceData2('ready', 'playerBattletag', false);
      replaceData2('ready', 'playerGeneral', false);
      replaceData2('ready', 'playerGeneralShowing', false);
      replaceData2Player("general", "region", ""); 
      replaceData2Player("general", "mode", "Both"); 
    };
  },[])
  
  
  useEffect(()=>{
    replaceData2('ready', 'playerGeneral', false);
    replaceData2('ready', 'playerGeneralShowing', false);
    
    if (params.battletagEncoded){
      
      
      if (params.battletagEncoded === "undefined") {
        return;
      }
      
      else {  
        replaceData2("ready", "playerBattletag", false);
        const battletag = decodeURIComponent(params.battletagEncoded)
        replaceData2Player("player", "battletag", battletag); // 나중에 다른곳에서 쓰기 위해서
        
        replaceData2("ready", "playerGeneral", false);
        
        inputBattletag.setValue(battletag);
        replaceData2("ready", "playerBattletag", true);

        // 바로 업데이트 trigger
        //replaceData2Player("heroes", "triggerUpdate", Date.now().toString()); 
      } // else
    } // if
    
  },[])
  
  
  
  const onClick_Update = () => {
    if (inputBattletag.value) {
      replaceData2("ready", "playerBattletag", false);
      replaceData2Player("player", "battletag", inputBattletag.value); 
      replaceData2("ready", "playerGeneral", false);
      
      history.push(`/player/general/${encodeURIComponent(inputBattletag.value)}`);
      replaceData2("ready", "playerBattletag", true);
      replaceData2Player("general", "triggerUpdate", Date.now().toString()); 
    }
  }
  
  
  // trigger 변하면 내 서버에서 가져오기 (내 서버에서 가져오는 것도 완전 새 데이터는 아님)
  useEffect(() => {
    (async() => {
      
     if (readyPlayerBattletag) {
      try {
        replaceData2Player("general", "region", "");  // important!
        replaceData2Player("general", "mode", "Both"); 
      
        replaceData2("ready", "playerGeneral", false);
        replaceData2("loading", "playerGeneral", true);
        
        const resRegions = await axios.get(`${config.URL_API_NS}/player/regions/${encodeURIComponent(player.battletag)}`);
        const orderNameRegion = resRegions.data.orderNameRegion;
        replaceData2Player("player", "orderNameRegion",  orderNameRegion); // 잊지 않기!
        //console.log('hi2')
        //console.log(orderNameRegion);
        
        const query = queryString.stringify({
          orderNameRegion: JSON.stringify(orderNameRegion)
        });
        
        
        const res = await axios.get(`${config.URL_API_NS}/player/general/${encodeURIComponent(player.battletag)}?` + query);
        let dataPlayer = res.data;
        
        // 중요! 내 서버에서 stats의 general 을 json string 으로 저장했기 때문에, 여기서 parse 하는 작업 필요!
        const playerGeneralNew = JSON.parse(dataPlayer['stats']['general_String']);
        //console.log(playerGeneralNew)
        // delete dataPlayer['stats']['general_String'];
        
        replaceData2Player("general", "data", playerGeneralNew );
        replaceData2("loading", "playerGeneral", false);
        replaceData2("ready", "playerGeneral", true);
        
        const updatedText = new Date(dataPlayer['updated']['general']);
        const month = updatedText.getUTCMonth() + 1; //months from 1-12
        const day = updatedText.getUTCDate();
        const year = updatedText.getUTCFullYear();
        
        if (!unmounted) {
          setUpdatedText(`${year}. ${month}. ${day}`);
        }
  
      } catch (error) {
        replaceData2("ready", "playerGeneral", false);
        replaceData2("loading", "playerGeneral", false);
        
        addDeleteNotification("basic01", language);
        console.log(error)
      }
      
     }
     
    })() // async

  }, [ triggerUpdateGeneral, readyPlayerBattletag])
  
  
  
  
  
  
  // 처음 데이터 불러왔을 때
  useEffect(()=>{
    
    if (readyPlayerGeneral) {
      
      const battletagFull = player.battletag
        
      const regexBattletag = /(#\d*)$/;
		  const listNumberBattletag = battletagFull.match(regexBattletag);
		  const battletagName = battletagFull.replace(regexBattletag, "");
		  const battletagNumber = listNumberBattletag[0];
  		  
  		
  		replaceData2Player("player", "battletagName", battletagName);
  		replaceData2Player("player", "battletagNumber", battletagNumber);
  		
  		if (region === ""){
  		  replaceData2Player("general", "region", player.orderNameRegion[0]);
  		}
  		
    } // if
    
  }, [readyPlayerGeneral])
  		
    
  		
    
    
    // region, mode, role 가 변하면
  useEffect(()=>{
    
    try {
    replaceData2("ready", "playerGeneralShowing", false);
    if (readyPlayerGeneral && region !== "" ) {
      
      const battletagFull = player.battletag;
      let showingTemp = showing;
      
		  const listRole_withAll = ['All', 'Tank', 'Bruiser', 'Melee Assassin', 'Ranged Assassin', 'Healer', 'Support'];
		  for (const role of listRole_withAll) {
		    
		    showingTemp['stats'][role] = {
		      "Quick Match": { games_played: 0, mmr:0, league_tier: ""}
    		  , "Storm League": { games_played: 0, mmr:0, league_tier: ""}
    		  , "Both": { games_played: 0 }
		    }
		    
		    if (dataPlayerGeneral[region][role] && dataPlayerGeneral[region][role]['Quick Match']) {
		      showingTemp['stats'][role]["Quick Match"] = dataPlayerGeneral[region][role]['Quick Match'];
		      showingTemp['stats'][role]["Both"]['games_played'] += dataPlayerGeneral[region][role]['Quick Match']['games_played'];
		    }
		    
		    if (dataPlayerGeneral[region][role] && dataPlayerGeneral[region][role]['Storm League']) {
		      showingTemp['stats'][role]["Storm League"] = dataPlayerGeneral[region][role]['Storm League'];
		      showingTemp['stats'][role]["Both"]['games_played'] += dataPlayerGeneral[region][role]['Storm League']['games_played'];
		    }
		    
		    showingTemp['stats'][role]["Quick Match"]['ratio'] = showingTemp['stats'][role]['Quick Match']['games_played'] / showingTemp['stats']["All"]['Quick Match']['games_played'];
		    showingTemp['stats'][role]["Storm League"]['ratio'] = showingTemp['stats'][role]['Storm League']['games_played'] / showingTemp['stats']["All"]['Storm League']['games_played'];
		    showingTemp['stats'][role]["Both"]['ratio'] = showingTemp['stats'][role]['Both']['games_played'] / showingTemp['stats']["All"]['Both']['games_played'];

		  } // for
		  
		  
		  // 역할 중에서 ratio 최대값 찾기 (모드 별로!)
		  // listRoel 하나 가지고 sort 하면 이해는 못하겠지만 sort 가 한번만 된다!! (listRole 을 let 으로 해도 마찬가지..)
      const listRole1 = ['Tank', 'Bruiser', 'Melee Assassin', 'Ranged Assassin', 'Healer', 'Support'];
      const listRole2 = ['Tank', 'Bruiser', 'Melee Assassin', 'Ranged Assassin', 'Healer', 'Support'];
      const listRole3 = ['Tank', 'Bruiser', 'Melee Assassin', 'Ranged Assassin', 'Healer', 'Support'];
      
       
      const orderRole_QM = listRole1.sort((role1, role2) => showingTemp['stats'][role2]["Quick Match"]['games_played'] - showingTemp['stats'][role1]["Quick Match"]['games_played']  );
      const orderRole_SL = listRole2.sort((role1, role2) => showingTemp['stats'][role2]["Storm League"]['games_played'] - showingTemp['stats'][role1]["Storm League"]['games_played'] );
      const orderRole_Both = listRole3.sort((role1, role2) => showingTemp['stats'][role2]["Both"]['games_played'] - showingTemp['stats'][role1]["Both"]['games_played'] );
      
      const mostRole_QM = orderRole_QM[0];
      const mostRole_SL = orderRole_SL[0];
      const mostRole_Both = orderRole_Both[0];
      
      showingTemp['graph'] = {
        'Quick Match': { ratioMax: showingTemp['stats'][mostRole_QM]['Quick Match']['ratio'] }
        , 'Storm League': { ratioMax: showingTemp['stats'][mostRole_SL]['Storm League']['ratio'] }
        , 'Both': { ratioMax: showingTemp['stats'][mostRole_Both]['Both']['ratio'] }
      }
      
		// finally  
    console.log(showingTemp)
    
    
		if (!unmounted) {
      setShowing(showingTemp);
    }
		
		replaceData2("ready", "playerGeneralShowing", true);
		
    } // if
    
    } catch(error) {
      console.log(error)
      addDeleteNotification("basic01", language);
    }
  
    
  }, [readyPlayerGeneral, region, mode, role, readyPlayerGeneralShowing] )
  
  
  
  const objFlag = {
    NA: flagNA,
    EU: flagEU,
    KR: flagKR,
    CN: flagCN
  };
  
  
  const returnTextTier = (league_tier) => {
    switch(league_tier){
      case('bronze'):  switch (language) { case 'ko':  return '브론즈'; case 'ja':  return 'ブロンズ'; default: return 'Bronze'; } break;
      case('silver'):  switch (language) { case 'ko':  return '실버'; case 'ja':  return 'シルバー'; default: return 'Silver'; } break;
      case('gold'):  switch (language) { case 'ko':  return '골드'; case 'ja':  return 'ゴールド: '; default: return 'Gold'; } break;
      case('platinum'):  switch (language) { case 'ko':  return '플래티넘'; case 'ja':  return 'プラチナ'; default: return 'Platinum'; } break;
      case('diamond'):  switch (language) { case 'ko':  return '다이아'; case 'ja':  return 'ダイヤ'; default: return 'Diamond'; } break;
      case('master'):  switch (language) { case 'ko':  return '마스터'; case 'ja':  return 'マスター'; default: return 'Master'; } break;
      default: switch (language) { case 'ko':  return '없음'; case 'ja':  return '無し'; default: return 'none'; } break;
    }
  }
  
  const returnIconRole = (nameRole, ratio) => {
    
    let color;
    
    if ( ratio > 0.3) { color = 'color_active' }
    else if ( ratio > 0.16) { color = 'color_weak' }
    else { color = 'color_very_weak' }
    
    
    switch(nameRole) {
      case "Tank": 
        return (<IconTank width={"24px"} height={"24px"}  color={color} />)
      case "Bruiser": 
        return (<IconBruiser width={"24px"} height={"24px"}  color={color} />)
      case "Melee Assassin": 
        return (<IconMelee width={"24px"} height={"24px"}  color={color} />)
      case "Ranged Assassin": 
        return (<IconRanged width={"24px"} height={"24px"}  color={color} />)
      case "Healer": 
        return (<IconHealer width={"24px"} height={"24px"}  color={color} />)
      case "Support": 
        return (<IconSupport width={"24px"} height={"24px"} color={color} />)
    }
  }
  
  
  const returnDivEachRole = (nameRole) => {
    const onClick_EachRole = (event) => {
      replaceData2Player("heroes", "role", nameRole);
      history.push(`/player/heroes/${encodeURIComponent(player.battletag)}`);
    }
    return (
      
      <DivEachRole
        onClick={onClick_EachRole}
      > 
        <DivGraph> 
          <DivGames>
            <Div> {showing['stats'][nameRole][mode]['games_played']} </Div>
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
          </DivGames>
          
          <DivBar 
            ratio={ showing['stats'][nameRole][mode]['ratio']}
            ratioAgainstMax={ showing['stats'][nameRole][mode]['ratio'] / showing['graph'][mode]['ratioMax']}
            games={ showing['stats'][nameRole][mode]['games_played'] }
          >  
          </DivBar>
        </DivGraph>
        
        <DivIconRole> {returnIconRole(nameRole, showing['stats'][nameRole][mode]['ratio'] )}  </DivIconRole>
        
        {(mode === "Quick Match" || mode === "Storm League") &&
          <DivMmr
            league_tier={showing['stats'][nameRole][mode]['league_tier']}
          >    <Div> MMR </Div>    <Div> {showing['stats'][nameRole][mode]['mmr']} </Div>    
          </DivMmr>
        }
      </DivEachRole>
        
    )
  }
  
  
  const onKeyPress_Battletag = async (event) => {
    if (event.key === "Enter") {
      onClick_Update();
    }
    
  }
  
  return (
    
      <DivGeneral>
        
        <DivInputBattletag>
          <Input 
            {...inputBattletag} 
            placeholder="battletag#1234" 
            onKeyPress={onKeyPress_Battletag}
            />
          <Button onClick={onClick_Update} > <IconSearch width={'24px'}  height={'24px'} color={'COLOR_normal'} /> </Button>
        </DivInputBattletag>
        
        { (!loadingPlayerGeneral && readyPlayerGeneral && readyPlayerGeneralShowing) &&
          <DivUpdated>
            <Div> {(() => {
                          switch (language) {
                            case 'ko': 
                              return '업데이트: ';
                            case 'ja': 
                              return 'アップデート: ';
                            default: // eng
                              return 'updated: ';
                          }
                        })()} </Div>
            <Div> {updatedText} </Div>
          </DivUpdated>
        }
        
        { loadingPlayerGeneral && <Loading/> }
        
        { (!loadingPlayerGeneral && readyPlayerBattletag && readyPlayerGeneral && readyPlayerGeneralShowing ) &&
          <DivContainer>
          
            <DivHeader>  
            
              <DivIdentification> 
                <Div> <ImgFlagMain src={objFlag[region]} /> </Div>
                <Div> {player["battletagName"] } </Div>
                <Div> {player["battletagNumber"] } </Div>
              </DivIdentification>
              
              <Div> 
                {player.orderNameRegion.map(element=>
                  <DivFlagNormal
                    key={`flagNormal-${element}`}
                    active={element === region}
                    onClick={(event=>{
                      if (region !== element) {
                        replaceData2Player("general", "region", element)
                        replaceData2("ready", "playerGeneralShowing", true); 
                      }
                    })}
                    > <ImgFlagNormal src={objFlag[element]} /> 
                  </DivFlagNormal>
                )}
              </Div>
              
            </DivHeader>
            
            
            <DivBody>  
              
              <Div>
              
                <DivStatAll> 
                
                  <Div>
                    <DivModeTitle>  {(() => {
                      switch (language) {
                        case 'ko': 
                          return '빠른 대전';
                        case 'ja': 
                          return 'Quick Match';
                        default: // eng
                          return 'Quick Match';
                      }
                    })()}  </DivModeTitle>
                    
                    <DivGamesAll
                      games_played={showing['stats']['All']['Quick Match']['games_played']}
                    >    
                      <Div> {showing['stats']['All']['Quick Match']['games_played']} </Div>
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
                    </DivGamesAll>
                    
                    <DivRank
                      league_tier={showing['stats']['All']['Quick Match']['league_tier']}
                    >
                      <Div> { returnTextTier( showing['stats']['All']['Quick Match']['league_tier']) } </Div>
                      <Div> {showing['stats']['All']['Quick Match']['mmr']} </Div>
                    </DivRank>
                  </Div>
                  
                  <Div>
                    <DivModeTitle>  {(() => {
                      switch (language) {
                        case 'ko': 
                          return '폭풍 리그';
                        case 'ja': 
                          return 'Storm League';
                        default: // eng
                          return 'Storm League';
                      }
                    })()}  </DivModeTitle>
                    
                    <DivGamesAll
                      games_played={showing['stats']['All']['Storm League']['games_played']}
                    >    
                      <Div> {showing['stats']['All']['Storm League']['games_played']} </Div>
                      <Div>  {(() => {
                      switch (language) {
                        case 'ko': 
                          return '게임';
                        case 'ja': 
                          return 'ゲーム';
                        default: // eng
                          return 'games';
                      }
                    })()} </Div>
                    </DivGamesAll>
                    
                    <DivRank
                      league_tier={showing['stats']['All']['Storm League']['league_tier']}
                    >
                      <Div> { returnTextTier( showing['stats']['All']['Storm League']['league_tier']) } </Div>
                      <Div> {showing['stats']['All']['Storm League']['mmr']} </Div>
                    </DivRank>
                  </Div>
                  
                </DivStatAll>
                
              </Div>
              
              
              <Div> 
                <DivStatRoles> 
                  
                  {returnDivEachRole("Tank")}
                  {returnDivEachRole("Bruiser")}
                  {returnDivEachRole("Melee Assassin")}
                  {returnDivEachRole("Ranged Assassin")}
                  {returnDivEachRole("Healer")}
                  {returnDivEachRole("Support")}
                
                </DivStatRoles>
                
                
                <DivChooseMode>
                
                  <ButtonChooseMode 
                    onClick={ (event)=>{ replaceData2Player("general", "mode", "Quick Match"); replaceData2("ready", "playerGeneralShowing", false); } }
                    active={(mode==="Quick Match")}
                    > {(() => {
                      switch (language) {
                        case 'ko': 
                          return '빠른 대전';
                        case 'ja': 
                          return 'Quick Match';
                        default: // eng
                          return 'Quick Match';
                      }
                    })()}  </ButtonChooseMode>
                    
                  <ButtonChooseMode 
                    onClick={ (event)=>{ replaceData2Player("general", "mode", "Storm League"); replaceData2("ready", "playerGeneralShowing", false); } }
                    active={(mode==="Storm League")}
                    > {(() => {
                      switch (language) {
                        case 'ko': 
                          return '폭풍 리그';
                        case 'ja': 
                          return 'Storm League';
                        default: // eng
                          return 'Storm League';
                      }
                    })()}  </ButtonChooseMode>
                    
                  <ButtonChooseMode 
                    onClick={ (event)=>{ replaceData2Player("general", "mode", "Both"); replaceData2("ready", "playerGeneralShowing", false); } }
                    active={(mode==="Both")}
                    > {(() => {
                      switch (language) {
                        case 'ko': 
                          return '둘다';
                        case 'ja': 
                          return 'Both';
                        default: // eng
                          return 'Both';
                      }
                    })()}  </ButtonChooseMode>
                    
                </DivChooseMode>
              
              </Div> 
              
            </DivBody>
          
          </DivContainer>
        }
  
      </DivGeneral>

  )

}


function mapStateToProps(state) {
  return {

    language: state.basic.language
    
    , user: state.auth.user
    //, readyUser: state.basic.ready.user
    //, loadingUser: state.basic.loading.user
    
    , player: state.player.player
    
    , region: state.player.general.region
    , mode: state.player.general.mode
    , role: state.player.general.role
    
    , triggerUpdateGeneral: state.player.general.triggerUpdate
    
    
    , readyPlayerBattletag: state.basic.ready.playerBattletag
    , dataPlayerGeneral: state.player.general.data
    
    , readyPlayerGeneral: state.basic.ready.playerGeneral
    , loadingPlayerGeneral: state.basic.loading.playerGeneral
    
    , readyPlayerGeneralShowing: state.basic.ready.playerGeneralShowing
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