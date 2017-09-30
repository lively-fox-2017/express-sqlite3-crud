"use strict"

const Crud = require('./crud');

class Profiles extends Crud {
	constructor() {
		super('profiles', ['username', 'password']);
	}	
}

module.exports = Profiles;