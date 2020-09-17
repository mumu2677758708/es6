/* 1) var 声明的变量（污染全局变量）*/
var a = 1;
console.log(window.a)

// 2)使用var导致变量提升
console.log(a)  // function var 都会有变量提升
var a = 1;
let a =1

// 3）var可以被重复声明，let可以解决重复定义的问题
let a = 1;
let a = 2;
let a = 3;
console.log(a)

// 4) var 作用域的问题（常见的作用域：全局作用域，函数作用域，{ let声明}）
{
    var a = 1;
}
console.log(a)

let a = 100;
{
    console.log(a)  // 暂时性死区
    let a = 200
}
// 暂时性死区：只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

for(var i = 0; i<10;i++){
    setTimeout(function(){
        console.log(i) // 10十遍
    },0)
} // 同步代码中套着异步，循环走完了以后再去走定时器
for(let i = 0; i<10;i++){
    setTimeout(function(){
        console.log(i) // 0 ~  9
    },0)
} // {}配合let 成为一个作用域。let配合{},相当于每个作用域都绑定一个i，所以会打印出0~9
for(var i = 0; i<10;i++){
    (function(i){
        setTimeout(function(){
            console.log(i) // 0 ~  9
        },0)
    })(i)
    
} 

/* const 常量：不会变的量（地址不变即可）*/
const PI = 3.14;
pI = 3.15 // 报错
/* 这里的常量指的是：地址不变即可*/
const PI = {r: '3.14'}
PI.r = 3.15 // 不会报错


// 常用let + const 