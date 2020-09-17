"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// es7语法，node并不支持 需要用webpack + babel 进行编译
//es7更高的语法，都转成es5
// babel用来转化代码的 eg:es6 ===> es5
// webpack是用来打包的，例如：将多个文件打包，方便转化代码，不用一个文件一个文件的去转化等
var Animal = /*#__PURE__*/function () {
  function Animal(name) {
    _classCallCheck(this, Animal);

    this.name = name;
  }

  _createClass(Animal, [{
    key: "say",
    value: function say() {
      console.log('say');
    }
  }]);

  return Animal;
}(); // 现在先用babel进行编译，需要安装一个babel-cli的包
// 默认安装模块、包都不安装到全局上    安装到本地模块，保证版本一致
// babel-cli ===> @babel/cli     vue-cli ===>  @vue/cli

/* 1) npm init 初始化，记录需要安装哪些包     
      npm init -y  // -y 就是一键生成
*/

/* 2) npm install @babel/cli --save-dev 只在开发的时候用 */

/* 3) 安装上本地包，想在本地用，可以在本地引用；也可以用npx */
// npx  node5.2版本以上提供的，可以帮助我们执行.bin目录下的文件；如果模块不存在，也可以帮我们安装模块
// 运行命令   npx babel 9.babel.js -o es5.js // 9.babel.js:（编译文件）    es5.js:（编译成的文件）

/* 4) npm install @babel/core --save-dev  babel的核心包，主要就是转换代码   
但是具体该怎么转，babel不知道，需要安装配置@babel/preset-env 
*/
// babel-preset-es2015主要转化es6 (这个包不需要了)
// babel-preset-stage-0 未定案的语法  装饰器   eg: static flag = 1  没了

/* 5) npm install @babel/preset-env --save-dev  转化已经定案的标准 
      配置.babelrc文件
*/

/* 6) npm install @babel/plugin-proposal-class-properties --save-dev 主要的作用是用来转化类的属性
      配置.babelrc文件
*/

/*
@babel/cli ===> @babel/core ===> 转化语法（会读取babelrc文件的配置去转化）
babelrc文件： babel-cli在执行babel转化的时候，会执行babelrc文件
babel的配置（.babelrc文件）中，一般配两个： 配置插件；配预设（插件的集合）
*/

/* package.json:
   dependencies: 项目依赖，上线的时候需要
   devDependencies: 开发依赖，开发的时候需要，上线的时候不需要 --save-dev
*/


_defineProperty(Animal, "flag", '哺乳类');
