// express
const express = require('express');
const app = express();

// sqlite3
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// ejs
app.set('view engine', 'ejs');

// route index
app.get('/', function(req, res){
  res.render('index');
});

// route contacts --------------------------------------------------
app.get('/contacts', function(req, res){
  db.all('SELECT * FROM contacts', function(err, rows){
	if(err){
	  console.log('error to show data');
	}
	res.render('contacts/index', {contacts: rows});
  });
});

app.post('/contacts', function(req, res){
  db.exec(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`, function(err, rows){
	if(err){
	  console.log('error to add data');
	}
	res.redirect('/contacts');
  });
});

app.get('/contacts/edit/:id', function(req, res){
  db.get(`SELECT * FROM contacts WHERE id = ${req.params.id}`, function(err, rows){
	if(err){
	  console.log('error to show data');
	  res.redirect('/contacts');
	}
	res.render('contacts/edit', {contacts: rows});
  });
});

app.post('/contacts/edit/:id', function(req, res){
  db.exec(`UPDATE contacts SET name = '${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = ${req.params.id}`, function(err, rows){
	if(err){
	  console.log('error to change data');
	}
	res.redirect('/contacts');
  });
});

app.get('/contacts/delete/:id', function(req, res){
  db.exec(`DELETE FROM contacts WHERE id = ${req.params.id}`, function(err, rows){
	if(err){
	  console.log('error to delete data');
	}
	res.redirect('/contacts');
  });
});

// route groups --------------------------------------------------
app.get('/groups', function(req, res){
  db.all('SELECT * FROM groups', function(err, rows){
  	if(err){
  		console.log('error to show data');
  	}
  	res.render('groups/index', {groups: rows});
  })
});

app.post('/groups', function(req, res){
  db.exec(`INSERT INTO groups (name_of_group) VALUES ('${req.body.name_of_group}')`, function(err, rows){
 	if(err){
 		console.log('error to add data');
 	}
 	res.redirect('/groups');
	});
});

app.get('/groups/edit/:id', function(req, res){
  db.get(`SELECT * FROM groups WHERE id = ${req.params.id}`, function(err, rows){
  	if(err){
  	  console.log('error to show data');
  	}
  	res.render('groups/edit', {groups: rows});
  });
});

app.post('/groups/edit/:id', function(req, res){
  db.exec(`UPDATE groups SET name_of_group = '${req.body.name_of_group}' WHERE id = ${req.params.id}`, function(err, rows) {
  	if(err){
  	  console.log('error to change data');
  	}
  	res.redirect('/groups');
  });
});

app.get('/groups/delete/:id', function(req, res){
  db.exec(`DELETE FROM groups WHERE id = ${req.params.id}`, function(err, rows){
  	if(err){
  	  console.log('error to delete data');
  	}
  	res.redirect('/groups');
  });
});

// route addresses --------------------------------------------------
app.get('/addresses', function(req, res){
  db.all('SELECT * FROM addresses', function(err, rows){
  	if(err){
  	  console.log('error to show data');
  	}
  	res.render('addresses/index', {addresses: rows});
  })
});

app.post('/addresses', function(req, res){
  db.exec(`INSERT INTO addresses (street, city, zipcode) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}')`, function(err, rows){
  	if(err){
  	  console.log('error to add data');
  	}
  	res.redirect('/addresses')
  });
});

app.get('/addresses/edit/:id', function(req, res){
  db.get(`SELECT * FROM addresses WHERE id = ${req.params.id}`, function(err, rows){
  	if(err){
  	  console.log('error to show data');
  	}
  	res.render('addresses/edit', {addresses: rows});
  });
});

app.post('/addresses/edit/:id', function(req, res){
  db.exec(`UPDATE addresses SET street = '${req.body.street}', city = '${req.body.city}', zipcode = '${req.body.zipcode}' WHERE id = ${req.params.id}`, function(err, rows){
  	if(err){
  		console.log('error to update data');
  	}
  	res.redirect('/addresses');
  });
});

app.get('/addresses/delete/:id', function(req, res){
  db.exec(`DELETE FROM addresses WHERE id = ${req.params.id}`, function(err, rows){
  	if(err){
  	  console.log('error to delete data');
  	}
  	res.redirect('/addresses');
  })
});

// route profile --------------------------------------------------
app.get('/profile', function(req, res){
  db.all('SELECT * FROM profile', function(err, rows){
  	if(err){
  	  console.log('error to show data');
  	}
  	res.render('profile/index', {profile: rows});
  });
});

app.post('/profile', function(req, res){
  db.exec(`INSERT INTO profile (username, password) VALUES ('${req.body.username}', '${req.body.password}')`, function(err, rows){
  	if(err){
  	  console.log('error to add data');
  	}
  	res.redirect('/profile');
  })
});

app.get('/profile/edit/:id', function(req, res){
  db.get(`SELECT * FROM profile WHERE id = ${req.params.id}`, function(err, rows){
  	if(err){
  	  console.log('error to show data');
  	}
  	res.render('profile/edit', {profile: rows});
  });
});

app.post('/profile/edit/:id', function(req, res){
  db.exec(`UPDATE profile SET username = '${req.body.username}', password = '${req.body.password}' WHERE id = ${req.params.id}`, function(err, rows){
  	if(err){
  	  console.log('error to update data');
  	}
  	res.redirect('/profile');
  });
});

app.get('/profile/delete/:id', function(req, res){
  db.exec(`DELETE FROM profile WHERE id = ${req.params.id}`, function(err, rows){
  	if(err){
  	  console.log('error to delete data');
  	}
  	res.redirect('/profile');
  });
});

app.listen(3000);
console.log('Listening on port 3000');