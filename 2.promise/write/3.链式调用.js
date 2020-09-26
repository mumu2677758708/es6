// 手写Promise
/* 实现功能：
链式调用.then().then()
*/
/* 实现思路：
promise实例才会有then方法，所以返回一个promise
具体实现：
在执行then方法时，判断状态是否是“pending”，如果是，把onfulfilled和onrejected分别放入两个数组中，
执行resolve或reject时，再根据数组依次执行里面的方法
*/
/* resolve()里面的参数给了this.value,
onfulfilled这个函数将this.value传给.then(data =>{})中的data,
.then(data => return data)中return出去的值给了let x = onfulfilled(this.value)中的x
*/
function Promise(executor){
    this.status = 'pending'
    this.value = ''
    this.reason = ''
    this.onResolveCallbacks = []
    this.onRejectedCallbacks = []
    let self = this
    function resolve(value){
        // 判断value是否是一个promise
        if(value instanceof Promise) { // 用value !== null && (typeof value === 'object' || typeof value === 'function')判断是否是promise，promiseA+规范不支持
            return value.then(resolve,reject) // 递归
        }
        if(self.status === 'pending'){
            self.value = value
            self.status = 'fulfilled'
            self.onResolveCallbacks.forEach(fn => fn())
        }
    }
    function reject(reason){
        if(self.status === 'pending'){
            self.reason = reason
            self.status = 'rejected'
            self.onRejectedCallbacks.forEach(fn => fn())
        }
    }
    // 当executor中抛出错误时，会执行reject()
    try{
        // 执行器会立即执行
        executor(resolve,reject)
    }catch(e){
        reject(e)
    }
    
}
// promise2就是当前then返回的promise
// x就是当前then中成功或失败回调的返回结果
// 根据promiseA+规范来写
function resolvePromise(promise2,x,resolve,reject){
    /* 对x进行判断，如果x是一个普通值，直接resolve就可以了
       如果x是一个promise 采用x的状态*/
    if(promise2 === x) { // 避免循环引用
        return reject(new TypeError('循环引用'))
    }
    // 这种情况下，x有可能是promise
    if(x!==null && (typeof x === 'object' || typeof x === 'function')){
        let called;
        try{ // 有可能取then的时候报错
            let then = x.then // 看当前的promise有没有then方法
            if(typeof then === 'function'){// 是一个promise
                /* then.call(x)与x.then()的区别是：
                   then.call(x)执行的是“let then = x.then”取的then方法
                   x.then()是重新取一次then方法
                   这样可以避免再去取then方法时出错
                */
                then.call(x,y=>{ 
                    if(called) return
                    called = true
                    // 如果返回的是一个promise，这个promise中resolve的结果可能还是一个promise,递归解析直到这个y是一个 常量为止
                    resolvePromise(promise2,y,resolve,reject)
                },r => {
                    if(called) return // 防止调用失败，又调用成功
                    called = true
                    reject(r)
                })
            }else{ // 有可能是{then:{}}或{then:undefined}
                resolve(x)
            }
        }catch(e){
            if(called) return
            called = true // 这个判断是为了防止出错后，继续要调用成功逻辑
            reject(e)
        }
    }else{ // x是普通值
        resolve(x)
    }
}
// 每个实例上都有一个then方法，then方法是异步的
Promise.prototype.then = function(onfulfilled,onrejected){
    // 参数的可选（即不传也没问题）
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val
    onrejected = typeof onrejected === 'function' ? onrejected : err => {throw err}
    // 返回新的promise, 让当前的then方法执行后可以继续.then
    let promise2 = new Promise((resolve,reject) => {
        if(this.status === 'fulfilled'){
            // 加定时器是因为：new Promise()代码是自上而下执行的，在调用resolvePromise这个函数时，promise2还没有产生
            setTimeout(()=> { 
                try{ // 捕获异常
                    let x = onfulfilled(this.value)
                    resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                    reject(e)
                }
                
            })
            
        }
        if(this.status === 'rejected'){
            setTimeout(()=> { 
                try{
                    let x = onrejected(this.reason)
                    resolvePromise(promise2,x,resolve,reject)
                }catch(e){
                    reject(e)
                }
            })
        }
        if(this.status === 'pending'){
            this.onResolveCallbacks.push(()=>{
                setTimeout(()=> { 
                    try{
                        let x = onfulfilled(this.value)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            })
            this.onRejectedCallbacks.push(()=>{
                setTimeout(()=> { 
                    try{
                        let x = onrejected(this.reason)
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                })
            })
        }
    })
    return promise2
    
}

// catch方法  catch是then的简写
Promise.prototype.catch = function(errCallback){
    return this.then(null,errCallback)
}
// .finally方法
Promise.prototype.finally = function(callback){
    return this.then(callback,callback)
}

Promise.resolve = function(data){
    return new Promise(resolve => {
        resolve(data)
    })
}
Promise.reject = function(reason){
    return new Promise((resolve,reject) => {
        reject(reason)
    })
}
/* 检测自己写的代码是否符合规范
全局安装：npm install promises-aplus-tests -g 
运行命令：promises-aplus-tests 检测文件
*/
// promises-aplus-tests 的入口代码
Promise.deferred = function(){
    let dfd = {}
    dfd.promise = new Promise((resolve,reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}
module.exports = Promise