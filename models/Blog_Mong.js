const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({ title: { type: String, require: true }, para_one: { type: String, require: true }, para_two: { type: String, require: true }, image: { type: String, require: true } });

const blogMong = mongoose.model('blogs', blogSchema);

module.exports = blogMong;