const Address = require('../models/address');
const address = new Address();

class AddressCtrl {
  static getAddresses(req, res) {
    address.getAddresses().then((rows) => {
      res.render('show_list_address', {
        title: 'Show addresses',
        data: rows,
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  static getAddress(req, res) {
    address.getAddress(req.params).then((row) => {
      res.render('show_address', {
        title: 'Show address',
        data: row,
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  static postAddress(req, res) {
    address.postAddress(req.body).then((val) => {
      res.redirect('/addresses');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static editAddress(req, res) {
    address.editAddress(req.body).then((val) => {
      res.redirect('/addresses');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static deleteAddress(req, res) {
    address.deleteAddress(req.params).then((val) => {
      res.redirect('/addresses');
    }).catch(reason => {
      console.log(reason);
    });
  }
}

module.exports = AddressCtrl;
