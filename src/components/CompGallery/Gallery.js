import dotenv from 'dotenv';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import axios from 'axios';

import { connect } from "react-redux";
import * as config from '../../config';

import addRemoveNotification from "../../redux/thunks/addRemoveNotification";
import {replaceData2} from "../../redux/actions/basic";
import {replaceDataCompGallery, replaceData2CompGallery} from "../../redux/actions/comp_gallery";


import { NavLink, useHistory } from 'react-router-dom';

import {Div, Input, Button} from '../../styles/DefaultStyles';


import useInput from '../../tools/hooks/useInput';
import {getTimeStamp} from '../../tools/vanilla/time';

import IconWorking from '../../svgs/basic/IconWorking'




const DivGallery = styled(Div)`
  width: 100%;
  height:100%;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
   readyListComp
   ,listComp
   
   ,replaceData2CompGallery
   ,replaceData2
   
   ,addRemoveNotification
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
          
          addRemoveNotification("error", `server is not working`);
          console.log(error) 
        }
      } // if
      
    }) () // async
  
  },[])

  
  return (
  
  <DivGallery>
    
    {(!readyListComp)? <Div> loading </Div>
      :
      <Div>
      
        {listComp[0].title}
    
      </Div>
    }
    
    
  </DivGallery>
  
  )

}
  
  


function mapStateToProps(state) { 
  return { 
    listComp: state.comp_gallery.gallery.listComp
   ,readyListComp: state.basic.ready.listComp
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return {
    
    replaceDataCompGallery : (which, replacement) => dispatch(replaceDataCompGallery(which, replacement))
    ,replaceData2CompGallery : (which1, which2, replacement) => dispatch(replaceData2CompGallery(which1, which2, replacement))
    
    ,replaceData2 : (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    
    ,addRemoveNotification: (situation, message, time, idNotification) => dispatch( addRemoveNotification(situation, message, time, idNotification) )
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Gallery);