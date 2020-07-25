import React from 'react';
import styled from 'styled-components';

import themes from "../../styles/themes"
import { connect } from "react-redux";
import {Div} from '../../styles/DefaultStyles';


const DivContainer = styled(Div)`
	
`;

// w:h = 3:4 = 6:8
const IconMeleeAssassin = ({width, height, color="color_very_weak", themeName}) => {
	
	return (
		
	<DivContainer style= {{ width: `${width}`, height:`${height}` }} >
		<svg 
			
			className="icon"
			xmlns="http://www.w3.org/2000/svg" 
			
			
			width="100%"
			height="100%"
			viewBox="0 0 384 512"
			
			fill={ themes[themeName][color] }
			>
			
			<path 
	d="M336 128H224V16c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v112H48c-26.51 0-48 21.49-48 48s21.49 48 48 48c20.87 0 38.45-13.4 45.06-32h197.88c6.61 18.6 24.19 32 45.06 32 26.51 0 48-21.49 48-48s-21.49-48-48-48zM128 428.84l50.69 76.03c6.33 9.5 20.29 9.5 26.63 0L256 428.84V224H128v204.84z">
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

export default connect(mapStateToProps)(IconMeleeAssassin);