/* 数组方法：
   es5: forEach reduce map filter some every
   es6: find findIndex
   es7: includes
*/
// reduce 收敛


/*[1,2,3,4].reduce((a,b,index) => {
    // a: 初始值，或者计算结束后的返回值
    // b: 当前元素
    // index: 当前元素的索引
    // initialValue: 传递给函数的初始值
}, initialValue)*/
 
// 1) 求和
let r = [1,2,3,4,5].reduce((a,b)=> {
    return a+ b
})
console.log(r)

// 2) 求总价
let obj = [{price: 100,count: 1}, {price: 200, count: 2}, {price: 300, count: 3}]
let sum = obj.reduce((a,b)=>{
    return a + b.price * b.count
}, 0) // 0代表参数a的初始值   
// 也可以通过改变obj第一项的值来实现该功能,不过后面的0就不需要了
console.log(sum)

// 3)多个数据 最终变成一个数据      reduce常见的功能
let keys = ['name', 'age']
let values = ['Lily', 18] // ===> {name: 'Lily',age: 18}
let obj = keys.reduce((memo,current,index) => {
     memo[current] = values[index]
     return memo
},{})
console.log(obj)
/* let obj = keys.reduce((memo,current,index) => {
     memo[current] = values[index]
     return memo
},{}) ===> let obj = keys.reduce((memo,current,index) =>(memo[current] = values[index],memo),{})
逗号运算符：不管前面怎么样，只返回后面的
*/


/* reduce redux compose方法（组合多个函数）*/
function sum(a,b){
    return a+b
}
function toUpper(str){
    return str.toUpperCase()
}
function add(str){
    return '-----'+ str + '---'
}
// 想实现这样一个效果 console.log(add(toUpper(sum('http://','www'))))
// 1> 倒叙
function compose(...fns){
    return function(...args){
        let lastFn = fns.pop()
        return fns.reduceRight((a,b) => {
            return b(a)
        },lastFn(...args))
    }
} // 高逼格代码 ===> 
/* 
let compose = (...fns) =>(...args)=> { 
    let lastFn = fns.pop()
    return fns.reduceRight((a,b) => b(a),lastFn(...args))}
 */
let r = compose(add,toUpper,sum)('http://','www')
console.log(r)

// 2> 正序
function compose(...fns){
    return fns.reduce((a,b) => {
        return (...args)=>{ // toUpper(sum(...args))
            return a(b(...args)) // 先满足toUpper和sum,再把这两个条件，带入add()
        }
    })
}
/*  ===> 代码简化
let compose = (...fns) => fns.reduce((a,b)=> (...args)=>a(b(...args)))
*/
let r = compose(add,toUpper,sum)('http://','www')
console.log(r)


/* reduce实现原理 */
Array.prototype.reduce = function(callback,prev){
    for(let i = 0;i<this.length;i++){
        if(prev == undefined){
            prev = callback(this[i],this[i+1],i+1,this)
            i++
        }else{
            prev = callback(prev,this[i],i,this)
        }
    }
    return prev
    
};
let sum = [1,2,3,4].reduce((a,b,index,current) => {
    return a+b
},100)
console.log(sum)


/* map: 映射 filter some every */
let newArr = [1,2,3].map(item => item*2) 
let newArr = [1,2,3].filter(item => item!=2) // 删除为2的，返回true 表示留下
let bool = [1,2,3,4].some(item => item == 5) // 找到就返回true
let boolean = [1,2,3,4].every(item => item == 1) // 看看有没有不等于1的，有的话返回false   找false
let item = [1,2,3,4].find(item => item == 2) // 找到后返回找到的那一项，找不到返回undefined
// [1,2,3].indexOf(1) > -1  ===> [1,2,3].includes(2) -->返回true