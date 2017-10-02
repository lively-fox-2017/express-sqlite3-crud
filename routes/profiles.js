const express = require('express')
const router = express.Router()
const Profile = require('../models/profiles')

router.get('/', function(req,res) {
  Profile.getDataProfile((rows) => {
    res.render('profiles', {dataProfiles: rows})
  })
})

router.get('/addprofiles', function(req,res) {
  Profile.getDataProfile(() => {
    res.render('addprofiles')
  })
})

router.post('/addprofiles', function(req,res) {
  Profile.addDataProfile(req.body, () => {
    res.redirect('/profiles')
  })
})

router.get('/delete/:id', function(req,res) {
  Profile.deleteDataProfile(req.params.id, () => {
    res.redirect('/profiles')
  })
})

router.get('/edit/:id', function(req,res) {
  Profile.findDataById(req.params.id, (rows) => {
    res.render('editprofiles', {dataProfiles: rows})
    // res.send(rows)
  })
})

router.post('/edit/:id', function(req,res) {
  Profile.editDataProfile(req.body, req.params.id, () => {
    res.redirect('/profiles')
  })
})


module.exports = router
