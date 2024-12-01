const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const Assignment = require('../models/assignmentModel');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    let admin = await Admin.findOne({ username });
    if (admin) return res.status(400).json({ msg: 'Admin already exists' });

    admin = new Admin({ username, password: await bcrypt.hash(password, 10) });
    await admin.save();

    res.status(201).json({ msg: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ admin: req.user.id }).populate('userId', 'username');
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.acceptAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ msg: 'Assignment not found' });

    if (assignment.admin.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized action' });
    }

    assignment.status = 'Accepted';
    await assignment.save();
    res.json({ msg: 'Assignment accepted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ msg: 'Assignment not found' });

    if (assignment.admin.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Unauthorized action' });
    }

    assignment.status = 'Rejected';
    await assignment.save();
    res.json({ msg: 'Assignment rejected' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
