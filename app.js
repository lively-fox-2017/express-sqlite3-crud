//EXPRESS
var express = require('express')
var app = express()

//DB
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

//EJS
var ejs = require('ejs')
app.set('view engine', 'ejs')

//BODY-PARSER
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//YOUR CODE HERE
app.get('/', function(req, res){
	res.render('index')
})

//===============MAIN
app.get('/contacts', function(req, res){
	db.all('select * from Contacts', function(err, rows){
		// console.log(rows)
		res.render('contacts', {data:rows})
	})
})


//-----------------------CONTACTS-------------------------------------------
//---------------QUERY
app.post('/contacts', (req, res) =>{
	db.run(`INSERT INTO Contacts (name, company, telp_number, email)
	 values ('${req.body.nama}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`)
	res.redirect('contacts')
	console.log(req.body)
})

//---------------GET ID
app.get('/contacts/edit/:id', (req, res) => {
  db.all(`select * from Contacts where id = ${req.params.id}`,(err, rows)=>{
    res.render('editContact', {data:rows})
  });
});

//------------UPDATE
app.post('/contacts/edit/:id', (req, res) => {
	let update = `UPDATE Contacts SET name = '${req.body.name}', company = '${req.body.company}',
	 telp_number = '${req.body.telp_number}', email = '${req.body.email}' WHERE id = ${req.params.id}`

	db.run(update, (err) => {
		console.log(update)
		res.redirect('../../contacts')
		console.log('data diupdate')	
	})

})

//----------------DELETE
app.get('/contacts/delete/:id', (req, res ) => {
	db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`, (err) => {
		console.log(req.params)
		console.log('data berhasil delete')
		res.redirect('../../contacts')
	})
	
})
//----------------------- END CONTACTS-------------------------------------------

//-----------------------GROUPS-------------------------------------------
app.get('/groups', function(req, res){
	db.all('select * from Groups', function(err, rows){
		// console.log(rows)
		res.render('groups', {data:rows})
	})
})
//---------------QUERY
app.post('/groups', (req, res) =>{
	db.run(`INSERT INTO Groups (name_of_group)
	 values ('${req.body.name_of_group}')`)
	res.redirect('groups')
	console.log(req.body)
})

//---------------GET ID
app.get('/groups/edit/:id', (req, res) => {
  db.all(`select * from Groups where id = ${req.params.id}`,(err, rows)=>{
    res.render('editGroups', {data:rows})
  });
});

//------------UPDATE
app.post('/groups/edit/:id', (req, res) => {
	let update = `UPDATE Groups SET name_of_group = '${req.body.name_of_group}' WHERE id = ${req.params.id}`

	db.run(update, (err) => {
		console.log(update)
		res.redirect('../../groups')
		console.log('data diupdate')	
	})

})

//----------------DELETE
app.get('/groups/delete/:id', (req, res ) => {
	db.run(`DELETE FROM Groups WHERE id = ${req.params.id}`, (err) => {
		console.log(req.params)
		console.log('data berhasil delete')
		res.redirect('../../groups')
	})
	
})

//-----------------------END-GROUPS-------------------------------------------


//-----------------------ADRESSES-------------------------------------------
app.get('/addresses', function(req, res){
	db.all('select * from Addres', function(err, rows){
		// console.log(rows)
		res.render('addresses', {data:rows})
	})
})
//---------------QUERY
app.post('/addresses', (req, res) =>{
	db.run(`INSERT INTO Addres (street, city, zipcode)
	 values ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}')`)
	res.redirect('addresses')
	console.log(req.body)
})

//---------------GET ID
app.get('/addresses/edit/:id', (req, res) => {
  db.all(`select * from Addres where id = ${req.params.id}`,(err, rows)=>{
    res.render('editAddresses', {data:rows})
  });
});

//------------UPDATE
app.post('/addresses/edit/:id', (req, res) => {
	let update = `UPDATE Addres SET street = '${req.body.street}', zipcode = '${req.body.zipcode}' WHERE id = ${req.params.id}`
	db.run(update, (err) => {
		console.log(update)
		res.redirect('../../addresses')
		console.log('data diupdate')	
	})

})

//----------------DELETE
app.get('/addresses/delete/:id', (req, res ) => {
	db.run(`DELETE FROM Addres WHERE id = ${req.params.id}`, (err) => {
		console.log(req.params)
		console.log('data berhasil delete')
		res.redirect('../../profile')
	})
	
})
//-----------------------END-ADRESSES-------------------------------------------

//-----------------------PROFILE-------------------------------------------
app.get('/profile', function(req, res){
	db.all('select * from Profile', function(err, rows){
		// console.log(rows)
		res.render('profile', {data:rows})
	})
})
//---------------QUERY
app.post('/profile', (req, res) =>{
	db.run(`INSERT INTO Profile (username, password)
	 values ('${req.body.username}', '${req.body.password}')`)
	res.redirect('profile')
	console.log(req.body)
})

//---------------GET ID
app.get('/profile/edit/:id', (req, res) => {
  db.all(`select * from Profile where id = ${req.params.id}`,(err, rows)=>{
    res.render('editProfile', {data:rows})
  });
});

//------------UPDATE
app.post('/profile/edit/:id', (req, res) => {
	let update = `UPDATE Profile SET username = '${req.body.username}', password = '${req.body.password}' WHERE id = ${req.params.id}`
	
	db.run(update, (err) => {
		console.log(update)
		res.redirect('../../profile')
		console.log('data diupdate')	
	})

})

//----------------DELETE
app.get('/profile/delete/:id', (req, res ) => {
	db.run(`DELETE FROM Profile WHERE id = ${req.params.id}`, (err) => {
		console.log(req.params)
		console.log('data berhasil delete')
		res.redirect('../../profile')
	})
	
})
//-----------------------END-PROFILE-------------------------------------------

//gunakan req.body.nama_parameter
//untuk mengakses nilai di dalam ejs
app.listen(3000)