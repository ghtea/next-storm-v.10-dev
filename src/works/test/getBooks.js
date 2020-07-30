
var axios     = require('axios');


const getBooks = async () => {
	
  try {
    const {data} = await axios({
		  url: 'https://ahr.avantwing.com/books',
		  method: 'get'
		});
		
		console.log(data);
  } catch (error) {
    console.error(error);
  }
  
};

getBooks();