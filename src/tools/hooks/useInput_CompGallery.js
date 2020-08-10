import React, {useState} from 'react';
import {replaceDataCompGallery, replaceData2CompGallery} from "../../redux/actions/comp_gallery";



const useInput_CompGallery = (initialValue, which) => {
	const [value, setValue] = useState(initialValue);
	const onChange = event => {
		console.log(event.target.value)
		setValue(event.target.value);
		replaceData2CompGallery("create", which, event.target.value);
	}
	return {value, setValue, onChange};
}

export default useInput_CompGallery;