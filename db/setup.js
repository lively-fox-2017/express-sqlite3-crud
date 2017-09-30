var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db')

function createTable() {
    db.serialize(function () {
        let query = 'CREATE TABLE IF NOT EXISTS contacts(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name text,' +
            'company text,' +
            'telp_number text,' +
            'email text)'
        let querygroup = 'CREATE TABLE IF NOT EXISTS groups(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name_of_group text)'
        let queryprofile = 'CREATE TABLE IF NOT EXISTS profiles(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'username text,' +
            'password text)'
        let queryaddress = 'CREATE TABLE IF NOT EXISTS addresses(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'street text,' +
            'city text,' +
            'zipcode integer)'
        
        db.run(query, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Table contacts created');
            }
        })

        //
        db.run(querygroup, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Table groups created');
            }
        })
        db.run(queryprofile, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Table profiles created');
            }
        })
        db.run(queryaddress, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Table address created');
            }
        })

    })

    db.close()
}

createTable();
// /CREATE TABLE [IF NOT EXISTS] [schema_name].table_name (
//  column_1 data_type PRIMARY KEY,
//  column_2 data_type NOT NULL,
// column_3 data_type DEFAULT 0,
// table_constraint
// )