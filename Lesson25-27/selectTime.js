// 此版本是提交作业后查看别人代码后，发现自己的不足，优化后的；

let selectWrapper = document.getElementById('selectWrapper');

let yearSelect = document.getElementById('year-select');
let monthSelect = document.getElementById('month-select');
let dateSelect = document.getElementById('day-select');
let hourSelect = document.getElementById('hour-select');
let minuteSelect = document.getElementById('minute-select');
let secondSelect = document.getElementById('second-select');

let resultWrapper = document.getElementById('result-wrapper');

// 设置数字范围
function setRange(min, max, pId) {
    for(let i = min;i <= max;i++) {
        let option = document.createElement('option');
        pId.appendChild(option);
        option.value = i;
        option.innerHTML = i;
    }
}

setRange(1900, 2050, yearSelect);
setRange(1, 12, monthSelect);
setRange(1, new Date(yearSelect.value, monthSelect.value, 0).getDate(), dateSelect);
setRange(1, 24, hourSelect);
setRange(1, 59, minuteSelect);
setRange(1, 59, secondSelect);

// 年和月改变的时候，获取天数
yearSelect.addEventListener('change', function() {
    setRange(1, new Date(yearSelect.value, monthSelect.value, 0).getDate(), dateSelect);
});
monthSelect.addEventListener('change', function() {
    setRange(1, new Date(yearSelect.value, monthSelect.value, 0).getDate(), dateSelect);
});


// 修改选择时间是星期几的格式；
function changeDay(selectDayIs) {
    let selectDay;
    switch(selectDayIs) {
        case 0:
            selectDay = '星期日';
            break;
        case 1:
            selectDay = '星期一';
            break;
        case 2:
            selectDay = '星期二';
            break;
        case 3:
            selectDay = '星期三';
            break;
        case 4:
            selectDay = '星期四';
            break;
        case 5:
            selectDay = '星期五';
            break;
        case 6:
            selectDay = '星期六';
            break;
    }
    return selectDay;
}


// 比对两个日期，获取相差的天时分秒
function compareTime(startTime, endTime) {
    let dValue = endTime - startTime;

    let time = Math.abs(dValue / 1000);

    let resultDate = Math.floor(time / 24 / 60 / 60);
    let resultHour = Math.floor(time / 60 / 60)% 24;
    let resultMinute = Math.floor(time / 60) % 60;
    let resultSecond = Math.floor(time) % 60;

    let arr = [resultDate, resultHour, resultMinute, resultSecond];

    if(dValue >= 0) {
        arr[4] = '已经过去';
    }else {
        arr[4] = '还有';
    }

    return arr;
}


function setHtml() {
    // 获取时间
    let date = new Date();
    let nowDateTime = date.getTime(); // 把当前时间转换成毫秒数

    // 获取选择的年月日时分秒；
    let selectYear = yearSelect.value;
    let selectMonth = monthSelect.value;
    let selectDate = dateSelect.value;
    let selectHour = hourSelect.value;
    let selectMinute = minuteSelect.value;
    let selectSecond = secondSelect.value;

    let selectDates = new Date(selectYear, selectMonth - 1, selectDate, selectHour, selectMinute, selectSecond);
    let selectDayIs = changeDay(selectDates.getDay()); // 获取选择时间是星期几,并转换格式；

    let selectDateTime = selectDates.getTime(); // 把选择时间转换成毫秒数

    let arr = compareTime(selectDateTime, nowDateTime);


    let html = '现在距离' + selectYear + '年' + selectMonth + '月' + selectDate + '日 '
        + selectDayIs + ' ' + selectHour + ':' + selectMinute + ':' + selectSecond + ' ' + arr[4]
        + arr[0] + '天' + arr[1] + '小时' + arr[2] + '分' + arr[3] + '秒';

    return html;
}

selectWrapper.addEventListener('change', function() {
    setInterval(function() {
        resultWrapper.innerHTML = setHtml();
    }, 200)
})


// 获取现在时间
function getNowDate() {
    let nowDate = document.getElementById('nowDate');
    // 获取现在时间
    let date = new Date();
    nowDate.innerHTML = date.toLocaleString();
}
let t = setInterval(getNowDate, 200);
