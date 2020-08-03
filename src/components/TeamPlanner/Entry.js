import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

//import path from 'path'
import { NavLink, useParams } from 'react-router-dom';

import { connect } from "react-redux";
import {addNotification, deleteNotification} from "../../redux/actions/basic";

import {replacePlayerTags, replacePlayerStatus} from "../../redux/actions/team_planner";

import readPlanTeam from "../../redux/thunks/readPlanTeam";

import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

// https://reacttraining.com/blog/react-router-v5-1/

import {Div} from '../../styles/DefaultStyles';


import IconConfirmed from '../../svgs/basic/IconConfirmed'
import IconPending from '../../svgs/basic/IconPending'
import IconInfo from '../../svgs/basic/IconInfo'
import IconLeader from '../../svgs/basic/IconLeader'

import IconTank from '../../svgs/roles/IconTank'
import IconBruiser from '../../svgs/roles/IconBruiser'
import IconMeleeAssassin from '../../svgs/roles/IconMeleeAssassin'
import IconRangedAssassin from '../../svgs/roles/IconRangedAssassin'
import IconHealer from '../../svgs/roles/IconHealer'
import {CopyToClipboard} from 'react-copy-to-clipboard';

// 이상하게 dotenv.config() 안해도 된다 (오히려 하면 에러 발생...)
//dotenv.config() ;
//dotenv.config({ path: path.join(__dirname, '../../.env') });

const DivEntry = styled(Div)`
  width: auto;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  padding-bottom: 10px;
`;

const DivEntryTitle = styled(Div)`
  font-size: 1.2rem;
  font-weight: bold;
  
  margin-top: 20px;
  height: 20px;
  margin-bottom: 5px;
`

const DivDescription = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  margin-bottom: 15px;
  margin-top: 10px;
  
  & > div {

    width: auto;
    
    margin-left: 4px;
    margin-right: 4px;
    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
`



const DivTableEntry = styled(Div)`
  
  margin-left: 10px;
  margin-right: 10px;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    overflow-y: auto;
    height: 360px;
  }
  
`

const DivIconLoading = styled(Div)`
  margin-top: 10px;
`

/*
display:grid;
*/

const DivRowHeader = styled(Div)`
  color: ${props => props.theme.color_weak};

  display: grid;
  grid-template-columns: 30px 150px 120px 60px 30px; // 20(padding) + 30 + 150 + 120 + 60 + 30 = 410 => 안전하게 small_mid 420 으로 하자
  grid-template-rows: 24px;
  
  @media (max-width: ${props => (props.theme.media.small_mid -1) }px ) {
    grid-template-columns: 30px 90px minmax(72px, auto) 60px 30px; // 
    grid-template-rows: 60px;
  }
  
  & > Div {
    font-weight: thin;
  }
  //background-color: ${props => props.theme.COLOR_normal};
   
  //border-radius:  8px;
`


const DivRowPlayer = styled(Div)`
  display: grid;
  grid-template-columns: 30px 150px 120px 60px 30px; // 20(padding) + 30 + 150 + 120 + 60 + 30 = 410
  grid-template-rows: 40px;
  
  @media (max-width: ${props => (props.theme.media.small_mid -1) }px ) {
    grid-template-columns: 30px 100px 80px 60px 30px; // 
    grid-template-rows: 60px;
  }
  
  
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  &:last-child {
    border-bottom-style: none;
  }
`

/*
const DivRowPlayer = styled(Div)`
  display: grid;
  grid-template-columns: 1fr 60px ${30*4}px 40px 40px; 
  grid-template-rows: 40px;
  
  background-color: ${props => props.theme.COLOR_normal};
  border-bottom: 1px solid ${props => props.theme.color_very_weak};
  
  
  &:nth-child(2) {
    border-top-left-radius:    10px;
    border-top-right-radius:   10px;
    
  }
  
  &:last-child {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius:  10px;
    
    border-bottom-style: none;
    
  }

*/

const DivLeader = styled(Div)`
  
    
`

const DivBattletagHeader = styled(Div)`
  padding-left: 10px;
  
  display: block;
  text-algin: left;
`

const DivBattletag = styled(Div)`
  justify-self: start;
  
  padding-left: 10px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  
  cursor: pointer;
  
  @media (max-width: ${props => (props.theme.media.small_mid -1) }px ) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
`

const DivBattletagName = styled(Div)`
  
  width: auto;
  max-width: inherit;
  
  display: inline;
  text-algin: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const DivBattletagNumber = styled(Div)`
  font-size: 0.9rem;
  
  width: auto;
   
  color: ${props => props.theme.color_weak};
  display: inline;
  text-algin: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`


const DivRoles = styled(Div)`
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  
  & > div {
    width: auto;   // important!!!
    height: auto;
  }
  
  & > div > div {
    width: 20px;
    height: 20px;
    margin: 2px;
  }
`
const DivMmr = styled(Div)`
  font-size: 0.9rem;
`

const DivStatus = styled(Div)`
  
`;






const RowPlayer = ({
  authority
  , language
  ,idPlanTeam, battletag, mmr, regions, roles, statusPlayer, isLeader
  , replacePlayerTags, replacePlayerStatus,  addDeleteNotification, addNotification, deleteNotification
}) => {
  
  // for icon which depends on variable
  const IconStatus = {
    pending: <IconPending width={"20px"} height={"20px"} />
    ,confirmed: <IconConfirmed width={"20px"} height={"20px"} />
  };
  
  // 관리자 권한이 필요한 버튼을 클릭했을 때!
  const onClick_NotAdministrator = (event) => {
     addDeleteNotification("tplan01", language);
  }
  
  
  
  
  const regexBattletag = /(#\d*)$/;
  const listNumberBattletag = battletag.match(regexBattletag);
  
  const battletagNumber = listNumberBattletag[0];
  const battletagName = battletag.replace(regexBattletag, "")
  
  
  const onClick_DivLeader = async (event) => {
    
    if (!isLeader) { 
      replacePlayerTags(battletag, "leader", true);
      
      
      await axios.put (`${process.env.REACT_APP_URL_AHR}/player/update-tags`,
        { 
          idPlanTeam: idPlanTeam
          , battletag: battletag
          , tag: "leader"
          , true_false: true
        }
      );
      
      if (statusPlayer === "pending") { // 만약 status 가 pending 때는 status 도 confirmed 로 한꺼번에 바꿔주기!
        replacePlayerStatus(battletag, "confirmed");
        
        await axios.put (`${process.env.REACT_APP_URL_AHR}/player/update-status`,
          { 
            idPlanTeam: idPlanTeam
            , battletag: battletag
            , status: "confirmed"
          }
        );
      }
      
    }
    
    else {
      replacePlayerTags(battletag, "leader", false);
      
      await axios.put (`${process.env.REACT_APP_URL_AHR}/player/update-tags`,
        { 
          idPlanTeam: idPlanTeam
          , battletag: battletag
          , tag: "leader"
          , true_false: false
        }
      );
      
    }
    
  }
  
  
  
  const onClick_DivStatus = async (event) => {
    
    let newStatus;
    if (statusPlayer === "pending") {
      replacePlayerStatus(battletag, "confirmed");
    
      await axios.put (`${process.env.REACT_APP_URL_AHR}/player/update-status`,
        { 
          idPlanTeam: idPlanTeam
          , battletag: battletag
          , status: "confirmed"
        }
      );
      
    }
    else { // if status was "confirmed"
      replacePlayerStatus(battletag, "pending");
    
      await axios.put (`${process.env.REACT_APP_URL_AHR}/player/update-status`,
        { 
          idPlanTeam: idPlanTeam
          , battletag: battletag
          , status: "pending"
        }
      );
      
      if (isLeader === true) {
        replacePlayerTags(battletag, "leader", false);
        
        await axios.put (`${process.env.REACT_APP_URL_AHR}/player/update-tags`,
          { 
            idPlanTeam: idPlanTeam
            , battletag: battletag
            , tag: "leader"
            , true_false: false
          }
        );
      }
    }
    
    
  }
  
/*
onMouseEnter={(event)=>{
          deleteNotification("tip-leader");
           addDeleteNotification("tip", "leaders join teams first, being separated into different teams", undefined,  "tip-leader")
          }
        }
        onMouseLeave={(event)=>removeNotification("tip-leader")}
        
*/

  return (
    
    <DivRowPlayer >
      
      <DivLeader 
        onClick={ (event) => {
            
            if (authority==="administrator") { 
              onClick_DivLeader(event); 
            }
            else {
              onClick_NotAdministrator(event);
            }
            
          }
        }
        > 
        <IconLeader
          
          width={"23px"}
          height={"18px"}
          isFilled={isLeader}
        />  
      </DivLeader >
      
      <CopyToClipboard 
        text={battletag}
        onCopy={ () => {  
          
          const messageBase = dictCode['tplan02'][message][language];
          const message = messageBase.replaceAll('BATTLETAG', battletag);
          addDeleteNotification("tplan02", language, message, 2000); 
          
        } } >
        
        <DivBattletag> 
          <DivBattletagName> {battletagName} </DivBattletagName>
          <DivBattletagNumber> {battletagNumber} </DivBattletagNumber>
        </DivBattletag>
        
      </CopyToClipboard>
      
      <DivRoles> 
        <Div> {(roles.includes("Tank"))? <IconTank width={"20px"} height={"20px"} /> : <Div></Div>} </Div>
        <Div> {(roles.includes("Bruiser"))? <IconBruiser width={"20px"} height={"20px"} /> : <Div></Div>} </Div>
        <Div> {(roles.includes("Melee Assassin"))? <IconMeleeAssassin width={"18px"} height={"20px"} /> : <Div></Div>} </Div>
        <Div> {(roles.includes("Ranged Assassin"))? <IconRangedAssassin width={"20px"} height={"20px"} /> : <Div></Div>} </Div>
        <Div> {(roles.includes("Healer"))? <IconHealer width={"15px"} height={"20px"} /> : <Div></Div>} </Div>
      </DivRoles>
      
      
      <DivMmr> 
        {mmr}
      </DivMmr>
       
      <DivStatus 
        onClick={ (event) => {
            
            if (authority==="administrator") { 
              onClick_DivStatus(event); 
            }
            else {
              onClick_NotAdministrator(event);
            }
            
          }
        }
        > 
        
        {IconStatus[statusPlayer]}
      </DivStatus>
        
       
         
    </DivRowPlayer>
  )
}

/*
onMouseEnter={ (event)=>
          { 
            deleteNotification("tip-pending");
            deleteNotification("tip-confirmed");
             addDeleteNotification("tip", "pending players can't join teams", undefined, "tip-pending");    
             addDeleteNotification("tip", "only confirmed players can join teams", undefined, "tip-confirmed");     
          }
        }
        
        onMouseLeave={(event)=>
          {
            deleteNotification("tip-pending");
            deleteNotification("tip-confirmed");
          }
        }
*/


const Entry = ({
  authority, language
  ,idPlanTeam, listPlayerEntry, option
  
  , replacePlayerTags, replacePlayerStatus,  addDeleteNotification, addNotification, deleteNotification
  
}) => {
  
  const region = option.region;
  
  useEffect(()=>{console.log("Entry has been rerendered")})
  
  let listPlayer = (Object.keys(listPlayerEntry)).map(element=>listPlayerEntry[element]._id); // list of battletags
  
  listPlayer = listPlayer.sort( (player1, player2) => {    // mmr 높은순으로 list of battletags
      
      const objPlayer1 = listPlayerEntry.find(objPlayer => objPlayer._id === player1)
      const objPlayer2 = listPlayerEntry.find(objPlayer => objPlayer._id === player2)
      
      return (objPlayer2.mmr.standard[region] - objPlayer1.mmr.standard[region]);
      // ex 3333, 222, 1111
    });
  
  
  const listPlayerConfirmed = listPlayer.filter(battletag => {
    const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
    return objPlayer.status === "confirmed"
  } )
  
  const listPlayerConfirmedLeader = listPlayerConfirmed.filter(battletag => {
    const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
    return objPlayer.tags.includes("leader");
  } )
  
  const listPlayerConfirmedNonLeader= listPlayerConfirmed.filter(battletag => {
    const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
    return !(objPlayer.tags.includes("leader"));
  } )
  
  
  
  const listPlayerPending = listPlayer.filter(battletag => {
    const objPlayer = listPlayerEntry.find(objPlayer => objPlayer._id === battletag)
    return objPlayer.status === "pending"
  } )
  
  const listPlayerShowing = [...listPlayerConfirmedLeader, ...listPlayerConfirmedNonLeader, ...listPlayerPending];
  
  
  return (
  
  <DivEntry>
    
    <DivEntryTitle> Entry </DivEntryTitle>
    
    <DivDescription> 
    
      <Div> {`${listPlayerEntry.length} players`} </Div>
      
      <Div
        onMouseEnter={(event)=>{
            deleteNotification("tplan03");
            addDeleteNotification("tplan03",  language);
          }
        }
        onMouseLeave={(event)=>deleteNotification("tplan03")}
        
      > 
        <IconConfirmed width={"20px"} height={"20px"} /> {` : ${listPlayerConfirmed.length}`} 
      </Div>
      
      <Div
        onMouseEnter={(event)=>{
          deleteNotification("tplan04");
           addDeleteNotification("tplan04", language);
          }
        }
        onMouseLeave={(event)=>deleteNotification("tplan04")}
      >  
        <IconPending width={"20px"} height={"20px"} /> {` : ${listPlayerEntry.length - listPlayerConfirmed.length}`} 
      </Div>
      
      <Div
        onMouseEnter={(event)=>{
          deleteNotification("tplan05");
          addDeleteNotification("tplan05",  language);
          }
        }
        onMouseLeave={(event)=>deleteNotification("tplan05")}
      >  
        <IconLeader width={"23px"} height={"18px"} isFilled={true} /> {` : ${listPlayerConfirmedLeader.length}`} 
      </Div>
      
    </DivDescription>
    
    
    <DivTableEntry> 
    
    <DivRowHeader> 
      <Div>  </Div>
      <DivBattletagHeader>  battletag </DivBattletagHeader>
      <Div> roles </Div>
      <Div> mmr </Div>
      <Div>  </Div>
      
    </DivRowHeader>
    
    { 
      ( listPlayerShowing ).map( (battletag, i) => {
        
        const player = listPlayerEntry.find(objPlayer => objPlayer._id === battletag);
      
      return (
        < RowPlayer 
          
          key={ `${player._id}_${(new Date().getTime()).toString()}` }
          
          authority={authority}
          language={language}
          idPlanTeam={idPlanTeam}
          
          battletag={player._id} 
          
          regions ={player.regions}
          
          mmr={player.mmr.standard[region]} 
          
          roles ={player.roles}
          
          isLeader = {player.tags.includes("leader")}
          statusPlayer={player.status} 
          
          replacePlayerTags = {replacePlayerTags}
          replacePlayerStatus = {replacePlayerStatus}
           addDeleteNotification = { addDeleteNotification}
          
          addNotification = {addNotification}
          deleteNotification = {deleteNotification}
        />)
      }
      ) 
    }
      
    </DivTableEntry>
    
    
  </DivEntry>
    
  )
}

	  
//<button onClick= {refetch} > Refectch </button>



function mapStateToProps(state) { 
  return { 
    authority: state.basic.authority.team_planner
    , language : state.basic.language
    
    ,listPlayerEntry: [...state.team_planner.ePlanTeam.listPlayerEntry]
    ,idPlanTeam: state.team_planner.ePlanTeam._id
    ,option: state.team_planner.ePlanTeam.option
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replacePlayerTags: (battletag, tag, true_false) => dispatch(replacePlayerTags(battletag, tag, true_false))
    ,replacePlayerStatus: (battletag, status) => dispatch(replacePlayerStatus(battletag, status))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    , addNotification: (situation, message, idNotification) => dispatch(addNotification(situation, message, idNotification))
    , deleteNotification: (idNotification) => dispatch(deleteNotification(idNotification))
  }; 
}


// TableEntry 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
// connect(mapStateToProps, mapDispatchToProps)(RowPlayer);    https://stackoverflow.com/questions/46276810/what-is-the-necessity-of-export-default-connect-when-you-are-connecting-your-r
export default connect(mapStateToProps, mapDispatchToProps)(Entry);