var express = require('express');
var router = express.Router();
const users = require('../../../model/user');
var encryption = require('../../../module/encryption');

router.post('/', async (req,res)=>{
    const{name, password, email} = req.body;

    //1파라미터 체크
    if(!email || !password || !name){
        res.status(200).json({
            message:"필수 정보를 입력하세요"
        });
        return;
    }

    //2 아이디 중복 체크
    try{
        const result = await users.findOne({email:email},{_id:0,email:1})
        if(result){
            res.status(200).json({
                message:"이미 존재하는 이메일 입니다."
            })
            return;
        }
    }catch(err){
        if(err){
            res.status(200).json({
                message:"email server error."
            })
            return;
        }
    }

    //3 비밀번호 암호화
    const salt = encryption.salt();
    const key =encryption.makeCrypto(password,salt);

    //4 회원가입 완료
    var userModel = new users();
    userModel.email = email;
    userModel.name = name;
    userModel.password = key.toString('base64');
    userModel.salt = salt;
    userModel.save()
    .then((newUser)=>{
        res.status(200).json({
            message:"회원가입 완료"
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:"서버 에러"
        })
    })
    
})
module.exports =router;