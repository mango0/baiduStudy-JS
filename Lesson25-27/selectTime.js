let yearSelect = document.getElementById('year-select');
let monthSelect = document.getElementById('month-select');
let dateSelect = document.getElementById('day-select');
let hourSelect = document.getElementById('hour-select');
let minuteSelect = document.getElementById('minute-select');
let secondSelect = document.getElementById('second-select');
let nowDate = document.getElementById('nowDate');
let resultWrapper = document.getElementById('result-wrapper');

// 定义选择的年月日时分秒
let selectYear, selectMonth, selectDate, selectHour, selectMinute, selectSecond;

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


let selectDates = new Date(selectYear, selectMonth, selectDate, selectHour, selectMinute, selectSecond);
let selectDayIs = selectDates.getDay(); // 获取选择时间是星期几
// let selectDate = 0;
let selectDateTime = selectDates.getTime(); // 把选择时间转换成毫秒数
console.log(selectDayIs,'selectDayIs');

// let dValue = dateTime -
