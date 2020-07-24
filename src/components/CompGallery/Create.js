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
import PositionReady from './Create/PositionReady';
//import MapReady from './Create/MapReady';

import useInput from '../../tools/hooks/useInput';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconPlus from '../../svgs/basic/IconPlus'
import * as imgHero from '../../images/heroes'



const DivCreate = styled(Div)`
  width: calc(100% - 120px);
  height: calc(100% - 50px);
  
  display: grid;
  align-items: start;
  
  position: fixed;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(240px, 360px)  minmax(360px, 480px);
    grid-template-areas: 
      "A"
      "B";
    grid-gap: 20px;
    
  }
 

  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: 
      "A B";
    grid-gap: 20px;
    
  }
`;


const ContainerA = styled(Div)`
  grid-area: A;
  height: 100%;
  position: relative;
`

const ContainerB = styled(Div)`
  grid-area: B;
  height: 100%;
  position: relative;
`



const DivA = styled(Div)`
  overflow-y: auto;
  position: absolute;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    
  }
 
  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
  }
`

const DivB = styled(Div)`
  overflow-y: auto;
  position: absolute;
  height: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
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
  
  margin-top: 10px;
  margin-bottom: 5px;
`

const DivCreatingComp = styled(Div)`
  width: 100%;
  height:100%;
  
  margin-top: 5px;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  
  display: grid;
  
   & > div:first-child {border-radius: 10px 10px 0 0;}
  & > div:last-child {border-radius: 0 010px 10px;}
  
  @media (max-width: ${props => (props.theme.media.comp_gallery.mid_big -1) }px ) {
    grid-template-columns: 300px;
    grid-template-rows: 130px 60px 300px 45px 300px;
    grid-template-areas: 
      "One"
      "Two"
      "Three"
      "Four"
      "Five"
  }
 

  @media (min-width:  ${props => (props.theme.media.comp_gallery.mid_big) }px) {
    
    grid-template-columns: 60px 300px; /* 270 = (2+50+2)*5 */
    grid-template-rows: 130px 300px 45px 300px;
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
  flex-direction: column;
  justify-content: center;
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
  justify-content: space-evenly;
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






// Own
const InputCommon = styled(Input)`
  height: 30px;
  
  border: 2px solid ${props => props.theme.color_very_weak};
  margin-left: 8px;
  margin-right: 8px;
  
  margin-bottom: 4px;
  margin-top: 4px;

  border-radius: 4px;
`


const InputContentComment =  styled(InputCommon)`
  height: 240px;
`


// Two
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
    {
      listIdHero: ["Anub'arak", "Muradin"]
    }
    
    ,{
      listIdHero: ["Genji"]
    }
    
    ,{
      listIdHero: ["Maiev", "Cassia"]
    }
    
    ,{
      listIdHero: ["Mephisto", "Orphea"]
    }
    
    ,{
      listIdHero: ["Rehgar", "Kharazim"]
    }
  ];
    
      
  
  //console.log(listPositionDefault);
  
  
  //const [trigger, setTrigger] = useState("");
  
  
  // information of comp
  const inputTitle = useInput(""); // {value, setValue, onChange};
  const inputAuthor = useInput("");
  
  const inputPassword1 = useInput("");
  const inputPassword2 = useInput("");
  
  const [rating, setRating] = useState({});
  
  const inputContentComment = useInput("");
  const inputLinkComment = useInput("");
  
  
  // Hero Map 선택
  const [maps, setMaps] = useState(["all"]);
  const [listPosition, setListPosition] = useState(listPositionDefault);
  
  const [whichAdding, setWhichAdding] = useState("Hero"); // Hero, Map
  
  const [locationAddingHero, setLocationAddingHero] = useState([0,0]);
  const [idHeroChosen, setIdHeroChosen] = useState("");
  
  const [locationAddingMap, setLocationAddingMap] = useState([0]);
  const [idMapChosen, setIdMapChosen] = useState("");
  
  useEffect(()=>{
    
    //console.log("idHeroChosen is changed");
    //console.log(idHeroChosen);
    //console.log(whichAdding);
    
    if (idHeroChosen != "" && whichAdding === "Hero") {
      let listPositionTemp = listPosition;
      listPositionTemp[locationAddingHero[0]]["listIdHero"][locationAddingHero[1]] = idHeroChosen;
      setListPosition(listPositionTemp);
      
      //console.log("hi")
      //setTrigger(Date.now().toString());
    }
  }, [idHeroChosen])
  
  
  // important!!! https://github.com/reactjs/reactjs.org/issues/1689
  const setIdHeroChosenForChild = (idHero) => { setIdHeroChosen(idHero); }
  const setListPositionForChild = (listPosition) => { setListPosition(listPosition); }
  const setWhichAddingForChild = (one) => { setWhichAdding(one); }
  const setLocationAddingHeroForChild = (location) => { setLocationAddingHero(location); }
  const setLocationAddingMapForChild = (location) => { setLocationAddingMap(location); }
  
  
  
  const onClick_ButtonCreate = async (event) => {
    
    const comment = {
      author: inputAuthor.value
      , content: inputContentComment.value
      , link: inputLinkComment.value
    }
    
    let bodyRequest = {
      
      _id: Date.now().toString()
      ,password: "1234"
      
      ,title: inputTitle.value
      ,author: inputAuthor.value
    
      
      ,added: Date.now()
      
      ,maps: maps
      ,tags: ["tag1"]
      
      ,listPosition: listPosition
      
      ,rating: rating
      ,comments: [comment]
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
  
  
  const returnChoose = (whichAdding) => {
    switch (whichAdding) {
      case "Hero":
        return (<ChooseHero setIdHeroChosenForChild={setIdHeroChosenForChild}/>);
        break;
      case "Map":
        return (<Div> choose map </Div>);
        break;
      case "Tag":
        return (<Div> choose tag </Div>);
        break;
    }
  }
  
  return (
  
  <DivCreate>
    <ContainerA>
      <DivA> 
        
        <ButtonCreate
          onClick={(event) => onClick_ButtonCreate(event)}
        >
          CREATE
        </ButtonCreate>
      
        <DivCreatingComp>
        
          <DivOne> 
          
            <Div>  <InputCommon  {...inputTitle} placeholder="title of comp" />  </Div>
            <Div> <InputCommon  {...inputAuthor} placeholder="author" />  </Div>
            <Div> 
              <InputCommon  {...inputPassword1} placeholder="password" /> 
              <InputCommon {...inputPassword1} placeholder="password again" /> 
            </Div>
            
          </DivOne>
        
          <DivTwo> 
            
          </DivTwo>
        
          <DivThree>
            {[0,1,2,3,4].map((element, index) => {
              return (
              
                <PositionReady 
                  
                  key={index}  
                  indexPosition={element} 
                  
                  idHeroChosen={idHeroChosen}
                  
                  listPosition={listPosition} 
                  setListPositionForChild={setListPositionForChild} 
                  
                  dictHeroBasic={dictHeroBasic} 
                  
                  setWhichAddingForChild={setWhichAddingForChild}
                  locationAddingHero={locationAddingHero}
                  setLocationAddingHeroForChild={setLocationAddingHeroForChild} />
              ) 
            })}
          </DivThree>
          
          <DivFour> 
            <Div> 아직 안정했다.. </Div>
          </DivFour>
          
          <DivFive>
            <Div> <InputContentComment  {...inputContentComment} placeholder="comment" /> </Div>
            <Div> <InputCommon  {...inputLinkComment} placeholder="link" /> </Div>
          </DivFive>
        
        </DivCreatingComp>
        
      
      </DivA>
    </ContainerA>
    
    <ContainerB>
      <DivB>
        {returnChoose(whichAdding)} 
      </DivB>
    </ContainerB>
  </DivCreate>
  
  )

}

/*
<MapReady 
              
              idMapChosen={idMapChosen}
              
              listMap={listMap} 
              setListMapForChild={setListMapForChild} 
              
              listAllMap={listAllMap} 
              
              setWhichAddingForChild={setWhichAddingForChild}
              locationAddingMap={locationAddingMap}
              setLocationAddingMapForChild={setLocationAddingMapForChild}
            
            /> 
*/
  
  


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
export default connect(mapStateToProps, mapDispatchToProps)(Create);