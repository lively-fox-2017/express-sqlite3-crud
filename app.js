// load the things we need
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data/data.db')

// set the view engine to ejs
app.set('view engine', 'ejs');

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// load css
app.use(express.static(__dirname+'/views'))


// index page
app.get('/', (req, res) => {
	//res.send ('hello world')
	res.render('index')
})

//*** contact page // read
app.get('/contacts',(req,res) =>{

	db.all('select * from Contacts', function(err, row){
		if(err){
			console.log('db load error')
		}else{
			res.render('contacts',{dataJsonContact:row})
		}
	})

})

// contact page // create
app.post('/contacts',(req,res) =>{

	db.run(`insert into Contacts(name, company, telp_number, email) VALUES ('${req.body.nama}','${req.body.company}','${req.body.notlp}','${req.body.email}')`)
	res.redirect('contacts')
	console.log(req.body)
})

//contact page // update => ambil edit
app.get('/contacts/edit/:id',(req,res) =>{
	db.all(`select * from Contacts where id="${req.param('id')}"`, function(err, row){
		//console.log(row)
		res.render('contact-edit',{dataJsonContact:row})
	})
})

//contact page // update => hasil edit
app.post('/contacts/edit/:id',(req,res) => {
	// update table-name SET column-name = '${value}', column-name = '${value}' where condition
	db.all(`update Contacts set name ='${req.body.nama}',company ='${req.body.company}',telp_number ='${req.body.notlp}',email ='${req.body.email}' where id='${req.param('id')}'`, function(err,row){
		res.redirect('../../contacts')
	})
})

//contact page // delete
app.get('/contacts/delete/:id',(req,res) => {
	db.all(`delete from Contacts where id="${req.param('id')}"`,(err,row) =>{
		console.log('deleted from Contacts')
		res.redirect('../../contacts')
	})
})



//*** groups page // read
app.get('/groups',(req,res) =>{
	db.all('select * from Groups', function(err, row){
		if(err){
			console.log('db load error')
		}else{
			res.render('groups',{dataJsonGroups:row})
		}
	})
})

// groups page // create
app.post('/groups',(req,res) =>{

	db.run(`insert into Groups(name_of_group) VALUES ('${req.body.nameOfGroups}')`)
	res.redirect('groups')
	console.log(req.body)
})

// groups page // update => ambil edit
app.get('/groups/edit/:id',(req,res) =>{
	db.all(`select * from Groups where id="${req.param('id')}"`, function(err, row){
		//console.log(row)
		res.render('groups-edit',{dataJsonGroups:row})
	})
})

// groups page // update => hasil edit
app.post('/groups/edit/:id',(req,res) => {
	// update table-name SET column-name = '${value}', column-name = '${value}' where condition
	db.all(`update Groups set name_of_group ='${req.body.nameOfGroups}' where id='${req.param('id')}'`, function(err,row){
		res.redirect('../../groups')
	})
})

// groups page // delete
app.get('/groups/delete/:id', (req,res) =>{
	db.all(`delete from Groups where id="${req.param('id')}"`,(err,row)=>{
		console.log('deleted from Groups')
		res.redirect('../../groups')
	})
})


//*** addresses page
app.get('/addresses',(req,res) =>{
	res.render('addresses')
})

// profiles page
app.get('/profiles',(req,res) =>{
	res.render('profiles')
})

// express SERV
app.listen(3000, () => {
	console.log('your serv listening on port 3000!')
})
