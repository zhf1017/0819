const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017";


// 查找
function find(collection, data, callback) {
    collection.find(data).toArray((err, result) => {
        if (err) {
            console.log("查询失败：" + err)
        } else {
            callback(result)
        }
    })
}
// 插入
function insert(collection, data, callback) {
    collection.insertOne(data, (err, result) => {
        if (err) {
            console.log("插入数据失败：" + err)
        } else {
            callback(result)
        }
    })
}
// 更新/编辑
function update(collection, data, callback) {
    collection.updateOne(data[0], {
        $set: data[1]
    }, (err, result) => {
        if (err) {
            console.log("修改失败：" + err);
        } else {
            callback(result)
        }
    })
}
// 删除
function del(collection, data, callback) {
    collection.deleteOne(data, (err, result) => {
        if (err) {
            console.log("删除失败：" + err);
        } else {
            callback(result)
        }
    })
}

const methodType={
    find:find,
    insert:insert,
    delete:del,
    update:update
}

function handlers(collections,type, data, callback) {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, client) => {
        if (err) {
            console.lpg("连接数据库失败：" + err);
        } else {
            console.log("连接数据库成功");
            var db = client.db("web1");
            var collection = db.collection(collections);
            methodType[type](collection, data, callback)
            client.close()
        }
    })
}


module.exports=handlers