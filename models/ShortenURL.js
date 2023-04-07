const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ShortenURLSchema = new mongoose.Schema({
  ori_url: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  new_url: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('ShortenURL', ShortenURLSchema);