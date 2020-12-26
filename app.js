const express = require('express')
const app = express()
const morgan = require('morgan')
const { db } = require('./db')
require('dotenv').config({ path: "./.env" })
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.set('port', process.env.PORT || 4000)

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
const product = require('./src/routes/product')


//settings

const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "localhost:3000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        } 
    }
}


app.use(cors(
    config.application.cors.server
  ));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', true);



//middlewares 
app.use(morgan('dev'))


//routes
app.use('/user', user)
app.use('/product', product)

// starting the server
app.listen( app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})