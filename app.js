const express = require('express');
const app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/data.db');

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res)=> {
  res.render('index');
});

//READ DATA CONTACTS
app.get('/contacts', (req, res) => {
  db.all('SELECT * FROM contacts', (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.render('contacts', { dataJsonContacts: rows });

      console.log(rows);
    }
  });
});

//ADD DATA CONTACTS
app.post('/contacts', (req, res) => {
  db.run(`INSERT into contacts (name, company, telp_number, email) VALUES ('${req.body.name}','${req.body.company}','${req.body.telp_number}','${req.body.email}')`, function (err, rows){
    if (err) {
      console.log(err);
    }
  });
  res.redirect('contacts');
  console.log(req.body);

});

// TAMPIL EDIT CONTACTS
app.get('/contacts/edit/:id', (req, res) => {
  db.all(`SELECT * from contacts WHERE id = "${req.param('id')}"`, (err, rows) => {
    res.render('editcontact.ejs', { dataJsonContacts: rows });
    let idContactEdit = req.params.id;
    app.post('/contacts/edit/:id', function (req, res) {
      db.run(`UPDATE contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = ${idContactEdit}`,function(err){
        if(err){
          console.log(err);
        }
      })
      res.redirect('/contacts')
    })
  })
})

//HAPUS DATA CONTACTS
app.get('/contacts/delete/:id', (req, res) => {
  db.all(`DELETE from contacts WHERE id = "${req.param('id')}"`, (err, rows) => {
    console.log(err);
    res.redirect('../../contacts');
  });
});

//READ DATA groups
app.get('/groups', (req, res) => {
  db.all('SELECT * FROM Groups', (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.render('groups', { data: rows });

      console.log(rows);
    }
  });
});

//ADD DATA groups
app.post('/groups', (req, res) => {
  db.run(`INSERT into Groups (name_of_group) VALUES ('${req.body.name_of_group}')`, function (err, rows){
    console.log(err);
    res.redirect('groups');
    console.log(req.body);
  });
});

// TAMPIL EDIT groups
app.get('/groups/edit/:id', (req, res) => {
  db.all(`SELECT * from Groups WHERE id = "${req.params.id}"`, (err, rows) => {
    res.render('editgroups.ejs', { dataJsonContacts: rows });
    let idGroupEdit = req.params.id;
    app.post('/groups/edit/:id', function (req, res) {
      db.run(`UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE id = ${idGroupEdit}`, function (err, rows) {
        if (err) {
          console.log(err);
        }
      });

      res.redirect('/groups');
    });
  });
});

//HAPUS DATA groups
app.get('/groups/delete/:id', (req, res) => {
  db.all(`DELETE from Groups WHERE id = "${req.param('id')}"`, (err, rows) => {
    console.log(err);
    res.redirect('../../groups');
  });
});

//READ DATA addresses
app.get('/addresses', (req, res) => {
  db.all('SELECT * FROM Addresses', (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.render('addresses', { dataJsonAddresses: rows });

      console.log(rows);
    }
  });
});

//ADD DATA addresses
app.post('/addresses', (req, res) => {
  db.run(`INSERT into Addresses (street, city, zipcode) VALUES ('${req.body.street}','${req.body.city}','${req.body.zipcode}')`, function (err, rows) {
    if (err) {
      console.log(err);
    }
  });

  res.redirect('addresses');
  console.log(req.body);

});

// TAMPIL EDIT addresses
app.get('/addresses/edit/:id', (req, res) => {
  db.all(`SELECT * from Addresses WHERE id = "${req.params.id}"`, (err, rows) => {
    res.render('editaddresses.ejs', { dataJsonAddresses: rows });
    let idAddrressEdit = req.params.id;
    app.post('/addresses/edit/:id', function (req, res) {
      db.run(`UPDATE Addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}' WHERE id = ${idAddrressEdit}`, function (err) {
        if (err) {
          console.log(err);
        }
      });

      res.redirect('/addresses');
    });
  });
});

//HAPUS DATA addresses
app.get('/addresses/delete/:id', (req, res) => {
  db.all(`DELETE from Addresses WHERE id = "${req.params.id}"`, (err, rows) => {
    console.log(err);
    res.redirect('../../addresses');
  });
});

//READ DATA profile
app.get('/profiles', (req, res) => {
  db.all('SELECT * FROM Profile', (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.render('profiles', { data: rows });

      console.log(rows);
    }
  });
});

//ADD DATA profile
app.post('/profiles', (req, res) => {
  db.run(`INSERT into Profile (username, password) VALUES ('${req.body.username}', '${req.body.password}')`, function (err, rows){
    console.log(err);
    res.redirect('profiles');
    // console.log(req.body);
  });
});

// TAMPIL EDIT profile
app.get('/profiles/edit/:id', (req, res) => {
  db.all(`SELECT * from Profile WHERE id = "${req.params.id}"`, (err, rows) => {
    res.render('editprofile.ejs', { dataJsonProfile: rows });
    let idProfileEdit = req.params.id;
    app.post('/profiles/edit/:id', function (req, res) {
      db.run(`UPDATE Profile SET username = '${req.body.username}', password = '${req.body.password}' WHERE id = ${idProfileEdit}`, function (err, rows) {
        if (err) {
          console.log(err);
        }
      });

      res.redirect('/profiles');
    });
  });
});

//HAPUS DATA profile
app.get('/profiles/delete/:id', (req, res) => {
  db.all(`DELETE from Profile WHERE id = "${req.params.id}"`, (err, rows) => {
    console.log(err);
    res.redirect('../../profiles');
  });
});

//listen on which server
app.listen(3000, function () {
  console.log('listen on port 3000');
});
