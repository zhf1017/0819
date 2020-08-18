var express = require('express');
var router = express.Router();
const handlers = require("./db");
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});
router.get('/stu_info', (req, res) => {
  handlers("student", "find", {}, (result) => {
    if (result.length > 0) {
      res.send({
        "msg": "success",
        "data": result
      })
    } else {
      res.send({
        "msg": "error"
      })
    }
  })
})

// 删除信息
router.post("/stu_del", (req, res) => {
  console.log(req.body);
  handlers("student", "delete",req.body, (result) => {
    if (result.deletedCount>0) {
      res.send({"msg":"success"})
    } else {
      res.send({
        "msg": "error"
      })
    }
  })
})

// 修改信息
router.post("/stu_change", (req, res) => {
  // console.log(req.body)
  var data = {
    name: req.body.name,
    age: Number(req.body.age),
    tel: req.body.tel,
    email: req.body.email,
    address: req.body.address,
    date: req.body.date
  }
  handlers("student", "update", [{_id:Number(req.body.account)}, data], (result) => {
    if (result.modifiedCount > 0) {
      res.send({
        "msg": "success"
      })
    } else {
      res.send({
        "msg": "error"
      })
    }
  })
})



module.exports = router;