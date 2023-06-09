const mongoose = require('mongoose');

const Sign = new mongoose.Schema({
    email: {
       type : String,
       required : true 
    },
    username: {
        type : String,
       required : true 
    },
    password: {
        type : String,
       required : true 
    },
    confirmpassword: {
        type : String,
        required : true 
    }
})

module.exports = mongoose.model('sign',Sign);