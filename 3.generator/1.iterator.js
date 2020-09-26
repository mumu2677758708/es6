// generator 生成器 (会自动生成一个迭代器)
// iterator 迭代器（迭代器有一个next方法，每次调用后都会返回一个对象里的两个属性：value、done）

/* 1）类数组： 是个对象，但有索引，有长度，能被迭代。  eg:arguments
   给一个对象添加迭代器，使它可以被迭代
   Array.from()和[...]的区别：
    [...]只能将类数组转换成数组；
    Array.from()不仅可以将类数组转成数组，也可以将对象转成数组。Array.from()会遍历对象的每一项，然后放进数组
*/
function arg(){
    let arr = [...arguments]
    console.log(Array.isArray(arr)) // true

    let obj = {0:1,1:2,2:3,length: 3}
    // let brr = [...obj]
    // console.log(Array.isArray(brr)) // 报错 object is not iterable

    let crr = Array.from(obj)
    console.log(Array.isArray(crr)) // true
}
arg(1,2,3,4)

/* 2)自己模拟一个迭代器 */
let obj = {0:1,1:2,2:3,length:3,[Symbol.iterator]:function(){
    let self = this
    let index = 0
    return {
        next(){
            return {value: self.obj[index],done: index++ === self.obj.length}
        }
    }
}}
function args(){
    let arr = [...obj]
    console.log(arr)
}

/* 示例用生成器来写
   生成器返回一个迭代器
 */
let obj = {0:1,1:2,2:3,length:3,[Symbol.iterator]:function *(){
    // 每次浏览器都会不停地调用next()方法，把yeild的结果作为值
    let index = 0
    while(index !== this.length){
        yield this[index++]
    }
}}
function args(){
    let arr = [...obj]
    console.log(arr)
}
args()