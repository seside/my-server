// 引入校验包
const joi = require('joi')
// 定义校验规则
const articleId = joi.number().required()
const articleName = joi.string().min(1).max(30).required()
const aliasName = joi.string().alphanum().min(1).max(30).required()// alphanum (只能包含字母和数字)
// 暴露校验规则对象
exports.reg_article_schema = {
    body:{
        name:articleName,
        alias:aliasName
    }
}
exports.reg_artid_schema = {
    body:{
        id:articleId
    }
}