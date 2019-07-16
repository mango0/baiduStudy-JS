let selectRegion = document.getElementById('selectRegion');
let table = document.getElementById('table');
let tbody = table.getElementsByTagName('tbody');

let regionArr = [];

selectRegion.addEventListener('change', function() {
    console.log(selectRegion.value);

    let arr = setnewRegion(selectRegion.value);

    setTable(arr);
})

// 重新设置符合所选地区条件的数据
function setnewRegion(value) {
    regionArr = [];

    for(let i in sourceData) {
        if(value === 'huadong' && sourceData[i].region === '华东') {
            regionArr.push(sourceData[i]);
        }else if(value === 'huanan' && sourceData[i].region === '华南') {
            regionArr.push(sourceData[i]);
        }else if(value === 'huabei' && sourceData[i].region === '华北') {
            regionArr.push(sourceData[i]);
        }
    }

    return regionArr;
}

// 往 table 里填值
function setTable(arr) {
    for(let i in arr) {
        let tr = document.createElement('tr');

        let td1 = tr.insertCell(0);
        td1.innerHTML = arr[i].product;

        let td2 = tr.insertCell(1);
        td2.innerHTML = arr[i].region;

        for(let j = 0;j < arr[i].sale.length;j++) {
            let td3 = tr.insertCell(j + 2);
            td3.innerHTML = arr[i].sale[j];
        }
        tbody[0].appendChild(tr);
    }
}