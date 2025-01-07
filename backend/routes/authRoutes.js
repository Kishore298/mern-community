const express = require('express');
const { registerUser, loginUser, forgotPassword, resetPasswordToken, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);

module.exports = router;
