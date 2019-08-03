function drawBar(data) {
    var barGraph = document.querySelector("#bar-graph");
    var graphWidth = 700;
    var graphHeight = 300;
    const graphPadding = 25;
    //轴的宽高
    const axisWidth = graphWidth - graphPadding;
    const axisHeigt = graphHeight - graphPadding;
    //柱的间隔
    const barGap = 12;
    //单个数据柱子的宽
    const barWidth = ((axisWidth - graphPadding - barGap * 13) / 12) / data.length;
    //每根柱子的颜色
    const barColor = ["#27a1ea", "#9cdc82", "#ff9f69", "#d660a8", "#6370de", "#32d3eb", "#d4ec59", "#feb64d", "#b55cbd"];
    //轴的颜色
    const axisColor = "#000";
    //最大值
    var dataMax = 0;
    //柱状图数据sale
    var newData = [];

    //设置html的svg的宽度和高度
    barGraph.setAttribute("width", graphWidth);
    barGraph.setAttribute("height", graphHeight);
    //找到最大值
    for (let i = 0; i < data.length; i++) {
        if (typeof data[0] != "number") {
            let temp = Math.max(...data[i].sale);//es6扩展运算符 将数组转为序列。
            if (temp > dataMax) {
                dataMax = temp;
            }
            newData.push(data[i].sale);
        } else {
            dataMax = Math.max(...data);
            newData.push(data[i]);
        }
    }
    //数据和像素的折算
    var rate = dataMax / (axisHeigt - graphPadding);
    //绘制坐标轴
    let barHtml = [];
    //先纵轴再横轴注意SVG画线模板间隔
    barHtml.push("<line x1=" + graphPadding + " y1=0" + " x2=" + graphPadding + " y2=" + axisHeigt + " stroke=" + axisColor + " stroke-width='2'/>");
    barHtml.push("<line x1=" + graphPadding + " y1=" + axisHeigt + " x2=" + axisWidth + " y2=" + axisHeigt + " stroke=" + axisColor + " stroke-width='2'/>");
    //绘制柱状图(需要X,Y,宽度,高度)(高度=数值/rate)
    for (let i = 0; i < newData.length; i++) {
        for (let j = 0; j < newData[i].length; j++) {
            let num = parseInt(newData[i][j]);
            let barBlock = data.length * barWidth;

            let x = graphPadding + (j + 1) * barGap + i * barWidth + j * barBlock;
            barHtml.push("<rect width=" + barWidth + " height=" + (num / rate) + " x=" + x + " y=" + (axisHeigt - num / rate) + " fill=" + barColor[i] + " />");
        }
    }
    barGraph.innerHTML = barHtml.join(""); //join("")拼成字符串无间隔 join()默认为逗号,
}