const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/database.db')

class Profile {
  contructor() {

  }

  static getDataProfile(callback){
    db.all(`SELECT * FROM Profiles`, (err,rows) => {
      if (!err) {
        callback(rows)
      } else {
        console.log(err);
      }
    })
  }

  static addDataProfile(param,callback) {
    db.run(`INSERT INTO Profiles (username,password)
    VALUES ('${param.username}','${param.password}')`, (err) => {
      if (!err) {
        callback()
      } else {
        console.log(err);
      }
    })
  }

  static deleteDataProfile(param,callback) {
    db.run(`DELETE FROM Profiles WHERE id = ${param}`, (err,rows) => {
      if (!err) {
        callback(rows)
      } else {
        console.log(err);
      }
    })
  }

  static findDataById(param, callback) {
    db.all(`SELECT * FROM Profiles WHERE id = ${param}`, (err,rows) => {
      if (!err) {
        callback(rows)
      } else {
        console.log(err);
      }
    })
  }

  static editDataProfile(body,param, callback) {
    db.run(`UPDATE Profiles SET
    username = '${body.username}',
    password ='${body.password}' WHERE id='${param}'`, (err) => {
            if (!err) {
                callback()
            } else {
                console.log(err)
            }
        })
  }

}

module.exports = Profile
