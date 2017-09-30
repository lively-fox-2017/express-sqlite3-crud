var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('contacts-groups.db');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set templating
app.set('view engine', 'ejs');

/*+++++++++++++++++++++++++++++++++++++++++++++++++*/

// Index
app.get('/', function(req, res) {
  res.render('index');
});

// Contacts
app.get('/contacts', function(req, res) {

  db.all('SELECT * FROM contacts', function(err, rows) {

    if (err) console.log(err);

    res.render('contacts/index', {contacts: rows});
  });

});

app.post('/contacts', function(req, res) {

  db.exec(`INSERT INTO contacts (name, company, phone_number, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.phone_number}', '${req.body.email}')`, function(err) {
    if (err) console.log(err);
  });

  res.redirect('/contacts');

});

app.get('/contacts/edit/:id', function(req, res) {

  db.get(`SELECT * FROM contacts WHERE id=${req.params.id}`, function(err, row) {

    if (!row) {
      res.redirect('/contacts');
    } else {
      res.render('contacts/edit', {contact: row});
    }

  });

});

app.post('/contacts/edit/:id', function(req, res) {

  db.get(`SELECT * FROM contacts WHERE id=${req.params.id}`, function(err, row) {

    if (!row) {

      res.redirect('/contacts');

    } else {

      db.exec(`UPDATE contacts SET name='${req.body.name}', company='${req.body.company}', phone_number='${req.body.phone_number}', email='${req.body.email}' WHERE id=${req.params.id}`, function(err) {
        if (err) console.log(err);
      });

      res.redirect('/contacts');

    }

  });

});

app.get('/contacts/delete/:id', function(req, res) {

  db.exec(`DELETE FROM contacts WHERE id=${req.params.id}`, function(err) {
    if (err) console.log(err);
  });

  res.redirect('/contacts');

});

// Groups
app.get('/groups', function(req, res) {

  db.all('SELECT * FROM groups', function(err, rows) {

    if (err) console.log(err);

    res.render('groups/index', { groups: rows });

  });

});

app.post('/groups', function(req, res) {

  db.exec(`INSERT INTO groups (name_of_group) VALUES ('${req.body.name_of_group}')`, function (err) {
    if (err) console.log(err);
  });

  res.redirect('/groups');

});

app.get('/groups/edit/:id', function(req, res) {

  db.get(`SELECT * FROM groups WHERE id=${req.params.id}`, function(err, row) {

    if (!row) {
      res.redirect('/groups');
    } else {
      res.render('groups/edit', { group: row });
    }

  });

});

app.post('/groups/edit/:id', function(req, res) {

  db.get(`SELECT * FROM groups WHERE id=${req.params.id}`, function(err, row) {

    if (!row) {
      res.redirect('/groups');
    } else {

      db.exec(`UPDATE groups SET name_of_group='${req.body.name_of_group}' WHERE id=${req.params.id}`, function(err) {
        if (err) console.log(err);
      });

      res.redirect('/groups');

    }

  });

});

app.get('/groups/delete/:id', function(req, res) {

  db.exec(`DELETE FROM groups WHERE id=${req.params.id}`, function(err) {
    if (err) console.log(err);
  });

  res.redirect('/groups');

});

// Addresses
app.get('/addresses', function(req, res) {

  db.all('SELECT * FROM addresses', function(err, rows) {

    if (err) console.log(err);

    res.render('addresses/index', { addresses: rows });


  });

});

app.post('/addresses', function(req, res) {

  db.exec(`INSERT INTO addresses (street, city, zipcode) VALUES ('${req.body.street}', '${req.body.city}', ${req.body.zipcode})`, function(err) {
    if (err) console.log(err);
  });

  res.redirect('/addresses');

});

app.get('/addresses/edit/:id', function(req, res) {

  db.get(`SELECT * FROM addresses WHERE id=${req.params.id}`, function(err, row) {

    if (!row) {
      res.redirect('/addresses');
    } else {
      res.render('addresses/edit', { address: row });
    }

  });

});

app.post('/addresses/edit/:id', function(req, res) {

  db.get(`SELECT * FROM addresses WHERE id=${req.params.id}`, function(err, row) {

    if (!row) {
      res.redirect('/addresses');
    } else {

      db.exec(`UPDATE addresses SET street='${req.body.street}', city='${req.body.city}', zipcode=${req.body.zipcode} WHERE id=${req.params.id}`, function(err) {
        if (err) console.log(err);
      });

      res.redirect('/addresses');

    }

  });

});

app.get('/addresses/delete/:id', function(req, res) {

  db.exec(`DELETE FROM addresses WHERE id=${req.params.id}`, function(err) {
    if (err) console.log(err);
  });

  res.redirect('/addresses');

});

// Profiles
app.get('/profiles', function(req, res) {

  db.all('SELECT * FROM profiles', function(err, rows) {

    if (err) console.log(err);

    res.render('profiles/index', { profiles: rows });


  });

});

app.post('/profiles', function(req, res) {

  db.exec(`INSERT INTO profiles (username, password) VALUES ('${req.body.username}', '${req.body.password}')`, function(err) {
    if (err) console.log(err);
  });

  res.redirect('/profiles');

});

app.get('/profiles/edit/:id', function(req, res) {

  db.get(`SELECT * FROM profiles WHERE id=${req.params.id}`, function(err, row) {

    if (!row) {
      res.redirect('/profiles');
    } else {
      res.render('profiles/edit', { profile: row });
    }

  });

});

app.post('/profiles/edit/:id', function(req, res) {

  db.get(`SELECT * FROM profiles WHERE id=${req.params.id}`, function(err, row) {

    if (!row) {
      res.redirect('/profiles');
    } else {

      db.exec(`UPDATE profiles SET username='${req.body.username}', password='${req.body.password}' WHERE id=${req.params.id}`, function(err) {
        if (err) console.log(err);
      });

      res.redirect('/profiles');

    }

  });

});

app.get('/profiles/delete/:id', function(req, res) {

  db.exec(`DELETE FROM profiles WHERE id=${req.params.id}`, function(err) {
    if (err) console.log(err);
  });

  res.redirect('/profiles');

});

app.listen(3000);

console.log('Listening on port 3000');