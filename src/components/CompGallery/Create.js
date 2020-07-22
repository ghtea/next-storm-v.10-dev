import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";

import * as config from '../../config';


import addRemoveNotification from "../../redux/thunks/addRemoveNotification";
import {replaceWorking} from "../../redux/store";

import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button, Img} from '../../styles/DefaultStyles';

import ChooseHero from './Create/ChooseHero';

import useInput from '../../tools/hooks/useInput';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconPlus from '../../svgs/basic/IconPlus'




const DivCreate = styled(Div)`
  width: 100%;
  height:100%;
  
  display: grid;
  align-items: start;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(240px, 360px)  minmax(360px, 480px);
    grid-template-areas: 
      "A"
      "B"
  }
 

  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 
      "A B"
  }
`;

const DivA = styled(Div)`
  grid-area: A;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  }
`

const DivB = styled(Div)`
  
  grid-area: B;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  }
`



//
const ButtonCreate = styled(Button)`
  width: 150px;
  height: 36px;
  
  border-radius: 10px;
  
  margin: 10px;
`

const DivCreatingComp = styled(Div)`
  width: 100%;
  height:100%;
  
  display: grid;
  
   & > div:first-child {border-radius: 10px 10px 0 0;}
  & > div:last-child {border-radius: 0 010px 10px;}
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    grid-template-columns: 300px;
    grid-template-rows: 45px 60px 300px 45px minmax(45px, 300px);
    grid-template-areas: 
      "One"
      "Two"
      "Three"
      "Four"
      "Five"
  }
 

  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
    grid-template-columns: 60px 300px; /* 270 = (2+50+2)*5 */
    grid-template-rows: 45px 300px 45px minmax(45px, 300px);
    grid-template-areas: 
      "One One"
      "Two Three"
      "Four Four"
      "Five Five"
  }
`


// title, author
const DivOne = styled(Div)`
  grid-area: One;
  
  height: 100%;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  }
`

// 정렬 방식 고민중 https://css-tricks.com/vertically-center-multi-lined-text/

// map, difficulty
const DivTwo = styled(Div)`
  grid-area: Two;
  
  
  background-color: ${props => props.theme.COLOR_middle};
  color: ${props => props.theme.color_normal};
  
  & > div {
    
  }
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
  
    height: 100%;
    
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
    height: 100%;
  
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`

// list of positions (heroes)
const DivThree = styled(Div)`
  grid-area: Three;
  
  height: 100%;
  
  background-color: ${props => props.theme.COLOR_bg};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  }
`

// actions 'create'
const DivFour = styled(Div)`
  grid-area: Four;
  
  height: 100%;
  
  background-color: ${props => props.theme.COLOR_normal};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  }
`

// comments
const DivFive = styled(Div)`
  grid-area: Five;
  
  height: 100%;
  
  background-color: ${props => props.theme.COLOR_middle};
  color: ${props => props.theme.color_normal};
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  }
`





export const SubCreate = ({}) => {
  
  return (
  <Div>
    create!
  </Div>
  
  )
}



//
const DivPosition = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const DivEachHero = styled(Div)`

  margin: 2px;
  cursor: pointer;
  
  position: relative;
  
  &:nth-child(n+2) img {
    opacity: 0.66;
  }
  
  &[data-is-focused='true'] {
    border: 3px solid ${props => (props.theme.COLOR_delete) };
  }
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    width: 50px;
    height: 50px;
  } 
  
  
`
const ImgEachHero = styled(Img)`
  border-radius: 50%;
  
  position: absolute;
  z-index:2;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    object-fit: cover;
    width: 50px;
    height: 50px;
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    object-fit: cover;
    width: 50px;
    height: 50px;
  } 
`
const ButtonDelete = styled(Button)`
  color: ${props => (props.theme.color_delete) };
  background-color: ${props => (props.theme.COLOR_delete) };
  
  width: 50px;
  height: 25px;
  
  border-radius: 4px;
  
  &:focus {outline:none;}
`
/*
const BackgroundEachHero = styled(Div)`
  background-color: ${props => (props.theme.COLOR_bg) };
  border-radius: 50px;
  position: absolute;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    width: 50px;
    height: 50px;
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    width: 50px;
    height: 50px;
  } 
  
`
*/

const DivPlus = styled(Div)`
  margin: 2px;
  
  width: 50px;
  height: 50px;
  
  &[data-is-focused='true'] > div {
    background-color: ${props => (props.theme.COLOR_save) };
  }
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  } 
`

const DivIconPlus = styled(Div)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  
  background-color: ${props => (props.theme.color_very_weak) };
`



const Position = ({
  indexPosition, listPosition, setListPosition, dictHeroBasic
  , locationAdding, setLocationAdding
}) => {
  
  
  const [trigger, setTrigger] = useState("");
  
  const listIsFocusedHeroDefault = new Array(5);
  const [listIsFocusedHero, setListIsFocusedHero] = useState(listIsFocusedHeroDefault);
  const [doesHaveFocusedHero, setDoesHaveFocusedHero] = useState(false);
  
  useEffect(()=>{
    console.log(listIsFocusedHero)
    if (listIsFocusedHero.includes(true)){
      setDoesHaveFocusedHero(true);
      
    }
    else {
      setDoesHaveFocusedHero(false);
    }
  },[listIsFocusedHero])
  
  
  useEffect(()=>{
    if (locationAdding[0] ===  indexPosition && locationAdding[1] < listPosition[indexPosition].length) {
      setDoesHaveFocusedHero(true);
    }
    else {
      setDoesHaveFocusedHero(false);
    }
  }, [ locationAdding[0], locationAdding[1] ])
  
  
  const onClick_Hero = (event, indexPosition, indexHero) => {
    setLocationAdding([indexPosition, indexHero]);
  }
  
  const onClick_Plus = (event, indexPosition, indexHero) => {
    setLocationAdding([indexPosition, indexHero]);
  }
  
  const onClick_ButtonDelete = (event, indexPosition, idHero) => {
    let listPositionTemp = listPosition;
    listPositionTemp[indexPosition] = listPositionTemp[indexPosition].filter(tIdHero => tIdHero !== idHero);
    
    setListPosition(listPositionTemp);
    setTrigger(Date.now().toString());
  }
  
  
  
  const returnIsFocused = (indexPosition, indexItem) => {
    if (indexPosition === locationAdding[0] && indexItem === locationAdding[1]) {

      return 'true';
    }
    else {
      
      return 'false';
    }
  }
  
  
  return (
  
    <DivPosition>
      {listPosition[indexPosition].map((idHero, indexHero) => {
        
        const tHeroBasic = dictHeroBasic.find(element => element._id === idHero)
        const key_HeroesTalents = tHeroBasic['key_HeroesTalents']
        const isFocused = returnIsFocused(indexPosition, indexHero);
        
        return (
          <>
          <DivEachHero 
            key={idHero}
            onClick = {(event) => onClick_Hero(event, indexPosition, indexHero)}
            data-is-focused = {isFocused}
          > 
          
            <ImgEachHero src={`https://heroes-talents.avantwing.com/images/heroes/${key_HeroesTalents}.png`} />
            
          </DivEachHero>
          { (isFocused==='true')? 
            <ButtonDelete
              onClick={(event)=>onClick_ButtonDelete(event, indexPosition, idHero)}
            > 
              delete 
            </ButtonDelete> 
            : <> </> 
            }
          </>
        )
      })}
      
      
      <DivPlus
        onClick = {(event) => onClick_Plus(event, indexPosition, listPosition[indexPosition].length)}
        data-is-focused = {returnIsFocused(indexPosition, listPosition[indexPosition].length)}
      > 
        <DivIconPlus>
          <IconPlus width={"30px"} height={"30px"} color={"COLOR_bg"} /> 
        </DivIconPlus>
        
      </DivPlus>
      
      
      
    </DivPosition>
  )
}






const DivEachMap = styled(Div)`
  width: auto;
  margin-left: auto;
  margin-right: auto;
`





 const Create = ({dictHeroBasic}) => {
  
  const listHeroDefault = [];
  //const listPositionDefault = new Array(5).fill(listHeroDefault);
  // for test
  
  
  
  
  
  
  // error!!, Position 은 object 여야 한다?! 
  
  const listPositionDefault = [
      ["Anub'arak", "Muradin"]
      , ["Genji"]
      , ["Maiev", "Cassia"]
      , ["Mephisto", "Orphea"]
      , ["Rehgar", "Kharazim"]
    ]
  
  //console.log(listPositionDefault);
  
  const [trigger, setTrigger] = useState("");
  
  
  // information of comp
  const [title, setTitle] = useState("");  // (no title)
  const [author, setAuthor] = useState("");    // (anonymous)
  
  const [maps, setMaps] = useState(["all"]);

  
  const [listPosition, setListPosition] = useState(listPositionDefault);
  
  const [rating, setRating] = useState({});
  
  const [comments, setComments] = useState([]);
  
  
  
  const [locationAdding, setLocationAdding] = useState([0,0]);
  const [idHeroChosen, setIdHeroChosen] = useState("");
  
  useEffect(()=>{
    if (idHeroChosen != "") {
      let listPositionTemp = listPosition;
      listPositionTemp[locationAdding[0]][locationAdding[1]] = idHeroChosen;
      setListPosition(listPositionTemp);
      
      setTrigger(Date.now().toString());
      console.log(listPosition);
    }
  }, [idHeroChosen])
  
  
  const onClick_ButtonCreate = async (event) => {
    let bodyRequest = {
      
      _id: Date.now().toString()
      ,password: "1234"
      
      ,title: title
      ,author: author
    
      
      ,added: Date.now()
      
      ,maps: maps
      ,tags: ["tag1"]
      
      ,listPosition: listPosition
      
      ,rating: rating
      ,comments: comments
    }
    
    await axios.post(`${config.URL_API_NS}/comp/`, bodyRequest);
    
    /*
    ,password: String //?
  
    ,title: String
    ,author: String
    
    ,added: Date
    ,links: [String] //?
    ,tags: [String] //?
    
    ,listPosition:[schemaPosition]
    
    ,rating: schemaRating
    ,comments: [schemaComment]
    */
  }
  
  
  return (
  
  <DivCreate>
    <DivA> 
      
      <ButtonCreate
        onClick={(event) => onClick_ButtonCreate(event)}
      >
        CREATE
      </ButtonCreate>
    
      <DivCreatingComp>
      
        <DivOne> 
          <Div> crazy dropship {`${locationAdding[0]}, ${locationAdding[1]}`} </Div>
          <Div> author </Div>
        </DivOne>
      
        <DivTwo> 
          <DivEachMap> Cursed Hollow </DivEachMap>
          <Div> Easy </Div>
        </DivTwo>
      
        <DivThree>
          {[0,1,2,3,4].map(element => {
            return (
              <Position 
                key={`Position${element}`} 
                indexPosition={element} 
                
                listPosition={listPosition} 
                setListPosition={setListPosition} 
                
                dictHeroBasic={dictHeroBasic} 
                
                locationAdding={locationAdding}
                setLocationAdding={setLocationAdding} />
            ) 
          })}
        </DivThree>
        
        <DivFour> 
          <Div> <Input /> </Div>
        </DivFour>
        
        <DivFive>
          <Div> </Div>
        </DivFive>
      
      </DivCreatingComp>
      
    
    </DivA>
    
    <DivB>
      <ChooseHero setIdHeroChosen={setIdHeroChosen}/> 
    </DivB>
    
  </DivCreate>
  
  )

}
  
  


function mapStateToProps(state) { 
  return { 
    dictHeroBasic: state.hots.dictHeroBasic
    //ready: state.ready 
   // ,loading: state.loading
    ///,working: state.working
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
export default connect(mapStateToProps, mapDispatchToProps)(Create);