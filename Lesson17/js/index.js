// 打招呼----------------
let hello = document.querySelector('.hello');
let date = new Date().getHours();
if(date < 12) {
    hello.textContent = '早上好';
}else if(date >= 12 && date < 18) {
    hello.textContent = '下午好';
}else {
    hello.textContent = '晚上好';
}



// 笑话生成器----------------
let customName = document.getElementById('customname');
let randomize = document.querySelector('.randomize');
let story = document.querySelector('.story');
let name,content;
let a, b, c;

story.textcontent = '';

const storyText = 'It was 94 fahrenheit outside, so :insertx: went for a walk. When they got to :inserty:, they stared in horror for a few moments, then :insertz:. Bob saw the whole thing, but was not surprised — :insertx: weighs 300 pounds, and it was a hot day.';
const insertX = ['Willy the Goblin','Big Daddy','Father Christmas'];
const insertY = ['the soup kitchen','Disneyland','the White House'];
const insertZ = ['spontaneously combusted','melted into a puddle on the sidewalk','turned into a slug and crawled away'];

const storyTextZh = '外边有34度，于是:inserta:出去遛弯。当走到:insertb:时他们被眼前的景象惊呆了，然后就:insertc:。李雷全程目睹但他并没有慌，因为:inserta:是一个270斤的胖子，天气又辣么热。';
const insertA = ['怪兽威利', '大老爹', '圣诞老人'];
const insertB = ['救助站', '迪士尼乐园', '白宫'];
const insertC = ['自燃了', '在人行道化成了一坨泥', '变成一条鼻涕虫爬走了'];


randomize.addEventListener('click', createStory);

// 点击按钮
function createStory() {

    // 如果是中文；
    if(document.getElementById('cn').checked) {
        a = random(insertA);
        b = random(insertB);
        c = random(insertC);

        content = storyTextZh.replace(':inserta:', a);
        content = content.replace(':inserta:', a);
        content = content.replace(':insertb:', b);
        content = content.replace(':insertc:', c);

        // 如果没有输入名字，那么使用默认名字；否则使用输入的名字；
        if(customName.value !== '') {
            name = customName.value;

            content = content.replace('李雷', name)
        }

    }else{
        a = random(insertX);
        b = random(insertY);
        c = random(insertZ);

        content = storyText.replace(':insertx:', a);
        content = content.replace(':inserty:', b);
        content = content.replace(':insertz:', c);
        content = content.replace(':insertx:', a);

        if(document.getElementById('uk').checked) {
            const weight = Math.round(300 * 0.0714286) + ' stone';
            const temperature = Math.round((94 - 32) * 5 / 9) + ' centigrade';

            content = content.replace('94 fahrenheit', temperature);
            content = content.replace('300 pounds', weight);
        }

        // 如果没有输入名字，那么使用默认名字；否则使用输入的名字；
        if(customName.value !== '') {
            name = customName.value;

            content = content.replace('Bob', name)
        }
    }

    story.textContent = content;
    story.style.visibility = 'visible';
}

// 生成随机数
function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}




// 加减乘除计算器----------------
let firstNumber = document.getElementById('first-number');
let secondNumber = document.getElementById('second-number');
let addBtn = document.getElementById('add-btn');
let minusBtn = document.getElementById('minus-btn');
let timesBtn = document.getElementById('times-btn');
let divideBtn = document.getElementById('divide-btn');
let result = document.getElementById('result');

addBtn.addEventListener('click', function() {
    if(checkNumber(number) === false) return;

    result.textContent = changeNumber(firstNumber.value) + changeNumber(secondNumber.value);
});
minusBtn.addEventListener('click', function() {
    result.textContent = changeNumber(firstNumber.value) - changeNumber(secondNumber.value);
});
timesBtn.addEventListener('click', function() {
    result.textContent = changeNumber(firstNumber.value) * changeNumber(secondNumber.value);
});
divideBtn.addEventListener('click', function() {
    try{
        if(changeNumber(secondNumber.value) === 0) throw '第二个数不能为0o';
        result.textContent = changeNumber(firstNumber.value) / changeNumber(secondNumber.value);
    }
    catch(err) {
        result.textContent = err;
    }
});

// 字符串转数字
function changeNumber(number) {
    return Number(number);
}





// 十进制转二进制----------------
let number01 = document.getElementById('number01');
let binBit = document.getElementById('bin-bit');
let transBtn = document.getElementById('trans-btn');
let result01 = document.getElementById('result01');
function dec2bin(decNumber) {
    // 在这里实现你的转化方法，注意需要判断输入必须为一个非负整数
    if(decNumber < 0) {
        result01.innerHTML = '只能输入正整数';
    }

    let arr = [];
    let text;
    let value = number01.value;


    while(value > 1) {
        arr.push(parseInt(value % 2));
        value = value / 2;
    }

    result01.textContent = arr.reverse().join('');

}

/*
* 实现党点击转化按钮时，将输入的十进制数字转化为二进制，并显示在result的p标签内
* 新的需求是，转化显示后的二进制数为bin-bit中输入的数字宽度，例如
* dec-number为5，bin-bit为5，则转化后数字为00101
* 如果bin-bit小于转化后的二进制本身位数，则使用原本的位数，如dec-number为5，bin-bit为2，依然输出101，但同时在console中报个错
*/
transBtn.addEventListener('click', dec2bin);




// 3的小游戏----------------
/*
* 从1到100，以此在console输出各数字，但是，当数字为3的倍数或者含有3的时候，输出“PA”
* 比如：1,2,PA,4,5,PA,……,11,PA,PA,14,PA……
 */
let three = document.querySelector('.three');
let arr03 = [];
for(let i = 1;i <= 100;i++) {
    let num;
    if(i % 3 === 0 || String(i).indexOf('3') !== -1) {
        num = 'PA';
    }else {
        num = i;
    }

    arr03.push(num);
}
three.innerHTML = arr03.join(',');



// 九九乘法表----------------
let table = document.querySelector('.table');
for(i = 1;i <= 9;i++) {
    for(j = 1;j<= i;j++) {
        console.log(i + '*' + j + '=' + i * j);
    }
}



