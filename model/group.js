var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = new Schema({
    name:{type: String, required:true},
    groupCode:{type: String, unique: true},
    location:{
        lat:{type: String, default: null},
        lon:{type: String, default: null},
        locationName:{type: String, default:null}
    },
    adminId:{type:String, required:true}
})

module.exports = mongoose.model('group', groupSchema)