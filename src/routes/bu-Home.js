import React, {useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';

import { NavLink } from 'react-router-dom';

import * as config from '../config';
import { connect } from "react-redux";
import readPlanTeam from "../redux/thunks/readPlanTeam";
import { useCookies } from 'react-cookie';

import addDeleteNotification from "../redux/thunks/addDeleteNotification";
import dictCode from '../others/dictCode';

import {replaceData, replaceData2} from "../redux/actions/basic";
import {replaceDataAuth, replaceData2Auth} from "../redux/actions/auth";


import {Div, Input, Button, A, LinkDefault} from '../styles/DefaultStyles';
//import Player from '../components/Player'
import IconHandHeart from '../svgs/basic/IconHandHeart'
import IconPenBrush from '../svgs/basic/IconPenBrush'
import IconLink from '../svgs/basic/IconLink';
import IconSun from '../svgs/basic/IconSun';
import IconMoon from '../svgs/basic/IconMoon';
import IconMoonSun from '../svgs/basic/IconMoonSun';


//import Guide from '../components/Home/Guide';


import useAxiosGet from '../tools/hooks/useAxiosGet';
import useInput from '../tools/hooks/useInput';
import storage from '../tools/vanilla/storage';


const DivHome = styled(Div)`
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

`;


const DivA = styled(Div)`
  height: 240px;
  
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
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  & > div {
    width: auto;
    margin-left: 10px;
    margin-right: 10px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`



const DivIdentification = styled(Div)`
  font-size: 1.6rem;
  margin: 4px;
  font-weight: bold;
`



/*
const DivThemes = styled(Div)`
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonChooseTheme = styled(Button)`
  height: 36px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const DivLanguages = styled(Div)`
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonChooseLanguage = styled(Button)`
  padding-top: 0px;
  padding-bottom: 0px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
*/




const DivWho = styled(Div)`
  color: ${props => props.theme.color_weak};
  
  margin-top: 3px;
  margin-bottom: 3px;

`

const DivPeople = styled(Div)`
  width: 100%;
  
`

const isDarkMode = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }
  else {
    return false;
  }
}  



const Home= ({
  readyUser
  , user
  
  , theme
  , language
  
  , addDeleteNotification
  , replaceData
  , replaceData2
  
  , replaceDataAuth
  
}) => {
  
  const [cookies, setCookie, removeCookie] = useCookies(['logged', 'language', 'themeOption']);
  
  /*
  // 로그아웃 시도후 내가 만든 흔적 쿠키가 완전히 사라져야 새로고침!
  useEffect(()=>{
    if (!cookies.logged) {
      window.location.reload(true); // 현재페이지 새로고침
    }
  }, [cookies.logged])
  */
  
  const onClick_LogOut = async (event) => {
		try {
			const res = await axios.post(`${config.URL_API_NS}/auth-local/log-out`, {withCredentials: true, credentials: 'include'});
		}
		catch (error) {  console.log(error); }
		
		removeCookie('logged'); // 사실 무조건 로그아웃 가능하다. (그래서 위의 catch 에서 알림 설정 안한다)
		
		replaceData2('loading', 'user', false);
    replaceData2('ready', 'user', false);
    
    replaceDataAuth("_id", "");
    replaceDataAuth("email", "");
    replaceDataAuth("battletag", "");
    replaceDataAuth("mmr", {});
    
    window.location.reload(true);
	}
	
	
	
	/*
	const onClick_ChangeTheme = (event, themeOption) => {
	  setCookie('themeOption', themeOption,{maxAge: 60 * 60 * 24 * 30});
	  if (themeOption === 'auto') {
      const themeName = isDarkMode() ? 'dark' : 'light';
      replaceData("themeName", themeName);
    }
    else {
      replaceData("themeName", themeOption);
    }
	}
	
	const onClick_ChangeLanguage = (event, language) => {
	  setCookie('language', language,{maxAge: 60 * 60 * 24 * 30});
    replaceData("language", language);
	}
	*/
	
	
	const onClick_UpdateMmr = async (event) => {
	  try {
	    replaceData2("ready", "mmrUser", false);
	    replaceData2("working", "updateMmr", true);
	    
      const res = await axios.post (`${process.env.REACT_APP_URL_AHR}/user/update-mmr`, {
        _id: user._id
        ,battletag: user.battletag
      });
      
      // mmr obj 받는다
      console.log(res.data);
      
      replaceData2("working", "updateMmr", false);
      replaceData2("ready", "mmrUser", true);
      
      addDeleteNotification("alocal42", language);
	    
		}
		catch (error) {  addDeleteNotification("alocal41", language); }
	}
    
    return (
    
    <DivHome>
      
      <DivA>
        
        <Div>
          <Div> NEXT STORM </Div>
          <Div> v0.9 2020. 8. 16.  </Div>
        </Div>
          
        
      </DivA>
      
      <DivB>
      

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
        
      </DivB>
      
      
    
    </DivHome>
    )
  

    
} //Home






/*
<DivA>
        
        {(readyUser)?
  				<Div>
  					<DivIdentification> {(user.battletag)? user.battletag : user.email} </DivIdentification>
  					
  					<Button onClick={onClick_LogOut}> LOG OUT </Button>
  					{(user.battletag)? 
  					  <Button onClick={onClick_UpdateMmr}> Update Mmr </Button>
  					  : <LinkDefault to="/auth/apply-battletag"> Apply Battletag </LinkDefault> 
  					}
  					
  				</Div>
  				:  
  				<Div>
  				  <LinkDefault to="/auth/log-in" > {(() => {
            switch (language) {
              case 'ko': 
                return '로그인';
              case 'ja': 
                return 'ログイン';
              default: // eng
                return 'Log In';
            }
  	      })()}  </LinkDefault> 
  				</Div>
  			}
			
        
      </DivA>

*/








/*
<DivThemes>
          <ButtonChooseTheme onClick={(event) => onClick_ChangeTheme(event, 'light')} > 
            <IconSun width={"32px"} height={"32px"} color="color_weak" />
            <Div> light </Div>
          </ButtonChooseTheme>
          
          <ButtonChooseTheme onClick={(event) => onClick_ChangeTheme(event, 'dark')} > 
            <IconMoon width={"25px"} height={"25px"} color="color_weak" />
            <Div> dark </Div>
          </ButtonChooseTheme>
          
          <ButtonChooseTheme onClick={(event) => onClick_ChangeTheme(event, 'auto')} > 
            <IconMoonSun width={"36px"} height={"36px"} color="color_weak" />
            <Div> auto </Div>
          </ButtonChooseTheme>
        </DivThemes>
        
        <DivLanguages>
          <ButtonChooseLanguage onClick={(event) => onClick_ChangeLanguage(event, 'en')} > 
            <Div>  English </Div>
          </ButtonChooseLanguage>
          
          <ButtonChooseLanguage onClick={(event) => onClick_ChangeLanguage(event, 'ko')} > 
            <Div> 한국어 </Div>
          </ButtonChooseLanguage>
          
          <ButtonChooseLanguage onClick={(event) => onClick_ChangeLanguage(event, 'ja')} > 
            <Div> 日本語 </Div>
          </ButtonChooseLanguage>
        </DivLanguages>
*/


function mapStateToProps(state) { 
  return { 
    readyUser: state.basic.ready.user
    , user: state.auth.user
    
    , theme: state.basic.theme
    , language: state.basic.language
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    replaceData : (which, replacement) => dispatch(replaceData(which, replacement))
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , replaceDataAuth : (which, replacement) => dispatch(replaceDataAuth(which, replacement))
    ,replaceData2Auth : (which1, which2, replacement) => dispatch(replaceData2Auth(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Home);
