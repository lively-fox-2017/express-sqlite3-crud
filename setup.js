var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');

db.serialize(()=> {
  db.run("CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT)");
  console.log('table Contacts created');
});

db.serialize(()=> {
  db.run("CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");
  console.log('table Groups created');
});

db.serialize(()=> {
  db.run("CREATE TABLE IF NOT EXISTS Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
  console.log('table Profile created');
});

db.serialize(()=> {
  db.run("CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode INTEGER)");
  console.log('table Profile created');
});
