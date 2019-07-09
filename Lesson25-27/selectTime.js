let yearSelect = document.getElementById('year-select');
let monthSelect = document.getElementById('month-select');
let dateSelect = document.getElementById('day-select');
let hourSelect = document.getElementById('hour-select');
let minuteSelect = document.getElementById('minute-select');
let secondSelect = document.getElementById('second-select');
let nowDate = document.getElementById('nowDate');
let judgeTimeBtn = document.getElementById('judgeTimeBtn');
let resultWrapper = document.getElementById('result-wrapper');

// 定义选择的年月日时分秒
let selectYear, selectMonth, selectDate, selectHour, selectMinute, selectSecond, selectDay;

// 获取时间
let date = new Date();
let nowYear = date.getFullYear();
let minYear = nowYear - 2;
let maxYear = nowYear + 2;

// 获取现在时间
nowDate.innerHTML = date.toLocaleString();
let nowDateTime = date.getTime(); // 把1当前时间转换成毫秒数

// 获取所有年份下拉, 并存入 select 的 option 中
function getYearSelect(minYear, maxYear) {
    for(let i = minYear;i <= maxYear;i++) {
        let option = document.createElement('option');
        yearSelect.appendChild(option);
        option.value = i;
        option.innerHTML = i;
    }
}
// 获取一年中的所有月份, 并存入 select 的 option 中
function getAllMonth() {
    for(let i = 1;i <= 12;i++) {
        let option = document.createElement('option');
        monthSelect.appendChild(option);
        option.value = i;
        option.innerHTML = i;
    }
}
// 获取一月中的所有天数, 并存入 select 的 option 中
function getAllDate(selectYear, selectMonth) {
    let date = new Date(selectYear, selectMonth, 0);

    for(let i = 1;i <= date.getDate();i++) {
        let option = document.createElement('option');
        dateSelect.appendChild(option);
        option.value = i;
        option.innerHTML = i;
    }

}
// 获取一天中的所有小时, 并存入 select 的 option 中
function getAllHours() {
    for(let i = 1;i <= 24;i++) {
        let option = document.createElement('option');
        hourSelect.appendChild(option);
        option.value = i;
        option.innerHTML = i;
    }
}
// 获取一小时中的所有分钟和一分钟中的所有秒, 并存入 select 的 option 中
function getAllMS() {
    for(let i = 1;i <= 59;i++) {
        let minuteOption = document.createElement('option');
        minuteSelect.appendChild(minuteOption);
        minuteOption.value = i;
        minuteOption.innerHTML = i;

        let secondOption = document.createElement('option');
        secondSelect.appendChild(secondOption);
        secondOption.value = i;
        secondOption.innerHTML = i;
    }
}
// 修改选择时间是星期几的格式；
function changeDay(selectDayIs) {
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

getYearSelect(minYear, maxYear);
getAllMonth();
getAllHours();
getAllMS();

// 选择年份
yearSelect.addEventListener('change', function() {
    let index = yearSelect.selectedIndex; // selectedIndex代表的是所选中项的index
    selectYear = yearSelect.options[index].text;
})
// 选择月份
monthSelect.addEventListener('change', function() {
    let index = monthSelect.selectedIndex;
    selectMonth = monthSelect.options[index].text;

    getAllDate(selectYear, selectMonth); // 获取所选年月的天数
})
// 选择日
dateSelect.addEventListener('change', function() {
    let index = dateSelect.selectedIndex;
    selectDate = dateSelect.options[index].text;
})
// 选择时
hourSelect.addEventListener('change', function() {
    let index = hourSelect.selectedIndex;
    selectHour = hourSelect.options[index].text;
})
// 选择分
minuteSelect.addEventListener('change', function() {
    let index = minuteSelect.selectedIndex;
    selectMinute = minuteSelect.options[index].text;
})
// 选择秒
secondSelect.addEventListener('change', function() {
    let index = secondSelect.selectedIndex;
    selectSecond = secondSelect.options[index].text;
})


judgeTimeBtn.addEventListener('click', function() {
    if(selectYear && selectMonth && selectDate && selectHour && selectMinute && selectSecond) {

        let selectDates = new Date(selectYear, selectMonth - 1, selectDate, selectHour, selectMinute, selectSecond);
        let selectDayIs = changeDay(selectDates.getDay()); // 获取选择时间是星期几,并转换格式；

        let selectDateTime = selectDates.getTime(); // 把选择时间转换成毫秒数

        let arr = compareTime(selectDateTime, nowDateTime);


        resultWrapper.innerHTML = '现在距离' + selectYear + '年' + selectMonth + '月' + selectDate + '日 '
            + selectDayIs + ' ' + selectHour + ':' + selectMinute + ':' + selectSecond + ' ' + arr[4]
            + arr[0] + '天' + arr[1] + '小时' + arr[2] + '分' + arr[3] + '秒';
    }
})


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


