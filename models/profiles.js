var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/database.db');

class Profile {
  constructor(){

  }

  static viewProfiles(cb){
    db.all(`SELECT * FROM profile`,(err,rows)=>{
      cb(err,rows)
    })
  }

  static addProfile(data,cb){
    db.run(`INSERT INTO profile (username,password) VALUES ('${data.username}','${data.password}')`, function(){
      cb()
    })
  }

  static deleteProfile(data,cb){
    db.run(`DELETE FROM profile WHERE id='${data.id}'`, function(){
      cb()
    })
  }


}




module.exports = Profile
