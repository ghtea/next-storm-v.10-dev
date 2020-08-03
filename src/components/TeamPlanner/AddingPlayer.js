import dotenv from 'dotenv';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import {replaceWorking} from "../../redux/actions/basic";
import readPlanTeam from "../../redux/thunks/readPlanTeam";
import addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'


import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, A} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconWorking from '../../svgs/basic/IconWorking';
import IconCopy from '../../svgs/basic/IconCopy';
import IconAdministrator from '../../svgs/basic/IconAdministrator';
import IconViewer from '../../svgs/basic/IconViewer';
import IconLink from '../../svgs/basic/IconLink';

import {CopyToClipboard} from 'react-copy-to-clipboard';


// STYLES
const DivAddingPlayer = styled(Div)`
  height:100%;
  
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const DivHeader = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const DivTitle = styled(Div)`
  font-size: 1.6rem;
  font-weight: bold;
  
  height: 30px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > div {
    width: auto;
    margin-left: 8px;
    margin-right: 8px;
  }
`


const GroupCopy = styled(Div)`
  
  margin-top: 10px;
  margin-bottom: 10px;
  
	height: 30px;
	display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > * {
  	margin-left: 5px;
  	margin-right: 5px;
  }
`


const ButtonCopy = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 150px;
  height: 100%;
  
  color: ${props => props.theme.color_normal};
  
  border-radius: 4px;
  
  & > div {
    height: 100%;
  }
`




/*
const DivId = styled(Div)`
  color: ${props => props.theme.color_weak};
`*/


const DivBody = styled(Div)`

	display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

const DivInputAdd = styled(Div)`
  
  margin-top: 20px;
  margin-bottom: 20px;
  
  
	height: 36px;
	display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > * {
  	margin-left: 5px;
  	margin-right: 5px;
  }
`

const InputBattletag = styled(Input)`
	width: 150px;
	height: 100%;
	
	border-radius: 6px;
	border: 1px solid ${props => props.theme.color_weak};
`

const InputName = styled(Input)`
	width: 110px;
	height: 100%;
	
	border-radius: 6px;
`

const ButtonAdd = styled(Button)`
  width: 60px;
  height: 100%;
  
  border-radius: 6px;
`
/*
const ButtonAddOnly = styled(Button)`
  width: 60px;
  height: 100%;
  
  border-radius: 4px;
`
*/
const ButtonLinkToHeroesProfile = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  
  font-size: 0.9rem;
  
  width: 300px;
  height: 30px;
  
  border-radius: 9px;
  
  & span {
    font-weight: bold;
  }
`

const DivIconWorking = styled(Div)`
  
`





 const AddingPlayer = ({
   
  workingAddPlayer 
  
  //, loadingPlanTeam
  //, readyPlanTeam
  
  , authority, language
  , ePlanTeam
  
  , readPlanTeam
  , addDeleteNotification
  , replaceWorking
   
 }) => {

  const inputBattletag = useInput("");
  //const inputName = useInput("");
  
  
  // heroes profile 에서 mmr 가져오기, cPlanTeam 에 플레이어 추가, cPlanTeam 의 플레이의 mmr 추가 모두
  const onClick_ButtonAdd = async (event, statusPlayer) => {
    
    let battletag = inputBattletag.value;
    //let name = inputName.value;
    const idPlanTeam = ePlanTeam._id;
    
    let listRegionMain;
    //console.log(battletag, name, idPlanTeam, statusPlayer)
    
    if (inputBattletag.value) {
      
      try {
        
        replaceWorking("addPlayer", true) // playermmr 옮기고, playerEntry 를 plan에 추가하고, 이후에 mmrStandar 도 추가하는 전체 작업 시작
        
        // listRegionMain (플레이어가 활동하는 지역 목록) 만 가져와서 이후에 이용
        const res_player_add = await axios.put (`${process.env.REACT_APP_URL_AHR}/player/add`,
          {
            battletag: battletag
            , idPlanTeam: idPlanTeam
            //, name: name
            , status: statusPlayer
          }
        );
        
        listRegionMain = res_player_add.data;
        
        //replaceWorking("addPlayer", false)
        //addDeleteNotification("success", "player has been added!");
        
        await axios.put (`${process.env.REACT_APP_URL_AHR}/player/add-roles`,
          {
            battletag: battletag
            , idPlanTeam: idPlanTeam
            , listRegionMain: listRegionMain
          }
        );
          
        replaceWorking("addPlayer", false)
        
        const messageBase = dictCode['tplan21'][message][language];
        const message = messageBase.replaceAll('BATTLETAG', battletag);
        addDeleteNotification("tplan21", language, message, 2000); 
        
        
        readPlanTeam(idPlanTeam, language);  // important! need new data in redux for rernedering (ex: entry)
        
        inputBattletag.setValue("");  
        //inputName.setValue("");
        
      }
      catch(error) {
        replaceWorking("addPlayer", false)
        
        addDeleteNotification("tplan22", language);
        // 1. battlelog 잘못입력
        // 2. 게임수가 극히 적은 battletag
        // 3. 내 백엔드 문제
        
      }
      
    } else { // 애초에 battletag를 입력 안했다면.
      addDeleteNotification("tplan23", language);
    }
    
    
    
    
   
  }
  
  /*
  // when   workingAddPlayer: O -> X
  useEffect( () => { 
    (async () => {
    
      if (!workingAddPlayer ) {
        
        let battletag = inputBattletag.value;
        const idPlanTeam = ePlanTeam._id;
        
        inputBattletag.setValue(""); // 이때 초기화!
        inputName.setValue("");
      
        replaceWorking("addRoleGames", true) // playermmr 옮기고, playerEntry 를 plan에 추가하고, 이후에 mmrStandar 도 추가하는 전체 작업 시작
          
        // /add/:battletag/:idPlanTeam/:status
        try { 
          await axios.put (`${process.env.REACT_APP_URL_AHR}/player/add-role-games`,
            {
              battletag: battletag
              , idPlanTeam: idPlanTeam
            }
          );
          
        replaceWorking("addRoleGames", false)
        addDeleteNotification("success", `${battletag}'s role info has been added!`);
        } 
        catch (error) { 
          replaceWorking("addRoleGames", false)
          addDeleteNotification("error", `${battletag}'s failed in adding role info`);
          console.log(error) 
        }
      }
      
    }) ()
  
  },[workingAddPlayer])
  */
  // copy: https://www.npmjs.com/package/react-copy-to-clipboard
  
  
  return (
  <DivAddingPlayer>
        
    <DivHeader>
      <DivTitle> 
        <Div> {`${ePlanTeam.title}`}  </Div>
        
        {(authority==="administrator")?
          <IconAdministrator width={"30px"} height={"24px"} /> 
          : <IconViewer width={"27px"} height={"24px"} /> 
        }
      
      </DivTitle>
      
      <GroupCopy>
        
        <CopyToClipboard 
          text={`https://ps.avantwing.com/team-generator/${ePlanTeam._id}`}
          onCopy={ () => { addDeleteNotification("tplan24", language); } } >
          
          <ButtonCopy> 
            <IconCopy width={"20px"} height={"20px"} /> 
            <Div> Viewing Link </Div>
          </ButtonCopy> 
          
        </CopyToClipboard>
        
        { (authority === "administrator") && 
          <CopyToClipboard 
            text={`https://ps.avantwing.com/team-generator/${ePlanTeam._id}?pw=${ePlanTeam.password}`}
            onCopy={ () => { addDeleteNotification("tplan25", language); } } >
            
            <ButtonCopy>
              <IconCopy width={"20px"} height={"20px"} /> 
              <Div> Editing Link </Div>
            </ButtonCopy> 
            
          </CopyToClipboard>
        }
        
      </GroupCopy>
      
    </DivHeader>
    
    
    
   <DivBody>

	    <DivInputAdd>
	      <InputBattletag {...inputBattletag} placeholder="battletag#1234" />
	      
	      
	      { (authority === "viewer") && workingAddPlayer && 
          <ButtonAdd> 
            <DivIconWorking>
              <IconWorking width={"27px"} height={"24px"} />  
            </DivIconWorking>
          </ButtonAdd>
        }
        
        { (authority === "viewer") && !workingAddPlayer &&
          <ButtonAdd onClick = {  (event)=> onClick_ButtonAdd(event, "pending")} > Apply </ButtonAdd>
        }
        
        
        
        { (authority === "administrator") && workingAddPlayer && 
          <ButtonAdd> 
            <DivIconWorking>
              <IconWorking width={"27px"} height={"24px"} />
            </DivIconWorking>
          </ButtonAdd>
        }
        
        { (authority === "administrator") && !workingAddPlayer && 
          <>
            <ButtonAdd onClick = {  (event)=> onClick_ButtonAdd(event, "confirmed")} > Add </ButtonAdd>
          </>
        }

        
	    </DivInputAdd>
	    
	    <ButtonLinkToHeroesProfile> 
	    
	      <IconLink width={"20px"} height={"20px"} />
	      
        <A href="https://api.heroesprofile.com/upload" target="_blank" rel="noopener noreferrer"> 
	        please <span> upload replays </span> for better data 
	     </A> 
	       
	     </ButtonLinkToHeroesProfile>
	    
   </DivBody>
  
  </DivAddingPlayer>
        
  
  )

}

// <InputName {...inputName} placeholder="name" />
	  


function mapStateToProps(state) { 
  return { 
   
    workingAddPlayer: state.basic.working.addPlayer
    
    
    , authority: state.basic.authority.team_planner
    , language: state.basic.language
    
    , ePlanTeam: {...state.team_planner.ePlanTeam}
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    ,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
    
    ,readPlanTeam: (idPlanTeam, language) => dispatch(readPlanTeam(idPlanTeam, language)) 

  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(AddingPlayer);