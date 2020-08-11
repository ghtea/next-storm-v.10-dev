import basic from './borders/basic';
import tier from './borders/tier';
import limited from './borders/limited';

const borders ={
	...basic
	, ...tier
	, ...limited
}

export default borders;