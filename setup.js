const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')

db.serialize((err, rows) => {
  db.run('create table if not exists Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name STRING, company STRING, telp_number STRING, email STRING)')
    if (err) {
      console.log('Error!')
    }
      console.log('Table created!!')

  db.run('create table if not exists Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group STRING)')
    if (err) {
      console.log('Error!')
    }
      console.log('Table created!!')

  db.run('create table if not exists Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username STRING, password STRING)')
    if (err) {
      console.log('Error!')
    }
      console.log('Table created!!')

  db.run('create table if not exists addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street STRING, city STRING, zipcode INTEGER)')
    if (err) {
      console.log('Error!')
    }
      console.log('masuk sini!!')
})