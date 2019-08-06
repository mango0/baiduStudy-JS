function drawBar(data) {

    // 定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
    let width = 700;
    let height = 500;
    let xAxisWidth = 600;
    let yAxisHeight = 400;

    // 定义好每一个柱子的宽度及柱子的间隔宽度
    let barWidth = 35;
    let barSpacing = 10;

    // 定义好柱子颜色，轴的颜色
    let colorsArr = ['#569ae2', '#2390d2', '#33a0d2', '#2fb0d2', '#2cbdd3', '#46aab8']
    let barColor = '#569ae2';
    let axisColor = '#46aab8';
    let axisWidth = 4;

    // 拿到柱状图中的最大值Max
    let maxValue;
    for(let i in data) {
        if(typeof data[i] === 'number') {
            maxValue = Math.max(...data);
        }
    }
    // console.log(maxValue,'maxValue');

    // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例
    //
    let svgStart = '<svg width="' + width + '" height="' + height + '" version="1.1" xmlns="http://www.w3.org/2000/svg">';
    let svgEnd = '</svg>';

    // 绘制横轴及纵轴
    let xAxis = '<line x1="0" x2="' + xAxisWidth + '" y1="' + yAxisHeight + '" y2="' + yAxisHeight + '" stroke="' + axisColor + '" stroke-width="' + axisWidth + '"></line>';
    let yAxis = '<line x1="0" x2="0"' + 'y1="0" y2="' + yAxisHeight + '" stroke="' + axisColor + '" stroke-width="' + axisWidth + '"></line>';
    // 遍历数据 {
    //     计算将要绘制柱子的高度和位置
    //     绘制每一个柱子
    // }
    let barAll = '';
    for(let i in data) {
        let dHeight = yAxisHeight - data[i];
        if(typeof data[i] === 'number') {
            let bar = '<rect width="' + barWidth + '" height="' + data[i] + '" x="'+ (barWidth * i + barSpacing * i) +
                '" y="' + dHeight + '" fill="' + barColor + '">' + '</rect>'
            barAll += bar;
        }
    }

    svgStart = svgStart + xAxis + yAxis + barAll;

    let svgWrap = svgStart + svgEnd;
    return svgWrap;
}