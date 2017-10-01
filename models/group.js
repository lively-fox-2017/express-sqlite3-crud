var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

class Group {
  getGroups() {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM groups';
      db.all(selectQuery, (err, rows) => {
        if (!err)
          resolve(rows);
        else
          reject(err);
      });
    });
  }

  getGroup(param) {
    return new Promise((resolve, reject) => {
      let selectQuery = 'SELECT * FROM groups WHERE id = $id';
      db.get(selectQuery, {
        $id: param.groupId,
      }, (err, row) => {
        if (!err)
          resolve(row);
        else
          reject(err);
      });
    });
  }

  postGroup(postData) {
    let insertQuery = "INSERT INTO groups (name_of_group) VALUES (?)";
    return new Promise((resolve, reject) => {
      db.run(insertQuery, [postData.name_of_group], (err) => {
        if (!err)
          resolve(insertQuery);
        else
          reject(err);
      });
    });
  }

  editGroup(postData) {
    let updateQuery = "UPDATE groups SET name_of_group = $name_of_group WHERE id = $id";
    return new Promise((resolve, reject) => {
      db.run(updateQuery, {
        $name_of_group: postData.name_of_group,
        $id: postData.id,
      }, err => {
        if (!err)
          resolve(updateQuery);
        else
          reject(err);
      });
    });
  }

  deleteGroup(param) {
    let deleteQuery = "DELETE FROM groups WHERE id = $id";
    return new Promise((resolve, reject) => {
      db.run(deleteQuery, {
        $id: param.groupId,
      }, err => {
        if (!err)
          resolve(deleteQuery);
        else
          reject(err);
      });
    });
  }
}

module.exports = Group;
