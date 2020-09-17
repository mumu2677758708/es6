// set map是两种存储结构
// set集合不能放重复的东西，放了也白放。常用于数组去重

let s = new Set([1,2,3,4,5,1,2,3])
console.log(s) // typeof s ===> object
// s的一些方法
s.add(7)
s.delete(3)
console.log([...s]) // 转换成数组

/* 集合：并集 差集 交集 */
// 并集
let s01 = [1,2,3,1,2]
let s02 = [3,4,5,1,2]
function union(){
    let s1 = new Set(s01)
    let s2 = new Set(s02)
    console.log([...new Set([...s1,...s2])])
}
union()
// 交集
function intersection(){
    return [...new Set(s01)].filter(item => {
        return new Set(s02).has(item)
    })
}
console.log(intersection())
// 差集
function diff() {
    return [...new Set(s02)].filter(item => {
        return !new Set(s01).has(item)
    }) 
}
console.log(diff())


/* 
map是有key的，不能放重复的
优点：“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键
 */
let m = new Map()
m.set('name', 'aa')
m.set('name', 'bb')
let obj = {name: 1}
m.set(obj,'456') // 这个obj的引用空间呗set所引用
obj = null  // 把obj清空，这个空间还是在的
console.log(m)

/* weakMap
WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名
WeakMap的键名所指向的对象，不计入垃圾回收机制。
*/
let m = new WeakMap()
let obj = {name: 1}
m.set(obj,'456')
obj = null
console.log(m)