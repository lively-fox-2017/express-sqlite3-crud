"use strict"

const Profiles = require('./../models/profiles');

class ProfilesController {
	constructor() {
		this._profiles = new Profiles();
	}

	createProfile(req, res) {
		let columnValues = [req.body.username, req.body.password];

		this._profiles.createRecord(columnValues)
					.then(() => {
						res.redirect('/profiles');
					})
					.catch(err => {
						throw err;
					});
	}

	serveProfiles(req, res) {
		this._profiles.readRecords()
					.then(records => {
						res.render('profiles', {records});
					})
					.catch(err => {
						throw err;
					});
	}

	serveProfile(req, res) {
		this._profiles.readRecord(req.params.id)
					.then(record => {
						res.render('profile-edit', {record});
					})
					.catch(err => {
						throw err;
					});
	}

	updateProfile(req, res) {
		let columnValues = [req.body.username, req.body.password];
		this._profiles.updateRecord(columnValues, req.params.id)
					.then(() => {
						res.redirect('/profiles');
					})
					.catch(err => {
						throw err;
					});
	}

	deleteProfile(req, res) {
		this._profiles.deleteRecord(req.params.id)
					.then(() => {
						res.redirect('/profiles');
					})
					.catch(err => {
						throw err;
					});
	}
}

module.exports = ProfilesController;