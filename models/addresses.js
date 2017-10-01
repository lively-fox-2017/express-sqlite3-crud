var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Address {
  constructor(){

  }

  static viewAddresses(cb){
    db.all(`SELECT * FROM addresses`, function(err,rows){
      cb(err,rows)
    })
  }

  static addAddresses(data,cb){
    db.run(`INSERT INTO addresses (street,city,zipcode) VALUES ('${data.street}','${data.city}','${data.zipcode}')`, function(){
      cb()
    })
  }

  static deleteAddresses(data,cb){
    db.run(`DELETE FROM addresses WHERE id = ${data.id}`, function(){
      cb()
    })
  }
}

module.exports = Address
