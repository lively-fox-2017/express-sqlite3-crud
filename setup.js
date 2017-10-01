var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

class Setup {
   createTable(){
    let sqlq = "CREATE TABLE  IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT  , name STRING , company STRING , telp_number STRING , email STRING )"
    db.run(sqlq, (err)=>{
      if(err){
        console.log(err);
      }
    });

    sqlq = "CREATE TABLE  IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT   , name_of_group STRING )"
    db.run(sqlq, (err)=>{
      if(err){
        console.log(err);
      }
    });

    sqlq = "CREATE TABLE  IF NOT EXISTS Profiles (id INTEGER PRIMARY KEY AUTOINCREMENT   , username STRING  , password STRING)"
    db.run(sqlq, (err)=>{
      if(err){
        console.log(err);
      }
    });

    sqlq = "CREATE TABLE  IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT   ,street STRING  , city STRING , zipcode INTEGER)"
    db.run(sqlq, (err)=>{
      if(err){
        console.log(err);
      }
    });

    db.close()
  }
}

module.exports = Setup;
