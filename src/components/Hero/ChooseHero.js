import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';

import { connect } from "react-redux";

import addDeleteNotification from "../../redux/thunks/addDeleteNotification"
import {replaceDataHero, replaceData2Hero} from "../../redux/actions/hero";

import {Div, Input, Button, Img} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconTank from '../../svgs/roles/IconTank'
import IconBruiser from '../../svgs/roles/IconBruiser'
import IconMelee from '../../svgs/roles/IconMeleeAssassin'
import IconRanged from '../../svgs/roles/IconRangedAssassin'
import IconHealer from '../../svgs/roles/IconHealer'
import IconSupport from '../../svgs/roles/IconSupport'

import * as imgHero from '../../images/heroes'


const DivChooseHero = styled(Div)`
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`


const InputSearch = styled(Input)`
  width: 200px;
  height: 30px;
`


const DivBoard = styled(Div)`
  width: 100%;
  max-width: 900px;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (min-width:  ${props => (props.theme.media.md) }px) {
    
  }
`


const GroupEachRole = styled(Div)`
  height: auto;
  
  margin-top: 5px;
  margin-bottom: 5px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  
`




const DivRoleName = styled(Div)`
  width: 40px;
  background-color: ${props => props.theme.COLOR_normal};
  border-radius: 12px 0 0 12px;
`

const ContainerHero = styled(Div)`
  width: calc(100% - 40px);
  padding: 8px;
  
  background-color: ${props => props.theme.COLOR_middle};
  border-radius: 0 12px 12px 0;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  flex-wrap: wrap;
  
`

const DivEachHero = styled(Div)`

  margin: 5px;
  
  width: 40px;
  height: 40px;
  
  cursor: pointer;
`

const ImgEachHero = styled(Img)`
  border-radius: 50%;
  
  object-fit: cover;
  width: 40px;
  height: 40px;
`


 const ChooseHero = ({
   
  language
   
  , listAllHeroBasic
   
  , replaceDataHero
  , replaceData2Hero
  
  , addDeleteNotification
   
 } ) => {
    
    const history = useHistory();
    let location = useLocation();
    const [subject, setSubject] = useState("");
    
    //
    const dictTank = listAllHeroBasic.filter(objHero => objHero.role === "Tank");
    const dictBruiser = listAllHeroBasic.filter(objHero => objHero.role === "Bruiser");
    const dictMelee = listAllHeroBasic.filter(objHero => objHero.role === "Melee Assassin");
    const dictRanged = listAllHeroBasic.filter(objHero => objHero.role === "Ranged Assassin");
    const dictHealer = listAllHeroBasic.filter(objHero => objHero.role === "Healer");
    const dictSupport = listAllHeroBasic.filter(objHero => objHero.role === "Support");
    
    
    useEffect(()=>{
      
      replaceDataHero('focusingHero', "");
      
      console.log(location.pathname);
      
      switch(location.pathname){
        case '/hero/builds-stats':
          setSubject('builds-stats');
      }
      
      //setSubject()
    },[])
    
    const onClick_Hero = (event, keyHero) => {
      
      replaceDataHero('focusingHero', keyHero);
      
      const keyHeroEncoded = encodeURIComponent(keyHero);
      history.push(`/hero/${subject}/${keyHeroEncoded}`);
      
    }
  
  
  return (
    <DivChooseHero>
    
 
      <DivBoard>
        
        <GroupEachRole>
          <DivRoleName> <IconTank width={"24px"} height={"24px"} /> </DivRoleName>
          <ContainerHero> 
            {dictTank.map((tHeroBasic) => {
        
              const idHero = tHeroBasic["_id"]
              const key_HeroesTalents = tHeroBasic['key_HeroesTalents']
              
              return (
              
                <DivEachHero key={idHero}
                  onClick={(event)=> onClick_Hero(event, idHero)}
                > 
                  <ImgEachHero src={imgHero[key_HeroesTalents]} />
                </DivEachHero>
              )
            })}
          </ContainerHero>
        </GroupEachRole>
        
        <GroupEachRole>
          <DivRoleName> <IconBruiser width={"24px"} height={"24px"} /> </DivRoleName>
          <ContainerHero> 
            {dictBruiser.map((tHeroBasic) => {
        
              const idHero = tHeroBasic["_id"]
              const key_HeroesTalents = tHeroBasic['key_HeroesTalents']
              
              return (
              
                <DivEachHero key={idHero}
                  onClick={(event)=> onClick_Hero(event, idHero)}  
                > 
                  <ImgEachHero src={imgHero[key_HeroesTalents]} />
                </DivEachHero>
              )
            })}
          </ContainerHero>
        </GroupEachRole>
        
        <GroupEachRole>
          <DivRoleName> <IconMelee width={"24px"} height={"24px"} /> </DivRoleName>
          <ContainerHero> 
            {dictMelee.map((tHeroBasic) => {
        
              const idHero = tHeroBasic["_id"]
              const key_HeroesTalents = tHeroBasic['key_HeroesTalents']
              
              return (
              
                <DivEachHero key={idHero}
                  onClick={(event)=> onClick_Hero(event, idHero)}  
                >
                  <ImgEachHero src={imgHero[key_HeroesTalents]} />
                </DivEachHero>
              )
            })}
          </ContainerHero>
        </GroupEachRole>
        
        <GroupEachRole>
          <DivRoleName> <IconRanged width={"24px"} height={"24px"} /> </DivRoleName>
          <ContainerHero> 
            {dictRanged.map((tHeroBasic) => {
        
              const idHero = tHeroBasic["_id"]
              const key_HeroesTalents = tHeroBasic['key_HeroesTalents']
              
              return (
              
                <DivEachHero key={idHero}
                  onClick={(event)=> onClick_Hero(event, idHero)}  
                >
                  <ImgEachHero src={imgHero[key_HeroesTalents]} />
                </DivEachHero>
              )
            })}
          </ContainerHero>
        </GroupEachRole>
        
        <GroupEachRole>
          <DivRoleName> <IconHealer width={"28px"} height={"28px"} /> </DivRoleName>
          <ContainerHero> 
            {dictHealer.map((tHeroBasic) => {
        
              const idHero = tHeroBasic["_id"]
              const key_HeroesTalents = tHeroBasic['key_HeroesTalents']
              
              return (
              
                <DivEachHero key={idHero}
                  onClick={(event)=> onClick_Hero(event, idHero)}  
                >
                  <ImgEachHero src={imgHero[key_HeroesTalents]} />
                </DivEachHero>
              )
            })}
          </ContainerHero>
        </GroupEachRole>
        
        <GroupEachRole>
          <DivRoleName> <IconSupport width={"24px"} height={"24px"} /> </DivRoleName>
          <ContainerHero> 
            {dictSupport.map((tHeroBasic) => {
        
              const idHero = tHeroBasic["_id"]
              const key_HeroesTalents = tHeroBasic['key_HeroesTalents']
              
              return (
              
                <DivEachHero key={idHero}
                  onClick={(event)=> onClick_Hero(event, idHero)}  
                >
                  <ImgEachHero src={imgHero[key_HeroesTalents]} />
                </DivEachHero>
              )
            })}
          </ContainerHero>
        </GroupEachRole>
        
      </DivBoard>
      
    </DivChooseHero>
  )

}
  
/*
     <Div> 
        <Div> 
          <InputSearch placeholder="search"/>  
        </Div>
      </Div>
    
      <Div> 
        filters
      </Div>
*/


function mapStateToProps(state) { 
  return { 
    
    language: state.basic.language
    
    , listAllHeroBasic: state.hots.listAllHeroBasic
    
    , listPosition: state.comp_gallery.create.listPosition
    
    , whichAdding: state.comp_gallery.create.whichAdding
    , locationAddingHero: state.comp_gallery.create.locationAddingHero
    
    //, locationAddingHero: state.comp_gallery.locationAddingHero
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    replaceDataHero : (which1, which2, replacement) => dispatch(replaceDataHero(which1, which2, replacement))
    , replaceData2Hero : (which1, which2, replacement) => dispatch(replaceData2Hero(which1, which2, replacement))
    
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    //,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(ChooseHero);