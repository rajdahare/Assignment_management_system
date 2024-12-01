const express = require('express');
const { register, login, getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/assignments', authMiddleware('Admin'), getAssignments);
router.post('/assignments/:id/accept', authMiddleware('Admin'), acceptAssignment);
router.post('/assignments/:id/reject', authMiddleware('Admin'), rejectAssignment);

module.exports = router;
