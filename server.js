const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const config = require('config');
const dbConnection = require('./dbConnection/db');
require('dotenv').config();
PORT = process.env.PORT || 5000;
dbConnection();

const corsOptions = {
	origin: 'https://eventmanager20.herokuapp.com',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	exposedHeaders: 'x-auth-user',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('tiny'));
// app.get('/', (req, res) => {
// 	res.send('hi');
// });

app.use('/api/customer', require('./route/customer'));
app.use('/api/catagory', require('./route/catagory'));
app.use('/api/event', require('./route/event'));
// app.use('/api/user', require('./route/user'));
app.use('/api/admin', require('./route/admin'));
app.use('/api/auth', require('./route/auth'));
app.listen(PORT, console.log(`Server Connected on Port ${PORT}`));
