const express = require('express');
const router = express.Router();
const { createAnswer, deleteAnswer } = require('../controllers/answersController');

router.post('/', createAnswer);
router.delete('/:id', deleteAnswer);

module.exports = router;
