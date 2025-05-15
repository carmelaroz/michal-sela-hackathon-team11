const express = require('express');
const { deletePlace, updatePlace, getPlace } = require('../controllers/safePlaceController');

const router = express.Router();

router.delete('/:id', deletePlace);
router.patch('/:id', updatePlace);
router.get('/:id', getPlace)

module.exports = router;