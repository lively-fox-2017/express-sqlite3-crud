const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('db/database.db');
let Contact = require('./models/contacts')
let Group = require('./models/groups')
let Profile = require('./models/profiles')
let Address = require('./models/addresses')

//
//
// let index = require('./routes/index.js')
// let contacts = require('./routes/contacts.js');
// let groups = require('./routes/groups.js');
// let addresses = require('./routes/addresses.js');
// let profile = require('./routes/profiles.js');
//
// app.use('/',index);
// app.use('/contacts',contacts);
// app.use('/groups',groups);
// app.use('/addresses',addresses);
// app.use('/profiles',profile);




app.get('/', function(req, res) {
  res.render('index');
})
// ===============CONTACTS================
//1.View Contacts
app.get('/contacts', function(req, res) {
  Contact.viewContacts(function(err,rows) {
    res.render('contacts',{dataContacts:rows})
    })
})
//2.Add Contacts
app.post("/contacts",function(req,res){
  Contact.addContacts(req.body, function(){
    res.redirect("/contacts")
  })
})
//3.Delete Contacts
app.get("/contacts/delete/:id",function(req,res){
  Contact.deleteContacts(req.params, function(){
    res.redirect("/contacts")
  })
})
// 4.Edit Contacts (MAINTENANCE)
// app.get("/contacts/edit/:id",function(req,res){
//   Contact.geteditContacts(req.params,function(err,rows){
//     res.render('contacts_edit',{dataContacts:rows})
//   })
// })

app.get('/contacts/edit/:id', function(req,res){
  db.all(`SELECT * FROM contacts where id=${req.params.id}`,function(err,rows){
    res.render('contacts_edit', {data: rows[0]})
  })
})

app.post('/contacts/edit/:id', (req, res) => {
  db.run(`UPDATE contacts SET name='${req.body.name}', company='${req.body.company}', telp_number='${req.body.telp_number}', email='${req.body.email}' WHERE id='${req.params.id}'`)
  res.redirect('/contacts')
})

// ================GROUPS===================
//1.View Groups
app.get('/groups', function(req, res) {
  Group.viewGroups(function(err,rows) {
    res.render('groups',{dataGroups:rows});
  })
})
//2.Add Groups
app.post("/groups",function(req,res){
  Group.addGroups(req.body, function(){
    res.redirect("/groups")
  })
})
//3.Delete Contacts
app.get("/groups/delete/:id",function(req,res){
  Group.deleteGroups(req.params, function(){
    res.redirect("/groups")
  })
})

app.get('/groups/edit/:id', function(req,res){
  db.all(`SELECT * FROM groups where id=${req.params.id}`,function(err,rows){
    res.render('groups_edit', {data: rows[0]})
  })
})

app.post('/groups/edit/:id',function(req,res) {
  db.run(`UPDATE groups SET name_of_group='${req.body.name_of_group}' WHERE id='${req.params.id}'`)
  res.redirect("/groups")
})


// ================PROFILE===================
//1.View Profiles
app.get('/profiles', function(req, res) {
  Profile.viewProfiles(function(err,rows){
    res.render('profiles',{dataProfiles:rows});
  })
})
//2.Add Profiles
app.post("/profiles",function(req,res){
  Profile.addProfile(req.body, function(){
    res.redirect("/profiles")
  })
})
// 3.Delete Profiles
app.get("/profiles/delete/:id",function(req,res){
  Profile.deleteProfile(req.params, function(){
    res.redirect("/profiles")
  })
})

app.get('/profiles/edit/:id', function(req,res){
  db.all(`SELECT * FROM profile where id=${req.params.id}`,function(err,rows){
    res.render('profiles_edit', {data: rows[0]})
  })
})

app.post('/profiles/edit/:id',function(req,res) {
  db.run(`UPDATE profile SET username='${req.body.username}',password='${req.body.password}' WHERE id='${req.params.id}'`)
  res.redirect("/profiles")
})

// ================ADDRESSES===================
app.get('/addresses', function(req, res) {
  Address.viewAddresses(function(err,rows){
    res.render('addresses',{dataAddresses:rows});
  })
})

app.post('/addresses',function(req,res){
  Address.addAddresses(req.body,function(){
    res.redirect("/addresses")
  })
})

app.get('/addresses/delete/:id',function(req,res){
  Address.deleteAddresses(req.params,function(){
    res.redirect("/addresses")
  })
})

app.get('/addresses/edit/:id', function(req,res){
  db.all(`SELECT * FROM addresses where id=${req.params.id}`,function(err,rows){
    res.render('addresses_edit', {data: rows[0]})
  })
})

app.post('/addresses/edit/:id',function(req,res) {
  db.run(`UPDATE addresses SET street='${req.body.street}',city='${req.body.city}',zipcode='${req.body.zipcode}' WHERE id='${req.params.id}'`)
  res.redirect("/addresses")
})


app.listen(3000, function() {
  console.log('Sudah terhubung ke Port 3000')
})
