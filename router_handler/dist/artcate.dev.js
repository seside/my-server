"use strict";

var db = require('../db'); // 获取文章分类列表


exports.artcate_handler = function (req, res) {
  var sqlStr1 = "select id,name,alias from ev_article_cate where is_delete=0 order by id asc";
  db.query(sqlStr1, function (err, result) {
    if (err) res.cc(err);
    res.send({
      status: 0,
      message: '获取文章分类列表成功',
      data: result
    });
  });
}; // 新增文章分类列表


exports.addcates_handler = function (req, res) {
  res.send('OK');
};