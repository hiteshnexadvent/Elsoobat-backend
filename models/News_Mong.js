const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({ email: { type: String, required: true } }, { timestamps: true });

const newsMong = mongoose.model('newsletter', newsSchema);

module.exports = newsMong;
