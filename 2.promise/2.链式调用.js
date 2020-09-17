// promise怎么变成失败态 ===> 1）reject()  2)抛出一个错误 new Error()
let fs = require('fs')
const { resolve } = require('path')
let Promise = require('./write/3.链式调用')
function read(file){
    return new Promise((resolve,reject)=>{
        fs.readFile(file,'utf8',function(err,data){
            if(err) return reject(err)
            return resolve(data)
        })
    })
    
}
// 链式调用  将上一个的返回值，作为下一个的参数
/* 
1）如果then方法中返回的是一个promise，那就采用这个promise的状态作为参数，传给下一个then方法
2）如果返回的是一个普通值，直接作为下一个then成功的参数
3）在then方法中抛出异常,下一个then会走失败，如果失败中返回一个普通值，再下一个then走成功
4) 只在最后一个then方法中写了err =>{}, 如果中间的then方法中有抛出错误，则直接走最后的err
** 每一个then方法都返回一个新的promise
*/
/*
read('./name.txt').then(data => {
    return read(data)
}).then(data => {
    console.log(data,1)
    // throw new Error('err')
})
.then(data => {
    console.log(data,2)
}).then(data => {
    console.log(data,3)
},err => {
    console.log(err,'err3')
})
*/
let p = new Promise((resolve,reject) => {
    resolve(111)
})
// p.then(data=> {
//     console.log(data)
// }).then(data => {
//     console.log(134)
// })

p.then(data=> {
    console.log(data)
    return new Promise((resolve,reject) => {
        resolve(222)
    })
}).then(data=> {
    console.log(data, 'data2')
})