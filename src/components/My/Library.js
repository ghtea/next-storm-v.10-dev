import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import queryString from 'query-string';

import { connect } from "react-redux";
import * as config from '../../config';
import readPlanTeam from "../../redux/thunks/readPlanTeam";

import { useHistory } from 'react-router-dom';


import { replaceData2, replaceData } from "../../redux/actions/basic";
import { replacePlanTeam } from "../../redux/actions/team_planner";
import { replaceDataTeamPlanner, replaceData2TeamPlanner } from "../../redux/actions/team_planner";


import addDeleteNotification from "../../redux/thunks/addDeleteNotification";

import {Div, Input, Button, A} from '../../styles/DefaultStyles';
import Loading from '../_/Loading';


import useInput from '../../tools/hooks/useInput';

import IconShapesRegular from '../../svgs/basic/IconShapesRegular';
import IconFile from '../../svgs/basic/IconFile';
import IconComment from '../../svgs/basic/IconComment';
import IconVideo from '../../svgs/basic/IconVideo';


import IconAngleRight from '../../svgs/basic/IconAngleRight';



const DivLibrary = styled(Div)`
  
  width: 350px;
  
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  & > div {
  
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    margin-top: 20px;
    
  }
`;


const DivTitle = styled(Div)`
  font-size: 1.4rem;
  font-weight: bold;
  height: 30px;
`

const DivTable = styled(Div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
`

const DivRow = styled(Div)`
  width: 100%;
  height: auto;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  
  margin-top: 10px;
`


const DivA = styled(Div)`
  width: 80px;
  height: 80px;
  
  background-color: ${props => props.theme.COLOR_normal};
  border-radius: 15px 0 0 15px;
`

const DivB = styled(Div)`
  width: calc(100% - 80px);
  height: 80px;
  
  background-color: ${props => props.theme.COLOR_middle};
  border-radius: 0 15px 15px 0;
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  padding: 10px;
  
  & > div {
    width: auto;
  }
  
  & > div:nth-child(1){
    font-size: 1.2rem;
  }
`

const DivGo = styled(Div)`
  width: auto;
  height: 30px;
  border-radius: 15px;
  background-color: ${props => props.theme.color_very_weak};
  padding: 12px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  cursor: pointer;
  
  font-size: 0.9rem;
  
  & > * {
    width: auto;
    color: ${props => props.theme.COLOR_normal};
    &:nth-child(n+2) {margin-left: 4px;}
  }
  
  & > *:nth-child(1) {
    padding-bottom: 2px;
  }
`

const DivC = styled(Div)`
  width: 100%;
  height: auto;
  
  background-color: ${props => props.theme.COLOR_middle};
  border-radius: 15px;
  
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap:wrap;
  
  padding: 10px;
  
  & > div {
    width: auto;
    margin: 5px;
  }
`


const DivGoLikes = styled(Div)`
  width: auto;
  height: 36px;
  border-radius: 18px;
  background-color: ${props => props.theme.color_very_weak};
  padding: 12px;
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  cursor: pointer;
  
  font-size: 0.9rem;
  
  & > * {
    width: auto;
    color: ${props => props.theme.COLOR_normal};
    &:nth-child(n+2) {margin-left: 4px;}
  }
  
  & > *:nth-child(2), & > *:nth-child(3) {
    padding-bottom: 2px;
  }
`



const Library = ({
  
  user
  , readyUser
  , loadingUser
  
  , language
  
  
  , replaceDataMy
  , replaceData2My
  
  , replaceData2
  , addDeleteNotification
  
}) => {
  
  const history = useHistory();
  
  const [count, setCount] = useState(0);
  
  useEffect(()=>{
    
    if (!readyUser && !loadingUser) {
      
      if (count === 0) {
        setCount(1);
      }
      else {
        const query = queryString.stringify({
          "destination": "/my"
        });
        history.push('/auth/log-in?' + query)
      } 
      
    } // first if
  },[readyUser])
    
    
    
    const onClick_Works_Comp = (event) => {
      const query = queryString.stringify({
        idAuthor: user._id
      });
        
      history.push('/comp-gallery?' + query);
      replaceData2("ready", "listComp", false);
    }
    const onClick_Works_PlanTeam = (event) => {
      history.push('/team-planner');
      replaceData2("ready", "listPlanTeam", false);
    }
    
    const onClick_Comment_Comp = (event) => {
      const query = queryString.stringify({
        idAuthor: user._id
      });
        
      history.push('/comp-gallery/comments?' + query);
      replaceData2("ready", "listComment", false);
    }
    
    const onClick_Video_Comp = (event) => {
      const query = queryString.stringify({
        idAuthor: user._id
      });
        
      history.push('/comp-gallery/videos?' + query);
      replaceData2("ready", "listVideo", false);
    }
    
    
    const onClick_Likes_Comp = (event) => {
      const query = queryString.stringify({
        idUserLike: user._id
      });
        
      history.push('/comp-gallery?' + query);
      replaceData2("ready", "listComp", false);
    }
    const onClick_Likes_Comment = (event) => {
      const query = queryString.stringify({
        idUserLike: user._id
      });
        
      history.push('/comp-gallery/comments?' + query);
      replaceData2("ready", "listComment", false);
    }
    const onClick_Likes_Video = (event) => {
      const query = queryString.stringify({
        idUserLike: user._id
      });
        
      history.push('/comp-gallery/videos?' + query);
      replaceData2("ready", "listVideo", false);
    }
    
    if (!readyUser) {return (<DivLibrary/>)}
    
    else {
    return (
    
    <DivLibrary>
      
      <Div>
      
        <DivTitle> 
          {(() => {
              switch (language) {
                case 'ko': 
                  return '작품';
                case 'ja': 
                  return '作品';
                default: // eng
                  return 'Works';
              }
            })()} 
        </DivTitle>
        
        
        <DivTable> 
        
          <DivRow>
            <DivA> <IconShapesRegular width={"50px"} height={"50px"} color={"color_very_weak"} /> </DivA>
            <DivB>  
              <Div> {(() => {
                switch (language) {
                  case 'ko': 
                    return '영웅 조합';
                  case 'ja': 
                    return 'ヒーロー構成';
                  default: // eng
                    return 'Compositions';
                }
              })()}  </Div>
              
              <DivGo
                onClick={onClick_Works_Comp}
              >  
                <Div> {(() => {
                  switch (language) {
                    case 'ko': 
                      return '보러 가기';
                    case 'ja': 
                      return '見に行く';
                    default: // eng
                      return 'View';
                  }
                })()} </Div>
                <IconAngleRight width={"20px"} height={"20px"} color={"COLOR_normal"}  />
              </DivGo>
            </DivB>
          </DivRow>
          
          
          <DivRow>
            <DivA> <IconFile width={"50px"} height={"50px"} color={"color_very_weak"} /> </DivA>
            <DivB>  
              <Div> {(() => {
              switch (language) {
                case 'ko': 
                  return '팀 나누기';
                case 'ja': 
                  return 'チーム分け';
                default: // eng
                  return 'Team Planner';
              }
            })()}  </Div>
              
              <DivGo
                onClick={onClick_Works_PlanTeam}
              >  
                <Div> {(() => {
                  switch (language) {
                    case 'ko': 
                      return '보러 가기';
                    case 'ja': 
                      return '見に行く';
                    default: // eng
                      return 'View';
                  }
                })()} </Div>
                <IconAngleRight width={"20px"} height={"20px"} color={"COLOR_normal"}  />
              </DivGo>
            </DivB>
          </DivRow>
        
        </DivTable>
        
      </Div>
      
      
      
      
      
      
      <Div>
      
        <DivTitle> 
          {(() => {
              switch (language) {
                case 'ko': 
                  return '반응';
                case 'ja': 
                  return 'リアクション';
                default: // eng
                  return 'Reactions';
              }
            })()} 
        </DivTitle>
        
        
        <DivTable> 
        
          <DivRow>
            <DivA> <IconComment width={"46px"} height={"46px"} color={"color_very_weak"} /> </DivA>
            <DivB>  
              <Div> {(() => {
                switch (language) {
                  case 'ko': 
                    return '댓글';
                  case 'ja': 
                    return 'コメント';
                  default: // eng
                    return 'Comments';
                }
              })()}  </Div>
              
              <DivGo
                onClick={onClick_Comment_Comp}
              >  
                <Div> {(() => {
                  switch (language) {
                    case 'ko': 
                      return '보러 가기';
                    case 'ja': 
                      return '見に行く';
                    default: // eng
                      return 'View';
                  }
                })()} </Div>
                <IconAngleRight width={"20px"} height={"20px"} color={"COLOR_normal"}  />
              </DivGo>
            </DivB>
          </DivRow>
          
          
          <DivRow>
            <DivA> <IconVideo width={"46px"} height={"46px"} color={"color_very_weak"} /> </DivA>
            <DivB>  
              <Div> {(() => {
                switch (language) {
                  case 'ko': 
                    return '동영상';
                  case 'ja': 
                    return '動画';
                  default: // eng
                    return 'Videos';
                }
              })()}  </Div>
              
              <DivGo
                onClick={onClick_Video_Comp}
              >  
                <Div> {(() => {
                  switch (language) {
                    case 'ko': 
                      return '보러 가기';
                    case 'ja': 
                      return '見に行く';
                    default: // eng
                      return 'View';
                  }
                })()} </Div>
                <IconAngleRight width={"20px"} height={"20px"} color={"COLOR_normal"}  />
              </DivGo>
            </DivB>
          </DivRow>
        
        </DivTable>
        
      </Div>
      
      
      <Div>
      
        <DivTitle> 
          {(() => {
              switch (language) {
                case 'ko': 
                  return '좋아요';
                case 'ja': 
                  return 'いいね';
                default: // eng
                  return 'Likes';
              }
            })()} 
        </DivTitle>
        
        
        <DivTable> 
          <DivRow>
            <DivC> 
            
              
              <DivGoLikes
                onClick={onClick_Likes_Comp}
              >   
                <Div> <IconShapesRegular width={"24px"} height={"24px"} color={"COLOR_normal"} />  </Div> 
                <Div>{(() => {
                  switch (language) {
                    case 'ko': 
                      return '영웅 조합';
                    case 'ja': 
                      return 'ヒーロー構成';
                    default: // eng
                      return 'Compositions';
                  }
                })()} </Div>
                
                <Div> <IconAngleRight width={"20px"} height={"20px"} color={"COLOR_normal"}  /> </Div> 
              </DivGoLikes>
              
              
              
              <DivGoLikes
                onClick={onClick_Likes_Comment}
              >   
                <Div> <IconComment width={"22px"} height={"22px"} color={"COLOR_normal"} />  </Div> 
                <Div> {(() => {
                  switch (language) {
                    case 'ko': 
                      return '댓글';
                    case 'ja': 
                      return 'コメント';
                    default: // eng
                      return 'Comments';
                  }
                })()} </Div>
               
                <Div> <IconAngleRight width={"20px"} height={"20px"} color={"COLOR_normal"}  /> </Div> 
              </DivGoLikes>
              
              
              <DivGoLikes
                onClick={onClick_Likes_Video}
              >   
                <Div> <IconVideo width={"24px"} height={"24px"} color={"COLOR_normal"} /> </Div> 
                
                <Div> {(() => {
                  switch (language) {
                    case 'ko': 
                      return '동영상';
                    case 'ja': 
                      return '動画';
                    default: // eng
                      return 'Videos';
                  }
                })()}  </Div>
                
                <Div> <IconAngleRight width={"20px"} height={"20px"} color={"COLOR_normal"}  /> </Div> 
              </DivGoLikes>
            
            
            </DivC>
          </DivRow>
        </DivTable>
        
      </Div>
      
      
  	 </DivLibrary>
      
      
    
    )
    }
  

    
} //TeamPlanner



function mapStateToProps(state) { 
  return {
    
    user: state.auth.user
    , readyUser: state.basic.ready.user
    , loadingUser: state.basic.loading.user
    
    , language: state.basic.language
    
  }; 
} 

function mapDispatchToProps(dispatch) { 
  return { 
    
    replacePlanTeam: (newPlanTeam) => dispatch( replacePlanTeam(newPlanTeam) ) 
    , replaceData2: (which1, which2, replacement) => dispatch(replaceData2(which1, which2, replacement))
    

    , addDeleteNotification: (code_situation, language, message, time) => dispatch(  addDeleteNotification(code_situation, language, message, time) )
    
  }; 
}

// 컴포넌트에서 redux의 state, dispatch 를 일부분 골라서 이용가능하게 된다
export default connect(mapStateToProps, mapDispatchToProps)(Library);
