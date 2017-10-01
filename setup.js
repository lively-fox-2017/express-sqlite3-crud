var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

db.serialize(function() {
  db.run(`CREATE TABLE contacts IF NOT EXISTS (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255),company VARCHAR(255),telp_number VARCHAR(255),email VARCHAR(255))`, () =>{
    console.log('Table Contacts Berhasil Dibuat');
  });
  db.run(`CREATE TABLE groups IF NOT EXISTS (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group VARCHAR(255))`, () =>{
    console.log('Table Groups Berhasil Dibuat');
  });
  db.run(`CREATE TABLE profile IF NOT EXISTS (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(255), password VARCHAR(255))`, () =>{
    console.log('Table Profile Berhasil Dibuat');
  });
  db.run(`CREATE TABLE addresses IF NOT EXISTS (id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR(255), city VARCHAR(255), zipcode VARCHAR(255))`, () =>{
    console.log('Table Addresses Berhasil Dibuat');
  });
});
