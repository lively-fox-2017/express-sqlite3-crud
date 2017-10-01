var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');


	db.run("Create table if not exists Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT);", function(err){
		if(err){
			console.log(err + 'ini create tabel')
		}else{
			console.log('Table Contacts berhasil dibuat')
		}
	});

	db.run("Create table if not exists Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group TEXT );", function(err){
		if(err){
			console.log(err + 'ini create tabel')
		}else{
			console.log('Table Groups berhasil dibuat')
		}
	});

	db.run("Create table if not exists Addres (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zipcode TEXT );", function(err){
		if(err){
			console.log(err + 'ini create tabel')
		}else{
			console.log('Table Addres berhasil dibuat')
		}
	});

	db.run("Create table if not exists Profile (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT );", function(err){
		if(err){
			console.log(err + 'ini create tabel')
		}else{
			console.log('Table Profile berhasil dibuat')
		}
	});

	db.run(`insert into Contacts ( name, company, telp_number, email) values ('wisnu', 'hacktiv8', 'oke', 'oke.com')`, function(err){
			if(err){
			console.log(err + 'ini insert data')
		}
		else{
			console.log('oke')
		}
	})

	db.run(`insert into Profile (username, password) values ('wisnu', '123')`, function(err){
			if(err){
			console.log(err + 'ini insert data')
		}
		else{
			console.log('oke')
		}
	})

	db.run(`insert into Groups ( name_of_group) values ('Junior Developer')`, function(err){
			if(err){
			console.log(err + 'ini insert data')
		}
		else{
			console.log('oke')
		}
	})

	db.run(`insert into Addres ( street, city, zipcode) values ('Jl. Pondok Indah', 'Jak-Sel', '12310')`, function(err){
			if(err){
			console.log(err + 'ini insert data')
		}
		else{
			console.log('oke')
		}
	})
	
	// db.run("Create table groups (id INTEGER, name_of_group TEXT);", function(err){
	// 	if(err){	
	// 		console.log(err)
	// 	}else{
	// 		console.log('Table groups berhasil dibuat')
	// 	}
	// });
	// db.run("Create table profile (id INTEGER, username TEXT, password TEXT);", function(err){
	// 	if(err){
	// 		console.log(err)
	// 	}else{
	// 		console.log('Table profile berhasil dibuat')
	// 	}
	// });
	// db.run("Create table addresses (id INTEGER, street TEXT, city TEXT, zipcode INTEGER);", function(err){
	// 	if(err){
	// 		console.log(err)
	// 	}else{
	// 		console.log('Table addresses berhasil dibuat')
	// 	}
	// });

	// db.run('insert into contacts (id, name, company, telp_number, email) values (1, oke, oke, oke, oke))')

	// db.all('Select * from contacts', function(err, rows){
	// 	console.log(rows)
	// })


