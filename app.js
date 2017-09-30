const express = require('express')
const app = express()

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db');

app.set('view engine', 'ejs')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/contacts', (req, res)=>{
  db.all(`SELECT * FROM contacts`, (err, rows)=>{
    // res.send(rows)
    res.render('contacts', {dataContacts : rows})
  })
})

app.post('/contacts', (req, res)=>{
  db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${req.body.name}','${req.body.company}','${req.body.telp_number}', '${req.body.email}')`,() =>{
    res.redirect('/contacts')
  })
})

app.get('/contacts/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM contacts WHERE id = ${req.params.id}`, (err, rows)=>{
    // res.send(rows)
    res.render('contactsedit', {dataContacts : rows})
  })
})

app.post('/contacts/edit/:id', (req, res) => {
  db.run(`UPDATE contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email='${req.body.email}'
     WHERE id = ${req.params.id}`, () => {
     res.redirect('/contacts');
   })
})

app.get('/contacts/delete/:id', (req, res)=>{
  db.run(`DELETE FROM contacts WHERE id = ${req.params.id}`,
  ()=>{
    res.redirect('/contacts')
  })
})

app.get('/groups', (req, res)=>{
  db.all(`SELECT * FROM groups`, (err, rows)=>{
    // res.send(rows)
    res.render('groups', {dataGroups : rows})
  })
})

app.post('/groups', (req, res)=>{
  db.run(`INSERT INTO groups (name_of_group) VALUES ('${req.body.name_of_group}')`,() =>{
    res.redirect('/groups')
  })
})

app.get('/groups/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM groups WHERE id = ${req.params.id}`, (err, rows)=>{
    // res.send(rows)
    res.render('groupsedit', {dataGroups : rows})
  })
})

app.post('/groups/edit/:id', (req, res) => {
  db.run(`UPDATE groups SET name_of_group = '${req.body.name_of_group}'
     WHERE id = ${req.params.id}`, () => {
     res.redirect('/groups');
   })
})

app.get('/groups/delete/:id', (req, res)=>{
  db.run(`DELETE FROM groups WHERE id = ${req.params.id}`,
  ()=>{
    res.redirect('/groups')
  })
})

app.get('/profile', (req, res)=>{
  db.all(`SELECT * FROM profile`, (err, rows)=>{
    // res.send(rows)
    res.render('profile', {dataProfile : rows})
  })
})

app.post('/profile', (req, res)=>{
  db.run(`INSERT INTO profile (username, password) VALUES ('${req.body.username}','${req.body.password}')`,() =>{
    res.redirect('/profile')
  })
})

app.get('/profile/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM profile WHERE id = ${req.params.id}`, (err, rows)=>{
    // res.send(rows)
    res.render('profileEdit', {dataProfile : rows})
  })
})

app.post('/profile/edit/:id', (req, res) => {
  db.run(`UPDATE profile SET username = '${req.body.username}', password = '${req.body.password}'
     WHERE id = ${req.params.id}`, () => {
     res.redirect('/profile');
   })
})

app.get('/profile/delete/:id', (req, res)=>{
  db.run(`DELETE FROM profile WHERE id = ${req.params.id}`,
  ()=>{
    res.redirect('/profile')
  })
})

app.get('/addresses', (req, res)=>{
  db.all(`SELECT * FROM addresses`, (err, rows)=>{
    // res.send(rows)
    res.render('addresses', {dataAddress : rows})
  })
})

app.post('/addresses', (req, res)=>{
  db.run(`INSERT INTO addresses (street, city, zipcode) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}')`,() =>{
    res.redirect('/addresses')
  })
})

app.get('/addresses/edit/:id', (req, res)=>{
  db.all(`SELECT * FROM addresses WHERE id = ${req.params.id}`, (err, rows)=>{
    // res.send(rows)
    res.render('addressesEdit', {dataAddress : rows})
  })
})

app.post('/addresses/edit/:id', (req, res) => {
  db.run(`UPDATE addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}'
     WHERE id = ${req.params.id}`, () => {
     res.redirect('/addresses');
   })
})

app.get('/addresses/delete/:id', (req, res)=>{
  db.run(`DELETE FROM addresses WHERE id = ${req.params.id}`,
  ()=>{
    res.redirect('/addresses')
  })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
