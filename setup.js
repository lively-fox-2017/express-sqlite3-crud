// // sqlite3
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data/data.db')

function createRow(){

	db.run(`CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY, name TEXT, company TEXT, telp_number TEXT, email TEXT)`,function(err){
		if(err != null){
			console.log('err create table Contacts')
		}
		console.log(err);
			console.log(`Contacts table created`)
	})

	db.run(`CREATE TABLE IF NOT EXISTS Groups(id INTEGER PRIMARY KEY, name_of_group TEXT)`,function(err){
		if(err){
			console.log('err create table Groups')
		}
			console.log(`Groups table created`)
	})

	db.run(`CREATE TABLE IF NOT EXISTS Profile(id INTEGER PRIMARY KEY, username TEXT, password TEXT)`,function(err){
		if(err){
			console.log('err create table Profile')
		}
			console.log(`Profile table created`)
	})

	db.run(`CREATE TABLE IF NOT EXISTS Addresses(id INTEGER PRIMARY KEY, street TEXT, city TEXT, zipcode INTEGER)`,function(err){
		if(err){
			console.log('err create table Addresses')
		}
			console.log(`Addresses table created`)
	})

}

createRow()
