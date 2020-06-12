//默认参数
var defaultdata = {
    title: '土壤盐度',
    backgroundColor: '#11183c',
}

/**
 * 函数参数说明
 * @param {dom Id名称} id  
 * @param {底部标题 每条数据对应一个} bottomData 
 * @param {图表数据} data 
 * @param {标题名} title 
 * @param {背景颜色} backgroundColor 
 */

//温度统计曲线图
function echartsColumnarSum(id, bottomData, data, system = defaultdata) {
    var color = ['#1a9bfc', '#99da69']
    var name = ['温度', '湿度']
    var wswsum = 0;
    var wsssum = 0;
    var series = [];
    const datas = [data.wsw, data.wss]
    for (let i = 0; i < data.wsw.length; i++) {
        wswsum += parseInt(data.wsw[i])
        wsssum += parseInt(data.wss[i])

    }
    const {
        title,
        backgroundColor,
    } = system
    for (var i = 0; i < 2; i++) {
        series.push({
            name: name[i],
            type: "line",
            symbolSize: 3, //标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10[ default: 4 ]
            symbol: 'circle', //标记的图形。ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            smooth: true, //是否平滑曲线显示
            showSymbol: false, //是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: color[i]
                    }, {
                        offset: 0.8,
                        color: 'rgba(255,255,255,0)'
                    }], false),
                    shadowColor: 'rgba(255,255,255, 0.1)',
                    shadowBlur: 10,
                    opacity: 0.3,
                }
            },
            itemStyle: {
                normal: {
                    color: color[i],
                    lineStyle: {
                        width: 1,
                        type: 'solid' //'dotted'虚线 'solid'实线
                    },
                    borderColor: color[i], //图形的描边颜色。支持的格式同 color
                    borderWidth: 8, //描边线宽。为 0 时无描边。[ default: 0 ] 
                    barBorderRadius: 0,
                    label: {
                        show: false,
                    },
                    opacity: 0.5,
                }
            },
            data: datas[i],

        })
    }

    // 初始化echart实例，获取dom
    let dom = echarts.init(document.getElementById(id));
    console.log()
        //下面是配置
    var option = {
            title: {
                text: title + '统计表',
                textStyle: {
                    align: 'center',
                    color: '#fff',
                    fontSize: 20,
                },
                top: '3%',
                left: '4%',
            },
            graphic: [{
                type: 'group',
                left: 'center',
                top: '3%',
                children: [{
                        type: 'rect',
                        z: 100,
                        left: 'center',
                        top: 'middle',
                        shape: {
                            width: 160,
                            height: 60
                        },
                        style: {
                            fill: backgroundColor,
                            stroke: '#ffffff',
                            lineWidth: 3,
                            shadowBlur: 10,
                            shadowOffsetX: 3,
                            shadowOffsetY: 3,
                            shadowColor: 'rgba(0,0,0,0.6)'
                        }
                    },
                    {
                        type: 'text',
                        z: 100,
                        left: 'center',
                        top: 'middle',
                        style: {
                            fill: '#ffffff',
                            text: [
                                `温度平均值:  ${parseInt(wswsum / data.wsw.length)}%`,
                                '',
                                `湿度平均值:  ${parseInt(wsssum / data.wss.length)}%`,
                            ].join('\n'),
                            font: '14px Microsoft YaHei'
                        }
                    }
                ]
            }],
            label: {
                show: true,
                normal: {
                    formatter: '123123',
                    textStyle: {
                        fontSize: 50
                    }
                }
            },
            backgroundColor: backgroundColor,
            legend: {
                top: 20,
                right: 80,
                itemGap: 15,
                itemWidth: 15,
                textStyle: {
                    color: '#fff',
                    fontSize: '13'
                },
                data: name
            },
            tooltip: {
                trigger: "axis",
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                formatter: '{b}<br />{a0}: {c0}%<br />{a1}: {c1}%<br />',
                backgroundColor: 'rgba(0,0,0,0.7)', // 背景
                padding: [8, 10], //内边距
                extraCssText: 'box-shadow: 0 0 3px rgba(255, 255, 255, 0.4);', //添加阴影
            },
            grid: {
                left: '5%',
                right: '10%',
                top: '20%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [{
                type: "category",
                axisLine: {
                    lineStyle: {
                        color: '#32346c'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#32346c ',
                    }
                },
                boundaryGap: false, //坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样
                axisTick: {
                    show: false
                },
                splitArea: {
                    show: false
                },
                axisLabel: {
                    inside: false,
                    textStyle: {
                        color: '#bac0c0',
                        fontWeight: 'normal',
                        fontSize: '12',
                    },
                },
                data: bottomData,
            }],
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#32346c',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#32346c ',
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#bac0c0',
                        fontWeight: 'normal',
                        fontSize: '12',
                    },
                    formatter: '{value}%',
                },
            },
            series: series,
        }
        //使用刚指定的配置项和数据显示图表
    dom.setOption(option);
}