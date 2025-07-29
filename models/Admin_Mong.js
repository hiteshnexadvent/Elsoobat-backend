const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({ name: { type: String, require: true }, email: { type: String, require: true }, pass: { type: String, require: true }, mobile: { type: String, require: true }, role: { type: String, default: 'admin' }, otp: String, otpExpires: Date });


const adminMong = mongoose.model('admins', adminSchema);

module.exports = adminMong;