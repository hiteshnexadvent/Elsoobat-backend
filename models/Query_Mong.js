const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({ name: { type: String, required: true }, email: { type: String, required: true }, mobile: { type: String, required: true }, country: { type: String, required: true }, city: { type: String, required: true }, message: { type: String, required: true } }, { timestamps: true });

const queryMong = mongoose.model('queries', querySchema);

module.exports = queryMong;
