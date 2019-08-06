function drawLine(wrap, data) {
    if(wrap.getContext) {
        let ctx = canvasWrap.getContext('2d');

        // 获取容器宽高
        let wrapWidth = wrap.clientWidth;
        let wrapHeight = wrap.clientHeight;

        // 定义轴的宽高
        let axisWidth = wrapWidth - 100;
        let axisHeight = wrapHeight - 100;

        // 定义颜色
        let axisColor = '#333';
        let lineColor = '#a9334c';

        // 定义x轴数据的长度
        let length = data.length;

        // 定义好每两个数据点之间的横向间隔距离
        let xSpacing = Math.round((axisWidth - 50) / length);

        // 拿到折线图中的最大值Max
        let maxValue = Math.max(...data);

        // 根据Max和你用来绘制折线图图像区域的高度，进行一个数据和像素的折算比例
        let ySpacing = Math.round((axisHeight - 50) / maxValue);


        // 绘制横轴及纵轴
        ctx.moveTo(50, 50);
        ctx.lineTo(50, axisHeight);
        ctx.stroke();
        ctx.moveTo(50, axisHeight);
        ctx.lineTo(axisWidth, axisHeight);
        ctx.stroke();
        ctx.strokeStyle = axisColor;


        // 遍历数据
        for(let i = 0;i < data.length;i++) {
            // 计算将要绘制数据点的坐标
            // 绘制数据点
            ctx.beginPath();
            ctx.arc(xSpacing * (i + 1), ySpacing * data[i], 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.strokeStyle = lineColor;
            // ctx.closePath();

            console.log(xSpacing * (i + 1),'xSpacing');
            console.log(ySpacing * (i + 1),'ySpacing');


            // if 不是第一个点 {
           /* if(i !== 0) {
                // 绘制这个数据点和上一个数据点的连线


                ctx.lineTo(xSpacing * (i + 1), ySpacing * data[i]);
                i++;
                ctx.stroke();
                ctx.strokeStyle = lineColor;
            }*/
            // 记录下当前数据点的数据用于下一个点时绘制连线
        }
    }
}

