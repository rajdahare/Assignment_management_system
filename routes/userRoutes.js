const express = require('express');
const { register, login, uploadAssignment, getAdmins } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/upload', authMiddleware('User'), uploadAssignment);
router.get('/admins', authMiddleware('User'), getAdmins);

module.exports = router;
