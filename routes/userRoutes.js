const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

// Signup route
router.post('/signup', UserController.create);
// Login route
router.post('/login', UserController.login);
// Update password 
router.put('/update-password', UserController.authenticateToken, UserController.updatePassword);
// Update phone 
router.put('/update-phone', UserController.authenticateToken, UserController.updatePhone);
// Update first name 
router.put('/update-firstName', UserController.authenticateToken, UserController.updateFirstName);
// Update last name 
router.put('/update-lastName', UserController.authenticateToken, UserController.updateLastName);
module.exports = router;
