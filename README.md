# vue-cli 2.x
- 安装 - init
```js
npm install -g @vue/cli
```

- 创建 前端项目
```js
vue init webpack fore-end
```

- git管理,提交远程管理
```js
git init
git status
git add .
git commit -m "init"
git remote add origin https://github.com/Buffme/vue-project.git
git push -u origin master
```


- 合作写项目，需要注意各分支的问题
```js
git checkout --.\README.md
git checkout -b develop
```

- 修改title，小图标的引入
```js
npm run build --> 打包生成dist文件夹等
 <link rel="icon" type="image/x-icon" href="./static/favicon.ico">去打包后的dist文件夹找小图标和index之间的路径关系
```

# vue-cli 2.x 拉取的项目的项目结构- -build
  - webpack.base.config.js    webpack 基本配置
  - webpack.dev.config.js     webpack 开发时的配置
  - webpack.prod.config.js    webpack 打包上线时的配置
- config  项目路径相关的一些配置
- node_modules 项目的依赖包
- src   项目的源代码的地方
- src里的main.js 整个前端项目的入口js文件
- static  项目中不需要使用 webpack 来做模块加载的内容 ，主要放一些第三方不需要打包支持的内容 （hotcss）
- .babelrc babel 相关的配置 (支持我们es6 7 8 语法的东西)
- .editorconfig 编辑器相关的配置
- .eslintrc.js eslint相关配置
- .gitignore git 忽略文件的相关配置
- .postcssrc.js  样式样式的配置
- index.html     页面模板
- package.json   项目的描述文件
- README.md       项目的读我文件
- yarn.lock       npm | yarn 是用来处理依赖包的版本问题。

# 单文件组件 （.vue）一个文件就是一个组件，能够通过 esm 去引入

```js
3大块：

<template>
  // 组件的模板
</templte>

<script>
  // 暴露组件的选项对象
export default {

}
</script>

<style>
// 写样式
// PS: scoped 能够让我们当前样式只对当前的组件生效。。。。
</style>
```

# eslint 的好处：


# 清除项目的默认样式
- 找到src文件夹，创建styles文件夹，创建base.scss文件（写项目的基础样式文件，同级创建common文件夹，在此文件夹下创建reset.scss和variable.scss，并将这俩引入base.scss，main.js（老大）或App.vue(老二)中引入base.scss）


# vue-cli 2.x 中使用 scss 文件，需要安装 node-sass sass-loader
- yarn add node-sass sass-loader -D

# 引入hotcss
- 放在static文件夹下，在index.html通过script标签引入的文件放在static文件夹

# 下方导航
- components文件夹创建navBar(导航)文件夹，文件夹内创建index.vue（navBar组件）
- 建议写上name
```js
<script>
export default {
    name: 'NavBar',
    
}
</script>
```
- 需要先引入px2rem.scss
```js
<style lang="scss">
@import '../../styles/common/px2rem.scss';
</style>
```
# 路由相关组件（页面级组件）的创建
- 在components文件夹同级下，创建views文件夹

# 影片页，影院页和个人中心页面
- views文件夹下创建Films.vue,Cinema.vue,Center.vue


- 引入px2rem.scss时，层级太深，根据build文件夹下webpack.base.conf.js文件中的别名设置：'@': resolve('src'),用@代替src文件夹


# vue-cli 脚手架中使用 vue-router

1. 下载 npm install --save vue-router
2. 在 src 下面新建一个 router.js 文件。在这个文件中做 路由相关的配置
3. 在 src 下面 入口文件 main.js 中 引入第二步导出的路由管理器对象，并使用 router选项配置在 new Vue() 的地方。

PS: 用npm的方法下载的 vue-router ，需要使用 Vue.use() 来挂载一下。 router-link  router-view


# router-link tag 属性能够让 router-link 最终渲染成什么元素

# swiper 的使用 轮播图的插件

1. 安装 yarn add swiper
2.

# 定位 html5 geoLocation

- 百度地图 （http://lbsyun.baidu.com/）
- 腾讯地图
- 高德地图

# 请求数据，ajax  jquery axios

# axios

- 轻量、方便、promise链式调用、可以二次封装、请求拦截、响应拦截

使用：
1. 安装 yarn add axios
2. 哪里要用，就在那里引入
3. 调用 axios.get()   axios.post()  axios.put()  axios.delete() axios({})

# 稍微真实一些的简单一些的假数据   mockjs

使用：
1. 安装 yarn add mockjs
2. 在src目录下新建一个 mockdata.js 。并且写上mock假数据的东西
3. main.js 中引入  mockData.js 文件
4. 这个时候，我们的一些ajax请求就会被 mockjs 给拦截。返回的数据就是 mockjs 生成的假数据

# 组件化开发的好处：

1. 提供代码的可复用性
2. 减少代码之间的耦合度
3. 提高代码编写速度

# import 与 @import 是什么区别？

# link 与 @import 的区别？

- link 标签是 html 的标签元素
- @import 是css提供的一种可以引入别的css文件的 功能
- link 标签 除了能引入外部样式文件，还可以干别的。。。
- @import 只能用来导入样式
- @import 有兼容性 css2.x 提供的。
- 效率。有一定的阻塞。。

# sass 与 less 中可以经常性的看到 这种 @import

# import 跟 nodejs 中 require 非常像。

# 跨域的产生原因

> 由于浏览器的同源策略。
ip /端口号/协议

# 解决跨域的方法

- jsonp
- cors
- 正向代理
- 反向代理

# 正向代理

> 浏览器与服务器中间加了一个 nodejs 服务中间层

A - 浏览器   http://localhost:8080

B - 服务器   http://localhost:3000

C - 中间层 （服务端器） http://localhost:8080

A - C - B
B - C - A

vue-cli 2.x 的版本中，我们去 config/index.js  dev  proxyTable 配置。。。。。


# 路由跳转是使用 router-link  a标签

> 可以通过js的代码来操作路由的跳转。 $route - 当前的路由对象  $router - 路由管理器对象
> 通过路由管理对象，就可是实现 编程式导航

- this.$router.push() - 追加  router-link to
- this.$router.replace() - 替换 router-link replace
- this.$router.go(n) n - Number 如果是正数 前进 , 负数 后退

push 与 replace 都可以传 字符串的path路径。要么是传 对象

