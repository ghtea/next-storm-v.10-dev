
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../../config';
import storage from '../../../tools/vanilla/storage';

import addDeleteNotification from "../../../redux/thunks/addDeleteNotification";
import dictCode from '../../../others/dictCode'

import { replaceData2 } from "../../../redux/actions/basic";
import { replaceDataHero, replaceData2Hero } from "../../../redux/actions/hero";


import {  NavLink, useHistory, useParams } from 'react-router-dom';

import { Div, Input, Button, Img } from '../../../styles/DefaultStyles';

import Loading from '../../_/Loading'

//import useInput from '../../../tools/hooks/useInput';
import {blendColor} from '../../../tools/vanilla/color'

import * as imgHero from '../../../images/heroes'
import palettesTier from '../../../styles/palettes/tier'

// for later..... T.T
const hexToRgba = (hex, alpha) => {
    
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}





const DivBuild = styled(Div)`
  position: relative;
  
  width: 350px;
  border-radius: 12px;
  
  background-color: ${props=>props.theme.COLOR_normal};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  /*overflow: visible;*/
`

const DivA = styled(Div)`
  height: 40px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const DivB = styled(Div)`
  width: auto;
  
  align-self: center;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
`

const DivC = styled(Div)`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const ContainerRank = styled(Div)`
  margin-left: 10px;
  width: 30px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  
  &>div:nth-child(1){
    width: auto;
    font-size: 0.9rem;
  }
  &>div:nth-child(2){
    width: auto;
    font-size: 1.4rem;
    font-weight:bold;
  }
`

const ContainerTalents = styled(Div)`
  width: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  
  & > *:nth-child(n+2){
    margin-left: 6px;
    width: 36px;
    height: 36px;
  }
`






const ContainerGames = styled(Div)`
  width: auto;
  margin-bottom: 3px;
  
  & > div {
    width: auto;
    height: auto;
    font-size: 0.9rem;
    
    &:nth-child(2){
      color: ${props => props.theme.color_weak};
      font-size: 0.8rem;
      margin-top: -4px;
    }
  }
  
`







const DivTalent = styled(Div)`
  width: 36px;
  height: auto;
  
  position: relative;
`

const ImgTalent = styled(Img)`
  border-radius: 12px;
  
  object-fit: cover;
  width: 36px;
  height: 36px;
  
`




const TooltipDetail = styled(Div)`
  visibility: ${props=> props.active ? 'visible' : 'hidden'};
  
  width: 240px;
  height: 30px;
  
  margin-bottom: 5px;
  position: absolute;
  
  
  z-index: 300;
  top: 5px;
  left: 50%;
  transform: translate(-50%, 0);
  
  border-radius: 8px;
  
  color: ${props => props.theme.COLOR_bg };
  background-color: ${props => props.theme.color_normal };
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`





const TooltipOtherTalents = styled(Div)`
  visibility: ${props=> props.active ? 'visible' : 'hidden'};
  
  width: 46px;
  
  margin-top: 5px;
  position: absolute;
  
  top: 36px;
  left:-6px;
  z-index: 100;
  
  border-radius: 8px;
  
  
  background-color: ${props => props.theme.color_normal };
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`

const DivTalentTooltip = styled(Div)`
  
  &:first-child{margin-top: 6px;}
  &:last-child{margin-bottom: 6px;}
  
  width: 36px;
  height: 36px;
`

const ImgTalentTooltip = styled(Img)`
  object-fit: cover;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: ${props=>props.active ? `3px solid ${props.theme.color_active}` : `3px solid transparent`};
`



// DivC
const ContainerGraph = styled(Div)`
  width: auto;
  height: 100%;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  & > div { 
    
    margin-left: 10px;
    
    background-color: ${props => props.colorBar};
    
    width: ${props => props.widthBar};
    height: ${props => {
      if (props.games_played < 50){
        return props.games_played / 50 * 20
      } 
      else {
        return 20
      }
    }}px;
    
    border-radius: 0 4px 4px 0;
    
  }
`


const DivGames = styled(Div)`
  margin-left: 8px;
  
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  
  & > div{
    width: auto;
  }
  
  & > div:nth-child(2){
    font-size: 0.8rem;
    margin-left: 1px;
    margin-bottom: 2px;
  }
`
const DivWinRate =styled(Div)`
  margin-left: 8px;
  
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  
  & > div {
    width: auto;
  }
  
  & > div:nth-child(2){
    font-size: 0.8rem;
    margin-left: 1px;
  }
`



const Build = ({

  language
  , addDeleteNotification
  
  , build
  , indexBuild
  , maxPlayedGames
  
  , focusingHero
  , listAllHeroDetail
  
  , replaceDataHero
  , replaceData2Hero
  
}) => {
  
  
  const history = useHistory();
  
  // min: 10px;  mid: 30px    max: 50px;
  const [widthBar, setWidthBar] = useState("")
  const [colorBar, setColorBar] = useState("rgb(210, 210, 210)");
  
  const [focusingTalent, setFocusingTalent] = useState("");
  const [focusingLocation, setFocusingLocation] = useState("");
  const [clicked, setClicked] = useState(false);
  
  const tHeroDetail = listAllHeroDetail.find(element => element.key_HeroesProfile === focusingHero);
  const seriesStageTalent = tHeroDetail['seriesStageTalent']
  
  
  useEffect(()=>{
    let wZeroToOne = 0;
   
    if (build['win_rate'] < 37) {
      wZeroToOne = -1;
    } else if (build['win_rate'] > 63) {
      wZeroToOne = 1;
    } else {
      wZeroToOne = (build['win_rate'] - 50) / 13;
    }
    
    // rgb(0,0,255);
    if (wZeroToOne >= 0) {
      const rgbListW = blendColor(wZeroToOne, [210,210,210], [0,200,50]);
      //setWidthBar(`${30 + wZeroToOne * 20}px`);
      setColorBar(`rgb(${rgbListW[0]}, ${rgbListW[1]}, ${rgbListW[2]})`);
      
    } else {
      const rgbListW = blendColor(-wZeroToOne, [210,210,210], [200,0,50]);
      //setWidthBar(`${30 + wZeroToOne * 20}px`);
      setColorBar(`rgb(${rgbListW[0]}, ${rgbListW[1]}, ${rgbListW[2]})`);
      
    }
    
    setWidthBar(`${Math.round(build['games_played']/maxPlayedGames * 160)}px`)
    
  }, [])
  
  
  const onClick_ImgTalent = (event, titleTalent, location) => {
    
    if (!clicked) {
      setFocusingTalent(titleTalent);
      setFocusingLocation(location);
      setClicked(true);
    }
    else {
      setFocusingTalent("");
      setFocusingLocation("");
      setClicked(false);
    }
  }
  
  return (
    
      <DivBuild>
      
        <TooltipDetail active={focusingTalent !== ""} >
          {focusingTalent}
        </TooltipDetail>
        
        <DivA>
          <ContainerRank> 
            <Div> # </Div>
            <Div> {`${indexBuild+1}`} </Div>
          </ContainerRank>
          
        </DivA>
        
        <DivB>
          
          <ContainerTalents>
            {build.listTalent.map((titleTalent, index)=>{
              
              const stageTalent = seriesStageTalent[index];
              const listTalentSameLevel = stageTalent['listTalent'].sort((a, b) => a['sort'] - b['sort'] );
              const tTalent = listTalentSameLevel.find(element => element.title === titleTalent);
              
              const txtStageTalent = tTalent['stage'];
              const srcImage = `${config.URL_IMAGE_TALENT}/${tTalent['icon']}`
              
              const location = `${indexBuild}-${txtStageTalent}`;
              //console.log(location);
              //console.log(srcImage);
              
              //const list
              
              return(
                <DivTalent
                  key={location}
                >
                  
                  <ImgTalent 
                    src={srcImage}
                    onMouseEnter ={(event)=> {setFocusingTalent(titleTalent); setFocusingLocation(location);} }
                    onMouseLeave ={(event)=> {setFocusingTalent(""); setFocusingLocation("");} }
                    onClick = {(event)=>onClick_ImgTalent(event, titleTalent, location) }
                  />
                  
                  <TooltipOtherTalents active={ focusingLocation === location} >
                    {listTalentSameLevel.map((element, index)=>{
                      
                      return(
                        <DivTalentTooltip
                          active={(element.title === titleTalent)}
                          key={`tooltip-${index}-${element['stage']}-${titleTalent}`}
                        >
                          <ImgTalentTooltip 
                            active={(element.title === titleTalent)}
                            src={`${config.URL_IMAGE_TALENT}/${element['icon']}`}
                          />
                        </DivTalentTooltip>
                      )
                    })}
                  </TooltipOtherTalents>
                  
                </DivTalent>
              )
            })}
          </ContainerTalents>
          
          
          
        </DivB>
        
        <DivC>
        
          <ContainerGraph 
            games_played={build.games_played}
            colorBar={colorBar}
            widthBar={widthBar}
            > 
              <Div /> 
          </ContainerGraph>
          
          
          
          <DivGames>
            <Div> {build.games_played} </Div>
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
          
          <DivWinRate>
            <Div> {Math.round(build.win_rate * 10)/10} </Div>
            <Div> % </Div>
          </DivWinRate>
            
        </DivC>
        
      </DivBuild>

  )

}



function mapStateToProps(state) {
  return {

    language: state.basic.language
    
    , listAllHeroDetail: state.hots.listAllHeroDetail
    
    , focusingHero: state.hero.focusingHero
  };
}

function mapDispatchToProps(dispatch) {
  return {
  
    replaceDataHero: (which, replacement) => dispatch(replaceDataHero(which, replacement))
    , replaceData2Hero: (which1, which2, replacement) => dispatch(replaceData2Hero(which1, which2, replacement))

    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))

    , addDeleteNotification: (code_situation, language, message, time) => dispatch(addDeleteNotification(code_situation, language, message, time))
  };
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Build);