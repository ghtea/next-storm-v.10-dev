
var axios     = require('axios');

// https://stackoverflow.com/questions/26328891/push-value-to-array-if-key-does-not-exist-mongoose
const putMmr = async (battletag) => {
  
	try {
    await axios.put('https://ahr.avantwing.com/PlayerMmr', 
    
    { //req body
    	
    	filter : {
    		_id: battletag,
    	}
    
      , update: {
        
    	}
  		  
    }  // req body
    
  	) // axios.put
  }
  catch(e) { console.log(e) }
} // addNewPlayer

// $addToSet  그 리스트에 존재하지 않으면 추가


putMmr('mbcat#1703');