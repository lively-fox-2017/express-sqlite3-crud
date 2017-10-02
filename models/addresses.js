const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/database.db')

class Address {
  constructor() {

  }

static getDataAddress(callback) {
  db.all(`SELECT * FROM Addresses`, (err,rows) => {
    if (!err) {
      callback(rows)
      } else {
        console.log(err);
      }
    })
  }

static addDataAddress(param,callback) {
  db.run(`INSERT INTO Addresses (street,city,zipcode)
  VALUES ('${param.street}','${param.city}','${param.zipcode}')`, (err) => {
    if (!err) {
      callback()
    } else {
      console.log(err);
    }
  })
}

static deleteDataAddress(param,callback) {
  db.run(`DELETE FROM Addresses WHERE id = ${param}`, (err,rows) => {
    if (!err) {
      callback(rows)
    } else {
      console.log(err);
    }
  })
}

static findDataById(param, callback) {
  db.all(`SELECT * FROM Addresses WHERE id = ${param}`, (err,rows) => {
    if (!err) {
      callback(rows)
    } else {
      console.log(err);
    }
  })
}

static editDataAddress(body,param, callback) {
  db.run(`UPDATE Addresses SET
    street = '${body.street}',
    city = '${body.city}',
    zipcode = '${body.zipcode}' WHERE id = '${param}'`, (err) => {
      if (!err) {
        callback()
      } else {
        console.log(err);
      }
    })
}

}

module.exports = Address
