##### 数据类型

+ JavaScript 从左向右计算表达式，不同次序会产生不同结果；

```javascript
let x = 91 + 7 + 'a'; // 98a
let x = 'a' + 91 + 7; // a917（由于第一个操作数是自负串，因此所有操作数都被视为字符串）
```

+ JavaScript 拥有动态类型。这意味着相同变量可用作不同类型；
+ `typeof`  可确定 JavaScript 变量的类型；其对数组返回 'object' ，因为在 JavaScript 中数组属于对象；
+ 任何变量均可设置值为 `undefined` 进行清空，其类型也将是 `undefined` ；
+ `var person = null` ，值是 `null` ，但类型仍是对象；
+ `undefined` 与 `null` 的值相等，但类型不相等；

##### `Number` 对象

```javascript
var myNum = new Number(value);
var myNum = Number(value);
```

+ 当 `Number()` 和运算符 `new` 一起作为构造函数使用时，它返回一个新创建的`Number` 对象；
+ 如果不用 `new` 运算符，把 `Number()` 作为一个转化函数来调用，它将把自己的参数转换成一个原始的数值，并返回这个值(如转换失败，返回`NaN`)；

##### `String` 对象

+ JavaScript的字符串是不可变的， String 类定义的方法都不能改变字符串的内容。像 `String.toUpperCase()` 这样的方法，返回的是全新的字符串，而不是修改原始字符串；

