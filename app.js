const express = require('express')
const app = express()
var path = require('path');
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db');
app.set('view engine', 'ejs');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))

//buat index
app.get('/', function(req, res) {
	let temp = []
	db.serialize(function () {
  		db.each('select * from Contacts;', function (err, row) {
  			temp.push({id : row.id, name : row.name, company : row.company, telp : row.telp_number, email : row.email})
  	},() => {
  		res.render('pages/index', {temp : temp})
  		})		
  	}) 
});


//buat group
app.get('/group', (req, res) => {
	let temp = []
	db.serialize(function () {
  		db.each('select * from Groups;', function (err, row) {
  			temp.push({id : row.id, name : row.name_of_group})
  	},() => {
  		res.render('pages/group', {temp : temp})
  		})		
  	})
});

//buat profile
app.get('/profile', function(req, res) {
	let temp = []
	db.serialize(function () {
  		db.each('select * from Profile;', function (err, row) {
  			temp.push({id : row.id, username : row.username, password : row.password})
  	},() => {
  		res.render('pages/profile', {temp : temp})
  		})		
  	})
});

//buat address
app.get('/address', function(req, res) {
	let temp = []
	db.serialize(function () {
  		db.each('select * from addresses;', function (err, row) {
  			temp.push({id : row.id, street : row.street, city : row.city, zipcode : row.zipcode})
  	},() => {
  		res.render('pages/address', {temp : temp})
  		})		
  	})
});

// app.get('/index.ejs', function(req, res){
//     res.send('hello world')
// })

app.listen(5000, () => {
	console.log('Mulai gan')
})



db.serialize(function () {
  		db.each('select * from Contacts;', function (err, row) {
  	})
})

//Tambah kontak
app.post('/newcontact', (req, res) => {
   db.serialize(function () {
  		db.run('insert into Contacts (name, company, telp_number, email) values (?, ?, ?, ?);',(req.body.name), (req.body.company), (req.body.telp), (req.body.email))
  		res.redirect('/')
	})
   
})

//Tambah grup
app.post('/newgroup', (req, res) => {
   db.serialize(function () {
  		db.run('insert into Groups (name_of_group) values (?);',(req.body.name))
  		res.redirect('/group')
	})
   
})

//Tambah profil
app.post('/newprofile', (req, res) => {
   db.serialize(function () {
  		db.run('insert into Profile (username, password) values (?, ?);',(req.body.username), (req.body.password))
  		res.redirect('/profile')
	})
   
})

//Tambah address
app.post('/newaddress', (req, res) => {
   db.serialize(function () {
  		db.run('insert into addresses (street, city, zipcode) values (?, ?, ?);',(req.body.street), (req.body.city), (req.body.zipcode))
  		res.redirect('/address')
	})
   
})

//buat delete contact
app.get('/deleteContact/:id', function(req, res) {
	db.serialize(function () {
  		db.run('delete from Contacts where id = (?);',(req.params.id)) 
  		res.redirect('/')
	})
});

//buat delete grup
app.get('/deleteGroup/:id', function(req, res) {
	db.serialize(function () {
  		db.run('delete from Groups where id = (?);',(req.params.id)) 
  		res.redirect('/group')
	})
});


//buat delete profile
app.get('/deleteProfile/:id', function(req, res) {
	db.serialize(function () {
  		db.run('delete from Profile where id = (?);',(req.params.id)) 
  		res.redirect('/profile')
	})
});


//buat delete address
app.get('/deleteAddresses/:id', function(req, res) {
	db.serialize(function () {
  		db.run('delete from addresses where id = (?);',(req.params.id)) 
  		res.redirect('/address')
	})
});

//buat edit contact
app.get('/editContact/:id', function(req, res) {
	let temp = []
	db.serialize(function () {
  		db.each('select * from Contacts where id = (?);',(req.params.id), (err, row) => {
  			temp.push({id : row.id, name : row.name, company : row.company, telp : row.telp_number, email : row.email})
  	},() => {
  		res.render('pages/editContact', {temp : temp})
  		})		
  	}) 
});


app.post('/editContactFinal', (req, res) => {
   db.serialize(function () {
  		db.run('update Contacts set name = (?), company = (?), telp_number = (?), email = (?) where id = (?);',(req.body.name), (req.body.company), (req.body.telp), (req.body.email), (req.body.id))
  		res.redirect('/')
	})
   
})

//buat edit group
app.get('/editGroup/:id', function(req, res) {
	let temp = []
	db.serialize(function () {
  		db.each('select * from Groups where id = (?);',(req.params.id), (err, row) => {
  			temp.push({id : row.id, name_of_group : row.name_of_group})
  	},() => {
  		res.render('pages/editGroup', {temp : temp})
  		})		
  	}) 
});


app.post('/editGroupFinal', (req, res) => {
   db.serialize(function () {
  		db.run('update Groups set name_of_group = (?) where id = (?);',(req.body.name), (req.body.id))
  		res.redirect('/group')
	})
   
})

//buat edit profile
app.get('/editProfile/:id', function(req, res) {
  let temp = []
  db.serialize(function () {
      db.each('select * from Profile where id = (?);',(req.params.id), (err, row) => {
        temp.push({id : row.id, username : row.username, password : row.password})
    },() => {
      res.render('pages/editProfile', {temp : temp})
      })    
    }) 
});


app.post('/editProfileFinal', (req, res) => {
   db.serialize(function () {
      db.run('update Profile set username = (?), password = (?) where id = (?);',(req.body.username), (req.body.password), (req.body.id))
      res.redirect('/profile')
  })
   
})

//buat edit addresses
app.get('/editAddresses/:id', function(req, res) {
  let temp = []
  db.serialize(function () {
      db.each('select * from addresses where id = (?);',(req.params.id), (err, row) => {
        temp.push({id : row.id, street : row.street, city : row.city, zipcode : row.zipcode})
    },() => {
      res.render('pages/editAddresses', {temp : temp})
      })    
    }) 
});


app.post('/editAddressFinal', (req, res) => {
   db.serialize(function () {
      db.run('update addresses set street = (?), city = (?), zipcode = (?) where id = (?);',(req.body.street), (req.body.city), (req.body.zipcode), (req.body.id))
      res.redirect('/address')
  })
   
})