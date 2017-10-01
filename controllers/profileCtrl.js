const Profile = require('../models/profile');
const profile = new Profile();

class ProfileCtrl {
  static getProfiles(req, res) {
    profile.getProfiles().then((rows) => {
      res.render('show_list_profile', {
        title: 'Show profiles',
        data: rows,
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  static getProfile(req, res) {
    profile.getProfile(req.params).then((row) => {
      res.render('show_profile', {
        title: 'Show profile',
        data: row,
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  static postProfile(req, res) {
    profile.postProfile(req.body).then((val) => {
      res.redirect('/profiles');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static editProfile(req, res) {
    profile.editProfile(req.body).then((val) => {
      res.redirect('/profiles');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static deleteProfile(req, res) {
    profile.deleteProfile(req.params).then((val) => {
      res.redirect('/profiles');
    }).catch(reason => {
      console.log(reason);
    });
  }
}

module.exports = ProfileCtrl;
