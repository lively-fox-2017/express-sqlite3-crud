const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

// SET VIEW ENGINE
app.set('view engine', 'ejs')

// SET BODY PARSER JSON
app.use(bodyParser.urlencoded( {extended: true} ))
app.use(bodyParser.json())

// SET PATH FOR PUBLIC FORDER
app.use(express.static(path.join(__dirname, 'public')));

// SET VARIABEL CALLING ROUTING
const index = require('./routes/index.js')
const contacts = require('./routes/contacts.js')

app.use('/', index)
app.use('/contacts', contacts)


// SET PORT USING 3000!
app.listen('3000', function() {
    console.log('ONLINE USING PORT 3000!');
})
