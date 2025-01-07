const express = require('express');
const {
  getAllDevelopers,
  getDeveloperById,
} = require('../controllers/developerController');

const router = express.Router();

router.get('/developers', getAllDevelopers);
router.get('/developers/:id', getDeveloperById);

module.exports = router;
