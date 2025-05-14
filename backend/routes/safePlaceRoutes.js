const express = require('express');
const { deletePlace, updatePlace, getPlace } = require('../controllers/safePlaceController');

const router = express.Router();

router.delete('/', deletePlace);
router.patch('/', updatePlace);
router.get('/', getPlace)

module.exports = router;