var sqlite3= require ('sqlite3');
var db=new sqlite3.Database('./db/database.db')

db.serialize(function(){
  db.run("CREATE TABLE Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT,name VARCHAR(255),company VARCHAR(255),telp_number VARCHAR(255),email VARCHAR(255))",()=>{
    console.log('Table Contacts berhasil dibuat!');
  })
  db.run("CREATE TABLE Groups (id INTEGER PRIMARY KEY AUTOINCREMENT,name_of_group VARCHAR(255))",()=>{
    console.log('Table Groups berhasil dibuat!')
  })
  db.run("CREATE TABLE Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(255),password VARCHAR(255))",()=>{
    console.log('Table Profiles berhasil dibuat!')
  })
  db.run("CREATE TABLE Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT,street VARCHAR(255),city VARCHAR(255),zipcode INTEGER(25))",()=>{
    console.log('Table Addresses berhasil dibuat!')
  })

})
