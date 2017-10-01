var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Contact {
  constructor(){

  }
  static viewContacts(cb){
    db.all(`SELECT * FROM contacts`,(err,rows)=>{
      cb(err,rows)
    })
  }


  static addContacts(data,cb){
    db.run(`INSERT INTO contacts (name,company,telp_number,email) VALUES ('${data.name}','${data.company}','${data.telp_number}','${data.email}')`, function(){
      cb()
    })
  }

  static deleteContacts(data,cb){
    db.run(`DELETE FROM contacts WHERE id='${data.id}'`, function(){
      cb()
    })
  }

  static geteditContacts(data,cb){
    db.run(`SELECT * FROM contacts WHERE id='${data.id}'`, function(){
      cb()
    })
  }

  // static posteditContacts(data,cb){
  //   db.run(`UPDATE contact SET name='${data.name}',company='${data.company}',telp_number='${data.telp_number}',email='${data.email}' WHERE id='${data.id}'`, function(){
  //     cb()
  //   })
  // }

}

module.exports = Contact
