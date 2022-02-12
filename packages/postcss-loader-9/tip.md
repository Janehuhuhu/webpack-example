## 1. 什么是PostCSS?
`PostCSS` 和 `sass/less` 不同, 它不是`CSS` 预处理器。`PostCSS` 是一款使用插件去转换 `CSS` 的工具，`PostCSS` 有许多非常好用的插件,例如
- autoprefixer(自动补全浏览器前缀)
- postcss-pxtorem(自动把px代为转换成rem)
<div style="margin-bottom: 50px;"></div>


## 2. 使用 PostCSS 自动补全浏览器前缀
### 2.1 安装 loader
```js
npm i -D postcss-loader postcss
```
<div style="margin-bottom: 30px;"></div>

### 2.2 安装需要的插件
```js
npm i -D autoprefixer
```
<div style="margin-bottom: 30px;"></div>

### 2.3 配置 postcss-loader
在 `css-loader` *or* `less-loader` *or* `sass-loader` 之前添加`postcss-loader`
```js
{
  test: /\.(css|scss)$/,
  use: [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'sass-loader'
    },
    {
      loader: 'postcss-loader'
    }
  ]
}
```
<div style="margin-bottom: 30px;"></div>

### 2.4 在配置文件中配置 autoprefixer
方式一：
```js
// postcss.config.js
module.exports = {
  plugins: {
    "autoprefixer": {
      "overrideBrowserslist": [
          "ie >= 8", // 兼容IE7以上浏览器，-ms-
          "Firefox >= 3.5", // 兼容火狐版本号大于3.5浏览器，-moz-
          "chrome  >= 35", // 兼容谷歌版本号大于35浏览器,-webkit-
          "opera >= 11.5" // 兼容欧朋版本号大于11.5浏览器,-o- 
          "chrome  >= 36", // 如果需要适配的浏览器完全兼容则不会添加前缀
      ]
    }
  }
}
```

方式二：
```js
{
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        [
          "autoprefixer",
          {
            // Options
          },
        ],
      ],
    }
  }
}
```
<div style="margin-bottom: 30px;"></div>

### 2.5 效果展示
```js
webkit-transform: translate(0px, 0px);
-moz-transform: translate(0px, 0px);
-ms-transform: translate(0px, 0px);
-o-transform: translate(0px, 0px);
transform: translate(0px, 0px);
```
<div style="margin-bottom: 50px;"></div>


## 3.使用 PostCSS 自动将 px 转换成 rem
### 3.1 rem
1）概念：`rem` 是 `CSS3` 新增的相对长度单位，是指相对于根元素 `html` 的 `font-size` 计算值的大小 <br>

2）计算方法：（html的font-size） * （设置的rem的值） = （实际的px）<br>

以 `750px` 的屏宽为基准（也就是设计稿给我们的width是 `750px`），那么设置 `7.5rem`则为满屏, `font-size` 为 *750/7.5=100px* (`7.5rem` 满屏方式方便计算，因为 `iphone6` 宽度为 `375px`)

3）设置 font-size <br>
`viewport-fit` 可以设置可视视窗的大小,相见[文档](https://juejin.cn/post/6963941148163473445), `user-scalable` 设置用户是否可以手动缩放，相见[文档](https://www.cnblogs.com/pigtail/archive/2013/03/15/2961631.html)
```js
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
/>
<script>
const SCREEN_WIDTH = 
  document.documentElement.clientWidth 
  || document.body.clientWidth
const REM 
  = (SCREEN_WIDTH / 7.5).toFixed(2)
document.documentElement.style.fontSize = REM + 'px'
</script>
```

4）计算 rem <br>
正常的 `px` 尺寸除以 `font-size` 即可, 比如：
- 如果是 *750px* 的屏幕宽度，满屏是 *7.5rem*, `font-size` 为 *100*， 如果设置成一半的宽度为 *750px/2/100 = 3.75rem*。
- 如果是 *375px* 的屏幕宽度，满屏依然为 *7.5rem*，`font-size` 应该为 *50*，则设置成一半的宽度为 *375px/2/50 = 3.75rem*

切换不同机型式记得刷新页面
<div style="margin-bottom: 30px;"></div>


### 3.2 安装 postcss-pxtorem
```js
npm install postcss-pxtorem -D
```
<div style="margin-bottom: 30px;"></div>

### 3.3 在配置文件中配置 postcss-pxtorem
```js
"postcss-pxtorem": {
  rootValue: 100, // 根元素字体大小，设置一个基准
  // propList: ['*'] // 可以从px更改到rem的属性
  propList: ["height"]
}
```
<div style="margin-bottom: 30px;"></div>

### 3.4 效果
```js
// 代码中
img {
  width: 375px;
}

// 实际运行效果
img {
  width: 3.75rem;
}
```
<div style="margin-bottom: 30px;"></div>


- [webpack 官网](https://webpack.js.org/loaders/postcss-loader/)
- [postcss 官网](https://www.postcss.com.cn/)
- [查看浏览器属性兼容性](https://www.caniuse.com/?search=transform)
- [browerlist](https://github.com/browserslist/browserslist#queries)
- [postcss-pxtorem](https://www.npmjs.com/package/postcss-pxtorem)
- [rem 基本概念](https://lvan-zhang.github.io/views/css/2019/080128.html#%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)