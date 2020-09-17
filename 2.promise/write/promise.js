// 手写Promise
function Promise(executor){
    this.status = 'pending'
    this.value = ''
    this.reason = ''
    let self = this
    function resolve(value){
        if(self.status === 'pending'){
            self.value = value
            self.status = 'fulfilled'
        }
    }
    function reject(reason){
        if(self.status === 'pending'){
            self.reason = reason
            self.status = 'rejected'
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
}
module.exports = Promise