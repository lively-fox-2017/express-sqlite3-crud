"use strict"

const Contacts = require('./../models/contacts')

class ContactsController {
	constructor() {
		this._contacts = new Contacts();
	}
	createContact(req, res) {
		let columnValues = [req.body.name, req.body.company, req.body.telp_number, req.body.email];

		this._contacts.createRecord(columnValues)
						.then(() => {
							res.redirect('/contacts');
						})
						.catch(err => {
							throw err;
						});
	}

	serveContacts(req, res) {
		this._contacts.readRecords()
						.then(records => {
							res.render('contacts', {records});
						})
						.catch(err => {
							throw err;
						});
	}

	serveContact(req, res) {
		this._contacts.readRecord(req.params.id)
						.then(record => {
							res.render('contact-edit', {record});
						})
						.catch(err => {
							throw err;
						});
	}

	updateContact(req, res) {
		let columnValues = [req.body.name, req.body.company, req.body.telp_number, req.body.email];

		this._contacts.updateRecord(columnValues, req.params.id)
						.then(() => {
							res.redirect('/contacts');
						})
						.catch(err => {
							throw err;
						});
	}

	deleteContact(req, res) {
		this._contacts.deleteRecord(req.params.id)
						.then(() => {
							res.redirect('/contacts');
						})
						.catch(err => {
							throw err;
						});
	}
}

module.exports = ContactsController;