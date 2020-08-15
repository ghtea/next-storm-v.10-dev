
import React, {useState} from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import * as config from '../../../config';

import axios from 'axios';

import { connect } from "react-redux";
import readPlanTeam from "../../../redux/thunks/readPlanTeam";

import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import {replaceWorking} from "../../../redux/actions/basic";

import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button} from '../../../styles/DefaultStyles';


import useInput from '../../../tools/hooks/useInput';
import {getTimeStamp} from '../../../tools/vanilla/time';
import {generatePassword} from '../../../tools/vanilla/password';

import IconWorking from '../../../svgs/basic/IconWorking'

import flagNA from '../../../images/flags/NA.png';
import flagEU from '../../../images/flags/EU.png';
import flagKR from '../../../images/flags/KR.png';
import flagCN from '../../../images/flags/CN.png';

//import {ahr} from '../api';
/*
dotenv.config({ 
  path: './.env' 
});
*/

const DivCreatingPlan = styled(Div)`
  height: 180px;
  
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


const DivDescription = styled(Div)`
  color: ${props => props.theme.color_weak};
`


const DivBody = styled(Div)`
  
	display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`




const DivInput = styled(Div)`
  
  margin-top: 20px;
  margin-bottom: 10px;
  
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

const InputTitle = styled(Input)`
	width: 180px;
	height: 100%;
	
	border-radius: 6px;
	
	border: 1px solid ${props => props.theme.color_weak};
`

const ButtonRegion = styled(Button)`
  width: auto;
  height: auto;
  padding: 0;
  
  background-color: transparent;
`

const ButtonCreatePlan = styled(Button)`
  width: 60px;
  height: 100%;
  
  white-space: nowrap;
  overflow: hidden;
  
  padding:2px;
  border-radius: 6px;
`

const DivCaution = styled(Div)`
  color: ${props => props.theme.color_weak};
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  
  padding-left: 20px;
  padding-right: 20px;
`





const DivIconWorking = styled(Div)`
  
`




 const CreatingPlan = ({
   
   language
   , user
   , loading, ready, working
   
   , readPlanTeam, replaceWorking
   , addDeleteNotification
 }) => {
  
  //{value, onChange}
  const inputTitle = useInput("");
  const history = useHistory(); 
  
  const [regionCreating, setRegionCreating] = useState("NA");
  //const [flagCreating, setflagCreating] = useState(flagNA);
  
  const objFlag = {
    NA: flagNA,
    EU: flagEU,
    KR: flagKR,
    CN: flagCN
  };
  
  const onClick_ButtonRegion = (event) => {
    
    switch(regionCreating) {
      case "NA":
        setRegionCreating("EU");
        break;
      case "EU":
        setRegionCreating("KR");
        break;
      case "KR":
        setRegionCreating("CN");
        break;
      case "CN":
        setRegionCreating("NA");
        break;
    }

  }
  

  const onClick_ButtonCreatePlan = async (event) => {
    
  if (inputTitle.value) {
      const idPlanTeam = uuidv4();
      const pwPlanTeam = generatePassword(8);  // ex: "5y7o"
      
      
      let titlePlanTeam;
      if (inputTitle.value) { titlePlanTeam = inputTitle.value }
      else {titlePlanTeam = "(no title)"}
      
      
      //let status = {};
      
      try {
        replaceWorking("createPlan", true);
        
        let request = {
          _id: idPlanTeam
          , password: pwPlanTeam
          , title: titlePlanTeam
          , region: regionCreating
        }
        
        if (user._id) {
          request['listAuthor'] = [user._id]
        }
        else {
          request['listAuthor'] = []
        }
        
        await axios.post (`${config.URL_API_NS}/plan-team`, request);
        //console.log(regionCreating);
        replaceWorking("createPlan", false);
        
        addDeleteNotification("tplan31", language);
        //addDeleteNotification("tip", "please save the link!", 6000);
        //status.createPlan = true; //  작업이 잘되었다고 표시
        
        // move after 2 seconds because of preparing time
        //window.location = `/team-generator/${idPlanTeam}?pw=${pwPlanTeam}`;
        //setTimeout( ()=>{history.push(`/team-generator/${idPlanTeam}?pw=${pwPlanTeam}`)} , 2000)
        
        history.push(`/team-planner/${idPlanTeam}?pw=${pwPlanTeam}`)
      }
      catch (error) {
        replaceWorking("createPlan", false)
        addDeleteNotification("tplan32", language);
        //status.createPlan = false; //  작업이 정상적으로 끝나지 않았다고 표시 (실제로 에러가 발생하지 않는다)
      }
      
    } else { addDeleteNotification("tplan32", language); }
  }  
  


  
  return (
  
  <DivCreatingPlan>
   
    
	  <DivInput>
      <InputTitle {...inputTitle} placeholder="ex) friday event games" />
      
      <ButtonRegion onClick={onClick_ButtonRegion} > 
        <img src={objFlag[regionCreating]} width="48" height="36"/>
      </ButtonRegion>
      
      {working.createPlan ? 
      <ButtonCreatePlan> 
      
        <DivIconWorking>
          <IconWorking 
            width={"27px"}
            height={"24px"}
          />  
        </DivIconWorking>
        
      </ButtonCreatePlan> 
      
     : <ButtonCreatePlan onClick = {onClick_ButtonCreatePlan} > {(() => {
          switch (language) {
            case 'ko': 
              return '만들기';
            case 'ja': 
              return '作成';
            default: // eng
              return 'Create';
          }
	      })()} </ButtonCreatePlan> }
      
	  </DivInput>
    
    <DivCaution>
	    <Div> 
	      {(() => {
          switch (language) {
            case 'ko': 
              return '우선 아무 제목이나 입력한 후, 만들기!';
            case 'ja': 
              return '適当なタイトル入力して、作成!';
            default: // eng
              return 'Enter any title first, and click Create!';
          }
	      })()}
     </Div>
    </DivCaution>
	    
  </DivCreatingPlan>
  
  )

}
  
  

function mapStateToProps(state) { 
  return { 
    ready: state.basic.ready 
    ,loading: state.basic.loading
    ,working: state.basic.working
    
    , user: state.auth.user
    , language: state.basic.language
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    readPlanTeam: (idPlanTeam, language) => dispatch(readPlanTeam(idPlanTeam, language)) 
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    ,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(CreatingPlan);