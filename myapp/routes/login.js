const express = require("express");
const router =express.Router();
const handlers=require("./db");

router.get('/',(req,res)=>{
    var data={
        name:req.query.name,
        psw:Number(req.query.psw)
    }
    handlers("teacher","find",data,(result)=>{
        if(result.length>0){
            res.send({"msg":"success"})
        }else{
            res.send({"msg":"error"})
        }
    })
})

module.exports=router;