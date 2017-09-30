"use strict"

const Addresses = require('./../models/addresses')

class AddressesController {
	constructor() {
		this._addresses = new Addresses();
	}
	createAddress(req, res) {
		let columnValues = [req.body.street, req.body.city, req.body.zipcode];

		this._addresses.createRecord(columnValues)
						.then(() => {
							res.redirect('/addresses');
						})
						.catch(err => {
							throw err;
						});
	}

	serveAddresses(req, res) {
		this._addresses.readRecords()
						.then(records => {
							res.render('addresses', {records});
						})
						.catch(err => {
							throw err;
						});
	}

	serveAddress(req, res) {
		this._addresses.readRecord(req.params.id)
						.then(record => {
							res.render('address-edit', {record});
						})
						.catch(err => {
							throw err;
						});
	}

	updateAddress(req, res) {
		let columnValues = [req.body.street, req.body.city, req.body.zipcode];

		this._addresses.updateRecord(columnValues, req.params.id)
						.then(() => {
							res.redirect('/addresses');
						})
						.catch(err => {
							throw err;
						});
	}

	deleteAddress(req, res) {
		this._addresses.deleteRecord(req.params.id)
						.then(() => {
							res.redirect('/addresses');
						})
						.catch(err => {
							throw err;
						});
	}
}

module.exports = AddressesController;