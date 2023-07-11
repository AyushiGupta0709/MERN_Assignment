const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 name: { 
    type: String, required: true },
 gender: {
    type: String, required: true 
    },
 email: { 
    type: String, required: true
 },
 mobile: { 
    type: String, required: true
 },
 category: { 
    type: String,
 },
 technology: [{ 
    type: String
 }],
 profilePicture: { 
    type: String
 },
});

module.exports = mongoose.model('UsersRegistration', userSchema);
