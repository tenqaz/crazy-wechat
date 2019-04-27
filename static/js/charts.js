function show_sex(data) {
    var sex_chart = echarts.init(document.getElementById('sex_charts'));

    options = {
        backgroundColor: '#2c343c',
        title: {
            text: '性别分布',
            left: 'center',
            top: 20,
            textStyle: {
                color: '#ccc'
            }
        },
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '性别',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                    {value: data[1], name: '男'},
                    {value: data[2], name: '女'},
                    {value: data[0], name: '未知'},
                ].sort(function (a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    return Math.random() * 200;
                }
            }
        ]
    }

    sex_chart.setOption(options);
}

function show_province(data) {

    console.log(data.keys())
    title_list = []
    data = []

    for(var i in data){
        title_list.push(i)
        data.push({name:i, value:data[i]})
    }

    console.log(title_list)
    console.log(data)

    option = {
        title : {
            text: '省份分布',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: title_list
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data: data
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

}