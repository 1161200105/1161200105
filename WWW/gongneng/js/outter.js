//默认参数
var defaultdata = {
    fontColor: '#30eee9',
    title: '土壤盐度',
    type: 'mmol/L',
    backgroundColor: '#11183c',
    bottomColor: '#397cbc',
    contentColor: '#195384',
    contentHcolor: '#11366e',
    leftTextColor: '#186afe',
    leftColor: '#186afe',
    DataColor: '#aecb56',
    min: 0,
    max: 4,
}

/**
 * 函数参数说明
 * @param {dom Id名称} id  
 * @param {底部标题 每条数据对应一个} bottomData 
 * @param {图表数据} data 
 * @param {底部字体颜色} fontColor 
 * @param {标题}名 title 
 * @param {数据单位名称} type 
 * @param {背景颜色} backgroundColor 
 * @param {底部线颜色} bottomColor 
 * @param {中间纵线颜色} contentColor 
 * @param {中间横线颜色} contentHcolor 
 * @param {左边文字颜色} leftTextColor 
 * @param {左边线和内容颜色} leftColor 
 * @param {数据点颜色} DataColor 
 * @param {数据最小值} min 
 * @param {数据最大值} max 

 */
function echartsColumnar(id, bottomData, data, system = defaultdata) {
    const {
        fontColor,
        title,
        type,
        backgroundColor,
        bottomColor,
        contentColor,
        contentHcolor,
        leftTextColor,
        leftColor,
        DataColor,
        min,
        max
    } = system
    // 初始化echart实例，获取dom
    let dom = echarts.init(document.getElementById(id));
    var sumMax = 0;
    if (id == 'TP') {
        for (let i = 0; i < data.length; i++) {
            sumMax += parseInt(data[i])
        }
    }
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
            backgroundColor: backgroundColor,
            grid: {
                left: '5%',
                right: '10%',
                top: '20%',
                bottom: '15%',
                containLabel: true
            },
            tooltip: {
                show: true,
                trigger: 'item'
            },
            legend: {
                show: true,
                x: 'center',
                y: '35',
                icon: 'stack',
                itemWidth: 15,
                itemHeight: 15,
                textStyle: {
                    color: '#1bb4f6'
                },
                data: [title]
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    color: fontColor
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: bottomColor
                    }
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: contentColor
                    }
                },
                data: bottomData
            }],
            yAxis: [{
                type: 'value',
                name: type,
                min: min,
                max: max,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: leftTextColor
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: leftColor
                    }
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: contentHcolor
                    }
                }
            }],
            graphic: [id == 'TP' ? {
                type: 'group',
                // left: 'center',
                right: '20%',
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
                                `PH值的平均值:  ${parseInt(sumMax / data.length)}`,
                            ].join('\n'),
                            font: '14px Microsoft YaHei'
                        }
                    }
                ]
            } : {
                type: 'group'
            }],
            series: [{
                name: title,
                type: 'line',
                stack: '总量',
                symbol: 'circle',
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: DataColor,
                        lineStyle: {
                            color: DataColor,
                            width: 1
                        },
                        areaStyle: {
                            //color: '#94C9EC'
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(7,44,90,0.3)'
                            }, {
                                offset: 1,
                                color: 'rgba(114,144,89,0.9)'
                            }]),
                        }
                    }
                },
                data: data
            }]
        }
        //使用刚指定的配置项和数据显示图表
    dom.setOption(option);
}