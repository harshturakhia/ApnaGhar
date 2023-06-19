require('dotenv').config();
const express = require('express')
const app = express();
const path = require('path')
const ejs = require('ejs')
const session = require('express-session')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

// const auth = require('../src/middleware/auth')

//Importing database files
const apnaGharCollection = require('../src/db/database.js');
const propertyCollection = require('../src/db/property.js')

//Routes
const routes = require('../routes/routes.js')

app.use(express.json())                                 //to accept the data in JSON format
app.use(express.urlencoded({ extended: false }))        //to decode data sent through html form
app.use(express.static('public'));
app.use(routes);
// app.use(cookieParser);

app.set('view engine', 'ejs');


// const createToken = async () => {
//     const token = await jwt.sign({ _id: '63df3f6ba7ae12ef8048ab5b' }, 'mynameisharshvipeshturakhiafromjunagadh')
//     // console.log(`Token : ${token}`);

//     const userVeri = await jwt.verify(token, 'mynameisharshvipeshturakhiafromjunagadh')
//     // console.log(userVeri);
// };
// createToken()








//Server
const port = 9898;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});