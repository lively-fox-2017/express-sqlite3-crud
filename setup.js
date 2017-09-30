const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db');

db.serialize(() => {

  db.run(`CREATE TABLE IF NOT EXISTS contacts (
	  id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
	  name	TEXT,
    company	TEXT,
	  telp_number	TEXT,
	  email	TEXT);`,() => {
    console.log(`Create Table Contacts Berhasil`);
  })

  db.run(`CREATE TABLE groups (
	  id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
	  name_of_group	TEXT);`,() => {
    console.log(`Create Table Groups Berhasil`);
  })

  db.run(`CREATE TABLE profile (
	  id	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
	  username	TEXT,
	  password	TEXT);`,() => {
    console.log(`Create Table Profile Berhasil`);
  })

  db.run(`CREATE TABLE addresses (
	  id	INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
	  street	TEXT,
	  city	TEXT,
	  zipcode	INTEGER);`,() => {
    console.log(`Create Table Profile Berhasil`);
  })

})
