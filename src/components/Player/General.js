
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

import { Div, Input, Button, Img } from '../../styles/DefaultStyles';

import Loading from '../_/Loading'

import useInput from '../../tools/hooks/useInput';

import IconSync from '../../svgs/basic/IconSync';
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
    margin-right: 2px;
  }
  
  & > *:nth-child(2){
    background-color: ${props => props.theme.color_very_weak};
    border-radius: 0 8px 8px 0;
    width: 40px;
    height: 40px;
    margin: 0;
    margin-left: 2px;
  }
  
`


const DivContainer = styled(Div)`

  width: 350px;
  border-radius: 15px;
  
  margin-top: 20px;
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
  border-bottom: 4px solid  ${props => (props.active)? `${props.theme.color_active}` : "transparent"};
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


const DivStatEntire = styled(Div)`
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
  justify-content: space-between;
  align-items: center;
  
`

const DivGraph = styled(Div)`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`
const DivBar = styled(Div)`
  background-color: ${props => props.theme.color_weak};
  height: ${props => props.ratioAgainstMax * 90 }px;
`



const DivIconRole = styled(Div)`
  height: 40px;
  border-top: 2px solid ${props => props.theme.color_very_weak};
`

const DivMmr = styled(Div)`
  height: 30px;
  width: 40px;
  border-radius: 5px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${props => props.theme.color_very_weak};
  color: ${props => props.theme.COLOR_normal};
  
  & > div:nth-child(1) { font-size: 0.8rem;  height: 12px; }  
  & > div:nth-child(2) { font-size: 0.9rem;  height: 15px; }  
`



const DivChooseMode = styled(Div)`
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


const General = ({

  language
  , user
  
  , playerGeneral
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
  
  const inputBattletag = useInput("");
  const [triggerUpdate, setTriggerUpdate] = useState("")
  
  
  // 화면에 표시할 정보 정리
  const [nameRegionShowing, setNameRegionShowing] = useState("");
  const [modeShowing, setModeShowing] = useState("Both"); // for roles 
  
  const [readyShowing, setReadyShowing] = useState(false);
  
  const [showing, setShowing] = useState({
    battletagName: ""
    , battletagNumber: ""
    , orderNameRegion: []
    , stats : {
      All: {}
      ,  "Tank": {}
      ,  "Bruiser": {}
      ,  "Melee Assassin": {}
      ,  "Ranged Assassin": {}
      ,  "Healer": {}
      ,  "Support": {}
    }
  })
  
  // const urlBattletag = encodeURIComponent(battletag);
  
  useEffect(()=>{
    if (params.battletagEncoded){
      
      
      if (params.battletagEncoded === "undefined") {
        return;
      }
      
      else {  
        const battletag = decodeURIComponent(params.battletagEncoded)
        replaceData2("ready", "playerGeneral", false);
        replaceData2("loading", "playerGeneral", true);
        
        
        inputBattletag.setValue(battletag);
        
        //const updated = Date.parse( storage.get("updatedPlayerGeneral") );
        const dictUpdatedPlayerGeneral = storage.get("dictUpdatedPlayerGeneral"); // 우선 JSON.parse 는 거친다
        
        if (dictUpdatedPlayerGeneral &&  dictUpdatedPlayerGeneral[battletag] && ( dictUpdatedPlayerGeneral[battletag] > new Date().getTime() - 1000 * 60 * 60 * 24 * 1 ) ) {
          
          const dictPlayerGeneral = storage.get("dictPlayerGeneral"); // 우선 JSON.parse 는 거친다
          
          if (dictPlayerGeneral && dictPlayerGeneral[ battletag ]) {
            const thisPlayerGeneral = dictPlayerGeneral[ battletag ];
            
            let replacement = { };
            replacement[battletag] = thisPlayerGeneral;
            replaceDataPlayer("general", replacement );
            
            replaceData2("loading", "playerGeneral", false);
            replaceData2("ready", "playerGeneral", true); 
            
          }
          
        }
        
        else {
          
          setTriggerUpdate(Date.now().toString());
          
        }
        
        
      } // else
      
    } // if
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
          
          
          
          let dictPlayerGeneralTemp = storage.get("dictPlayerGeneral") || {};
          dictPlayerGeneralTemp[ inputBattletag.value ] = playerGeneralNew;
          storage.set("dictPlayerGeneral", dictPlayerGeneralTemp );
          
          
          let dictUpdatedPlayerGeneralTemp = storage.get("dictUpdatedPlayerGeneral") || {};
          dictUpdatedPlayerGeneralTemp[ inputBattletag.value ] =  Date.now();
          storage.set("dictUpdatedPlayerGeneral", dictUpdatedPlayerGeneralTemp );
          
          let replacement = { };
          replacement[inputBattletag.value] = playerGeneralNew;
          replaceDataPlayer("general", replacement );
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
  
  
  
  
  
  
  
  
  // 처음 데이터 불러왔을 때 / 로컬 스토리지에서 읽었을 때
  useEffect(()=>{
    
    if (readyPlayerGeneral) {
      
      let showingTemp = showing;
      
        const battletagFull = Object.keys(playerGeneral)[0]
        
        
        const regexBattletag = /(#\d*)$/;
  		  const listNumberBattletag = battletagFull.match(regexBattletag);
  		  const battletagName = battletagFull.replace(regexBattletag, "");
  		  const battletagNumber = listNumberBattletag[0];
  		  
  		showingTemp['battletagName'] = battletagName;
  		showingTemp['battletagNumber'] = battletagNumber;
  		  
  		  const orderNameRegion = Object.keys(playerGeneral[battletagFull]);
  		  //console.log(orderNameRegion)
  		
  		
  		showingTemp['orderNameRegion'] = orderNameRegion;
  		
    		if (nameRegionShowing === ""){
    		  setNameRegionShowing(orderNameRegion[0])
    		}
    
    
      	// finally  
  		setShowing(showingTemp);
		  
    } // if
    
  }, [readyPlayerGeneral])
  		
    
    
    // 메인 지역 알아냈을 때/ 보일 지역 변경했을 때
  useEffect(()=>{
    
    setReadyShowing(false);
    
    if (readyPlayerGeneral && nameRegionShowing !== "" ) {
      
      const battletagFull = Object.keys(playerGeneral)[0]
      let showingTemp = showing;
      
		  const listRole_withAll = ['All', 'Tank', 'Bruiser', 'Melee Assassin', 'Ranged Assassin', 'Healer', 'Support'];
		  for (const role of listRole_withAll) {
		    
		    showingTemp['stats'][role] = {
		      "Quick Match": { games_played: 0, mmr:0, tier: ""}
    		  , "Storm League": { games_played: 0, mmr:0, tier: ""}
    		  , "Both": { games_played: 0 }
		    }
		    
		    if (playerGeneral[battletagFull][nameRegionShowing][role] && playerGeneral[battletagFull][nameRegionShowing][role]['Quick Match']) {
		      showingTemp['stats'][role]["Quick Match"] = playerGeneral[battletagFull][nameRegionShowing][role]['Quick Match'];
		      showingTemp['stats'][role]["Both"]['games_played'] += playerGeneral[battletagFull][nameRegionShowing][role]['Quick Match']['games_played'];
		    }
		    else if (playerGeneral[battletagFull][nameRegionShowing][role] && playerGeneral[battletagFull][nameRegionShowing][role]['Storm League']) {
		      showingTemp['stats'][role]["Storm League"] = playerGeneral[battletagFull][nameRegionShowing][role]['Storm League'];
		      showingTemp['stats'][role]["Both"]['games_played'] += playerGeneral[battletagFull][nameRegionShowing][role]['Storm League']['games_played'];
		    }
		    
		    showingTemp['stats'][role]["Quick Match"]['ratio'] = showingTemp['stats'][role]['Quick Match']['games_played'] / showingTemp['stats']["All"]['Quick Match']['games_played'];
		    showingTemp['stats'][role]["Storm League"]['ratio'] = showingTemp['stats'][role]['Storm League']['games_played'] / showingTemp['stats']["All"]['Storm League']['games_played'];
		    showingTemp['stats'][role]["Both"]['ratio'] = showingTemp['stats'][role]['Both']['games_played'] / showingTemp['stats']["All"]['Both']['games_played'];

		  } // for
		  
		  
		  // 역할 중에서 ratio 최대값 찾기 (모드 별로!)
      const listRole = ['Tank', 'Bruiser', 'Melee Assassin', 'Ranged Assassin', 'Healer', 'Support'];	  
      
      
      const orderRole_QM = listRole.sort((role1, role2) => (showingTemp['stats'][role2]["Quick Match"]['games_played'] - showingTemp['stats'][role1]["Quick Match"]['games_played'] ));
      const orderRole_SL = listRole.sort((role1, role2) => (showingTemp['stats'][role2]["Storm League"]['games_played'] - showingTemp['stats'][role1]["Storm League"]['games_played'] ));
      const orderRole_Both = listRole.sort((role1, role2) => (showingTemp['stats'][role2]["Both"]['games_played'] - showingTemp['stats'][role1]["Both"]['games_played'] ));
      
      const mostRole_QM = orderRole_QM[0];
      const mostRole_SL = orderRole_SL[0];
      const mostRole_Both = orderRole_Both[0];
      
      showingTemp['graph'] = {
        'Quick Match': { ratioMax: showingTemp['stats'][mostRole_QM]['Quick Match']['ratio'] }
        , 'Storm League': { ratioMax: showingTemp['stats'][mostRole_SL]['Storm League']['ratio'] }
        , 'Both': { ratioMax: showingTemp['stats'][mostRole_Both]['Both']['ratio'] }
      }
      
		  
		// finally  
		setShowing(showingTemp);
		setReadyShowing(true);
		
    } // if
  
    
  }, [readyPlayerGeneral, nameRegionShowing] )
  
  
  
  const objFlag = {
    NA: flagNA,
    EU: flagEU,
    KR: flagKR,
    CN: flagCN
  };
  
  console.log(showing)
  
  return (
    
      <DivGeneral>
        
        <DivInputBattletag>
          <Input {...inputBattletag} placeholder="battletag#1234" />
          <Button onClick={onClick_Update} > <IconSync width={'24px'}  height={'24px'} color={'COLOR_normal'} /> </Button>
        </DivInputBattletag>
        
        
        { loadingPlayerGeneral && <Loading/> }
        
        { (!loadingPlayerGeneral && readyPlayerGeneral && readyShowing) &&
          <DivContainer>
          
            <DivHeader>  
            
              <DivIdentification> 
                <Div> <ImgFlagMain src={objFlag[nameRegionShowing]} /> </Div>
                <Div> {showing["battletagName"] } </Div>
                <Div> {showing["battletagNumber"] } </Div>
              </DivIdentification>
              
              <Div> 
                {showing['orderNameRegion'].map(element=>
                  <DivFlagNormal
                    key={`flagNormal-${element}`}
                    active={element === nameRegionShowing}
                    onClick={(event=>{
                      setNameRegionShowing(element)
                    })}
                    > <ImgFlagNormal src={objFlag[element]} /> 
                  </DivFlagNormal>
                )}
              </Div>
              
            </DivHeader>
            
            
            <DivBody>  
              
              <Div>
              
                <DivStatEntire> 
                
                  <Div>
                    <Div> Quick Match </Div>
                    <Div> graph! </Div>
                  </Div>
                  
                  <Div>
                    <Div> Storm League </Div>
                    <Div> graph! </Div>
                  </Div>
                  
                </DivStatEntire>
                
              </Div>
              
              
              <Div> 
                <DivStatRoles> 
                  
                  
                  <DivEachRole> 
                    <Div> graph </Div>
                    <Div> <IconTank width={"24px"} height={"24px"} />  </Div>
                    {(modeShowing === "Quick Match" || modeShowing === "Storm League") &&
                      <DivMmr
                        tier={showing['stats']["Tank"][modeShowing]['tier']}
                      >    <Div> mmr </Div>    <Div> {showing['stats']["Tank"][modeShowing]['mmr']} </Div>    
                      </DivMmr>
                    }
                    
                  </DivEachRole>
                  
                  
                  <DivEachRole> 
                    <Div> graph </Div>
                    <Div> <IconBruiser width={"24px"} height={"24px"} />  </Div>
                    {(modeShowing === "Quick Match" || modeShowing === "Storm League") &&
                      <DivMmr
                        tier={showing['stats']["Bruiser"][modeShowing]['tier']}
                      >    <Div> mmr </Div>    <Div> {showing['stats']["Bruiser"][modeShowing]['mmr']} </Div>    
                      </DivMmr>
                    }
                  </DivEachRole>
                  
                  
                  <DivEachRole> 
                    <Div> graph </Div>
                    <Div> <IconMelee width={"24px"} height={"24px"} />  </Div>
                    {(modeShowing === "Quick Match" || modeShowing === "Storm League") &&
                      <DivMmr
                        tier={showing['stats']["Melee Assassin"][modeShowing]['tier']}
                      >    <Div> mmr </Div>    <Div> {showing['stats']["Melee Assassin"][modeShowing]['mmr']} </Div>    
                      </DivMmr>
                    }
                  </DivEachRole>
                  
                  
                  <DivEachRole> 
                    <Div> graph </Div>
                    <Div> <IconRanged width={"24px"} height={"24px"} />  </Div>
                    {(modeShowing === "Quick Match" || modeShowing === "Storm League") &&
                      <DivMmr
                        tier={showing['stats']["Ranged Assassin"][modeShowing]['tier']}
                      >    <Div> mmr </Div>    <Div> {showing['stats']["Ranged Assassin"][modeShowing]['mmr']} </Div>    
                      </DivMmr>
                    }
                  </DivEachRole>
                  
                  
                  <DivEachRole> 
                    <Div> graph </Div>
                    <Div> <IconHealer width={"28px"} height={"28px"} />  </Div>
                    {(modeShowing === "Quick Match" || modeShowing === "Storm League") &&
                      <DivMmr
                        tier={showing['stats']["Healer"][modeShowing]['tier']}
                      >    <Div> mmr </Div>    <Div> {showing['stats']["Healer"][modeShowing]['mmr']} </Div>    
                      </DivMmr>
                    }
                  </DivEachRole>
                  
                  
                  <DivEachRole> 
                  
                    <DivGraph> 
                      <Div>
                        <Div> {showing['stats']["Support"][modeShowing]['games_played']} </Div>
                        <Div> games </Div>
                      </Div>
                      
                      <DivBar 
                        ratioAgainstMax={ showing['stats']["Support"][modeShowing]['ratio'] / showing['graph'][modeShowing]['ratioMax']}
                      >  
                      </DivBar>
                    </DivGraph>
                    
                    <DivIconRole> <IconSupport width={"24px"} height={"24px"} />  </DivIconRole>
                    
                    {(modeShowing === "Quick Match" || modeShowing === "Storm League") &&
                      <DivMmr
                        tier={showing['stats']["Support"][modeShowing]['tier']}
                      >    <Div> mmr </Div>    <Div> {showing['stats']["Support"][modeShowing]['mmr']} </Div>    
                      </DivMmr>
                    }
                  </DivEachRole>
                
                </DivStatRoles>
                
                
                <DivChooseMode>
                
                  <Button 
                    onClick={ (event)=>{setModeShowing("Quick Match")} }
                    active={(modeShowing==="Quick Match")}
                    > Quick Match </Button>
                    
                  <Button 
                    onClick={ (event)=>{setModeShowing("Storm League")} }
                    active={(modeShowing==="Storm League")}
                    > Storm League </Button>
                    
                  <Button 
                    onClick={ (event)=>{setModeShowing("Both")} }
                    active={(modeShowing==="Both")}
                    > Both </Button>
                    
                </DivChooseMode>
              
              
              </Div> 
              
            </DivBody>
          
          </DivContainer>
        }
  
      </DivGeneral>

  )

}

/*
<Div> <ImgFlagNormal src={objFlag["NA"]} /> </Div>
                <Div> <ImgFlagNormal src={objFlag["KR"]} /> </Div>
                <Div> <ImgFlagNormal src={objFlag["CN"]} /> </Div>
                <Div> <ImgFlagNormal src={objFlag["EU"]} /> </Div>
*/


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
    
    , playerGeneral: state.player.general
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