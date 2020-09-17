// es6 类   es5 构造函数


/* 1)了解构造函数的属性 */
// constructor指向构造函数   __proto__指向原型
function Animal(name){
    //属性分为两种：实例上的属性、公有属性（原型上的属性）
    this.name = name;
    this.obj = {
        age: 18
    }
}
Animal.prototype.address = {
    country: 'China'
}
let a1 = new Animal('猴子')
let a2 = new Animal('小鸡')
console.log(a1.obj === a2.obj) // false
console.log(a1.address === a2.address) //true
// 每个实例都有一个__proto__指向所属类的原型
console.log(a1.__proto__ ===Animal.prototype)
console.log(a1.constructor === Animal)

console.log(Animal.__proto__ === Function.prototype )//true  函数的链指向所属类的原型
console.log(a1.__proto__.__proto__ === Object.prototype) // true  
// a1.__proto__指向Animal.prototype  Animal.prototype是一个对象，对象的链指向所属类的原型
console.log(Object.prototype.__proto__) // null

/* 2)类的继承
prototype 是函数才有的属性
__proto__是每个对象都有的属性，可以理解为“构造器的原型”，指向constructor.prototype
*/
function Animal(name){
    //属性分为两种：实例上的属性、公有属性（原型上的属性）
    this.name = name;
    this.eat = '吃肉'
}
Animal.prototype.address = {
    country: 'China'
}
function Tiger(name){
    this.name = name
    this.age = 10
    Animal.call(this) // Tiger继承Animal实例上的属性  继承：即调用一次父类
}
/* Tiger继承父类原型上的属性和方法
 1）方法一
*/
// Tiger.prototype.__proto__ = Animal.prototype // 等价于 Object.setPrototypeOf(Tiger.prototype,Animal.prototype) 给Tiger.prototype设置链指向Animal.prototype
/* 2)方法二 */
// Tiger.prototype = new Animal() // Tiger的原型指向Animal的实例
// Tiger.prototype.constructor = Tiger
/* 3) 方法三 */
Tiger.prototype = Object.create(Animal.prototype,{constructor:{value: Tiger}})
// Object.create()的实现原理
/* function create(parentPrototype){
    let Fn = function(){}
    Fn.prototype = parentPrototype
    let fn = new Fn()
    fn.constructor = Tiger
    return fn
} */
Tiger.prototype.say = function(){
    console.log('老虎原型上的属性')
}
let t1 = new Tiger('老虎')
let t2 = new Tiger('狮子')
console.log(t1.eat)
console.log(t1.address)

// 我们写的时候用call +Object.create() 或者 call + Object.setPrototypeOf()


/* es6 class */
class Animal{
    static flag() { // 静态属性    es7支持静态属性（static flag = 123），es6只支持静态方法
        return 123
    }
    constructor(name){ // 实例属性
        this.name = name
        this.eat = '吃肉'
    }
    say(){ // 原型上的方法
        console.log('say') 
        // console.log(this) // es6规范里，如果单独调用原型上的方法，this是不存在的
    }

}
// 1) 类不能当函数调用 即不能这样调用Animal()
let animal = new Animal()
// 调用原型上的方法
animal.say() // 也可以 animal.__proto__.say()

/*let say = animal.say()
  say() ===>这样调用，say()里面的this不存在
*/ 
// 获取静态属性
console.log(Animal.flag())

class Tiger extends Animal{ // 实例+原型上都继承了
    /*constructor(name){ // Animal.call(this,name)
        super(name) // 自带方法
    }*/
}
let tiger = new Tiger('王老虎')

console.log(Tiger.flag()) // 静态方法可以被继承，但需要被类调用 