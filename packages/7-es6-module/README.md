## 1. ES6 模块化
在 `ES6` 出现之前，`JS` 不像其他语言拥有“模块化”这一概念，于是为了支持 `JS` 模块化
我们使用类、立即执行函数或者第三方插件 `(RequireJS、seaJS)` 来实现模块化。
但是在 `ES6` 出现之后, 上述解决方案都已经被废弃, 因为 `ES6` 中正式引入了模块化的概念。<br>

`ES6` 模块化模块和 `NodeJS` 中一样, 一个文件就是一个模块, 模块中的数据都是私有的
`ES6` 模块化模块和 `NodeJS` 中一样, 可以通过对应的关键字暴露模块中的数据,可以通过对应的关键字导入模块, 使用模块中暴露的数据
<div style="margin-bottom: 50px;"></div>


## 2. ES6 模块化使用
### 2.1 常规导出
#### 2.1.1 分开导入导出
```js
// 导入
import {xxx} from "path";

// 导出，如下
export xxx;

// 写法一，export后跟声明语句或函数
export var m = 1;
// 写法二
var m = 1;
export {m};
```

#### 2.1.2 一次性导入导出
```js
export {xxx, yyy, zzz};
import {xxx, yyy, zzz} from "path";

// 通过 as 变量名被修改后原有变量名
import {xxx as x, yyy, zzz} from "path";
```
<div style="margin-bottom: 30px;"></div>

### 2.2 默认导入导出
```js
export default xxx;
import xxx from "path";
```

注意点:
一个模块只能使用一次默认导出, 多次无效
默认导出时, 导入的名称可以和导出的名称不一致
<div style="margin-bottom: 30px;"></div>


### 2.3 混合导入导出
```js
export {a, b}
export default c;
import c, {a, b} from "path";
```


### 2.4 libraryTarget 和 library
[libraryTarget](https://blog.csdn.net/qq_17175013/article/details/119753486)