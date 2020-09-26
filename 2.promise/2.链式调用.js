// promise怎么变成失败态 ===> 1）reject()  2)抛出一个错误 new Error()
let fs = require('fs')
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
4) 前面的then方法中return new Error(),下一个then走onfulfilled
5) 前面的then方法中throw new Error(),后面的then会一直走onrejected
** 每一个then方法都返回一个新的promise
*/

read('./name.txt').then(data => {
    return read(data)
}).then(data => {
    console.log(data,1)
    // return new Error('err') 
    throw new Error()
}).then(data => {
    console.log(data,21)
},err =>{
    console.log(err, 22)
}).then(data => {
    console.log(data,3)
},err => {
    console.log(err,'err3')
})

// 根据手写的链式调用来运行
let p = new Promise((resolve,reject) => {
    resolve(111)
})
p.then(data=> {
    return new Promise((resolve,reject) => {
        setTimeout(()=> {
            resolve(123) // resolve(123)会执行“then.call(x,y=>{ resolve(y)},r =>{reject(r)}”中的y=>{ resolve(y)
        },1000)
    })
    // throw new Error()   等价于 reject(new Error())
    // return 222 // return出去的值，在let x = onfulfilled(this.value)接收，赋给x
}).then(data=> {
    console.log(data, 'data2')
},err => {
    console.log(err, 'err')
}) 

// to refer same object 会导致无法继续执行，因为这个promise不会成功也不会失败
/* let promise = new Promise((resolve,reject) => {
    resolve()
})
let promise2 = promise.then(data => {
    return promise2 // 循环引用
})*/
