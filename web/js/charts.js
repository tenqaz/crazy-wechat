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
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
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

function show_province(province_data) {

    var province_chart = echarts.init(document.getElementById('province_chart'));

    title_list = []
    data = []

    for (var i in province_data) {
        if (i == "") {
            continue;
        }
        title_list.push(i)
        data.push({name: i, value: province_data[i]})
    }

    options = {
        title: {
            text: '省份分布',
            subtext: '',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: title_list
        },
        series: [
            {
                name: '省份',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data,
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

    province_chart.setOption(options);
}

function filter_city(city_data) {
    filter_data = {}
    for(var i in city_data){
        filter_data[i] = city_data[i] > 3;
    }
    return filter_data;
}

function show_city(city_data) {

    title = []
    data = []

    for (var i in city_data) {
        if (i == "") {
            continue;
        }
        title.push(i)
        data.push({name: i, value: city_data[i]})
    }

    console.log(title)
    console.log(data)

    var city_chart = echarts.init(document.getElementById('city_chart'));
    filter_data = filter_city(city_data)
    console.log(filter_data)

    option = {
        title : {
            text: '城市分布',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: title,
            selected: filter_data,
        },
        series : [
            {
                name: '城市',
                type: 'pie',
                radius : '55%',
                center: ['40%', '50%'],
                data: data,
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

    city_chart.setOption(option)
}