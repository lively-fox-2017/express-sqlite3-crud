const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/database.db')

db.serialize(()=>{
  db.run(`CREATE TABLE IF NOT EXISTS tb_contact(id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR (100), company VARCHAR(255), tlp_number VARCHAR (50), email VARCHAR (100))`);
  db.run(`CREATE TABLE IF NOT EXISTS tb_profile (id INTEGER PRIMARY KEY AUTOINCREMENT,
          username VARCHAR (100), password VARCHAR (100))`);
  db.run(`CREATE TABLE IF NOT EXISTS tb_group (id INTEGER PRIMARY KEY AUTOINCREMENT,
          names_of_groups VARCHAR(100))`);
  db.run(`CREATE TABLE IF NOT EXISTS tb_address (id INTEGER PRIMARY KEY AUTOINCREMENT,
          street VARCHAR (255), city VARCHAR (255), zipcode VARCHAR (100))`);
});
