let selectRegion = document.getElementById('selectRegion');
let selectProduct = document.getElementById('selectProduct');
let table = document.getElementById('table');
let tbody = table.getElementsByTagName('tbody');

let newArr = [];
let selectRegionValue, selectProductValue;


// 选择地区
selectRegion.addEventListener('change', function() {
    let index = selectRegion.options.selectedIndex;
    selectRegionValue = selectRegion.options[index].text;


    let arr = setData(selectRegionValue, selectProductValue);

    setTable(arr);
})

// 选择商品种类
selectProduct.addEventListener('change', function() {
    let index = selectProduct.options.selectedIndex;
    selectProductValue = selectProduct.options[index].text;

    let arr = setData(selectRegionValue, selectProductValue);

    setTable(arr);
})



// 重新设置符合所选条件的数据
function setData(regionValue, productValue) {
    newArr = [];

    console.log(regionValue,'regionValue');
    console.log(productValue,'productValue');

    // 如果没有选择任何下拉，则显示全部数据
    if(!regionValue && !productValue) {
        newArr = sourceData;
    }else {
        for(let i in sourceData) {
            if(regionValue && !productValue) {
                if(sourceData[i].region === regionValue) {
                    newArr.push(sourceData[i]);
                }
            }else if(!regionValue && productValue) {
                if(sourceData[i].product === productValue) {
                    newArr.push(sourceData[i]);
                }
            }else if(regionValue && productValue) {
                if(sourceData[i].region === regionValue && sourceData[i].product === productValue) {
                    newArr.push(sourceData[i]);
                }
            }
        }
    }

    return newArr;
}


// 往 table 里填值
function setTable(arr) {

    tbody[0].innerHTML = '';

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

setTable(sourceData);





let allSelect = document.getElementById('allSelect');
let checkboxWrapper = document.getElementsByClassName('checkbox-wrapper');
let checkboxInput = checkboxWrapper[0].getElementsByTagName('input');

// 点击全选时，如果单个选项中只要有一个不是被选上的状态，则进行全选操作
/*allSelect.addEventListener('change', function() {
    // console.log(allSelect.checked);

    if(allSelect.checked) {
        for(let i = 0;i < checkboxInput.length;i++) {
            checkboxInput[i].checked = true;
        }
    }else {
        for(let i = 0;i < checkboxInput.length;i++) {
            // 点击全选时，如果单个选项中所有选项都已经是被选上的状态，则无反应
            if(checkboxInput[i].checked) {
                allSelect.checked = true;
            }
        }
    }
})*/

// 事件委托，监听多选框
checkboxWrapper[0].addEventListener('change', function(e) {
    let event = window.event || e;
    let target = event.target || event.srcElement;

    let input = target.tagName.toLowerCase();
    if(input === 'input') {

        // 有这个自定义属性说明是全选框
        if(target.dataset.type === 'all') {
            // 如果选中全选框
            if(target.checked) {
                // 选中所有的多选框
                for(let i = 0;i < checkboxInput.length;i++) {
                    checkboxInput[i].checked = true;
                }
            }else {
                for(let i = 0;i < checkboxInput.length;i++) {
                    // 1。点击全选时，如果单个选项中所有选项都已经是被选上的状态，则无反应
                    if(checkboxInput[i].checked) {
                        target.checked = true;
                    }
                }
            }
        }else {
            // 2。如果当前是全选状态，取消任何一个子选项，则全选CheckBox也要置为未勾选状态
            if(!target.checked) {
                allSelect.checked = false;
            }

            let count = 0;
            for(let i = 0;i < checkboxInput.length;i++) {
                if(checkboxInput[i].checked) {
                    count++;
                }

                // 3。点击最后一个未被选中的单个选项后，全选CheckBox也要置为被勾选状态
                if(count === checkboxInput.length) {
                    allSelect.checked = true;
                }
            }
            // 4。不允许一个都不勾选，所以当用户想取消唯一一个被勾选的子选项时，无交互反应，不允许取消勾选
            if(count === 0) {
                target.checked = true;
            }
        }
    }
})