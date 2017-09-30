let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('data.db');

db.serialize(function(){
	db.run('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT)',function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('data created')
		}
	});
	db.run('CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)',function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('data created')
		}
	});
	db.run('CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)',function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('data created')
		}
	});
	db.run('CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode INTEGER)',function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log('data created')
		}
	});
})
