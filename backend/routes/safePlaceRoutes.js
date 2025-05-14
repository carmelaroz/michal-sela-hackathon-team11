const express = require('express');
const router = express.Router();
const safePlaceController = require('../controllers/safePlaceController');

router.get('/', safePlaceController.getAllSafePlaces);


module.exports = router;