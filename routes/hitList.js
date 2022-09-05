const express = require('express')
const router = express.Router()
const hitlistController = require('../controllers/hitList') 
const { ensureAuth } = require('../middleware/auth')


router.put('/hitListUp', hitlistController.hitListUp)

router.put('/hitListDown', hitlistController.hitListDown)

module.exports = router