const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

db.serialize((err, rows) => {
  db.run('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT)');
	if (err) {
	  console.log('Error create table contacts!');
	}
	  console.log('Table contacts created!!');

  db.run('CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT)');
	if (err) {
	  console.log('Error create table groups!');
	}
	  console.log('Table groups created!!');

  db.run('CREATE TABLE IF NOT EXISTS profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');
	if (err) {
	  console.log('Error create table profile!');
	}
	  console.log('Table profile created!!');

  db.run('CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode INTEGER)');
	if (err) {
	  console.log('Error create table addresses!');
	}
	  console.log('Table addresses created!!');
});