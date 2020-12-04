const express = require('express');
const rectangleController = require('../controller/rectangleController');

const router = express.Router();

router.get('/', rectangleController.get);
router.post('/', rectangleController.create);
router.post('/delete', rectangleController.delete);
router.post('/update', rectangleController.update);


module.exports = router;
