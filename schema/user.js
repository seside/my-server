// 导入定义验证规则的包
const joi = require('joi')

// 定义验证注册和登录表单数据的规则对象
const username = joi
    .string()
    .alphanum()
    .min(1)
    .max(10)
    .required()
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()
exports.reg_login_schema = {
    body:{
        username,
        password
    }
}

//定义更新用户信息数据校验规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const u_email = joi.string().email().required()
exports.update_userinfo_schema = {
    //需要对req.body表单数据进行校验
    body:{
        id,
        nickname,
        email: u_email
    }
}

