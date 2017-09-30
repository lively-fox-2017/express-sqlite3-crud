const express = require('express')
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db');

app.set('view engine', 'ejs');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//index
app.get('/', (req, res)=> {
  res.render('index');
});

//contacts
app.get('/contacts', (req, res)=> {
  db.all(`SELECT * FROM contacts`, (err, rows) => {
    res.render('contacts', {data: rows, title: 'Halaman Contact'})
  });
});

app.post('/contacts', (req, res) => {
  db.run(`INSERT INTO contacts (name, email, telp) VALUES ('${req.body.name}',
  '${req.body.company}','${req.body.email}', '${req.body.telp}')`, () => {
    res.redirect('/contacts');
  });
});

app.get('/contacts/edit/:id', (req, res)=> {
  db.all(`SELECT * FROM contacts WHERE id = ${req.params.id}`, (err, rows) => {
    res.render('editcontacts', {data: rows, title: 'Halaman Contacts Edit'});
  });
});

app.post('/contacts/edit/:id', (req, res) => {
  var data ={
    $name : `${req.body.name}`,
    $company: `${req.body.company}`,
    $email : `${req.body.email}`,
    $telp : `${req.body.telp}`
  };

  var sql = `UPDATE contacts SET name = $name, company = $company, email = $email, telp = $telp
             WHERE id = $id`;
  db.run(sql, data, (err) => {
  });
  res.redirect('/contacts')
});

app.get('/contacts/delete/:id', (req, res)=>{
  db.run(`DELETE FROM contacts WHERE id = ${req.params.id}`, () =>{
    res.redirect('contacts');
  });
});

//groups
app.get('/groups', (req, res)=> {
  db.all(`SELECT * FROM groups`, (err, rows) => {
    res.render('groups', {data: rows});
  });
});

app.post('/groups', (req, res)=> {
  db.run(`INSERT INTO groups (name_groups) VALUES ('${req.body.name_groups}')`, ()=>{
    res.redirect('/groups');
  });
});

app.get('/groups/edit/:id/', (req, res)=>{
  db.all(`SELECT * FROM groups WHERE id = ${req.params.id}`, (err, rows)=>{
    res.render('editgroups', {data: rows});
  });
});

app.post('/groups/edit/:id/', (req, res)=>{
  var data = [`${req.body.name_groups}`, `${req.params.id}`];
  var sql = `UPDATE groups SET name_groups = ? WHERE id = ?`;
  db.run(sql, data, (err)=> {
  });
  res.redirect('/groups');
});

app.get('/groups/delete/:id/', (req, res)=>{
  db.run(`DELETE FROM groups WHERE id = ${req.params.id}`, ()=>{
    res.redirect('/groups');
  });
});

//PORT LOCALHOST
app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
