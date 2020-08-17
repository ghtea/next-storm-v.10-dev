import styled, {createGlobalStyle} from 'styled-components';
import { Link, NavLink } from 'react-router-dom';



 export const GlobalStyle = createGlobalStyle`

 /* strong, span, */
 
 html,body,div,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,
 samp,small,strike,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,
 fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video 
{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-shrink: 0;
    flex-grow: 0;
  }

  html, body, #root {

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-shrink: 0;
    flex-grow: 0;
    
    background-color: ${props => props.theme.COLOR_bg};
    color: ${props => props.theme.color_normal};
    
    font-family: 'Noto Sans KR', 'Noto Sans JP', sans-serif;
    font-size: 16px;
    
    width: 100%;
    min-width: 360px !important;
    
    height: 100vh;
    
    /* ?? 잘모르겠다..... height:100% 은 안된다!, 기본적으로 auto 로 하고, 중간에서 고정값을 부여하고 그 아래에서부터 100% 등 사용하자! */
    /* 이상하게 위의 heigth 100% 는 나중에 쓰여지는 css에 의해서 묻혀지지 않는다 !important를 써도... */
    
    margin:0;
    padding:0;
    
  }
  
  body::-webkit-scrollbar, div::-webkit-scrollbar {
    width: 12px;               /* width of the entire scrollbar */
    height: 12px; 
  }
  
  body::-webkit-scrollbar-track, div::-webkit-scrollbar-track {
    background-color: ${props => props.theme.color_very_weak};        /* color of the tracking area */
    /*border: 2px solid ${props => props.theme.COLOR_middle};  */
  }
  
  body::-webkit-scrollbar-thumb, div::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.COLOR_normal};     /* color of the scroll thumb */
    /* border-radius: 4px;       roundness of the scroll thumb */
    border: 1px solid ${props => props.theme.color_very_weak};  
  }
    
  /* layout */
  #root {
   
   
  }
  
  
  
 table, caption, tbody, tfoot, thead, tr, th, td {
  display: block; 
  
  width: 100%;
  
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
 }
 
 
 /* because of svg */
 .icon.usingHover:hover {
   //fill: ${props => (props.theme.color_weak) };
   cursor: pointer;
 }
 
 /* message UI */
 .error {
  background-color: ${props => props.theme.COLOR_error};
  color: ${props => props.theme.color_error};
 }
 
 .success {
  background-color: ${props => props.theme.COLOR_success};
  color: ${props => props.theme.color_success};
 }
 
 .warning {
  background-color: ${props => props.theme.COLOR_warning};
  color: ${props => props.theme.color_warning};
 }
 
 .tip {
  background-color: ${props => props.theme.COLOR_tip};
  color: ${props => props.theme.color_tip};
 }
 
 
 
 
 
 /* it's pressure to browser :(
 html, body, div, button, a, input, p, span {
  transition: background-color 0.5s linear; // when light/dark mode changes
  transition: color 0.5s linear; // when light/dark mode changes 
 } */
`


export const Div = styled.div`
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 
 flex-shrink: 0;
 flex-grow: 0;
  
 width: 100%;
 /*height: 100%;*/
    /* 이상하게 위의 heigth 100% 는 나중에 쓰여지는 css에 의해서 묻혀지지 않는다 !important를 써도... */
    
 box-sizing: border-box;
`

// https://stackoverflow.com/questions/12991351/css-force-image-resize-and-keep-aspect-ratio
export const Img = styled.img`
 object-fit: cover;
 width: 100%;
`


 export const Button = styled.button`
  
  font-size: 1rem;
  
  width: auto;
  height: 2.4rem;
  
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 0.8rem;
  padding-left: 0.8rem;
  
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  margin-right: 0.3rem;
  margin-left: 0.3rem;
  
  border-radius: 0.5rem;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  flex-shrink: 0;
  flex-grow: 0;
    
  color: ${props => props.theme.color_strong};
  background-color: ${props => props.theme.COLOR_normal};
  
  
  /* working, https://webisfree.com/2019-02-08/[css]-outline%EC%9D%84-%EB%91%A5%EA%B8%80%EA%B2%8C-%ED%91%9C%ED%98%84%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95%EC%9D%80-radius */
  
  
  border: 0;
  /*border: 2px solid transparent;*/
  
  &:focus, &:active {
   outline: none;
   /*border: 2px solid ${props => props.theme.color_weak};*/
  }
  
  
  cursor: pointer;

  box-sizing: border-box;

`

export const Input = styled.input`

color: ${props => props.theme.color_strong};
background-color: ${props => props.theme.COLOR_normal};

width: auto;
height: 2.4rem;

font-size: 1rem;

padding-right: 0.8rem;
padding-left: 0.8rem;

margin-top: 5px;
margin-bottom: 5px;
margin-right: 2px;
margin-left: 2px;

border-radius: 0.5rem;
box-sizing: border-box;

&::placeholder {
 color: ${props => props.theme.color_weak} !important;
}

border: 2px solid transparent;
  
  &:focus, &:active {
   outline: none;
   border: 2px solid ${props => props.theme.color_weak};
  }
 
`

export const Textarea = styled.textarea`
 
 font-family: 'Noto Sans KR', 'Noto Sans JP', sans-serif;

 color: ${props => props.theme.color_strong};
 background-color: ${props => props.theme.COLOR_normal};
 width: 100%;
 font-size: 1rem;
 
 padding-left: 10px;
 box-sizing: border-box;
 
 &::placeholder {
  color: ${props => props.theme.color_weak} !important;
 }
 
 
  border: 2px solid transparent;
  &:focus, &:active {
   outline: none;
   border: 2px solid ${props => props.theme.color_weak};
  }
 
`

/*
following doesn't work...

:focus, :active {
  border-radius: 0 !important;
  padding-left: 8px !important;
  border: 2px solid ${props => props.theme.color_active} !important;
 }

*/



export const A = styled.a`
	color: ${props => props.theme.color_normal};
	text-decoration: none;
	
`

export const LinkDefault = styled(Link)`
	color: ${props => props.theme.color_normal};
	text-decoration: none;
`

export const NavLinkDefault = styled(NavLink)`
	color: ${props => props.theme.color_normal};
	text-decoration: none;
`


export const Table = styled.table`
 border-collapse: collapse !important;
 border-spacing: 0;
 
 width: 100%;
`

export const Tr = styled.tr`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
`

export const Td = styled.td`
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
`

