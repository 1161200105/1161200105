//默认参数
var defaultdata = {
    fontColor: '#30eee9',
    title: '土壤盐度',
    backgroundColor: '#11183c',
    bottomColor: '#397cbc',
    leftTextColor: '#186afe',
    leftColor: '#186afe',
}


/**
 * 函数参数说明
 * @param {dom Id名称} id  
 * @param {图表数据} data 
 * @param {底部字体颜色} fontColor 
 * @param {标题名} title 
 * @param {背景颜色} backgroundColor 
 * @param {底部线颜色} bottomColor 
 * @param {左边文字颜色} leftTextColor 
 * @param {左边线和内容颜色} leftColor 

 */

function echartsPaim(id, data, system = defaultdata) {
    var bottomData = [] //类型
    var Data = [] //类型值
    const {
        fontColor,
        title,
        backgroundColor,
        bottomColor,
        leftTextColor,
        leftColor,
    } = system

    //遍历数据 到数组
    for (var key in data) {
        var keys = key.replace(/\s*/g, "")
        bottomData.push(keys)
        Data.push(data[key])
    }

    //柱状图
    // 初始化echart实例，获取dom
    let dom = echarts.init(document.getElementById(id));

    //   以下都是复制图表图例中的,若有其他需要的功能可自行添加
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
                trigger: "axis",
                axisPointer: {
                    type: "shadow",
                    label: {
                        show: true
                    }
                }
            },
            legend: {
                data: ["次数"],
                top: "15%",
                textStyle: {
                    color: "#ffffff"
                }
            },
            xAxis: {
                data: bottomData,
                axisLine: {
                    show: true //隐藏X轴轴线
                },
                axisTick: {
                    show: true //隐藏X轴刻度
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: fontColor //X轴文字颜色
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: bottomColor
                    }
                },
            },
            yAxis: [{
                    type: "value",
                    name: "次数",
                    nameTextStyle: {
                        color: "#ebf8ac"
                    },
                    splitLine: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: true
                    },
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: leftTextColor
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: leftColor
                        }
                    },
                },
                {
                    type: "value",
                    gridIndex: 0,
                    min: 50,
                    max: 100,
                    splitNumber: 8,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
                        }
                    }
                }
            ],
            series: [{
                name: "次数",
                type: "bar",
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "#00FFE3"
                            },
                            {
                                offset: 1,
                                color: "#4693EC"
                            }
                        ])
                    }
                },
                data: Data
            }]
        }
        //使用刚指定的配置项和数据显示图表
    dom.setOption(option);
}