import React, {useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';

import { NavLink } from 'react-router-dom';

import * as config from '../config';
import { connect } from "react-redux";
import readPlanTeam from "../redux/thunks/readPlanTeam";

import {replaceRerender, replaceWorking, replaceLoading, replaceReady, replaceData} from "../redux/actions/basic";


import addRemoveNotification from "../redux/thunks/addRemoveNotification";

import {Div, Input, Button, A} from '../styles/DefaultStyles';
//import Player from '../components/Player'
import IconHandHeart from '../svgs/basic/IconHandHeart'
import IconPenBrush from '../svgs/basic/IconPenBrush'
import IconLink from '../svgs/basic/IconLink';


//import Guide from '../components/Home/Guide';


import useAxiosGet from '../tools/hooks/useAxiosGet';
import useInput from '../tools/hooks/useInput';
import storage from '../tools/vanilla/storage';


const DivHome = styled(Div)`
  width: 100%;
  height: 100%;
  
  & > div {
    margin-left: 10px;
    margin-right: 10px;
  }
  
  @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 240px 240px 400px 400px;
    grid-template-areas: 
      "A"
      "B"
      "C"
      "D"
  }
 

  @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 300px 1fr;
    grid-template-areas: 
      "A B"
      "C D";
  }

`;


const DivA = styled(Div)`
  grid-area: A;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`
const DivB = styled(Div)`
  grid-area: B;
  
  flex-direction: column;
`

const DivC = styled(Div)`
  grid-area: C;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`

const DivD = styled(Div)`
  grid-area: D;
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  
  padding-bottom: 20px;
  
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`


const ButtonContact = styled(Button)`
  margin-top: 5px;
  
  width: 160px;
  height: 30px;
  
  border-radius: 9px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`



const DivWho = styled(Div)`
  color: ${props => props.theme.color_weak};
  
  margin-top: 3px;
  margin-bottom: 3px;

`

const DivPeople = styled(Div)`
  width: 100%;
  
`



const Home= ({
  statusAuth
  , auth
  
}) => {


  const onClick_LogOut = async (event) => {
		try {
			const res = await axios.post(`${config.URL_API_NS}/auth-local/log-out`, {withCredentials: true, credentials: 'include'});
		}
		catch (error) {  console.log(error); }
		
		storage.remove('loggedUser');
		
    window.location.reload(true); // 현재페이지 새로고침 (?reason=... 을 넣고 싶지만, 현재의 정확한 url 모르는 상태에서 query 추가하기가 좀 복잡하다)
          
	}
    
    return (
    
    <DivHome>
      
      <DivA>
        
        {(statusAuth)?
  				<Div>
  					<Div> Hello, {(auth.battletag)? auth.battletag : auth.email} </Div>
  					<Button onClick={onClick_LogOut}> log out </Button>
  				</Div>
  				:  
  				<Div>
  				  <Div> Hello </Div>
  				  <NavLink to="/auth/log-in" > Log In </NavLink> 
  				</Div>
  			}
			
        
      </DivA>
      
      <DivB>
        <Div> if you have forgotten url, contact me </Div>
        
        <ButtonContact> 
          <IconLink width={"20px"} height={"20px"} />
          <A href="https://twitter.com/mbcat_hots" > @mbcat_hots </A>  
        </ButtonContact>
        
      </DivB>
      
      
      
      <DivC>
        
      </DivC>
      
      
      <DivD>
        
        <Div>
          <IconPenBrush width={"64px"} height={"64px"} color="color_weak" />
          <DivWho> developed & designed by </DivWho>
          <DivPeople> <A href="https://twitter.com/mbcat_hots" > @mbcat_hots </A>  </DivPeople>
        </Div>
        
        <Div>
          <IconHandHeart width={"56px"} height={"64px"} color="color_weak" />
          <DivWho> thanks to </DivWho>
          <DivPeople> Heroes Profile API </DivPeople>
          <DivPeople>  Madosan </DivPeople>
        </Div>
        
      </DivD>
      
      
    
    </DivHome>
    )
  

    
} //Home



function mapStateToProps(state) { 
  return { 
    statusAuth: state.auth.status
    , auth: state.auth
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Home);
