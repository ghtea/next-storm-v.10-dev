import dotenv from 'dotenv';
import React, {useState} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

//import addRemoveNotification from "../../redux/thunks/addRemoveNotification";
//import {replaceWorking} from "../../redux/store";

//import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, Img} from '../../../styles/DefaultStyles';


import useInput from '../../../tools/hooks/useInput';
import {getTimeStamp} from '../../../tools/vanilla/time';

import IconWorking from '../../../svgs/IconWorking'
import * as imgHero from '../../../images/heroes'


const DivChooseHero = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  }
`


const InputSearch = styled(Input)`
  width: 200px;
  height: 30px;
`

const GroupEachRole = styled(Div)`
  margin-top: 5px;
  margin-bottom: 5px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  
  padding: 5px;
`


const DivRoles = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const DivRoleName = styled(Div)`
  width: 50px;
  background-color: ${props => props.theme.COLOR_middle};
`

const ContainerHero = styled(Div)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  flex-wrap: wrap;
`

const DivEachHero = styled(Div)`

  margin: 2px;

  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    width: 40px;
    height: 40px;
  } 
`
const ImgEachHero = styled(Img)`
  border-radius: 50%;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    object-fit: cover;
    width: 40px;
    height: 40px;
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    object-fit: cover;
    width: 40px;
    height: 40px;
  } 
`


 const ChooseHero = ({dictHeroBasic, setIdHeroChosenForChild } ) => {
  
    const dictTank = dictHeroBasic.filter(objHero => objHero.role === "Tank");
    const dictBruiser = dictHeroBasic.filter(objHero => objHero.role === "Bruiser");
    const dictMelee = dictHeroBasic.filter(objHero => objHero.role === "Melee Assassin");
    const dictRanged = dictHeroBasic.filter(objHero => objHero.role === "Ranged Assassin");
    const dictHealer = dictHeroBasic.filter(objHero => objHero.role === "Healer");
    const dictSupport = dictHeroBasic.filter(objHero => objHero.role === "Support");
    
    
    const onClick_Hero = (event, idHero) => {
      setIdHeroChosenForChild(idHero);
    }
  
  return (
    <DivChooseHero>
    
      <Div> 
        <Div> 
          <InputSearch placeholder="search"/>  
        </Div>
      </Div>
    
      <Div> 
        filters
      </Div>
      
      
      <DivRoles>
        
        <GroupEachRole>
          <DivRoleName> TANK </DivRoleName>
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
          <DivRoleName> BRUISER </DivRoleName>
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
          <DivRoleName> MELEE </DivRoleName>
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
          <DivRoleName> RANGED </DivRoleName>
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
          <DivRoleName> HEALER </DivRoleName>
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
          <DivRoleName> SUPPORT </DivRoleName>
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
        
      </DivRoles>
      
    </DivChooseHero>
  )

}
  
  


function mapStateToProps(state) { 
  return { 
    dictHeroBasic: state.basic.hots.dictHeroBasic
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    //readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
    //,addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
    //,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(ChooseHero);