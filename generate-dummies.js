var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('contacts-groups.db');

db.serialize(function() {

  // Contacts
  db.run(`INSERT INTO contacts (name, company, phone_number, email) VALUES ('Dimitri Wahyudiputra', 'ZXCV', '081234567890', 'deathmitri@gmail.com')`);
  db.run(`INSERT INTO contacts (name, company, phone_number, email) VALUES ('Alexei Wahyudiputra', 'ZXCV', '081234567890', 'alexei@gmail.com')`);
  db.run(`INSERT INTO contacts (name, company, phone_number, email) VALUES ('Alexander Wahyudi', 'ZXCV', '081234567890', 'alexander@gmail.com')`);

  // Groups
  db.run(`INSERT INTO groups (name_of_group) VALUES ('Smoking Gang')`);

  // Profiles
  db.run(`INSERT INTO profiles (username, password) VALUES ('dimitri', 'irtimid')`);
  db.run(`INSERT INTO profiles (username, password) VALUES ('alexei', 'iexela')`);
  db.run(`INSERT INTO profiles (username, password) VALUES ('alexander', 'rednaxela')`);

  // Addresses
  db.run(`INSERT INTO addresses (street, city, zipcode) VALUES ('Random', 'Random', 12345)`);

  console.log('Successfully generated dummies!');

});