const db = require('../db')

// 获取文章分类列表
exports.artcate_handler = (req,res)=>{
    let sqlStr1 = `select id,name,alias from ev_article_cate where is_delete=0 order by id asc`
    db.query(sqlStr1,(err,result)=>{
        if(err) res.cc(err)
        res.send({
            status:0,
            message:'获取文章分类列表成功',
            data:result
        })
    })
}

// 新增文章分类列表
exports.addcates_handler = (req,res) => {
    // 查看文章名称和分类是否被占用
    let sqlStr1 = `select name,alias from ev_article_cate where name=? or alias=?`
    // 将数据插入文章分类表中
    let sqlStr2 = `insert into ev_article_cate set ?`
    const articleItem = req.body
    db.query(sqlStr1,[articleItem.name,articleItem.alias],(err,result)=>{
        if(err) return res.cc(err)
        if(result.length>0){
            if(result.length===2) return res.cc('文章名和分类别名均被占用')
            if((result.length===1) && (result[0].name===articleItem.name) && (result[0].alias===articleItem.alias)) return res.cc('文章名和分类别名均被占用')
            if((result.length===1) && (result[0].name===articleItem.name)) return res.cc('文章名被占用')
            if((result.length===1) && (result[0].alias===articleItem.alias)) return res.cc('分类别名被占用')
        }else{
            db.query(sqlStr2,articleItem,(err,result)=>{
                if(err) return res.cc(err)
                if(result.affectedRows !== 1) return res.cc('新增文章分类失败，请稍后重试')
                res.cc('新增文章分类成功',0)
            })
            // db.query(sqlStr2,{name:articleItem.name,alias:articleItem.alias},(err,result)=>{
            //     if(err) return res.cc(err)
            //     if(result.affectedRows !== 1) return res.cc('新增文章分类失败，请稍后重试')
            //     res.cc('新增文章分类成功',0)
            // })
        }
    })
}

// 删除文章分类列表
exports.deletecates_handler = (req,res)=>{
    let sqlStr1 = 'update ev_article_cate set is_delete=1 where id=?'
    // let sqlStr2 = 'select id,is_delete,name from ev_article_cate where'
    db.query(sqlStr1,req.body.id,(err,result)=>{
        if(err) return res.cc(err)
        if(result.affectedRows !== 1) return res.cc('文章分类删除失败，请重试')
        return res.cc('文章分类删除成功',0)
    })
}

// 更新文章分类列表


