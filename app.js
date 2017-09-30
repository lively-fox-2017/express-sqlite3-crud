const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/views'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', function (req, res) {

    res.render('index')
})

// CRUD Contact
app.get('/contacts', function (req, res) {
    db.all("SELECT * from contacts", function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('contact', { dataRow: rows })
        }
    })
})

app.post('/contacts', function (req, res) {
    db.run(`INSERT into contacts(name, company, telp_number, email) VALUES ('${req.body.name}','${req.body.company}','${req.body.telp}','${req.body.email}')`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('contacts')
        }
    })
})

app.get('/contacts/edit/:id', function (req, res) {
    db.all(`SELECT * from contacts where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('editContact', { dataRow: rows })
        }
    })
})

app.post('/contacts/edit/:id', function (req, res) {
    db.all(`UPDATE contacts SET name ='${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp}', email = '${req.body.email}' where id = '${req.param('id')}'`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../contacts')
        }
    })
})

app.get('/contacts/delete/:id', function (req, res) {
    db.all(`DELETE from contacts where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('../../contacts')
        }
    })
})

//CRUD GROUP

app.get('/groups', function (req, res) {
    db.all("SELECT * from groups", function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('group', { dataRow: rows })
        }
    })
})

app.post('/groups', function (req, res) {
    db.all(`INSERT into groups(name_of_group) VALUES ('${req.body.name_of_group}')`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('groups')
        }
    })
})

app.get('/groups/edit/:id', function (req, res) {
    db.all(`SELECT * from groups where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('editGroup', { dataRow: rows })
        }
    })
})

app.post('/groups/edit/:id', function (req, res) {
    db.all(`UPDATE groups SET name_of_group ='${req.body.name_of_group}' where id = '${req.param('id')}'`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../groups')
        }
    })
})

app.get('/groups/delete/:id', function (req, res) {
    db.all(`DELETE from groups where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('../../groups')
        }
    })
})


//CRUD PROFILE
app.get('/profiles', function (req, res) {
    db.all("SELECT * from profiles", function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('profile', { dataRow: rows })
        }
    })
})

app.post('/profiles', function (req, res) {
    db.all(`INSERT into profiles(username, password) VALUES ('${req.body.username}', '${req.body.password}')`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('profiles')
        }
    })
})

app.get('/profiles/edit/:id', function (req, res) {
    db.all(`SELECT * from profiles where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('editProfile', { dataRow: rows })
        }
    })
})

app.post('/profiles/edit/:id', function (req, res) {
    db.all(`UPDATE profiles SET username ='${req.body.username}', password ='${req.body.password}' where id = '${req.param('id')}'`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../profiles')
        }
    })
})

app.get('/profiles/delete/:id', function (req, res) {
    db.all(`DELETE from profiles where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('../../profiles')
        }
    })
})

//CRUD ADDRESSES
app.get('/addresses', function (req, res) {
    db.all("SELECT * from addresses", function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('address', { dataRow: rows })
        }
    })
})

app.post('/addresses', function (req, res) {
    db.all(`INSERT into addresses(street, city, zipcode) VALUES ('${req.body.street}','${req.body.city}', '${req.body.zipcode}')`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('addresses')
        }
    })
})

app.get('/addresses/edit/:id', function (req, res) {
    db.all(`SELECT * from addresses where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('editAddress', { dataRow: rows })
        }
    })
})

app.post('/addresses/edit/:id', function (req, res) {
    db.all(`UPDATE addresses SET street ='${req.body.street}', city ='${req.body.city}', zipcode ='${req.body.zipcode}' where id = '${req.param('id')}'`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../addresses')
        }
    })
})

app.get('/addresses/delete/:id', function (req, res) {
    db.all(`DELETE from addresses where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('../../addresses')
        }
    })
})


app.listen(3000);


// app.get('/',function())