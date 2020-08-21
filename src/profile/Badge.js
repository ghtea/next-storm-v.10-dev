import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import {Div} from '../styles/DefaultStyles';
import BadgeTier from './badges/BadgeTier';



const Badge = ({
	
	badge
	
}) => {
	
	const listTier = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master"];
	
	if ( listTier.includes(badge) ) {
		return (
			<BadgeTier 
				badge={badge}
				width={'18px'}
				height={'18px'}
			/>
			)
	}
	
	else {
		return (
			<Div> </Div>
			)
	}
}
	
export default Badge;