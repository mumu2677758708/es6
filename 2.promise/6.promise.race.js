/* promise.race()
   参数是一个数组，谁返回的值快，就用谁的
   有一个失败，就走.catch
*/
const fs = require('fs')

// Promise.race()实现原理
/* 实现思路：
    1）数组中的每一项都调用，谁返回值快，就直接resolve
*/
Promise.all = function(values){
    return new Promise((resolve,reject) => {
        
        for(let i = 0; i < values.length; i++){
            let item = values[i] // 拿到数组中的每一项
            let then = item.then
            if(then && typeof then === 'function'){ // 判断是promise
                then.call(item, y=>{ // y代表拿到item.then()成功执行后的值
                    resolve(y)
                },reject)
            }else{ // 是普通值
                resolve(item)
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
    console.log(data) 
}).catch(err => {
    console.log(err)
})