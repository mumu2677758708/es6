/* 生成器 *
   生成器会配合yield来使用，如果碰到yield会暂停执行
   生成器返回的是迭代器，迭代器有next方法，调用next()会返回value和done
   第一次next调用，是不能传参的
   蛇形走位
*/

// 1）基本用法
function * read(){
    yield 1 // 产出
    yield 2
    yield 3
}
let it = read()
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())

// 2）蛇形走位
function * read(){
    let a = yield 1 // 产出
    console.log(a)
    let b = yield 2
    console.log(b)
}
let it = read()
console.log(it.next()) // 第一次next调用不能传值
console.log(it.next(100)) // 将100赋值给了a，在这次next()时，console.log(a)才执行
console.log(it.next())
/* 打印结果
{ value: 1, done: false }
100
{ value: 2, done: false }
undefined
{ value: undefined, done: true } */

// 3）异步调用时
const fs = require('mz/fs')
function *read(){
    let r = yield fs.readFile('./name.txt','utf8')
    let age = yield fs.readFile(r, 'utf8')
}
let it = read()
let { value, done } = it.next()
Promise.resolve(value).then(data => {
    // 将读取name.txt文件的返回值传给下一个yield
    let { value, done} = it.next(data)
    Promise.resolve(value).then(data => {
        // 返回读取age.txt文件的信息
        it.next()
        console.log(data, 'age')
    })
})


// 4）generator + co
// npm install co
const fs = require('mz/fs')
const co = require('co')
function *read(){
    let r = yield fs.readFile('./name.txt','utf8')
    let age = yield fs.readFile(r, 'utf8')
    return age
}
co(read()).then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})

// 5）手写co原理
function co(it){ // co函数中的参数是一个迭代器，里面有next方法
    return new Promise((resolve,reject) => {
        function next(val){
            let {value, done } = it.next(val)
            if(done) return resolve(value)
            Promise.resolve(value).then(data => { // 执行异步后返回参数data
                next(data) // 将返回的data传入next，赋值给r，作为下一个异步执行的参数
            },reject)
        }
        next()
    })
}
// generator + co  ===> async + await