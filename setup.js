const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('dtbs.db')

db.serialize(function(){

    db.run(`CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50),
        company VARCHAR(50),
        telp_number VARCHAR(20),
        email VARCHAR(50)
    )`, function(){
        console.log('create table contacts oke!')
    })

    db.run(`CREATE TABLE IF NOT EXISTS Groups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_of_group VARCHAR(50)
    )`, function(){
        console.log('create table groups oke!')
    })

    db.run(`CREATE TABLE IF NOT EXISTS Profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50),
        password VARCHAR(50)
    )`, function(){
        console.log('create table profile oke!')
    })

    db.run(`CREATE TABLE IF NOT EXISTS Addresses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        street VARCHAR(50),
        city VARCHAR(50),
        zipcode VARCHAR(20)
    )`, function(){
        console.log('create table addresses oke!')
    })

})
