import React from 'react';
import styled from 'styled-components';

import themes from "../../styles/themes"
import { connect } from "react-redux";
import {Div} from '../../styles/DefaultStyles';


const DivContainer = styled(Div)`
	
`;


const IconMagic = ({width, height, themeName}) => {
	
	return (
		
	<DivContainer style= {{ width: `${width}`, height:`${height}` }} >
		<svg 
			
			className="icon magic"
			xmlns="http://www.w3.org/2000/svg" 
			
			
			width="100%"
			height="100%"
			viewBox="0 0 512 512"
			
			fill={ themes[themeName]["color_active"] }
			>
			
			<path 
	d="M497.94 76.28l-62.22-62.22C426.34 4.69 414.06 0 401.78 0c-12.29 0-24.57 4.69-33.94 14.06L14.06 367.84c-18.75 18.75-18.75 49.14 0 67.88l62.22 62.22c9.37 9.37 21.66 14.06 33.94 14.06 12.28 0 24.57-4.69 33.94-14.06l353.77-353.78c18.76-18.74 18.76-49.13.01-67.88zM110.23 464L48 401.78l223.9-223.93 62.24 62.24L110.23 464zm257.85-257.86l-62.24-62.24L401.73 48h.05L464 110.22l-95.92 95.92zM432 288l-26.66 53.33L352 368l53.34 26.67L432 448l26.66-53.33L512 368l-53.34-26.67L432 288zM224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.66-53.33L160 80l-53.34-26.67L80 0 53.34 53.33 0 80l53.34 26.67L80 160z">
			</path>
				
		</svg>
	</DivContainer>
	)
	}

function mapStateToProps(state) { 
  return { 
    themeName: state.basic.themeName
  }; 
} 

/*
function mapDispatchToProps(dispatch) { 
  return { 
    readPlanTeam: (idPlanTeam) => dispatch(readPlanTeam(idPlanTeam)) 
  }; 
}
*/

export default connect(mapStateToProps)(IconMagic);