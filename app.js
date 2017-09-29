const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
  res.render('index')
})
//Handling CRUD contact
app.get ('/contact', function (req, res) {
	let query = `SELECT * FROM tb_contact`
	db.all(query, function (err, data) {
    	if (!err) {
      	res.render('contact', {contact: data});
    }
  });
});
app.post('/contact', function(req, res) {
	let query = `INSERT INTO tb_contact (name, company, tlp_number, email) VALUES
        ("${req.body.name}","${req.body.company}","${req.body.tlp_number}","${req.body.email}")`
	db.run(query);
	res.redirect('/contact')
})
app.get("/contact/edit/:id", function(req,res){
	let query = `SELECT * FROM tb_contact WHERE id = '${req.params.id}'` 
	db.each(query, function(err,rows){
    	if(!err){
    		res.render("edit_contact",{data:rows})
    	}
  	});
});
app.post('/contact/edit/:id', function(req,res) {
	let query = `UPDATE  tb_contact SET name = "${req.body.name}", company = "${req.body.company}",
          tlp_number = "${req.body.tlp_number}",email = "${req.body.email}" WHERE id = ${req.params.id}`
	db.run(query);
	res.redirect('/contact');
});
app.get('/contact/delete/:id', function(req,res){
	let query = `DELETE FROM tb_contact WHERE id = '${req.params.id}'`
	db.run(query)
	res.redirect('/contact')
});

//Handling CRUD Profile
app.get ('/profile', function (req, res) {
	let query = `SELECT tb_profile.*,tb_contact.id as id_contact,tb_contact.name 
				FROM tb_profile LEFT JOIN tb_contact ON tb_profile.id=tb_contact.id`
	db.all(query, function (err, data) {
    	if (!err) {
    		res.render('profile', {profile: data});
    	}
  	});
});
app.post('/profile', function(req, res) {
	let query = `INSERT INTO tb_profile (username, password) VALUES ("${req.body.username}","${req.body.password}")`
	db.run(query);
	res.redirect('/profile')
})
app.get("/profile/edit/:id", function(req,res){
  	let query = `SELECT * FROM tb_profile WHERE id = '${req.params.id}'`
  	db.each(query, function(err,rows){
	    if(!err){
	      	res.render("edit_profile",{data:rows})
	    }
	});
});
app.post('/profile/edit/:id', function(req,res) {
	let query = `UPDATE tb_profile SET username = "${req.body.username}", password = "${req.body.password}" WHERE id = ${req.params.id}`
	db.run(query);
	console.log(req.params.id);
    res.redirect('/profile');
});
app.get('/profile/delete/:id', function(req,res){
	let query = `DELETE FROM tb_profile WHERE id = '${req.params.id}'`
	db.run(query)
	res.redirect('/profile')
});
//Handling CRUD Address
app.get ('/address', function (req, res) {
	let query = `SELECT * FROM tb_address`
	db.all(query, function (err, data) {
	    if (!err) {
	      res.render('address', {address: data});
	    }
	});
});
app.post('/address', function(req, res) {
	let query = `INSERT INTO tb_address (street, city, zipcode) VALUES
        		("${req.body.street}","${req.body.city}","${req.body.zipcode}")`
	db.run(query);
	res.redirect('/address')
})
app.get("/address/edit/:id", function(req,res){
	let query = `SELECT * FROM tb_address WHERE id = '${req.params.id}'`
	db.each(query, function(err,rows){
	    if(!err){
	    	res.render("edit_address",{data:rows})
	    }
	});
});
app.post('/address/edit/:id', function(req,res) {
	let query = `UPDATE  tb_address SET street = "${req.body.street}", city = "${req.body.city}",
				zipcode = "${req.body.zipcode}" WHERE id = ${req.params.id}`
	db.run(query);
	res.redirect('/address');
});
app.get('/address/delete/:id', function(req,res){
	let query = `DELETE FROM tb_address WHERE id = '${req.params.id}'`
	db.run(query)
	res.redirect('/address')
});
//Handling CRUD Group
app.get ('/group', function (req, res) {
	let query = `SELECT * FROM tb_group`
	db.all(query, function (err, data) {
	    if (!err) {
	    	res.render('group', {group: data});
	    }
  	});
});
app.post('/group', function(req, res) {
  	let query = `INSERT INTO tb_group (names_of_groups) VALUES ("${req.body.names_of_groups}")`
  	db.run(query);
	res.redirect('/group')
})
app.get("/group/edit/:id", function(req,res){
	let query = `SELECT * FROM tb_group WHERE id = '${req.params.id}'`
	db.each(query, function(err,rows){
	    if(!err){
	    	res.render("edit_group",{data:rows})
	    }
  	});
});
app.post('/group/edit/:id', function(req,res) {
	let query = `UPDATE  tb_group SET names_of_groups = "${req.body.names_of_groups}" WHERE id = ${req.params.id}`
	db.run(query);
  	res.redirect('/group');
});
app.get('/group/delete/:id', function(req,res){
	let query = `DELETE FROM tb_group WHERE id = '${req.params.id}'`
	db.run(query)
	res.redirect('/group')
});
// Port listening
app.listen(3000,()=>{
  console.log('Magic Port 3000')
});
