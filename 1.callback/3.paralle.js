/* 
node读取文件时，从根目录开始读取
并行：两个没关系，可以一起执行
串行：两个有关系，必须一个执行完才能执行下一个（上一个的输出是下一个的输入）
处理异步请求多个并发，靠的是计步器
*/

// 实现效果：两个文件都读取完后，拿到最终的数据
const fs = require('fs')

function after(times,callback){
    let result = {}
    return function(key,data){
        result[key] = data
        if(--times === 0){
            callback(result)
        }
    }
}
let newAfter = after(2,function(result){ // 这个方法，会在所有异步执行完后再执行
    console.log(result)
    console.log('最终的结果')
})
fs.readFile('./1.callback/name.txt', 'utf8',function(err, data){
    if(err) return console.log(err)
    newAfter('name',data)
})
fs.readFile('./1.callback/age.txt', 'utf8',function(err, data){
    if(err) return console.log(err)
    newAfter('age',data)
})

