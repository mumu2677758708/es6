// 前端面试中必问的两种模式：发布订阅模式，观察者模式
const fs = require('fs')
/* 
只有先订阅，才能发布
先订阅，把一个个要执行的异步放入一个数组，发布时，再根据数组依次执行
订阅和发布是没有关系的，中间只靠一个数组arr维持，但arr没人管理

事件发射器，里面有两个方法：on  emit
读完以后，都发布一下
*/
function EventEmitter(){ // 事件发射器
    this.arr = []
}
EventEmitter.prototype.on = function(callback){ // 订阅
    this.arr.push(callback)
}
EventEmitter.prototype.emit = function(){ // 发布 发布时，需要将on的方法依次执行
    this.arr.forEach(fn => fn.apply(this,arguments))
}
let event = new EventEmitter()

let result = {}
// 每次一emit，都会调用原型上的emit方法，就会将数组中的方法遍历并执行，而arr中的方法，其实就是这个方法function(key,data){}
event.on(function(key,data){ // 每次一发布就会执行一次
    result[key] = data 
    if(Object.keys(result).length === 2){
        console.log(result)
    }
})
fs.readFile('./1.callback/name.txt', 'utf8',function(err, data){
    if(err) return console.log(err)
    event.emit('name',data)
})
fs.readFile('./1.callback/age.txt', 'utf8',function(err, data){
    if(err) return console.log(err)
    event.emit('age',data)
})