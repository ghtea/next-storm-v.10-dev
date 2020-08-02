import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import * as config from '../../config';

import  addDeleteNotification from "../../redux/thunks/addDeleteNotification";
import dictCode from '../../others/dictCode'

import {replaceData2} from "../../redux/actions/basic";
import {replaceDataCompGallery, replaceData2CompGallery} from "../../redux/actions/comp_gallery";


import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button} from '../../styles/DefaultStyles';
import Comp from './Gallery/Comp'
import Filter from './Gallery/Filter'

import useInput from '../../tools/hooks/useInput';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconWorking from '../../svgs/basic/IconWorking'




const DivGallery = styled(Div)`
  width: 100%;
  height:100%;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;

const DivListComp = styled(Div)`
  width: 100%;
  height: 100%;
  
  margin: 10px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  flex-wrap: wrap;
`;


 export const SubGallery = ({}) => {
  
  return (
  <Div>
    search!
  </Div>
  
  )
}

 


 const Gallery = ({
   
   language
   
   ,readyListComp
   ,listComp
   
   ,replaceData2CompGallery
   ,replaceData2
   
   ,addDeleteNotification
 }) => {


  useEffect( () => { 
    
    (async () => {
    
      // 내 서버에서 comp 여러개 가져오기
      if (!readyListComp ) {
        
        console.log("hi")
        try { 
          
          const {data} = await axios.get (`${config.URL_API_NS}/comp/`);
          
          replaceData2CompGallery("gallery", "listComp", data);
          replaceData2("ready", "listComp", true);
          
        } 
        catch (error) { 
          
          addDeleteNotification("basic01", language);
          console.log(error) 
        }
      } // if
      
    }) () // async
  
  },[])

  
  return (
  
  <DivGallery>
  
    <Filter />
    
    {(!readyListComp)? <Div> loading </Div>
      :
      <DivListComp>
      
        {listComp.map( (comp, index) => {
          
          return (
            <Comp 
              key={index}
              tComp = {comp}
            />
          )
          }) //map
        }
    
      </DivListComp>
    }
    
    
  </DivGallery>
  
  )

}
  
  


function mapStateToProps(state) { 
  return { 
    
    language: state.basic.language
    
    ,listComp: state.comp_gallery.gallery.listComp
   ,readyListComp: state.basic.ready.listComp
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return {
    
    replaceDataCompGallery : (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    ,replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Gallery);