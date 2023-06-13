const router = require("express").Router()
const {newVisitor, visitorLogin} = require('../controllers/visitorsController')


router.post('/register', newVisitor)
router.post('/login', visitorLogin)


module.exports = router