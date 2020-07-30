
var axios     = require('axios');


const createBook = async () => {
	
  await axios.post('https://ahr.avantwing.com/books', 
	    {
			  title: 'kkkk',
			  author: 'me'
			}
	)
	
}



createBook();