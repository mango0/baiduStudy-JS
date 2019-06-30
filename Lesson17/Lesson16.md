以下是容易忽略的点

##### 变量
+ **如果把字符串放入引号中，其余数值会被视为字符串并被级联；**
  `var x = "8" + 3 + 5 // 835`
+ **如果重复声明JavaScript变量，将不会丢它的值；**
  ```javascript
  var carName = 'lily';
  var carName;
  console.log(carName); // lily

  // 
  var carName = 'lily';
  var carName = 'mike';
  console.log(carName); // mike
  ```
##### `switch`语句中，
+ **默认的`case`不必是`switch`代码块中最后一个`case`；**
+ **如果`default`不是`switch`代码块中最后一个`case`，记得用`break`结束默认`case`；**
+ **不必在`switch`代码块中的最后一个`case`写`break`，代码块在此处会自动结束；**
+ `Switch case`使用严格比较（`===`），值必须要与匹配的类型相同；
  ```javascript
  switch(new Date().getDay()) {
    defalut: 
		text = '期待(*❦ω❦)';
		break;
	case 6:
		text = 'Saturady';
		break;
	case 0:
		text = 'Sunday';
  }
  ```
+ 不同的`case`可使用相同的代码块；
  ```javascript
  switch(new Date().getDay()) {
	case 4:
	case 5:
		text = "周末快到了"
  }
  ```
##### 循环
+ `for`： 多次遍历代码块；
  ```javascript
  let text = 0;
  for(let i = 0;i < 5;i++) {
	text += i;  // 10
  }
  /*
  * 在循环开始前设置了一个变量（let i = 0）
  * 定义运行循环的条件（i < 5）
  * 在代码块每次执行后对值进行递增（i++）
  */
  ```
+ `for/in`： 遍历对象属性；
  ```javascript
  let person = {'firstName': 'Bill','lastName': 'Gates','age': 22};
  for(let i in person) {	
	person[i]; // Bill Gates 22
  }
  ```
+ `while`： 当指定条件为true时循环一段代码块；
+ `do/while`： 当执行条件为true时循环一段代码块(该循环至少执行一次，即使条件为false，因为代码块会在条件测试前执行)；
  ```javascript
  let sum = 0,i = 0;
  do{
	sum += i;
	i++; // ☆☆☆ 必须要对条件中所用变量进行递增，否则循环用不结束！！
  }
  while(i < 4);
  ```
+ `break`语句“跳出”循环；
+ `continue`语句“跳过”循环中的一个迭代；
##### 类型转换
+ `typeof`运算符可以确定JavaScript变量的数据类型，它始终返回**字符串**（包含运算数的类型）；
	1. `NaN`的数据类型是数值
	2. 数组的数据类型是对象
	3. 日期的数据类型是对象
	4. `null`的数据类型是对象
	5. 未定义变量/未赋值的变量的数据类型是 `undefined`
+ `constructor`属性返回所有JavaScript变量的构造器函数;
  ```javascript
  ['a', 0].constructor === Array //true
  ```
+ 全局`String()`能够把数字转换为字符串；数字方法`toString()`同理;
+ 大多数值都有`toString()`方法，但`null`和`undefined`是没有的;
+ `Number()`把字符串转换成数字；
  1. 包含数字的字符串("3.14")转换成数字(3.14)
  2. 空的字符串转换为0
  3. 其他字符串转换为`NaN`
+ JavaScript会自动调用变量的`toString()`函数；
##### 错误
+ `try`语句允许定义一个代码块，以便在执行时检查错误；
+ `catch`语句允许定义一个要执行的代码块，如果 try 代码中发生错误；
+ `throw`语句允许创建自定义错误，抛出异常；
+ `finally`语句允许在 try 和 catch 之后执行代码。无论结果如何都会执行；
  ```javascript
  <p>请输入 5 到 10 之间的数字：</p>
	<input id="text" type="text">
	<button onclick="checkNumber()">检测输入</button>
	<p id="tips"></p>
	<script>
	function checkNumber() {
	    let text = document.getElementById('text').value;
	    let tips = document.getElementById('tips');
	    tips.innerHTML = '';
	
	    try {
	        if(text === '') throw '是空哒';
	        if(isNaN(text)) throw '不是数字';
	
	        text = Number(text);
	
	        if(text > 10) throw '太大啦';
	        if(text < 5) throw '太小啦';
	    }
	    catch(err) {
	        tips.innerHTML = err;
	    }
	    finally {
	        document.getElementById('text').value = '';
	    }
	}
	</script>
  ```

##### 二进制与十进制

+ 二进制转十进制：从右到左用二进制的每个数去乘2的相应次方小数点则是从左向右；

  1101.01： 1 * 2<sub>0</sub> + 0 * 2<sub>1</sub> + 1 * 2<sub>2</sub> + 1 * 2<sub>3</sub> +   0 * 2<sub>-1</sub> + 1 * 2<sub>-2</sub> = 1 + 0 + 4 + 8 + 0 + .25 = 13.25  

+ 一个数的负次方等于这个数的正次方的倒数；

+ 任何数的0次方都是1，0的0次方无意义；

+ 十进制转二进制

  如：255=（11111111）

  255/2=127=====余1

  127/2=63======余1

  63/2=31=======余1

  31/2=15=======余1

  15/2=7========余1

  7/2=3=========余1

  3/2=1=========余1

  1/2=0=========余1