// Objec.defineProperty  es5  应用场景：Vue

// 通过Object.defineProperty定义属性，可以增加拦截器
// 通过Object.defineProperty定义的属性，默认都是不可枚举的（for-in循环不能遍历）函数原型上的属性是不能被枚举的
// 对象的setter和getter
// 不能监听到数组长度的变化，而且在调用push等数组方法时也监听不到
let obj = {}
let other = ''
Object.defineProperty(obj,'name',{
    enumerable:true, // 是否可枚举
    configurable: true, // 可配置 能不能删除这个属性
    // writable: true, // 是否可以重写，设置get()、set()方法不能设置writable
    // value: 'hello'
    get() { // 读取方法
        return other
    },
    set(val){ // 设置方法
        other = val
    }
})
console.log(obj.name)

/* 更简便的写法 */
let obj = {
    other: '123',
    get name(){
        return other
    },
    set name(val){
        other = val
    }
}
obj.name = 111
console.log(obj.name)

/* vue的数据劫持（把所有的属性都改成get和set方法） */
function update() { // 模拟更新的方法
    console.log('更新视图')
}
let data = {
    name: 'www',
    age: 18,
    address: {
        country: 'China'
    }
}
function observer(obj){ // Object.defineProperty()只能用在对象上（数组也不识别）
     if(typeof obj !== 'object') return obj
     for(let key in obj){
        defineReactive(obj,key,obj[key])
     }
}
function defineReactive(obj,key,value){
    observer(value) // 嵌套对象也可以监听到
    Object.defineProperty(obj,key, {
        get(){
            return value
        },
        set(val){
            if(val !== value) {
                // 如果赋值为一个新对象，也要监听
                observer(val)
                update()
                value = val
            }
            
        }
    })
}
observer(data)
// data.name = 'aa'

// 给address赋一个新对象时，也要接受监听
// data.address = {
//     country: '北京'
// }
// data.address.country = 'America'

// 给address赋值一个数组时
data.address = [1,2,3]
// data.address.push(4) // 不接受监听
// data.address[0] = 100 // 接受监听

// 面向切片开发（在原有的方法上拉一刀，塞进去自己的方法）
let methods = ['slice', 'push', 'shift', 'unshift', 'pop', 'sort', 'reverse']
methods.forEach(method => {
    // 原有的方法
    let oldMethod = Array.prototype[method]
    Array.prototype[method] = function(){ // 自己改造后的方法
        update()
        oldMethod.call(this,...arguments)
    }
})
data.address.push(4)
