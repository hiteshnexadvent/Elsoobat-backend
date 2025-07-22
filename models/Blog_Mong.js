const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({ title: { type: String, required: true }, para_one: { type: String, required: true }, para_two: { type: String, required: true }, image: { type: String, required: true } });

const blogMong = mongoose.model('blogs', blogSchema);

module.exports = blogMong;