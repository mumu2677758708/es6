// 箭头函数 
// 特点：没有this, 没有arguments

function a() {} // 容易变量提升
// ===> let a = function(){}
// ===> let a = ()=>{}

let a = x => x
let b = (x,y) => x+y
let c = (x,y) => ({total: x+y})
// 高阶函数
let d =function (x){
    return function(y){
        return x + y
    }
} 
// ===> let d = x => y => x + y
d(1)(2)

/* this的问题  看.前面是谁，this就是谁 */
// 1)
let a = 1;
let obj ={
    a:2,
    fn: function(){
        setTimeout(function(){
            console.log(this.a) // this指向window ===> undefined
        })
    }
}
obj.fn()
// 2)
let a = 1;
let obj ={
    a:2,
    fn: function(){
        setTimeout(()=>{
            console.log(arguments) // 可以打印出来
            console.log(this) // this指向obj
            console.log(this.a) // 2
        })
    }
}
obj.fn()
// 3)
/* 作用域：1)全局作用域 2）函数作用域 3）{}里面有let声明 */
let a = 1;
let obj ={ // 对象
    a:2,
    fn: ()=>{
        /*在定时器里找a没有找到，向上级作用域找，上级作用域是一个箭头函数也没找到，再往上找就是window了
        （注意：obj={}这是一个对象，不是一个作用域）箭头函数中没有this*/
        setTimeout(()=>{
            console.log(arguments) // 报错：arguments没定义
            console.log(this) // this指向window
            console.log(this.a) // undefined
        })
    }
}
obj.fn() 