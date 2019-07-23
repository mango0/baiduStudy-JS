// 生成一组CheckBox
function generateCheckBoxs(ratioBox,data){
    console.log(ratioBox);
    ratioBox=genCheckBox(ratioBox,data);
    var childrens=ratioBox.children;
    var length=childrens.length-1;
    childrens[0].οnclick=function(){
        setAllTrue(childrens);
        getNewForm(getSelected());
    }
    for(var k=1;k<=length;k++){
        childrens[k].οnclick=function(){
            var count=0;
            for(var p=1;p<=length;p++){
                if(childrens[p].checked){
                    count++;
                }
            }
            if(count==length){
                setAllTrue(childrens);
            }else if(count>0){
                setFalse(childrens);
            }else{
                this.checked=true;
            }
            getNewForm(getSelected());
        }
    }
}
// 生成CheckBox appendChild 
function genCheckBox(RatioBox,data){
    var all=document.createElement('input');
    all.setAttribute('type','checkbox');
    all.setAttribute('value','1');
    RatioBox.appendChild(all);
    var temp=document.createTextNode("全选");
    RatioBox.appendChild(temp);

    for(var d=0; d<data.length;d++){
        var choosing=document.createElement('input');
        choosing.setAttribute('type','checkbox');
        choosing.setAttribute('value',data[d].text);
        /* choosing.setAttribute('oninput',"childrenFunc()"); */
        var p=document.createTextNode(data[d].text);
        RatioBox.appendChild(choosing);
        RatioBox.appendChild(p);
    }
    return RatioBox;
}
// 点击全选时，如果单个选项中只要有一个不是被选上的状态，则进行全选操作
function setAllTrue(childrens){
    for(var p in childrens){
        childrens[p].checked=true;
    }
    return childrens;
}

// 其中一个取消勾选时，全选按钮取消勾选
function setFalse(childrens){
    childrens[0].checked=false;
}
// 设定 table 内容的js  table.js

// 根据checkbox选项获取数据
function getSelected() {
    mappingData = [];
    selectRegion = [];                    // 地区类
    selectKind = [];                      // 商品类

    /* region  获取地区类所选属性*/

    for (var k = 1; k <= regionRatio.children.length - 1; k++) {
        if (regionRatio.children[k].checked) {
            selectRegion.unshift(regionRatio.children[k].value);
        }
    }

    /* 获取商品种类选项的值 */
    for (var k = 1; k <= productRatio.children.length - 1; k++) {
        if (productRatio.children[k].checked) {
            selectKind.unshift(productRatio.children[k].value);
        }
    }
    // 地区多选，商品没有时
    if (selectRegion.length >= 1 && selectKind.length == 0) {
        judging = 0;
        for (var i in sourceData) {
            for (var p in selectRegion) {
                if (sourceData[i].region == selectRegion[p]) {
                    mappingData.unshift(sourceData[i]);
                }

            }
        }
    }
    // 商品多选，地区没有时
    if (selectKind.length >= 1 && selectRegion.length == 0) {
        judging = 0;
        for (var i in sourceData) {
            for (var p in selectKind) {
                if (sourceData[i].product == selectKind[p]) {
                    mappingData.unshift(sourceData[i]);
                }
            }
        }
    }
    // 地区和商品都只有一个 
    if (selectRegion.length == 1 && selectKind.length == 1) {
        judging = 0;
        for (var i in sourceData) {
            if (sourceData[i].region == selectRegion[0] && sourceData[i].product == selectKind[0]) {
                mappingData.unshift(sourceData[i]);
            }
        }
    }
    // 商品选择了一个，地区选择了多个的时候 :商品在前，地区在后
    if (selectRegion.length > 1 && selectKind.length == 1) {
        judging = 1;
        for (var i in sourceData) {
            for (var p in selectRegion) {
                if (sourceData[i].region == selectRegion[p] && sourceData[i].product == selectKind[0]) {
                    mappingData.unshift(sourceData[i]);
                }

            }
        }
    }
    // 当地区选择了一个，商品选择了多个的时候 ： 商品在后，地区在前
    if (selectRegion.length == 1 && selectKind.length > 1) {
        judging = 2;
        for (var i in sourceData) {
            for (var p in selectKind) {
                if (sourceData[i].region == selectRegion[0] && sourceData[i].product == selectKind[p]) {
                    mappingData.unshift(sourceData[i]);
                }

            }
        }
    }
    // 商品和地区都选择了多于一个的情况下:商品作为第一列，地区作为第二列
    if (selectRegion.length > 1 && selectKind.length > 1) {
        judging = 1;
        for (var i in sourceData) {
            for (var p in selectRegion) {
                for (var k in selectKind) {
                    if (sourceData[i].region == selectRegion[p] && sourceData[i].product == selectKind[k]) {
                        mappingData.unshift(sourceData[i]);
                    }
                }
            }
        }
    }
    return mappingData;
}