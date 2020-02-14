var mongoose = require('mongoose');


const MailSchema = new mongoose.Schema({
  name: {type: String, default: null},
  to: {type: String, default: null},
  from: {type:String, default: null},
  subject: String,
  text: String
});

module.exports = mongoose.model('Mail', MailSchema);
