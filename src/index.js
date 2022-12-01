const server = require('./server');
require('dotenv').config();



const { PORT } = process.env ; 

async function onListening() {
  console.log(`Listening on port ${PORT}`);
}

//port the server is listening on
server.listen(PORT, onListening);


