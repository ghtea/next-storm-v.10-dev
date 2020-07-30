
var axios     = require('axios');

// https://stackoverflow.com/questions/26328891/push-value-to-array-if-key-does-not-exist-mongoose
const addNewMmr = async (battletag) => {
  
	try {
	  
	
    await axios.post('https://ahr.avantwing.com/PlayerMmr', 
    
    { //req body
    	
    	battletag : battletag  
  		  
    }  // req body
    
  	) // axios.put
  }
  catch(e) { console.log(e) }
} // addNewMmr

// $addToSet  그 리스트에 존재하지 않으면 추가


addNewMmr('mbcat#1703');