const Contact = require('../models/contact');
const contact = new Contact();

class ContactCtrl {
  static getContacts(req, res) {
    contact.getContacts().then((rows) => {
      res.render('show_list_contact', {
        title: 'Show Contacts',
        data: rows,
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  static getContact(req, res) {
    contact.getContact(req.params).then((row) => {
      res.render('show_contact', {
        title: 'Show Contact',
        data: row,
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  static postContact(req, res) {
    contact.postContact(req.body).then((val) => {
      res.redirect('/contacts');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static editContact(req, res) {
    contact.editContact(req.body).then((val) => {
      res.redirect('/contacts');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static deleteContact(req, res) {
    contact.deleteContact(req.params).then((val) => {
      res.redirect('/contacts');
    }).catch(reason => {
      console.log(reason);
    });
  }
}

module.exports = ContactCtrl;
