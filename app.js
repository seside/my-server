// 导入express模块
const express = require('express')
// 导入配置文件
const config = require('./config')

// 创建express的服务器实例
const app = express()

// 配置cors跨域中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单解析中间件
const bodyParser = require('body-parser')
// 解析json数据格式
app.use(bodyParser.json()); 
// 解析form表单提交的数据application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//封装响应数据中间件（一定要在路由模块之前封装）
app.use((req,res,next)=>{
    // code=1 默认表示失败的情况
    // err 的值可能是一个错误对象，也有可能是一个自定义字符串
    res.cc = (err,code=1)=>{
        res.send({
            code,
            message:err instanceof Error ? err.message : err
        })
    }
    //把扭转关系传递给下一级
    next()
})

//一定要在路由之前配置解析token的中间件（unless中规定只有/api开头的接口访问不需要token鉴权，其他的都需要鉴权）
const { expressjwt: jwt } = require('express-jwt')
app.use(jwt({
    secret:config.jwtSecretKey,
    algorithms: ["HS256"],//required
}).unless({
    path:[/^\/api\//]
}))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api',userRouter)
// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my',userinfoRouter)

// 定义错误级别的中间件
const joi = require('joi')
app.use((err,req,res,next)=>{
    // 验证失败导致的错误
    if(err instanceof joi.ValidationError) return res.cc(err)
    // 身份认证失败后的错误（给出特定的状态值，方便前端做跳转）
    if(err.name === 'UnauthorizedError') return res.cc('身份认证失败，请重新登录！',2)
    // 未知的错误
    res.cc(err)
})

// 启动服务器
app.listen(3007,()=>{
    console.log('api server running at http://127.0.0.1:3007')
})
