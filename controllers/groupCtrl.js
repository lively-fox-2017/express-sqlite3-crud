const Group = require('../models/group');
const group = new Group();

class GroupCtrl {
  static getGroups(req, res) {
    group.getGroups().then((rows) => {
      res.render('show_list_group', {
        title: 'Show Groups',
        data: rows,
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  static getGroup(req, res) {
    group.getGroup(req.params).then((row) => {
      res.render('show_group', {
        title: 'Show Group',
        data: row,
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  static postGroup(req, res) {
    group.postGroup(req.body).then((val) => {
      res.redirect('/groups');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static editGroup(req, res) {
    group.editGroup(req.body).then((val) => {
      res.redirect('/groups');
    }).catch(reason => {
      console.log(reason);
    });
  }

  static deleteGroup(req, res) {
    group.deleteGroup(req.params).then((val) => {
      res.redirect('/groups');
    }).catch(reason => {
      console.log(reason);
    });
  }
}

module.exports = GroupCtrl;
