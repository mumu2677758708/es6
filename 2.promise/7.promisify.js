// node中的所有方法，都是错误优先，第二个就是结果
const fs = require('fs')
/*
function read(file){
    return new Promise((resolve,reject) => {
        fs.readFile(file,'utf8',(err,data) => {
            if(err) reject(err)
            resolve(data)
        })
    })
}
read('./name.txt').then(data => {
    console.log(data)
})
*/

/* 1) promisify: 就是把方法一个一个promise化*/
function promisify(fn){
    return function(){ // read能执行，说明read是一个函数，所以这里返回的函数即是read
        return new Promise((resolve,reject) => { // 有then方法，说明返回一个promise
            fn(...arguments,(err,data) => {
                if(err) reject(err)
                resolve(data)
            })
        })
    }
}
// 这样封装后，writeFile readFile等函数都可以调用
let read = promisify(fs.readFile)
let write = promisify(fs.writeFile)
// 调用 read().then()
read('./name.txt','utf8').then(data => {
    console.log(data,'read')
})
write('./name.txt','22222').then(data => {
    console.log('写入成功')
})

/* 2) promisifyAll：把fs中的方法全部promise化
      在node中，promisifyAll基本已经废弃
 */
function promisifyAll(obj){
    for(let key in obj){
        if(typeof obj[key] === 'function'){
            obj[key+'Async'] = promisify(obj[key]) // 将obj对象中的所有方法都promise化
        }
    }
}
// 调用
promisifyAll(fs)
fs.readFileAsync('./name.txt','utf8').then(data => {
    console.log(data,'async')
})

/* 3) promisify的应用 */
// mz这个包已经将方法promise化了
// npm install mz 安装这个包
let fs = require('mz/fs') // 引用mz下的fs
fs.readFile('./name.txt', 'utf8').then(data => {
    console.log(data)
})