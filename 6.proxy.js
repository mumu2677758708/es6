// Object.defineProperty()不支持数组的更新 eg: push slice
// 希望数组一变化就能更新视图
// proxy可以监控到数组的变化和对象的变化


function update(){
    console.log('更新视图')
}
let arr = [1,2,3]
let proxy = new Proxy(arr,{
    set(target,key,value){
        // 不要手动操作原数组，因为数组变化时，可能调用的是push、pop方法，这个时候key就会出现问题
        // 数组变化，会先改变数组的内容，还会改变数组的长度,所以需要加一个判断
        if(key === 'length') return true
        update()
        return Reflect.set(target,key,value) // ===> target[key] = value
    },
    get(target,key){
       return Reflect.get(target,key) // ===》 target[key]
    }
})
// proxy[0] = 100
proxy.push(90)
console.log(proxy)