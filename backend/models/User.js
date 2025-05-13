const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // Should be hashed before saving
    gender: String,
    socialUsername: String,
    address: String,
    maritalStatus: String,
    numberOfChildren: Number,
    idNumber: String,
    birthDate: Date,
    role: {
        type: String,
        enum: ['user', 'provider', 'admin'],
        default: 'user'
    },
    isApproved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', userSchema);