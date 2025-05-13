const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// SIGNUP
exports.signup = async (req, res) => {
    try {
    const {
        firstName,
        lastName,
        email,
        password,
        gender,
        socialUsername,
        address,
        maritalStatus,
        numberOfChildren,
        idNumber,
        birthDate,
        usageRole // 'user' or 'provider' from the frontend
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use.' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        gender,
        socialUsername,
        address,
        maritalStatus,
        numberOfChildren,
        idNumber,
        birthDate,
        role: usageRole, // 'user' or 'provider'
        isApproved: false // default
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully. Awaiting approval.' });

    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during signup.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the user is approved
    if (!user.isApproved) {
        return res.status(403).json({ message: 'User not approved yet' });
    }

    // Create JWT token
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        JWT_SECRET,
        { expiresIn: '1d' }
    );

    // Prepare user info to return (excluding password)
    const userInfo = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isApproved: user.isApproved,
    };

    // Send token + user info in response
    res.status(200).json({ user: userInfo, token });

    } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login.' });
    }
};