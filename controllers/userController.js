const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Assignment = require('../models/assignmentModel');
const Admin = require('../models/adminModel');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, password: await bcrypt.hash(password, 10) });
    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.uploadAssignment = async (req, res) => {
    const { task, adminName } = req.body; // Assume `adminName` is passed in the request body
    try {
      const admin = await Admin.findOne({ username: adminName }); // Find admin by name
      if (!admin) return res.status(404).json({ msg: 'Admin not found' });
  
      const assignment = new Assignment({
        userId: req.user.id,  // Authenticated user
        task,
        admin: admin._id      // Store the admin's ID internally
      });
  
      await assignment.save();
      res.status(201).json({ msg: 'Assignment uploaded successfully' });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  };

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
