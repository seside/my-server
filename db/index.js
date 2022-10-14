//导入mysql
const mysql = require('mysql')

//创建数据库连接对象
const db = mysql.createPool({
    host: "localhost",    // 主机地址
    port: 3306,                 // 端口
    user: "root",               // 数据库访问账号
    password: "mhb0707520",         // 数据库访问密码
    database:'my_db_01',       // 要访问的数据库
    charset: "UTF8_GENERAL_CI", // 字符编码 ( 必须大写 )
    typeCast: true,             // 是否把结果值转换为原生的 javascript 类型
    supportBigNumbers: true,    // 处理大数字 (bigint, decimal), 需要开启 ( 结合 bigNumberStrings 使用 )
    bigNumberStrings: true,     // 大数字 (bigint, decimal) 值转换为javascript字符对象串
    multipleStatements: false,  // 允许每个mysql语句有多条查询, 未防止sql注入不开启
    // connectTimeout: 5000,     // 数据库连接超时时间, 默认无超时
   
})

//对外暴露数据库连接对象
module.exports = db

