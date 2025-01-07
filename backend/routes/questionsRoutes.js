const express = require('express');
const router = express.Router();
const { createQuestion, getAllQuestions, getQuestionById, deleteQuestion } = require('../controllers/questionsController');

router.post('/', createQuestion);
router.get('/', getAllQuestions);
router.get('/:id', getQuestionById);
router.delete('/:id', deleteQuestion);

module.exports = router;
