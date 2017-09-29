const Express = require('express');
const app = Express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('home');
})

app.get('/contacts', function(req, res){
  db.all('select * from Contacts', function(err, rows){
    res.render('contacts', {dataRows: rows});
  })
})

app.post('/contacts', function(req, res){
  if(req.body !== null){
    db.all(`insert into contacts values(null,'${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')`, function(err) {
      console.log(err);
      res.redirect('contacts')
    });
  }
})

app.get('/contacts/edit/:id', function(req, res){
  db.all(`select * from Contacts where id='${req.param('id')}'`, function(err, rows){
    console.log(rows);
    res.render('contacts_edit', {dataRows: rows});
  })
})

app.post('/contacts/edit/:id', function(req, res){
  if(req.body !== null){
    var sqlQ = "update Contacts set ";
    sqlQ += "name = '" + req.body.name +"', "
    sqlQ += "company = '" + req.body.company +"', "
    sqlQ += "telp_number = '" + req.body.telp_number +"', "
    sqlQ += "email = '" + req.body.email +"' "
    sqlQ += "where id='" + req.param('id') + "'";
    db.all(sqlQ, function(err) {
      console.log(err);
      res.redirect('../../contacts')
    });
  }
})

app.get('/contacts/delete/:id', function(req, res){
  db.all(`delete from Contacts where id='${req.param('id')}'`, function(err, rows){
    res.redirect('../../contacts')
  })
})

app.get('/groups', function(req, res){
  db.all('select * from Groups', function(err, rows){
    res.render('groups', {dataRows: rows});
  })
})

app.post('/groups', function(req, res){
  if(req.body !== null){
    var sqlQ = "insert into groups values(null,'"+req.body.name_of_group+"')";
    db.all(sqlQ, function(err) {
      console.log(err);
      res.redirect('groups')
    });
  }
})

app.get('/groups/edit/:id', function(req, res){
  db.all(`select * from Groups where id='${req.param('id')}'`, function(err, rows){
    console.log(rows);
    res.render('groups_edit', {dataRows: rows});
  })
})

app.post('/groups/edit/:id', function(req, res){
  if(req.body !== null){
    var sqlQ = "update Groups set ";
    console.log(req.body);
    sqlQ += "name_of_group = '" + req.body.name_of_group +"' "
    sqlQ += "where id='" + req.param('id') + "'";
    db.all(sqlQ, function(err) {
      console.log(err);
      res.redirect('../../groups')
    });
  }
})

app.get('/groups/delete/:id', function(req, res){
  db.all(`delete from Groups where id='${req.param('id')}'`, function(err, rows){
    res.redirect('../../groups')
  })
})

app.get('/adresses', function(req, res){
  db.all('select * from Adresses', function(err, rows){
    res.render('adresses', {dataRows: rows});
  })
})

app.post('/adresses', function(req, res){
  if(req.body !== null){
    var sqlQ = "insert into Adresses values(null,'"+req.body.street+"',' ";
    sqlQ += req.body.city + "', '" + req.body.zipcode + "')";
    db.all(sqlQ, function(err) {
      console.log(err);
      res.redirect('adresses')
    });
  }
})

app.get('/adresses/edit/:id', function(req, res){
  db.all(`select * from Adresses where id='${req.param('id')}'`, function(err, rows){
    console.log(rows);
    res.render('adresses_edit', {dataRows: rows});
  })
})

app.post('/adresses/edit/:id', function(req, res){
  if(req.body !== null){
    var sqlQ = "update Adresses set ";
    console.log(req.body);
    sqlQ += "street = '" + req.body.street +"', "
    sqlQ += "city = '" + req.body.city +"', "
    sqlQ += "zipcode = '" + req.body.zipcode +"' "
    sqlQ += "where id='" + req.param('id') + "'";
    db.all(sqlQ, function(err) {
      console.log(err);
      res.redirect('../../adresses')
    });
  }
})

app.get('/adresses/delete/:id', function(req, res){
  db.all(`delete from Adresses where id='${req.param('id')}'`, function(err, rows){
    res.redirect('../../adresses')
  })
})

app.get('/profiles', function(req, res){
  db.all('select * from Profile', function(err, rows){
    res.render('profiles', {dataRows: rows});
  })
})

app.post('/profiles', function(req, res){
  if(req.body !== null){
    var sqlQ = "insert into Profile values(null,'"+req.body.username+"',' ";
    sqlQ +=  req.body.password + "')";
    db.all(sqlQ, function(err) {
      console.log(err);
      res.redirect('profiles')
    });
  }
})

app.get('/profiles/edit/:id', function(req, res){
  db.all(`select * from Profile where id='${req.param('id')}'`, function(err, rows){
    console.log(rows);
    res.render('profiles_edit', {dataRows: rows});
  })
})

app.post('/profiles/edit/:id', function(req, res){
  if(req.body !== null){
    var sqlQ = "update Profile set ";
    console.log(req.body);
    sqlQ += "username = '" + req.body.username +"', "
    sqlQ += "password = '" + req.body.password +"' "
    sqlQ += "where id='" + req.param('id') + "'";
    db.all(sqlQ, function(err) {
      console.log(err);
      res.redirect('../../profiles')
    });
  }
})

app.get('/profiles/delete/:id', function(req, res){
  db.all(`delete from Profile where id='${req.param('id')}'`, function(err, rows){
    res.redirect('../../profiles')
  })
})

app.listen(3000);
