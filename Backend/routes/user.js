const express = require('express');
const { getProfile, updateProfile, deleteAccount } = require('../controllers/userController.js');
const { protect } = require('../middlewares/authMiddleware.js');

const router = express.Router();

router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);
router.delete('/me', protect, deleteAccount);


module.exports = router;