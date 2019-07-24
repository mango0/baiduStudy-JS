let areaWrap = document.getElementById('areaWrap');
let kindWrap = document.getElementById('kindWrap');
createCheckBox(areaWrap, [{
    value: 1,
    text: "华东",
    code: 'huadong'
}, {
    value: 2,
    text: "华南",
    code: 'huanan'
}, {
    value: 3,
    text: "华北",
    code: 'huabei'
}
]);

createCheckBox(kindWrap, [{
    value: 1,
    text: "手机",
    code: 'phone'
}, {
    value: 2,
    text: "笔记本",
    code: 'mac'
}, {
    value: 3,
    text: "智能音箱",
    code: 'audio'
}
]);


// 生成 checkbox
function createCheckBox(boxWrap, arr) {
    // 生成全选checkbox的html，给一个自定义属性表示为全选checkbox，比如checkbox-type="all"
    let allCheckboxInput = document.createElement('input');
    allCheckboxInput.setAttribute('type', 'checkbox');
    allCheckboxInput.setAttribute('data-type', 'all');
    // allCheckboxInput.setAttribute('id', 'all');

    let allLabel = document.createElement('label');
    allLabel.innerHTML = '全选';

    boxWrap.appendChild(allCheckboxInput);
    boxWrap.insertBefore(allLabel, allCheckboxInput);


    /*遍历参数对象 {
        生成各个子选项checkbox的html，给一个自定义属性表示为子选项
    }*/
    for(let i = 0;i < arr.length;i++) {
        let checkboxInput = document.createElement('input');
        checkboxInput.setAttribute('type', 'checkbox');
        checkboxInput.setAttribute('id', arr[i].code);

        let label = document.createElement('label');
        label.setAttribute('for', arr[i].code);
        label.innerHTML = arr[i].text;

        boxWrap.appendChild(checkboxInput);
        boxWrap.insertBefore(label, checkboxInput);
    }

}


let selectAreaArr = [];
let selectKindArr = [];

// 事件委托，监听多选框
areaWrap.addEventListener('change', function(e) {
    selectAreaArr = [];
    // selectKindArr = [];

    let event = window.event || e;
    let target = event.target || event.srcElement;

    let children = areaWrap.getElementsByTagName('input');
    let label = areaWrap.getElementsByTagName('label');

    let allCheckboxInput;
    for(let i = 0;i < children.length;i++) {
        // 获取 全选 input
        if (children[i].getAttribute('data-type') === 'all') {
            allCheckboxInput = children[i];
        }
    }

    let input = target.tagName.toLowerCase();
    if(input === 'input') {

        // 有这个自定义属性说明是全选框
        if(target.dataset.type === 'all') {
            // 如果选中全选框
            if(target.checked) {
                // 选中所有的多选框
                for(let i = 0;i < children.length;i++) {
                    children[i].checked = true;

                    selectAreaArr.push(label[i].innerHTML);
                }
            }else {
                for(let i = 0;i < children.length;i++) {
                    // 1。点击全选时，如果单个选项中所有选项都已经是被选上的状态，则无反应
                    if(children[i].checked) {
                        target.checked = true;
                    }
                }
            }
        }else {
            // 2。如果当前是全选状态，取消任何一个子选项，则全选CheckBox也要置为未勾选状态
            if(!target.checked) {
                allCheckboxInput.checked = false;
            }

            let count = 0;
            for(let i = 0;i < children.length;i++) {
                if(children[i].checked) {
                    count++;

                    selectAreaArr.push(label[i].innerHTML);
                }else {
                    selectKindArr.slice(i, 1);
                }

                // 3。点击最后一个未被选中的单个选项后，全选CheckBox也要置为被勾选状态
                if(count === children.length) {
                    allCheckboxInput.checked = true;
                }
            }
            // 4。不允许一个都不勾选，所以当用户想取消唯一一个被勾选的子选项时，无交互反应，不允许取消勾选
            if(count === 0) {
                target.checked = true;
            }
        }

        // console.log(selectAreaArr,'selectAreaArr');
        let arr = setDataAgain(selectAreaArr, selectKindArr);

        // console.log(arr,'arr');

        // setTable(arr);

        setTable(rowspanFun(arr, ['product', 'region']));
    }
})
kindWrap.addEventListener('change', function(e) {
    // selectAreaArr = [];
    selectKindArr = [];

    let event = window.event || e;
    let target = event.target || event.srcElement;

    let children = kindWrap.getElementsByTagName('input');
    let label = kindWrap.getElementsByTagName('label');

    let allCheckboxInput;
    for(let i = 0;i < children.length;i++) {
        // 获取 全选 input
        if (children[i].getAttribute('data-type') === 'all') {
            allCheckboxInput = children[i];
        }
    }

    let selectArr = [];

    let input = target.tagName.toLowerCase();
    if(input === 'input') {

        // 有这个自定义属性说明是全选框
        if(target.dataset.type === 'all') {
            // 如果选中全选框
            if(target.checked) {
                // 选中所有的多选框
                for(let i = 0;i < children.length;i++) {
                    children[i].checked = true;

                    selectKindArr.push(label[i].innerHTML);
                }
            }else {
                for(let i = 0;i < children.length;i++) {
                    // 1。点击全选时，如果单个选项中所有选项都已经是被选上的状态，则无反应
                    if(children[i].checked) {
                        target.checked = true;
                    }
                }
            }
        }else {
            // 2。如果当前是全选状态，取消任何一个子选项，则全选CheckBox也要置为未勾选状态
            if(!target.checked) {
                allCheckboxInput.checked = false;

            }

            let count = 0;
            for(let i = 0;i < children.length;i++) {
                if(children[i].checked) {
                    count++;

                    selectKindArr.push(label[i].innerHTML);
                }else {
                    selectKindArr.slice(i, 1);
                }

                // 3。点击最后一个未被选中的单个选项后，全选CheckBox也要置为被勾选状态
                if(count === children.length) {
                    allCheckboxInput.checked = true;
                }
            }
            // 4。不允许一个都不勾选，所以当用户想取消唯一一个被勾选的子选项时，无交互反应，不允许取消勾选
            if(count === 0) {
                target.checked = true;
            }
        }

        // console.log(selectKindArr,'selectKindArr');
        let arr = setDataAgain(selectAreaArr, selectKindArr);

        // console.log(arr,'arr');

        // setTable(arr);
        setTable(rowspanFun(arr, ['product', 'region']));
    }
})
// input  change 事件
function inputChange(e, boxWrap) {
    let event = window.event || e;
    let target = event.target || event.srcElement;

    let children = boxWrap.getElementsByTagName('input');
    let label = boxWrap.getElementsByTagName('label');

    let selectArr = [];

    let input = target.tagName.toLowerCase();
    if(input === 'input') {

        // 有这个自定义属性说明是全选框
        if(target.dataset.type === 'all') {
            // 如果选中全选框
            if(target.checked) {
                // 选中所有的多选框
                for(let i = 0;i < children.length;i++) {
                    children[i].checked = true;

                    selectArr.push(label[i].innerHTML);
                }
            }else {
                for(let i = 0;i < children.length;i++) {
                    // 1。点击全选时，如果单个选项中所有选项都已经是被选上的状态，则无反应
                    if(children[i].checked) {
                        target.checked = true;
                    }
                }
            }
        }else {
            // 2。如果当前是全选状态，取消任何一个子选项，则全选CheckBox也要置为未勾选状态
            if(!target.checked) {
                allCheckboxInput.checked = false;
            }

            let count = 0;
            for(let i = 0;i < children.length;i++) {
                if(children[i].checked) {
                    count++;

                    selectArr.push(label[i].innerHTML);
                }

                // 3。点击最后一个未被选中的单个选项后，全选CheckBox也要置为被勾选状态
                if(count === children.length) {
                    allCheckboxInput.checked = true;
                }
            }
            // 4。不允许一个都不勾选，所以当用户想取消唯一一个被勾选的子选项时，无交互反应，不允许取消勾选
            if(count === 0) {
                target.checked = true;
            }
        }

        console.log(selectArr,'selectArr');
        let arr = setDataAgain(selectArr);

        console.log(arr,'arr');

        setTable(arr);

    }
}

// 重新设置符合所选条件的数据
function setDataAgain(selectRegionValue, selectProductValue) {
    newArr = [];

    /*console.log(selectRegionValue,'selectRegionValue');
    console.log(selectProductValue,'selectProductValue');*/

    // 如果没有选择任何下拉，则显示全部数据
    if(selectRegionValue.length === 0 && selectProductValue.length === 0) {
        newArr = sourceData;
    }else {
        for(let i in sourceData) {
            if(selectRegionValue.length !== 0 && selectProductValue.length === 0) {
                for(let j in selectRegionValue) {
                    if(sourceData[i].region === selectRegionValue[j]) {
                        newArr.push(sourceData[i]);
                    }
                }
            }else if(selectRegionValue.length === 0 && selectProductValue.length !== 0) {
                for(let j in selectProductValue) {
                    if(sourceData[i].product === selectProductValue[j]) {
                        newArr.push(sourceData[i]);
                    }
                }
            }else if(selectRegionValue.length !== 0 && selectProductValue.length !== 0) {
                let aArr = [];
                for(let j in selectRegionValue) {
                    if(sourceData[i].region === selectRegionValue[j]) {
                        aArr.push(sourceData[i]);
                    }
                }
                for(let k in aArr) {
                    for(let j in selectProductValue) {
                        if(aArr[k].product === selectProductValue[j]) {
                            newArr.push(sourceData[i]);
                        }
                    }
                }


            }
        }
    }

    // console.log(newArr,'newArr');

    return newArr;
}


let selectRegion = document.getElementById('selectRegion');
let selectProduct = document.getElementById('selectProduct');
let table = document.getElementById('table');
let tbody = table.getElementsByTagName('tbody');

let newArr = [];
// let selectRegionValue, selectProductValue;


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

    /*console.log(regionValue,'regionValue');
    console.log(productValue,'productValue');*/

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
        td1.setAttribute('rowspan', arr[i].productRowspan);

        for(let j = 0;j < arr[i].sale.length;j++) {
            let td3 = tr.insertCell(j + 2);
            td3.innerHTML = arr[i].sale[j];
        }
        tbody[0].appendChild(tr);
    }
}
// setTable(sourceData);
setTable(rowspanFun(sourceData, ['product', 'region']));


/**
 * 单元格合并方法,增加rowspan属性
 * @param data 要处理的数据
 * @param nameList 合并的字段list
 */
function rowspanFun(data, nameList) {
    for (var i = 0; i < nameList.length; i++) {
        var name = nameList[i];
        var startRow = 0;
        var endRow = data.length;
        var mergeNum = 1;
        if (endRow != 1) {
            for (var j = startRow; j < endRow; j++) {
                if (j == endRow - 1) { //判断是否是最后一个元素
                    if (startRow == endRow - 1) {
                        data[j][name + 'Rowspan'] = 1;
                    }
                } else {
                    if (data[startRow][name] == data[j + 1][name]) {
                        data[j + 1][name + 'Rowspan'] = 0;
                        mergeNum = mergeNum + 1;
                        data[startRow][name + 'Rowspan'] =mergeNum;
                    } else {
                        startRow = j + 1;
                        if (mergeNum > 1) {
                            data[startRow][name + 'Rowspan'] = 1;
                        } else {
                            data[j][name + 'Rowspan'] = 1;
                        }
                        mergeNum = 1;
                    }
                }
            }
        } else {
            data[0][name + 'Rowspan'] = 1;
        }
    }

    console.log(data,'data');
    return data;
}