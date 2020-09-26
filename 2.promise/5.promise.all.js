/* promise.all()
   参数是一个数组，返回的结果按照传入的顺序依次返回
   有一个失败，就走.catch
*/
const fs = require('fs')

// Promise.all()实现原理
/* 实现思路：
    1）传参拿到，遍历数组中的每一项，判断每一项是否是promise，
       如果是，执行这个promise;如果不是，就直接返回这个值
    2) 是promise，执行这个promise，将返回结果添加到arr新数组中，
    3） 判断执行后的结果是否都添加arr中，增加一个计步器。如果count 等于传入数组的长度，就将结果返回
*/
Promise.all = function(values){
    return new Promise((resolve,reject) => {
        let arr = []
        let count = 0 // 并发离不开计数器
        function processData(key, value){
            arr[key] = value
            if(++count === values.length) {
                resolve(arr)
            }
        }
        for(let i = 0; i < values.length; i++){
            let item = values[i] // 拿到数组中的每一项
            let then = item.then
            if(then && typeof then === 'function'){ // 判断是promise
                then.call(item, y=>{ // y代表拿到item.then()成功执行后的值
                    // 将拿到的值放到arr数组中对应的位置
                    processData(i,y)
                },reject)
            }else{ // 是普通值，直接将该值放到arr数组中对应的位置
                processData(i,item)
            }
        }
    })
}
function read(file){
    return new Promise((resolve,reject) => {
        fs.readFile(file,'utf8',(err,data) => {
            if(err) reject(err)
            resolve(data)
        })
    })
}
Promise.all([read('./1.callback/name.txt'),read('./1.callback/age.txt'),1,2,3]).then(data =>{
    console.log(data) // ['小强', 18, 1,2,3]
}).catch(err => {
    console.log(err)
})