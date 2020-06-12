//地图

function echartsChina(scales) {
    var mapName = 'china'
    var data = [
        { name: "北京", value: 177 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 20 },
        { name: "上海", value: 24 },
        { name: "江苏", value: 92 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 17 },
        { name: "山东", value: 119 },
        { name: "河南", value: 15 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 91 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 35 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 67 },
        { name: "广东", value: 123 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 },
		{ name: "台湾", value: 147 },
    ];
    let scales1 = echarts.init(document.getElementById(scales));
    var option = {
        //滑入的弹窗
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            backgroundColor: 'rgba(0,0,0,.8)',
            borderColor: '#11183c',//#3574c8
            borderWidth: '2',
            extraCssText: 'padding:10px;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
            show: true,
            formatter: function(params) {
                var tipHtml = `<div style="width:280px;height:180px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">
                <div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">
                    <span style="margin-left:10px;color:#fff;font-size:16px;">${params.name}</span>
                </div>
                <div style="padding:10px">
                    <p style="color:#fff;font-size:12px;">
                        <i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">
                        </i> 数据：
                        <span style="color:#11ee7d;margin:0 6px;">${params.value}</span>个</p>
                </div>
            </div>
            </div>`
                return tipHtml;
            }
        },
        backgroundColor: "rgba(22,80,158,0.8)",
        visualMap: {
            type: 'piecewise',
            //  根据数据大小跳转颜色
            pieces: [{
                    max: 30,
                    label: 'Level 1',
                    color: '#009688'
                },
                {
                    min: 30,
                    max: 60,
                    label: 'Level 2',
                    color: '#F7B824'
                },
                {
                    min: 60,
                    label: 'Level 3',
                    color: '#FF5722'
                },
            ],
            color: '#fff',
            textStyle: {
                color: '#fff',
            },
            visibility: 'off'
        },
        geo: {
            map: 'china',
            zoom: 1.2,
            roam: true,
            label: {
                normal: {
                    show: true,
                    color: '#fff'
                },
                emphasis: {
                    show: true,
                    color: '#fff'
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#fbfbfb',
                    borderColor: '#fff',
                },
                emphasis: {
                    areaColor: '#3574c8'
                }
            }
        },
        series: [{
            type: 'map',
            mapType: 'china',
            geoIndex: 0,
            data: data,
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: '#000',
                        fontSize: 11,
                    }
                }
            },
            zlevel: 5,
        }, ]
    };
    scales1.setOption(option);
    scales1.on('click', function(params) {
        var _self = this;
        //params 是跳转的参数
        window.location.href = `csvPage.html?name=${params.data.name}`
    });
}