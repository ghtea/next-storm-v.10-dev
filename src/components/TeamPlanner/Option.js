import dotenv from 'dotenv';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import {replaceWorking} from "../../redux/actions/basic";
import {replaceRegion, replaceNumber} from "../../redux/actions/team_planner";
//import readPlanTeam from "../../redux/thunks/readPlanTeam";
import addDeleteNotification from "../../redux/thunks/addDeleteNotification";


import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconWorking from '../../svgs/basic/IconWorking'
import IconCopy from '../../svgs/basic/IconCopy'
import IconMinus from '../../svgs/basic/IconMinus'
import IconPlus from '../../svgs/basic/IconPlus'

import {CopyToClipboard} from 'react-copy-to-clipboard';

import flagNA from '../../images/flags/NA.png';
import flagEU from '../../images/flags/EU.png';
import flagKR from '../../images/flags/KR.png';
import flagCN from '../../images/flags/CN.png';


// STYLES
const DivOption = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;



const DivOptionTitle = styled(Div)`
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
`



const DivBody = styled(Div)`

	display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

const DivRegion = styled(Div)`

  margin-top: 15px;
  margin-bottom: 5px;
  
	display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > * {
    width: auto;
  	margin-left: 5px;
  	margin-right: 5px;
  	border-radius: 6px;
  }
`

const ButtonRegion = styled(Button)`
  width: auto;
  height: auto;
  padding: 0;
  background-color: transparent;
  
  
`

const GroupNumber= styled(Div)`
  
  margin-top: 5px;
  margin-bottom: 5px;
  
	height: 36px;
	display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > * {
    width: 150px;
  	margin-left: 5px;
  	margin-right: 5px;
  	border-radius: 6px;
  }
`


const ButtonNumberCenter = styled(Button)`
  width: 60px;
  height: 100%;
  
  
`
const ButtonNumberSide = styled(Button)`
  width: 30px;
  height: 100%;
  
`



 const Option = ({
  
  idPlanTeam
  
  , option
  , authority, language
  
  
  , addDeleteNotification
  , replaceRegion
  ,replaceNumber
   
 }) => {

  
  // 관리자 권한이 필요한 버튼을 클릭했을 때!
  const onClick_NotAdministrator = (event) => {
    addDeleteNotification("tplan01", language);
  }
  


  const objFlag = {
    NA: flagNA,
    EU: flagEU,
    KR: flagKR,
    CN: flagCN
  };
  
  const onClick_ButtonRegion = async (event) => {
    
    let newRegion;
    
    switch(option.region) {
      case "NA":
        newRegion = "EU";
        break;
      case "EU":
        newRegion = "KR";
        break;
      case "KR":
        newRegion = "CN";
        break;
      case "CN":
        newRegion = "NA";
        break;
    }
    
    replaceRegion(newRegion);
    await axios.put (`${process.env.REACT_APP_URL_AHR}/plan-team/`,
      {
        filter: {_id: idPlanTeam}
        , update : {
          $set: { "option.region": newRegion }
        }
      }
    );
  
  }
  
  
  const onClick_ButtonNumber = (event, pairNumber, which, how) => {
    replaceNumber(pairNumber, which, how);
    
  }
  
  // copy: https://www.npmjs.com/package/react-copy-to-clipboard
  
  
  return (
  <DivOption>
        
    
    <DivOptionTitle> Option </DivOptionTitle>
      

    
    
   <DivBody>
   
    <DivRegion>
      <Div> region:  </Div>
      <ButtonRegion onClick={(authority==="administrator")?onClick_ButtonRegion:onClick_NotAdministrator}> 
  	     <img src={objFlag[option.region]} width="48" height="36"/>
  	  </ButtonRegion>
  	</DivRegion>
   
   {(authority==="administrator")?
      <GroupNumber>
        <Div> number of teams: </Div>
        
        <ButtonNumberSide
          onClick={(event)=>onClick_ButtonNumber(event, [option.numberTeams, option.numberGroups], "team", "minus")}
          > <IconMinus width={"20px"} height={"20px"} />  </ButtonNumberSide>
          
        <ButtonNumberCenter
          onClick={(event)=>onClick_ButtonNumber(event, [option.numberTeams, option.numberGroups], "team", "center")}
          > {(option.numberTeams === 0)? `auto` : `${option.numberTeams}` }
        </ButtonNumberCenter>
        
        <ButtonNumberSide
          onClick={(event)=>onClick_ButtonNumber(event, [option.numberTeams, option.numberGroups], "team", "plus")}
          > <IconPlus width={"20px"} height={"20px"} /> </ButtonNumberSide>
  	  </GroupNumber>
  	  
  	 : <GroupNumber>
        <Div> number of teams: </Div>
        
        <ButtonNumberCenter
          onClick={onClick_NotAdministrator}
          > {(option.numberTeams === 0)? `auto` : `${option.numberTeams}` }
        </ButtonNumberCenter>
      </GroupNumber>
   }
	      
	 
	   
	   
   </DivBody>
  
  </DivOption>
        
  
  )

}
  
  
  /*
  
  <GroupNumber>
      <Div> number of groups: </Div>
      
      <ButtonNumberSide
        onClick={(event)=>onClick_ButtonNumber(event, [option.numberTeams, option.numberGroups], "group", "minus")}
      > <IconMinus width={"20px"} height={"20px"} /> </ButtonNumberSide>
      
      <ButtonNumberCenter
        onClick={(event)=>onClick_ButtonNumber(event, [option.numberTeams, option.numberGroups], "group", "center")}
      > {(option.numberGroups ===0)? `none` : `${option.numberGroups }`}
      </ButtonNumberCenter>
      
      <ButtonNumberSide
        onClick={(event)=>onClick_ButtonNumber(event, [option.numberTeams, option.numberGroups], "group", "plus")}
      > <IconPlus width={"20px"} height={"20px"} /> </ButtonNumberSide>
	  </GroupNumber>
  
  */
	  
/*

 <DivInputAdd>
    <InputBattletag {...inputBattletag} placeholder="battletag#1234" />
    <InputName {...inputName} placeholder="name" />
    
    { (authority === "viewer") && !workingAddPlayer &&
      <ButtonAdd onClick = {  (event)=> onClick_ButtonAdd(event, "pending")} > Apply </ButtonAdd>
    }
    
    { (authority === "administrator") && !workingAddPlayer && 
      <>
        <ButtonAdd onClick = {  (event)=> onClick_ButtonAdd(event, "confirmed")} > Add </ButtonAdd>
      </>
    }
  </DivInputAdd>
	    
*/

function mapStateToProps(state) { 
  return { 
   
    idPlanTeam: state.team_planner.ePlanTeam._id
  
    ,option: state.team_planner.ePlanTeam.option
    , authority: state.basic.authority.team_planner
    
    , language: state.basic.language
    
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    ,replaceRegion: (regionName) => dispatch(replaceRegion(regionName))
    ,replaceNumber: (pairNumber, which, how) => dispatch(replaceNumber(pairNumber, which, how))
    
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Option);