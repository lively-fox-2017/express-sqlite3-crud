var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('contacts-groups.db');

db.serialize(function() {

  // Contacts
  db.run('CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, phone_number TEXT UNIQUE, email TEXT UNIQUE)');

  // Groups
  db.run('CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT UNIQUE)');

  // Profiles
  db.run('CREATE TABLE IF NOT EXISTS profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)');

  // Addresses
  db.run('CREATE TABLE IF NOT EXISTS addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode INTEGER)');

  console.log('Successfully generated the tables!');

});