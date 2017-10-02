const express = require('express')
const router = express.Router()
const Address = require('../models/addresses')

router.get('/', function(req,res) {
  Address.getDataAddress((rows) => {
    res.render('addresses', {dataAddress: rows})
  })
})

router.get('/addaddresses', function(req,res) {
  Address.getDataAddress(() => {
    res.render('addaddresses')
  })
})

router.post('/addaddresses', function(req,res) {
  Address.addDataAddress(req.body, () => {
    res.redirect('/addresses')
  })
})

router.get('/delete/:id', function(req,res) {
  Address.deleteDataAddress(req.params.id, () => {
    res.redirect('/addresses')
  })
})

router.get('/edit/:id', function(req,res) {
  Address.findDataById(req.params.id, (rows) => {
    res.render('editaddresses', {dataAddress: rows})
  })
})

router.post('/edit/:id', function(req,res) {
  Address.editDataAddress(req.body, req.params.id, () => {
    res.redirect('/addresses')
  })
})

module.exports = router
