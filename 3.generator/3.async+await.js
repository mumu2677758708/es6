// async + await
/* 
1) async函数执行后，返回的是一个promise
2) 如果被try+catch,那么这个promise返回的就是真
已经在async函数中用try+catch捕获了异常，那在then方法中获取的data参数为undefined,相当于在async函数中return undefined
3) try+catch 和then().catch()功能一样，用一个就行
4) 异步不允许try + catch  但同步可以
*/

/*
1) callback: 不足：多个请求并发，不好管理；链式调用，导致回调嵌套过多
2) promise:  优点：可以优雅的处理异步、处理错误。 不足：基于回调，还是会有嵌套问题
3) generator + co: 优点： 让代码像同步   不足：不支持try+catch
4) async+await: 解决异步问题，而且支持try+catch
*/

const fs = require('mz/fs')
async function read(){
    // try{
    //     let r = await fs.readFile('./name.txt','utf8')
    //     let age = await fs.readFile(r,'utf8')
    //     return age
    // }catch(e){
    //     console.log(e)
    // }
    let r = await fs.readFile('./name.txt','utf8')
    let age = await fs.readFile(r,'utf8')
    return age
    
}
read().then(data => {
    console.log(data) // 接收async函数中return出来的值
}).catch(err => {
    console.log(err, 'err')
})