/* 在多少次之后，执行某个方法
   只要作用域不销毁，变量不释放，就是闭包
*/

// 实现效果：after(3,function(){})在执行3次之后，执行后面的方法
function after(times, callback){
    return function(){
        if(--times === 0){ // times不销毁
            callback()
        }
    }
}
let newFn = after(3,function(){
    console.log('after')
})
newFn()
newFn()
newFn()
