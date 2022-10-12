const db = require('../db/index')
exports.getUserInfo = (req,res)=>{
    const sqlStr1 = 'select id,username,nickname,email,user_pic from ev_users where id=?'
    // console.log('---***',req)//中间件会自动挂载req.auth;不同版本，在此取值方法不同
    db.query(sqlStr1,req.auth.id,(err,result)=>{
        if(err) return res.cc(err)
        if(result.length !== 1) return res.cc('查询失败')
        res.send({
            code:0,
            message:'获取用户信息成功',
            data:result[0]
        })
    })
}
exports.updateUserInfo = (req,res)=>{
    const sqlStr2 = 'update ev_users set ? where id=?'
    // 用数组的方式给多个占位符传参
    db.query(sqlStr2,[req.body,req.body.id],(err,result)=>{
        if(err) return res.cc(err)
        if(result.affectedRows !== 1) return res.cc('修改用户信息失败')
        res.cc('修改用户信息成功',0)
    })
}