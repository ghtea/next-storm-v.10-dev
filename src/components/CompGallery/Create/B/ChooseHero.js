import dotenv from 'dotenv';
import React, {useState} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import addDeleteNotification from "../../../../redux/thunks/addDeleteNotification"
import {replaceDataCompGallery, replaceData2CompGallery, replaceListPosition} from "../../../../redux/actions/comp_gallery";

import {Div, Input, Button, Img} from '../../../../styles/DefaultStyles';


import useInput from '../../../../tools/hooks/useInput';
import {getTimeStamp} from '../../../../tools/vanilla/time';

import IconTank from '../../../../svgs/roles/IconTank'
import IconBruiser from '../../../../svgs/roles/IconBruiser'
import IconMelee from '../../../../svgs/roles/IconMeleeAssassin'
import IconRanged from '../../../../svgs/roles/IconRangedAssassin'
import IconHealer from '../../../../svgs/roles/IconHealer'
import IconSupport from '../../../../svgs/roles/IconSupport'

import * as imgHero from '../../../../images/heroes'


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

const GroupEachRole = styled(Div)`
  height: auto;
  
  margin-top: 5px;
  margin-bottom: 5px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  
`


const DivRoles = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`


const DivRoleName = styled(Div)`
  width: 40px;
  background-color: ${props => props.theme.COLOR_normal};
  border-radius: 12px 0 0 12px;
`

const ContainerHero = styled(Div)`
  width: calc(100% - 40px);
  padding: 6px;
  
  background-color: ${props => props.theme.COLOR_middle};
  border-radius: 0 12px 12px 0;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  flex-wrap: wrap;
  
`

const DivEachHero = styled(Div)`

  margin: 3px;
  width: 40px;
  height: 40px;

`
const ImgEachHero = styled(Img)`
  border-radius: 50%;
  
  object-fit: cover;
  width: 40px;
  height: 40px;
    
`


 const ChooseHero = ({
   
  language
   
    , dictAllHeroBasic
     
    , listPosition
    
    , whichAdding
    , locationAddingHero
   
    , replaceData2CompGallery 
    , replaceListPosition
    
    , addDeleteNotification
   
 } ) => {
  
    const dictTank = dictAllHeroBasic.filter(objHero => objHero.role === "Tank");
    const dictBruiser = dictAllHeroBasic.filter(objHero => objHero.role === "Bruiser");
    const dictMelee = dictAllHeroBasic.filter(objHero => objHero.role === "Melee Assassin");
    const dictRanged = dictAllHeroBasic.filter(objHero => objHero.role === "Ranged Assassin");
    const dictHealer = dictAllHeroBasic.filter(objHero => objHero.role === "Healer");
    const dictSupport = dictAllHeroBasic.filter(objHero => objHero.role === "Support");
    
    
    const onClick_Hero = (event, idHero) => {
      
      const listIdMainHero = listPosition.map(element => element.listIdHero[0])
      
      if ( listPosition[locationAddingHero[0]]["listIdHero"].includes(idHero) ) {
        addDeleteNotification("comp12", language);
      }
      else if ( listIdMainHero.includes(idHero) && locationAddingHero[1] === 0 ) {
        // 이미 존재하는 포지션의 메인 영웅이 다른 포지션의 메인 포지션으로 추가되려고 할때 
        addDeleteNotification("comp14", language);
      }
      else if ( listPosition[locationAddingHero[0]]["listIdHero"].lenght === 5) {
        addDeleteNotification("comp13", language);
      }
        
        
      else if (whichAdding === "Hero" && listPosition[locationAddingHero[0]]["listIdHero"].length < 5) {
        let listPositionTemp = listPosition;
        listPositionTemp[locationAddingHero[0]]["listIdHero"][locationAddingHero[1]] = idHero;
        replaceListPosition(listPositionTemp);
        
        replaceData2CompGallery("create", "triggerPosition", Date.now().toString());
      }
      
    }
  
  return (
    <DivChooseHero>
    
 
      <DivRoles>
        
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
          <DivRoleName> <IconHealer width={"30px"} height={"30px"} /> </DivRoleName>
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
        
      </DivRoles>
      
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
    
    , dictAllHeroBasic: state.hots.dictAllHeroBasic
    
    , listPosition: state.comp_gallery.create.listPosition
    
    , whichAdding: state.comp_gallery.create.whichAdding
    , locationAddingHero: state.comp_gallery.create.locationAddingHero
    
    //, locationAddingHero: state.comp_gallery.locationAddingHero
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    ,replaceListPosition : (replacement) => dispatch(replaceListPosition(replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    //,replaceWorking: (which, true_false) => dispatch(replaceWorking(which, true_false))
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(ChooseHero);