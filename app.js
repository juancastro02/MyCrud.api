const express = require('express')
const app = express()
const morgan = require('morgan')
const { db } = require('./db')
require('dotenv').config({ path: "./.env" })
const cookieParser = require('cookie-parser');
const cors = require('cors');


// connection with database 
db.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected to database');
})

//importing routes
const user = require('./src/routes/user')



//settings
app.set('port', process.env.PORT || 3000)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', true);
app.set(cors())


//middlewares 
app.use(morgan('dev'))


//routes
app.use('/user', user)

// starting the server
app.listen( app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})