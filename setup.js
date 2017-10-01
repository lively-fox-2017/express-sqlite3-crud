var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

db.serialize(() => {
  db.run(`CREATE TABLE Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(100), company VARCHAR(50), telp VARCHAR(20), email VARCHAR(50) )`, (err) => {
      console.log('Create Table Contacts Berhasil');
    });
  db.run(`CREATE TABLE Groups (id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_of_group VARCHAR(100) )`, () => {
      console.log('Create Table Groups Berhasil');
    });
  db.run(`CREATE TABLE Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(100), password VARCHAR(50) )`, () => {
      console.log('Create Table Profiles Berhasil');
    });
  db.run(`CREATE TABLE Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT,
    street VARCHAR(100), city VARCHAR(50), zipcode VARCHAR(15) )`, () => {
      console.log('Create Table Addresses Berhasil');
    });
})
