const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const phonesSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:false
    }
})

module.exports = phonesSchema;