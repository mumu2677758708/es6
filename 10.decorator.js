// 装饰器可以修饰类、类的属性、类原型上的方法
// 修饰的时候，就是把这个类、属性等等传递给修饰的函数

@flag
class Animal{
    @readonly
    PI = 3.14
    name = 'xxx' // 实例上的属性
    @before
    say(a,b,c){ // 原型上的方法
        console.log('say',a,b,c)
    }
}
// 1）修饰类
function flag(constructor){
    constructor.type = '哺乳类'
}
console.log(Animal.type)

// 2） 修饰类的属性（实例上的属性）
function readonly(target,property,descriptor){
    // property 就是修饰的那个属性
    // 不想要更改这个属性时
    descriptor.writable = false
    setTimeout(()=>{ // 加定时器是因为，在走装饰器的时候，Animal这个类还没有走完
        console.log(target === Animal.prototype) // target就是类的原型
    })
}
let animal = new Animal()
animal.PI = 3.15 // 报错，因为设置了不可更改

// 3）修饰类的方法   切片
function before(target,property,descriptor){
    let oldSay = target.value
    descriptor.value = function(){
        console.log('before')
        oldSay.call(target,...arguments)
    }
}
animal.say(1,2,3)