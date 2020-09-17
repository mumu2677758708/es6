// 手写Promise
/* 实现功能：
executor中添加异步代码后，等待异步代码中的resolve或reject执行后，
再执行各个then方法中的onfulfilled或onrejected
*/
/* 实现思路：
发布-订阅模式：先订阅，把一个个要执行的异步放入一个数组，发布时，再根据数组依次执行
具体实现：
在执行then方法时，判断状态是否是“pending”，如果是，把onfulfilled和onrejected分别放入两个数组中，
执行resolve或reject时，再根据数组依次执行里面的方法
*/
function Promise(executor){
    this.status = 'pending'
    this.value = ''
    this.reason = ''
    this.onResolveCallbacks = []
    this.onRejectedCallbacks = []
    let self = this
    function resolve(value){
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
// 每个实例上都有一个then方法
Promise.prototype.then = function(onfulfilled,onrejected){
    if(this.status === 'fulfilled'){
        onfulfilled(this.value)
    }
    if(this.status === 'rejected'){
        onrejected(this.reason)
    }
    if(this.status === 'pending'){
        this.onResolveCallbacks.push(()=>{
            onfulfilled(this.value)
        })
        this.onRejectedCallbacks.push(()=>{
            onrejected(this.reason)
        })
    }
}
module.exports = Promise