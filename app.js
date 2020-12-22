const express = require('express')
const app = express()
const morgan = require('morgan')
const { db } = require('./db')


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

//middlewares 
app.use(morgan('dev'))


//routes
app.use('/user', user)

// starting the server
app.listen( app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})