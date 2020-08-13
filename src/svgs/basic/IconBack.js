import React from 'react';
import styled from 'styled-components';

import themes from "../../styles/themes"
import { connect } from "react-redux";
import {Div} from '../../styles/DefaultStyles';


const DivContainer = styled(Div)`
	
`;


const IconBack = ({width, height, color="color_weak", themeName}) => {
	
	return (
		
	<DivContainer style= {{ width: `${width}`, height:`${height}` }} >
		<svg 
			
			className="icon usingHover Info"
			xmlns="http://www.w3.org/2000/svg" 
			
			
			width="100%"
			height="100%"
			viewBox="0 0 448 512"
			
			fill={ themes[themeName][color] }
			>
			
			<path 
d="M448 208v96c0 13.3-10.7 24-24 24H224v103.8c0 21.4-25.8 32.1-41 17L7 273c-9.4-9.4-9.4-24.6 0-34L183 63.3c15.1-15.1 41-4.4 41 17V184h200c13.3 0 24 10.7 24 24z">
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

export default connect(mapStateToProps)(IconBack);