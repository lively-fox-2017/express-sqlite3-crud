"use strict"

const Crud = require('./crud');

class Addresses extends Crud {
	constructor() {
		super('addresses', ['street', 'city', 'zipcode']);
	}	
}

module.exports = Addresses;