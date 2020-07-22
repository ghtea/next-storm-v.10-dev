import styled, {createGlobalStyle} from 'styled-components';



 export const GlobalStyle = createGlobalStyle`
 
 
  html, body, #root {
  
    
    
    background-color: ${props => props.theme.COLOR_bg};
    color: ${props => props.theme.color_normal};
    
    font-family: 'Noto Sans KR', 'Noto Sans JP', sans-serif;
    font-size: 16px;
    
    width: 100%;
    height: 100%;
    min-width: 300px !important;
    
    /*height: 100%;*/
    /* 이상하게 위의 heigth 100% 는 나중에 쓰여지는 css에 의해서 묻혀지지 않는다 !important를 써도... */
    
    margin:0;
    padding:0;
    
  }
  
  
  
  /* layout */
  #root {
   
   
  }
  
 
 @media (max-width: ${props => (props.theme.media.mid_big -1) }px ) {
  #root {
  
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
    
  }
 }
 

 @media (min-width:  ${props => (props.theme.media.mid_big) }px) {
  #root {
  
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  
  }
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
 flex-direction: row;
 justify-content: center;
 align-items: center;
  
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
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
    
  color: ${props => props.theme.color_strong};
  background-color: ${props => props.theme.COLOR_normal};
  
  /*font-weight: normal;  */
 
	 cursor: pointer;
	
  border: 0;
		font-size: 1rem;
		
		width: auto;
		height: auto;
		
		box-sizing: border-box;
		
	
`

export const Input = styled.input`

 color: ${props => props.theme.color_strong};
 background-color: ${props => props.theme.COLOR_normal};
 width: 100%;
 font-size: 1rem;
 border: 0;
 
 padding-left: 10px;
 box-sizing: border-box;
 
 &::placeholder {
  color: ${props => props.theme.color_weak} !important;
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

