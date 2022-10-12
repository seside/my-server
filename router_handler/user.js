// 导入数据库操作模块
const db = require('../db/index')
// 导入 bcryptjs（用于登陆密码的加密和对比）
const bcrypt = require('bcryptjs')
// 导入生成token的包
const jwt = require('jsonwebtoken')
// 导入全局配置文件
const config = require('../config')

// 注册新用户的处理函数
exports.regUser = (req,res)=>{
    // a.获取客户端提交到服务器的表单数据
    const userinfo = req.body
    // b.表单数据校验（单纯的使用 if 校验效率低下，不易维护 =》使用 expressJoi中间件）
    // if(!userinfo.username || !userinfo.password){
    //     return res.send({
    //         code:1,
    //         message:'用户名密码不可为空！'
    //     })
    // }
    // c.查重校验
    const sqlStr1 = 'select id from ev_users where username=?'
    db.query(sqlStr1,[userinfo.username],(err,result)=>{
        // SQL 执行失败
        if(err){
            // return res.send({code:1,message:err.message})
            return res.cc(err)
        }
        // 判断用户是否被占用
        if(result.length>0){
            // return res.send({code:1,message:'用户名已被占用，请更换其他用户名'})
            return res.cc('用户名已被占用，请更换其他用户名')
        }
        //用户名可以使用，使用bcrypt，对明文密码进行加密
            // **bcryptjs对用户密码加密的优点：**
            // 1.加密后的密码无法被逆向破解
            // 2.同一明文密码多次加密，得到的加密结果不相同，保证了安全性
        userinfo.password = bcrypt.hashSync(userinfo.password,10)
        
        //定义插入新用户的 SQL 语句
        const sqlStr2 = 'insert into ev_users set ?'
        // d.最终插入新用户
        db.query(sqlStr2,{username:userinfo.username,password:userinfo.password},(err,result)=>{
            // 判断SQL语句是否执行成功
            // if(err) return res.send({code:1,message:err.message})
            if(err) return res.cc(err)
            // 判断影行数是否为1
            // if(result.affectedRows !== 1) return res.send({code:1,message:'注册用户失败，请稍后重试'})
            if(result.affectedRows !== 1) return res.cc('注册用户失败，请稍后重试')
            // 注册用户成功
            // res.send({code:0,message:'注册成功'})
            res.cc('注册成功',0)
        })
    
    })    
}

// 用户登录处理函数
exports.login = (req,res)=>{
    /** 实现步骤如下：
     * 检验表单数据是否合法
     * 根据用户名查询用户的数据
     * 判断用户输入的密码是否正确
     * 生成 JWT 的 token 字符串
    */
    const userinfo = req.body
    const sqlStr3 = 'select id,username,password,user_pic,nickname,email from ev_users where username=?'
    db.query(sqlStr3,userinfo.username,(err,result)=>{
        // 执行 SQL 语句失败
        if(err) return res.cc(err)
        // 执行 SQL 成功，但是查询的条数不等于1
        if(result.length !== 1) return res.cc('用户名不存在，请重试')
        // 判断用户输入的登录密码是否与数据库中的密码一致
        // console.log('---',result)
        const compareResult = bcrypt.compareSync(userinfo.password,result[0].password)
        if(!compareResult) return res.cc('密码错误，请重试')
        //密码和数据库中对比一致，登陆成功=》生成token字符串
        const user = {...result[0],password:'',user_pic:''}//使用ES6高级语法获取将敏感信息剔除后的用户信息
        // console.log('---',user)
        const tokenStr = jwt.sign(user,config.jwtSecretKey,{
            expiresIn:config.expiresIn,//定义 token 有效期为 10 小时
        })
        if(tokenStr){
            res.send({
                code:0,
                message:'登录成功',
                data:{
                    // 为了方便客户端使用 token，在服务端直接挂载
                    token:'Bearer '+tokenStr
                }
            })
        }
    })
    // res.send('login OK')
}

// 用户登出（自行设计）