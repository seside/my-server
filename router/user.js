const express = require('express')

// 创建路由对象
const router = express.Router()
// 导入用户处理函数对应的模块
const userHandler = require('../router_handler/user')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {reg_login_schema} = require('../schema/user')
// 一、注册新用户
router.post('/reguser',expressJoi(reg_login_schema),userHandler.regUser)
// 二、登录
router.post('/login',expressJoi(reg_login_schema),userHandler.login)

// 将路由对象暴露出去
module.exports = router