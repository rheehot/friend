var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email:{type:String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    profileImage: String,
    groupCode: {type: String, default : null},
    refreshToken: {type: String, default : null},
    salt: String,
    admin : [{
        groupCode: {type: String, default:null},
    }],
    home:{
        lat:{type:String, default: null} , // 위도
        lon:{type:String, default:null},  // 경도
        location:{type: String, default :null}
    },
},{minimize: false})

module.exports = mongoose.model('user',userSchema)