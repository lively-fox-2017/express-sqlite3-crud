var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.set('view engine', 'ejs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/contacts', (req, res) => {
  db.all('SELECT * from contacts',(err,data)=>{
    if (!err) {
      // res.send(data)
      res.render('contacts',{data:data})
    } else {
      res.send(err)
    }
  });
})

app.post('/contacts', (req, res) => {
  db.run(`INSERT INTO contacts (name,company,telp_number,email) VALUES ('${req.body.name}','${req.body.company}',
        '${req.body.telp_number}','${req.body.email}')`,(err)=>{
    if (!err) {
      res.redirect('/contacts');
    } else {
      res.send(err)
    }
  });
})
app.get('/contacts/delete/:id', (req, res) => {
  db.run(`DELETE FROM contacts WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/contacts');
    } else {
      res.send(err)
    }
  });
})
app.get('/contacts/edit/:id', (req, res) => {
  db.each(`SELECT * FROM contacts WHERE id=${req.params.id}`,(err,data)=>{
    if (!err) {
      // res.send(data)
      res.render('contacts_edit',{data:data});
    } else {
      res.send(err)
    }
  });
})
app.post('/contacts/edit/:id', (req, res) => {
  db.run(`UPDATE contacts SET name='${req.body.name}',company='${req.body.company}',telp_number='${req.body.telp_number}',email='${req.body.email}' WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/contacts');
    } else {
      res.send(err)
    }
  });
})

//groups
app.get('/groups', (req, res) => {
  db.all('SELECT * from groups',(err,data)=>{
    if (!err) {
      // res.send(data)
      res.render('groups',{data:data})
    } else {
      res.send(err)
    }
  });
})

app.post('/groups', (req, res) => {
  db.run(`INSERT INTO groups (name) VALUES ('${req.body.name}')`,(err)=>{
    if (!err) {
      res.redirect('/groups');
    } else {
      res.send(err)
    }
  });
})
app.get('/groups/delete/:id', (req, res) => {
  db.run(`DELETE FROM groups WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/groups');
    } else {
      res.send(err)
    }
  });
})
app.get('/groups/edit/:id', (req, res) => {
  db.each(`SELECT * FROM groups WHERE id=${req.params.id}`,(err,data)=>{
    if (!err) {
      // res.send(data)
      res.render('groups_edit',{data:data});
    } else {
      res.send(err)
    }
  });
})
app.post('/groups/edit/:id', (req, res) => {
  db.run(`UPDATE groups SET name='${req.body.name}' WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/groups');
    } else {
      res.send(err)
    }
  });
})

//addresses
app.get('/addresses', (req, res) => {
  db.all('SELECT * from addresses',(err,data)=>{
    if (!err) {
      // res.send(data)
      res.render('addresses',{data:data})
    } else {
      res.send(err)
    }
  });
})

app.post('/addresses', (req, res) => {
  db.run(`INSERT INTO addresses (street,city,zipcode) VALUES ('${req.body.street}','${req.body.city}',${req.body.zipcode})`,(err)=>{
    if (!err) {
      res.redirect('/addresses');
    } else {
      res.send(err)
    }
  });
})
app.get('/addresses/delete/:id', (req, res) => {
  db.run(`DELETE FROM addresses WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/addresses');
    } else {
      res.send(err)
    }
  });
})
app.get('/addresses/edit/:id', (req, res) => {
  db.each(`SELECT * FROM addresses WHERE id=${req.params.id}`,(err,data)=>{
    if (!err) {
      // res.send(data)
      res.render('addresses_edit',{data:data});
    } else {
      res.send(err)
    }
  });
})
app.post('/addresses/edit/:id', (req, res) => {
  db.run(`UPDATE addresses SET street='${req.body.street}',city='${req.body.city}',zipcode=${req.body.zipcode} WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/profiles');
    } else {
      res.send(err)
    }
  });
})

//addresses
app.get('/profiles', (req, res) => {
  db.all('SELECT * from profiles',(err,data)=>{
    if (!err) {
      // res.send(data)
      res.render('profiles',{data:data})
    } else {
      res.send(err)
    }
  });
})

app.post('/profiles', (req, res) => {
  db.run(`INSERT INTO profiles (username,password) VALUES ('${req.body.username}','${req.body.password}')`,(err)=>{
    if (!err) {
      res.redirect('/profiles');
    } else {
      res.send(err)
    }
  });
})
app.get('/profiles/delete/:id', (req, res) => {
  db.run(`DELETE FROM profiles WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/profiles');
    } else {
      res.send(err)
    }
  });
})
app.get('/profiles/edit/:id', (req, res) => {
  db.each(`SELECT * FROM profiles WHERE id=${req.params.id}`,(err,data)=>{
    if (!err) {
      // res.send(data)
      res.render('profiles_edit',{data:data});
    } else {
      res.send(err)
    }
  });
})
app.post('/profiles/edit/:id', (req, res) => {
  db.run(`UPDATE profiles SET username='${req.body.username}',password='${req.body.password}' WHERE id=${req.params.id}`,(err)=>{
    if (!err) {
      res.redirect('/profiles');
    } else {
      res.send(err)
    }
  });
})
app.listen(3000,()=>{
  console.log('app listen on port 3000');
})
