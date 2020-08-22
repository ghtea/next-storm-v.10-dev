
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

import Loading from '../_/Loading';
import Hero from './Heroes/Hero';
import Option from './Heroes/Option';

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

import * as imgHero from '../../images/heroes'


const DivHeroes = styled(Div)
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
  
  padding-left: 15px;
  padding-right: 15px;
  
  padding-bottom: 10px;
`



const ListHero = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  flex-wrap: wrap;
  
  max-height: 500px;
  overflow-y: auto;
`



const DivChooseRole = styled(Div)`
  
  margin-top: 10px;
  
  width: auto;
  height: 30px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`

const ButtonChooseRole = styled(Button)`
  width: 40px;
  &:nth-child(n+2) { margin-left: 4px; }
`



const DivChooseMode = styled(Div)`
  
  margin-top: 5px;
  
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


const Heroes = ({

  language
  , user
  
  , listAllHeroBasic
  
  , readyPlayerBattletag
  , dataPlayerHeroes
  , readyPlayerHeroes
  , loadingPlayerHeroes
  , readyPlayerHeroesShowing
  
  , player
  
  , region
  , mode
  , role
  , sort
  , games
  
  , triggerUpdateHeroes
  
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
  
  const inputBattletag = useInput("");
  
  // 직접적인 것들은 redux가 아닌 여기 component 에서 state로
  const [updatedText, setUpdatedText] = useState("")
  //const [readyPlayerHeroesShowing, setReadyShowing] = useState(false);
  
  const [showing, setShowing] = useState({
    updatedText: ""
    
    , battletagName: ""
    , battletagNumber: ""
    
    
    // 아래 두개의 조합!
    , dataRegionMode : { }   // 전체 data에서 현재의 region, mode 로 선택한 일부 data
    , orderRoleKeyHero: []   // filtering(role), sort  정보
    
    
  })
  
  // const urlBattletag = encodeURIComponent(battletag);
  
  useEffect(()=>{
    if (params.battletagEncoded){
    
      if (params.battletagEncoded === "undefined") {
        return;
      }
    
      else {  
        replaceData2("ready", "playerBattletag", false);
        const battletag = decodeURIComponent(params.battletagEncoded)
        replaceData2Player("player", "battletag", battletag); // 나중에 다른곳에서 쓰기 위해서
        replaceData2("ready", "playerHeroes", false);
        replaceData2("loading", "playerHeroes", true);
        
        inputBattletag.setValue(battletag);
        replaceData2("ready", "playerBattletag", true);

        // 바로 업데이트 trigger
        replaceData2Player("heroes", "triggerUpdate", Date.now().toString()); 
      } // else
    } // if
  },[])
  
  
  const onClick_Update = () => {
    if (inputBattletag.value) {
      replaceData2("ready", "playerBattletag", false);
      replaceData2Player("player", "battletag", inputBattletag.value); 
      history.push(`/player/heroes/${encodeURIComponent(inputBattletag.value)}`);
      replaceData2("ready", "playerBattletag", true);
      replaceData2Player("heroes", "triggerUpdate", Date.now().toString()); 
    }
  }
  
  
  // trigger 변하면 내 서버에서 가져오기 (내 서버에서 가져오는 것이 완전 새 데이터는 아님)
  useEffect(() => {
    (async() => {
      
    if (readyPlayerBattletag) {
      try {
        replaceData2("ready", "playerHeroes", false);
        replaceData2("loading", "playerHeroes", true);
        
        const resRegions = await axios.get(`${config.URL_API_NS}/player/regions/${encodeURIComponent(player.battletag)}`);
        
        const orderNameRegion = resRegions.data.orderNameRegion;
        replaceData2Player("player", "orderNameRegion",  orderNameRegion); // 잊지 않기!
        
        const query = queryString.stringify({
          orderNameRegion: JSON.stringify(orderNameRegion)
        });
        
        
        const res = await axios.get(`${config.URL_API_NS}/player/heroes/${encodeURIComponent(player.battletag)}?` + query);
        let dataPlayer = res.data;
        
        // 중요! 내 서버에서 stats의 Heroes 을 json string 으로 저장했기 때문에, 여기서 parse 하는 작업 필요!
        const dataPlayerHeroesNew = JSON.parse(dataPlayer['stats']['heroes_String']);

        replaceData2Player("heroes", "data", dataPlayerHeroesNew );
        replaceData2("loading", "playerHeroes", false);
        replaceData2("ready", "playerHeroes", true);
        
        
        const updatedText = new Date(dataPlayer['updated']['heroes']);
        const month = updatedText.getUTCMonth() + 1; //months from 1-12
        const day = updatedText.getUTCDate();
        const year = updatedText.getUTCFullYear();
        setUpdatedText(`${year}. ${month}. ${day}`);
        
        
  
      } catch (error) {
        replaceData2("ready", "playerHeroes", false);
        replaceData2("loading", "playerHeroes", false);
        
        addDeleteNotification("basic01", language);
        console.log(error)
      }
        
    }
     
    })() // async

  }, [ triggerUpdateHeroes, readyPlayerBattletag ])
  
  
  
  
  
  
  // 처음 데이터 불러왔을 때
  useEffect(()=>{
    
    if (readyPlayerHeroes && readyPlayerBattletag) {
      
      let showingTemp = showing;
        //console.log(player)
        //const battletagFull = Object.keys(playerHeroes)[0]
        const battletagFull = player.battletag
        
        const regexBattletag = /(#\d*)$/;
  		  const listNumberBattletag = battletagFull.match(regexBattletag);
  		  const battletagName = battletagFull.replace(regexBattletag, "");
  		  const battletagNumber = listNumberBattletag[0];
  		  
  		showingTemp['battletagName'] = battletagName;
  		showingTemp['battletagNumber'] = battletagNumber;
  		  
  		  
  		  //const orderNameRegion = Object.keys(playerHeroes[battletagFull]);
  		  //console.log(orderNameRegion)
  		
  		showingTemp['orderNameRegion'] = player.orderNameRegion;
  		
    		if (region === ""){
    		  replaceData2Player("heroes", "region", player.orderNameRegion[0]); 
    		}
    
    
      	// finally  
  		setShowing(showingTemp);
		  
    } // if
    
  }, [readyPlayerHeroes, readyPlayerBattletag])
  		
    
    
    
    // region, mode, role, sort (role과 sort 가 변하면 orderKeyHeroes 변경)
  useEffect(()=>{
    
    try {
    replaceData2Player("heroes", "playerHeroesShowing", false);
    
    //readyPlayerHeroes 가 트루이면 player 도 ready인 상태
    if (readyPlayerHeroes && region !== "" ) {
      
      const battletagFull = player.battletag;
      //const battletagFull = Object.keys(playerHeroes)[0]
      let showingTemp = showing;
      
      
      let dataPlayerHeroes_region_withBothMode = dataPlayerHeroes[region]
      dataPlayerHeroes_region_withBothMode['Both'] = {};
      
      //먼저 Quick Match data와 Storm League 데이터를 합친 'Both' mode를 만들어야 한다 => mmr 은 이용 못하고, games_played, win_rate 만 이용가능 
      const listAllKeyHero = listAllHeroBasic.map(element => element.key_HeroesProfile);
      for (const keyHero of listAllKeyHero) {
        
        let sumHero = {
          games_played: 0
          , wins: 0
          , losses: 0
        };
        
        if (dataPlayerHeroes[region] && dataPlayerHeroes[region]["Quick Match"] && dataPlayerHeroes[region]["Quick Match"][keyHero]) {
          sumHero.games_played += dataPlayerHeroes[region]["Quick Match"][keyHero]['games_played'];
          sumHero.wins += dataPlayerHeroes[region]["Quick Match"][keyHero]['wins'];
          sumHero.losses += dataPlayerHeroes[region]["Quick Match"][keyHero]['losses'];
        }
        if (dataPlayerHeroes[region] && dataPlayerHeroes[region]["Storm League"] && dataPlayerHeroes[region]["Storm League"][keyHero]) {
          sumHero.games_played += dataPlayerHeroes[region]["Storm League"][keyHero]['games_played'];
          sumHero.wins += dataPlayerHeroes[region]["Storm League"][keyHero]['wins'];
          sumHero.losses += dataPlayerHeroes[region]["Storm League"][keyHero]['losses'];
        }
        
        const resultHero = {
          games_played: sumHero.games_played
          , wins: sumHero.wins
          , losses: sumHero.losses
          , win_rate: sumHero.wins / (sumHero.wins + sumHero.losses) *100 || 50
        }
        
        dataPlayerHeroes_region_withBothMode['Both'][keyHero] = resultHero;
      }
      //이제 mode 적용
      //console.log(dataPlayerHeroes_region_withBothMode)
      showingTemp['dataRegionMode'] = dataPlayerHeroes_region_withBothMode[mode];
      
      
      // games & role  적용
      //let listRoleKeyHero =listAllHeroBasic.map(element => element.key_HeroesProfile); 이렇게 하면 에러뜬다. 아직 이해 안됨
      const listPlayedKeyHero = Object.keys(showingTemp['dataRegionMode']);
      let listRoleKeyHero = [];
      
      if (role === "All") {
        listRoleKeyHero = [...listPlayedKeyHero].filter(element => showingTemp['dataRegionMode'][element] && showingTemp['dataRegionMode'][element]['games_played'] >= games)
      }
      else {
        const listRoleObjHero = listAllHeroBasic.filter(element => element.role === role)
        listRoleKeyHero = listRoleObjHero.map(element=> element.key_HeroesProfile);
        listRoleKeyHero = listRoleKeyHero.filter(element => showingTemp['dataRegionMode'][element] && showingTemp['dataRegionMode'][element]['games_played'] >= games)
        
      }
      
      
    try { // 예를 들어 한 플레이어가 탱커를 한번도 안했다면, listRoleKeyHero=[] 이 되어 아래 작업들이 다 에러 뜬다 따라서 []의 경우는 아래의 else에서!
      // sort 적용
      let orderRoleKeyHero = [];
      
      let sortUsing = sort;
      if (mode === "Both" && sort==="mmr"){
        sortUsing = "games";
        replaceData2Player("heroes", "sort", "games"); 
      }
      
      if (sortUsing === "games") {
        orderRoleKeyHero = listRoleKeyHero.sort((a, b)=>  showingTemp['dataRegionMode'][b]["games_played"] - showingTemp['dataRegionMode'][a]["games_played"]);
        showingTemp['orderRoleKeyHero'] = orderRoleKeyHero;
      }
      else if (sortUsing === "mmr") {
        orderRoleKeyHero = listRoleKeyHero.sort((a, b)=>  showingTemp['dataRegionMode'][b]["mmr"] - showingTemp['dataRegionMode'][a]["mmr"]);
        showingTemp['orderRoleKeyHero'] = orderRoleKeyHero;
      }
      else if (sortUsing === "win_rate") {
        orderRoleKeyHero = listRoleKeyHero.sort((a, b)=>  showingTemp['dataRegionMode'][b]["win_rate"] - showingTemp['dataRegionMode'][a]["win_rate"]);
        showingTemp['orderRoleKeyHero'] = orderRoleKeyHero;
      }
      
      /* 참고!
        "Alarak": {
          "wins": 0,
          "losses": 1,
          "games_played": 1,
          "win_rate": 0,
          "mmr": 1767.4560295256874
        },
      */
      
      
		  // graph 그리기 위한 작업
		  
  		  // 먼저 전체 영웅 플레이 횟수 총합 구하기
  		  //const listAllKeyHero = listAllHeroBasic.map(element => element.key_HeroesProfile);
		  let sum_games_played = 0;
      for (const keyHero of orderRoleKeyHero) {
        sum_games_played += showingTemp['dataRegionMode'][keyHero]['games_played'];
      }
      
        // 해당 영웅 플레이 횟수 / 전체 영웅 플레이 횟수 비율 구하기!
		  for (const keyHero of orderRoleKeyHero) {
        showingTemp['dataRegionMode'][keyHero]['ratio'] = showingTemp['dataRegionMode'][keyHero]['games_played'] / sum_games_played;
      }
		  
		  // 영웅 중에서 ratio 최대값 찾기
		  const orderRoleKeyHeroCopy1 = orderRoleKeyHero;
      const orderForFindingMax = orderRoleKeyHeroCopy1.sort((a, b) => showingTemp['dataRegionMode'][b]['ratio'] - showingTemp['dataRegionMode'][a]['ratio']  );
     
      const mostPlayedKeyHero = orderForFindingMax[0];
      
      showingTemp['graph'] = {
        ratioMax: showingTemp['dataRegionMode'][mostPlayedKeyHero]['ratio'] 
      }
      
    } catch(error) { // 예를 들어 탱커를 한번도 플레이 안한 플레이어에서 탱커를 role로 선택했을 때
      showing.orderRoleKeyHero = []
    }
		// finally  

		setShowing(showingTemp);
		replaceData2("ready", "playerHeroesShowing", true); 
		
    } // if
    
    } catch(error) {
      console.log(error)
      addDeleteNotification("basic01", language);
    }
  
    
  }, [readyPlayerHeroes, region, mode, role, games, sort] )
  
  
  
  /*
  useEffect(()=>{
    // sort 가 이상하게 안되서 따로 시도해본다
    try {
      replaceData2Player("heroes", "playerHeroesShowing", false);
      
      //readyPlayerHeroes 가 트루이면 player 도 ready인 상태
      if (readyPlayerHeroes && region !== "" ) {
        
        const showingTemp = showing;
        let orderRoleKeyHero = [];
        
        let sortUsing = sort;
        if (mode === "Both" && sort==="mmr"){
          sortUsing = "games";
          replaceData2Player("heroes", "sort", "games"); 
        }
        
        if (sortUsing === "games") {
          orderRoleKeyHero = Array.from(listRoleKeyHero).sort((a, b)=>  showingTemp['dataRegionMode'][b]["games_played"] - showingTemp['dataRegionMode'][b]["games_played"]);
          showingTemp['orderRoleKeyHero'] = orderRoleKeyHero;
          
        }
        else if (sortUsing === "mmr") {
          orderRoleKeyHero = Array.from(listRoleKeyHero).sort((a, b)=>  showingTemp['dataRegionMode'][b]["mmr"] - showingTemp['dataRegionMode'][b]["mmr"]);
          console.log(orderRoleKeyHero)
          showingTemp['orderRoleKeyHero'] = orderRoleKeyHero;
          
        }
        else if (sortUsing === "win_rate") {
          orderRoleKeyHero = Array.from(listRoleKeyHero).sort((a, b)=>  showingTemp['dataRegionMode'][b]["win_rate"] - showingTemp['dataRegionMode'][b]["win_rate"]);
          showingTemp['orderRoleKeyHero'] = orderRoleKeyHero;
          
        }
        
        setShowing(showingTemp);
		    replaceData2("ready", "playerHeroesShowing", true); 
        
      }
        
    } catch(error) {
      console.log(error)
      addDeleteNotification("basic01", language);
    }
  },[sort, readyPlayerHeroes])
  */
  
  
  
  const objFlag = {
    NA: flagNA,
    EU: flagEU,
    KR: flagKR,
    CN: flagCN
  };
  
  
  const returnIconRole = (roleThis) => {
    
    let color;
    
    if ( role === "All") { color = 'color_active' }
    else if ( role === roleThis  ) { color = 'color_active' }
    else { color = 'color_very_weak' }
    
    switch(roleThis) {
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
  
  const onClick_ButtonChooseRole = (event, roleThis) => {

    if (roleThis === role) {
      replaceData2Player("heroes", "role", "All") 
      replaceData2("ready", "playerHeroesShowing", false); // 잊지 말기!
    }
    else {
      replaceData2Player("heroes", "role", roleThis) 
      replaceData2("ready", "playerHeroesShowing", false); // 잊지 말기!
    }
  }
  
  return (
    
      <DivHeroes>
        
        <DivInputBattletag>
          <Input {...inputBattletag} placeholder="battletag#1234" />
          <Button onClick={onClick_Update} > <IconSearch width={'24px'}  height={'24px'} color={'COLOR_normal'} /> </Button>
        </DivInputBattletag>
        
        { (!loadingPlayerHeroes && readyPlayerHeroes && readyPlayerHeroesShowing) &&
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
        
        { loadingPlayerHeroes && <Loading/> }
        
        { (!loadingPlayerHeroes && readyPlayerHeroes && readyPlayerHeroesShowing) &&
          <DivContainer>
          
            <DivHeader>  
            
              <DivIdentification> 
                <Div> <ImgFlagMain src={objFlag[region]} /> </Div>
                <Div> {showing["battletagName"] } </Div>
                <Div> {showing["battletagNumber"] } </Div>
              </DivIdentification>
              
              <Div> 
                {player.orderNameRegion.map(element=>
                  <DivFlagNormal
                    key={`flagNormal-${element}`}
                    active={element === region}
                    onClick={(event=>{
                      if (region !== element) {
                        replaceData2Player("heroes", "region", element)
                        replaceData2Player("heroes", "playerHeroesShowing", false);
                      }
                    })}
                    > <ImgFlagNormal src={objFlag[element]} /> 
                  </DivFlagNormal>
                )}
              </Div>
              
            </DivHeader>
            
            
            <DivBody>  
              
              
              <Option/>
              
              <ListHero>
              
                {showing.orderRoleKeyHero.map(key=>{
                  
                  const objHero = listAllHeroBasic.find(element => element.key_HeroesProfile === key);
                  console.log()
                  return(
                    <Hero
                      key={objHero.key_HeroesProfile}
                      key_HeroesProfile={objHero.key_HeroesProfile}
                      
                      info={objHero}
                      stats={showing.dataRegionMode[objHero.key_HeroesProfile]}
                      
                      ratioMax={showing.graph.ratioMax}
                      
                    />
                  )
                })}
              
              
              </ListHero>
                
                
                
                <DivChooseRole>
                
                {
                  [ "Tank", "Bruiser", "Melee Assassin", "Ranged Assassin", "Healer", "Support"].map(element=>{
                    return (
                      <ButtonChooseRole 
                        key={`button-choose-role-${element}`}
                        onClick={(event)=>onClick_ButtonChooseRole(event, element)}
                        active={(element===role)}
                        >  {returnIconRole(element)}  </ButtonChooseRole>
                    )
                  })
                }
                  
                    
                </DivChooseRole>
                
                
                
                
                <DivChooseMode>
                  <ButtonChooseMode 
                    onClick={ (event)=>{ replaceData2Player("heroes", "mode", "Quick Match"); replaceData2("ready", "playerHeroesShowing", false); } }
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
                    onClick={ (event)=>{ replaceData2Player("heroes", "mode", "Storm League"); replaceData2("ready", "playerHeroesShowing", false); } }
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
                    onClick={ (event)=>{ replaceData2Player("heroes", "mode", "Both"); replaceData2("ready", "playerHeroesShowing", false); } }
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
              
              
            </DivBody>
          
          </DivContainer>
        }
  
      </DivHeroes>

  )

}




function mapStateToProps(state) {
  return {

    language: state.basic.language
    
    , user: state.auth.user
    , readyUser: state.basic.ready.user
    
    
    
    , listAllHeroBasic: state.hots.listAllHeroBasic
    
    
    , player: state.player.player
    
    , region: state.player.heroes.region
    , mode: state.player.heroes.mode
    , role: state.player.heroes.role
    , sort: state.player.heroes.sort
    , games: state.player.heroes.games
    
    , triggerUpdateHeroes: state.player.heroes.triggerUpdate
    
    
    , readyPlayerBattletag: state.basic.ready.playerBattletag
    , dataPlayerHeroes: state.player.heroes.data
    , readyPlayerHeroes: state.basic.ready.playerHeroes
    , loadingPlayerHeroes: state.basic.loading.playerHeroes
    
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
export default connect(mapStateToProps, mapDispatchToProps)(Heroes);
