// 观察者模式：基于发布订阅模式
// 发布订阅模式：发布和订阅两者无关，中间有一个媒介arr
/* 
   应该每个数据变化，对应自己的观察者变化，而不是一个数据变了，都要更新一下
   发布订阅模式：一个数据变了，都要更新变化
   观察者模式：一个数据变了，只通知自己的观察者变化就行
   */
/*
   观察者模式：观察者和被观察者
   被观察者：应该存放着观察者  eg:我家有一个小宝宝，有一个状态
   被观察者状态变化，要更新自己身上的所有观察者 
*/

class Subject{ // 被观察者
    constructor(){
        this.state = '开心'
        this.arr = []
    }
    attach(observer){ // 装载观察者
        this.arr.push(observer)
    }
    setState(newState){ // 更新自己的状态
        // 被观察者状态一变化，就通知各个观察者
        this.arr.forEach(observer => observer.update(newState))
    }
}

class Observer{  // 观察者
    constructor(who){ // 实例上的属性
        this.who = who
    }
    // 这个方法用来被“被观察者”调用的
    update(state){ // 原型上的方法
        console.log(`通知${this.who}:被观察者的状态变成${state}`)
    }
}
let observer1 = new Observer('爸爸')
let observer2 = new Observer('妈妈')

let subject = new Subject()
// “被观察者”关联“观察者”
subject.attach(observer1)
subject.attach(observer2)
subject.setState('不开心')
