const server = require('./server');
require('dotenv').config();


//Database
// const {doubbleDB, moneymarketDB} = require('./database');

const { PORT } = process.env ; 

async function onListening() {
  console.log(`Listening on port ${PORT}`);
}

//port the server is listening on
server.listen(PORT, onListening);

//Test DB
// doubbleDB.authenticate()
// .then(() => console.log('db connected...'))
// .catch(err => console.log(err))

// moneymarketDB.authenticate()
// .then(() => console.log('money market db connected...'))
// .catch(err => console.log(err))

