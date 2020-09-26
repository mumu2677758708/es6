let fs = require('fs')
let Promise = require('./write/3.链式调用')
// deferred的应用
// 请实现一个延迟对象
function read(file){
    // 延迟对象
    let defer = Promise.deferred() // {promise,resolve,reject}
    fs.readFile(file,'utf8',function(err,data){
        if(err) return defer.reject(err)
        return defer.resolve(data)
    })
    return defer.promise
}

read('./name.txt').then(data => {
    return read(data)
}).then(data => {
    console.log(data,1)
})
