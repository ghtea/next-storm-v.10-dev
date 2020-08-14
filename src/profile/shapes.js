import person from './shapes/person';
import animal from './shapes/animal';
import limited from './shapes/limited';
import others from './shapes/others';

const shapes ={
	...person
	, ...animal
	, ...others
	
	, ...limited
}

export default shapes;