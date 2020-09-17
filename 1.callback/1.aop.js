// 面向切片开发
// 应用场景：装饰器、前端埋点（在ajax的请求中包装一层自己的逻辑）

// 比如想在执行fn之前，增加一些自己的逻辑
/* 
newFn执行，就是fn.before这个函数执行后返回一个函数去执行。newFn执行，执行的是before函数中 return 的那个函数
在原型上绑定方法，具体逻辑以参数传入，代码共用性更强
this指的是，谁调的before，this就指向谁
*/
Function.prototype.before = function(callback){ // callback指的是fn.befoe()传入的参数
    let self = this
    return function(){ // 传入的参数即是newFn()中的参数
        callback()
        // console.log(this) // 在浏览器中指向window，在node中指向module export
        // fn(val) // 单个传参
        self.apply(self,arguments) // 多个参数
    }
    
}
function fn() {
    console.log('fn执行一定的功能'+[...arguments])
}
let newFn = fn.before(function(){
    console.log('fn执行前执行')
})
newFn(1,2,3)

// newFn() ===> fn.before() ===> return function(){}执行