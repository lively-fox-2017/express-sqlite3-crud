const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

db.serialize(() => {

    db.run(
    	'CREATE TABLE IF NOT EXISTS contacts (' +
    	'id INTEGER PRIMARY KEY AUTOINCREMENT, ' + 
    	'name TEXT,' + 
    	'company TEXT,' + 
    	'telp_number TEXT,' +
    	'email TEXT' +
    	');',
    	err => {
    		if (err) throw err;
    });

   	db.run(
		'CREATE TABLE IF NOT EXISTS groups (' +
		'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
		'name_of_group TEXT' +
		');',
		err => {
			if (err) throw err;
    });

    db.run(
		'CREATE TABLE IF NOT EXISTS profiles (' +
		'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
		'username TEXT,' +
		'password TEXT' +
		');',
		err => {
			if (err) throw err;
    });

    db.run(
		'CREATE TABLE IF NOT EXISTS addresses (' +
		'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
		'street TEXT,' +
		'city TEXT,' +
		'zipcode INTEGER' +
		');',
		err => {
			if (err) throw err;
    });
    
    console.log('Database has been installed');
    db.close();
});