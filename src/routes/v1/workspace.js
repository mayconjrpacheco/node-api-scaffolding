'use strict';

const express = require('express');
const controller = require('../../controllers/v1/workspace')

let router = express.Router();
router.route('/').get(controller.get);
router.route('/').post(controller.post);
router.route('/').put(controller.put);
router.route('/').delete(controller.delete);
router.route('/:id').get(controller.getById);

module.exports = router;
