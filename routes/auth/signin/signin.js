var express = require('express');
var router = express.Router();
var encryption = require('../../../module/encryption');
const users = require('../../../model/user');
const jwt = require('../../../module/jwt');


router.post('/', async (req,res)=>{
    const {email, password} = req.body;

    //1 파라미터 쳌
    if(!email || !password){
        res.status(400).json({
            message:"아이디 비밀번호를 입력 해 주세요."
        })
        return;
    }
    //2 이메일 체크
    try{
        var result = await users.findOne({email:email});
        if(!result){
            res.status(403).json({
                message:"존재하지 않는  이메일입니다."
            })
            return;
        }
    }catch{
        res.status(500).json({
            message:"이메일 체크 오류"
        })
        return;
    }

    //3 비밀번호 체크
    try{
        const userData= await users.findOne({email:email});
        const dbPw = (encryption.makeCrypto(password, userData.salt)).toString('base64');
        if(dbPw == userData.password){
            const result = jwt.sign(userData);
            const data = await users.findOneAndUpdate({email:email},{$set:{refreshToken:result.refreshToken}}, {new:true})
            res.status(200).json({
                message:"로그인 성공",
                data:result
            })
            return;
        }

        if(dbPw != password){
            res.status(403).json({
                message:"비밀번호가 다릅니다."
            })
            return;
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"server error"
        })
        return;
    }
})

module.exports = router;