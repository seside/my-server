// 1 引入express
const express = require('express')
const expressJoi = require('@escook/express-joi')

// 2 引入路由对象
const router = express.Router()

const articleHandler = require('../router_handler/artcate')
const {reg_article_schema, reg_artid_schema} = require('../schema/article')
// 4 挂载路由方法(有需要校验的参数就引入express参数校验包)
router.get('/cates',articleHandler.artcate_handler)
router.post('/addcates',expressJoi(reg_article_schema),articleHandler.addcates_handler)
router.post('/deletecates',expressJoi(reg_artid_schema),articleHandler.deletecates_handler)

// 3 将路由对象暴露出去
module.exports = router