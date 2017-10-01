var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Address {
  getAddresses() {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM addresses';
      db.all(selectQuery, (err, rows) => {
        if (!err)
          resolve(rows);
        else
          reject(err);
      });
    });
  }

  getAddress(param) {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM addresses WHERE id = $id';
      db.get(selectQuery, {
        $id: param.addressId,
      }, (err, row) => {
        if (!err)
          resolve(row);
        else
          reject(err);
      });
    });
  }

  postAddress(postData) {
    let insertQuery = "INSERT INTO addresses (street, city, zipcode) VALUES (?, ?, ?)";
    return new Promise((resolve, reject) => {
      db.run(insertQuery, [postData.street, postData.city, postData.zipcode], (err) => {
        if (!err)
          resolve(insertQuery);
        else
          reject(err);
      });
    });
  }

  editAddress(postData) {
    let updateQuery = "UPDATE addresses SET street = $street, city = $city, " +
      "zipcode = $zipcode WHERE id = $id";
    return new Promise((resolve, reject) => {
      db.run(updateQuery, {
        $street: postData.street,
        $city: postData.city,
        $zipcode: postData.zipcode,
        $id: postData.id,
      }, err => {
        if (!err)
          resolve(updateQuery);
        else
          reject(err);
      });
    });
  }

  deleteAddress(param) {
    let deleteQuery = "DELETE FROM addresses WHERE id = $id";
    return new Promise((resolve, reject) => {
      db.run(deleteQuery, {
        $id: param.addressId,
      }, err => {
        if (!err)
          resolve(deleteQuery);
        else
          reject(err);
      });
    });
  }
}

module.exports = Address;
