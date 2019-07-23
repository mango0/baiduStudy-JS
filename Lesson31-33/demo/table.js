function getNewForm(mappingData){
    // 若原来有table，则先删除
    while(tableWrapper.hasChildNodes()){
        tableWrapper.removeChild(tableWrapper.firstChild);
    }
    var table=document.createElement('table');
    var thead=document.createElement('thead');
    thead.appendChild(generateHead());
    table.appendChild(thead);                       // 遍历表头并存储

    var tbody=document.createElement('tbody');
    tbody.setAttribute('class','thebody');
    table.appendChild(tbody);                       // 创建表格体

    // 遍历数据
    for(var k in mappingData){
        var bodyTr=document.createElement('tr');
        if(k%selectRegion.length==0&&judging==1){
            var product=document.createElement('td');
            product.innerHTML=mappingData[k].product;
            product.setAttribute('rowspan',selectRegion.length);
            bodyTr.appendChild(product);
        }else if(k==0&&judging==2){
            var region=document.createElement('td');
            region.innerHTML=mappingData[k].region;
            region.setAttribute('rowspan',mappingData.length);
            bodyTr.appendChild(region);
        }
        bodyTr=loopAppend(bodyTr,mappingData[k]);
        tbody.appendChild(bodyTr);


    }
    tableWrapper.appendChild(table);
}

// 遍历生成新的表头
function generateHead(){
    var theTr=document.createElement('tr');
    theTr.setAttribute('class','list');
    var productName=document.createElement('td');
    productName.innerHTML="商品";
    var addr=document.createElement('td');
    addr.innerHTML="地区";
    if(judging==0||judging==1){
        theTr.appendChild(productName);
        theTr.appendChild(addr);
    }else{
        theTr.appendChild(addr);
        theTr.appendChild(productName);
    }

    for(var j=1;j<=12;j++){
        var month=document.createElement('td');
        month.innerHTML=j+"月";
        theTr.appendChild(month);
    }
    return theTr;
}

// 遍历数据
function loopAppend(bodyTr,mappingData) {
    var region = document.createElement('td');
    region.innerHTML = mappingData.region;
    var product = document.createElement('td');
    product.innerHTML = mappingData.product;

    if (judging == 1) {
        bodyTr.appendChild(region);
    } else if (judging == 2) {
        bodyTr.appendChild(product);
    } else {
        bodyTr.appendChild(product);
        bodyTr.appendChild(region);
    }


    for (var i = 0; i < 12; i++) {
        var monthContent = document.createElement('td');
        monthContent.innerHTML = mappingData.sale[i];
        bodyTr.appendChild(monthContent);
    }
    return bodyTr;
}