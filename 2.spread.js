// ...展开运算符

// 把两个数组合并成一个数组
// 把两个对象合并成一个对象

let arr = [1,2,3];
let brr = [4,5];
console.log(...arr, ...brr) // 1,2,3,4,5
let crr = [...arr,...brr] // [1,2,3,4,5]

/* 对象浅拷贝（拷贝后还有关） */
let school = {name: 'mm'}
let my = {age: 18}
let all = {...school, ...my}
console.log(all)

/* ...只能拷贝一层 与Object.assign()一样 */
let school = {name: 'mm'}
let my = {age: {count: 18}} // age指针指向一个空间，当这个空间里的值更改后，all里面也会跟着变
let all = {...school, ...my}
my.age.count = 100
console.log(all)

/* 实现深拷贝（拷贝后无关） */
let school = {name : 'mm'}
let my = {age: {count: 18}}
let newMy = {...my, age:{...my.age}} // 把原来的my放在新对象里，用一个新的age把原来的age也拷贝一份
let all = {...school, ...newMy}
my.age.count = 100
console.log(all)


/* 可以通过JSON.parse() JSON.stringify()方法实现深拷贝
   缺点是：拷贝的对象中有函数、undefined时，不能拷贝
*/
let school = {name : 'mm',aa: undefined}
let my = {age: {count: 18},name: 'aa'}
let all = JSON.parse(JSON.stringify({...school,...my}))
my.age.count = 100
console.log(all) 

/* 
自己实现深拷贝的方法（递归拷贝，要一层一层的拷贝）
解决对象中的值是函数或undefined  
eg: let school = {name : 'mm',aa: undefined,fn:function(){}, b: null,arr: [1,2,3,[4,5]]}
*/
// 掌握类型判断：typeof instanceof Object.prototype.toString.call constructor
function deepClone(obj,hash = new WeakMap()){
    // 如果obj是null或undefined，不用拷贝
    if(obj == null) return obj
    // 不是对象，不用拷贝了
    if(typeof obj !== 'object') return obj
    // 如果是对象，但是是正则或者日期对象时，也不用拷贝
    if(obj instanceof Date) return new Date(obj)
    if(obj instanceof RegExp) return new RegExp(obj)
    if(hash.has(obj)) return hash.get(obj) // 如果weakmap中有对象，就直接返回
    // 要不是数组，要不是对象
    /* 
    new [1,2,3].constructor ===>  [] 
    new ({name: 'aa'}).constructor ===> {}
    */
    let cloneObj = new obj.constructor
    // 如果是对象把他放到weakmap中，如果再拷贝这个对象，这个对象就存在了，直接返回这个对象即可。
    hash.set(obj,cloneObj)
    // 对象中的属性挨个遍历，然后赋值到一个新对象,实现深拷贝
    for(let key in obj){
        cloneObj[key] = deepClone(obj[key],hash)
    }
    return cloneObj
}
let obj = {name: 'mm',address: { country: 'China'}}
obj.self = obj
// 循环引用问题,会造成死循环 eg: obj.self = obj
// map weakMap set 集合 map 映射表
let n = deepClone(obj)
console.log(n)