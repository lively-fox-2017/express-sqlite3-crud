const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('dtbs.db')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Home Page

app.get('/', function(req, res){
  res.render('index', {title: 'Home'})
})

// Contact Page

app.get('/contacts', function(req, res){
  db.all('SELECT * FROM Contacts', function(err, rows){
    res.render('contacts', {data: rows, title: 'Contact Page'})
  })
})

app.post('/contacts', function(req, res){
  db.run(`INSERT INTO Contacts(name, company, telp_number, email) VALUES(
    '${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}'
  )`, function(err, rows){
    res.redirect('/contacts')
  })
})

app.get('/contacts/edit/:id', function(req, res){
  db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id}`, function(err, rows){
    res.render('contactsEdit', {data: rows[0], title: 'Edit Contacts Page'})
  })
})

app.post('/contacts/edit/:id', function(req, res){
  db.run(`UPDATE Contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = ${req.params.id}`, function(err, rows){
    res.redirect('/contacts')
  })
})

app.get('/contacts/delete/:id', function(req, res){
  db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`, function(err, rows){
    res.redirect('/contacts')
  })
})

// Groups Page

app.get('/groups', function(req, res){
  db.all(`SELECT * FROM Groups`, function(err, rows){
    res.render('groups', {data: rows, title: 'Groups Page'})
  })
})

app.post('/groups', function(req, res){
  db.run(`INSERT INTO Groups(name_of_group) VALUES(
    '${req.body.nog}'
  )`, function(err, rows){
    res.redirect('/groups')
  })
})

app.get('/groups/edit/:id', function(req, res){
  db.all(`SELECT * FROM Groups WHERE id = ${req.params.id}`, function(err, rows){
    res.render('groupsEdit', {data: rows[0], title: 'Edit Groups Page'})
  })
})

app.post('/groups/edit/:id', function(req, res){
  db.run(`UPDATE Groups SET name_of_group = '${req.body.nog}' WHERE id = ${req.params.id}`, function(err, rows){
    res.redirect('/groups')
  })
})

app.get('/groups/delete/:id', function(req, res){
  db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`, function(err, rows){
    res.redirect('/groups')
  })
})

// Addresses Page

app.get('/addresses', function(req, res){
  db.all(`SELECT * FROM Addresses`, function(err, rows){
    res.render('addresses', {data: rows, title: 'Addresses Page'})
  })
})

app.post('/addresses', function(req, res){
  db.run(`INSERT INTO Addresses(street, city, zipcode) VALUES(
    '${req.body.street}',
    '${req.body.city}',
    '${req.body.zipcode}'
  )`, function(err, rows){
    res.redirect('/addresses')
  })
})

app.get('/addresses/edit/:id', function(req, res){
  db.all(`SELECT * FROM Addresses WHERE id = ${req.params.id}`, function(err, rows){
    res.render('addressesEdit', {data: rows[0], title: 'Edit Addresses Page'})
  })
})

app.post('/addresses/edit/:id', function(req, res){
  db.run(`UPDATE Addresses set street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}' WHERE id = ${req.params.id}`, function(err, rows){
    res.redirect('/addresses')
  })
})

app.get('/addresses/delete/:id', function(req, res){
  db.run(`DELETE FROM Addresses WHERE id = ${req.params.id}`, function(err, rows){
    res.redirect('/addresses')
  })
})

// Profile Page

app.get('/profile', function(req, res){
  db.all(`SELECT * FROM Profile`, function(err, rows){
    res.render('profile', {data: rows, title: 'Profile Page'})
  })
})

app.post('/profile', function(req, res){
  db.run(`INSERT INTO Profile(username, password) VALUES(
    '${req.body.user}',
    '${req.body.pass}'
  )`, function(err, rows){
    res.redirect('/profile')
  })
})

app.get('/profile/edit/:id', function(req, res){
  db.all(`SELECT * FROM Profile WHERE id = ${req.params.id}`, function(err, rows){
    res.render('profileEdit', {data: rows[0], title: 'Edit Profile Page'})
  })
})

app.post('/profile/edit/:id', function(req, res){
  db.run(`UPDATE Profile SET username = '${req.body.user}', password = '${req.body.pass}' WHERE id = ${req.params.id}`, function(err, rows){
    res.redirect('/profile')
  })
})

app.get('/profile/delete/:id', function(req, res){
  db.run(`DELETE FROM Profile WHERE id = ${req.params.id}`, function(err, rows){
    res.redirect('/profile')
  })
})

app.listen(3000, function(){
  console.log('AYO JALAN!')
})
