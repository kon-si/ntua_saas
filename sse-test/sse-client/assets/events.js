var count = 1;

var statsTable = document.getElementById("table-body");

var countriesList = {
	"AL": "Albania",
	"AT": "Austria",
	"BY": "Belarus",
	"BE": "Belgium",
	"BA": "Bosnia Herzegovina",
	"BG": "Bulgaria",
	"HR": "Croatia",
	"CY": "Cyprus",
	"CZ": "Czech Republic",
	"DK": "Denmark",
	"EE": "Estonia",
	"FI": "Finland",
	"FR": "France",
	"GE": "Georgia",
	"DE": "Germany",
	"GR": "Greece",
	"HU": "Hungary",
	"IE": "Ireland",
	"IT": "Italy",
	"LV": "Latvia",
	"LT": "Lithuania",
	"LU": "Luxembourg",
	"MT": "Malta",
	"ME": "Montenegro",
	"NL": "Netherlands",
	"MK": "North Macedonia",
	"NO": "Norway",
	"PL": "Poland",
	"PT": "Portugal",
	"MD": "Republic of Moldova",
	"RO": "Romania",
	"RS": "Serbia",
	"SK": "Slovakia",
	"SI": "Slovenia",
	"ES": "Spain",
	"SE": "Sweden",
	"CH": "Switzerland",
	"TR": "Turkey",
	"UA": "Ukraine",
	"GB": "United Kingdom",
	"AZ": "Azerbaijan",
	"RU": "Russia",
	"XK": "Kosovo",
	"AM": "Armenia"
}

function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

var atCountryCode = 'BE';
var atStartDate = '20220101';
var atEndDate = '20220123';
var source = new EventSource(`http://localhost:9103/total/api/stream/${atCountryCode}/${atStartDate}/${atEndDate}`);

source.onmessage = function(event) {
    // window.alert('new data !!');
    // console.log(event);
    var parsedData = JSON.parse(event.data);
    console.log(parsedData);
    console.log('Data size : ' + parsedData['Data'].length);
    let dataList = parsedData['Data'];
    dataList.sort(comparator);
    console.log('Data sorted : ');
    console.log(dataList);
    let chartData = dataList.map(a => [new Date(a.date_time).getTime(), parseFloat(a.total_load_value)]);
    // let valuesList = dataList.map(a => a.total_load_value);
    console.log(chartData);
    // console.log(valuesList);
    drawChart(chartData);
    // console.log(parsedData['Data'][0]);
    // console.log(parsedData['Data'][0]['total_id']);
    // var new_facts = [];
    // new_facts = new_facts.concat(parsed_data);
    // console.log(new_facts.length);

    // var new_tr = document.createElement('tr');
    // var new_td_info = document.createElement('td');
    // new_td_info.innerHTML += parsed_data['info'];
    // var new_td_source = document.createElement('td');
    // new_td_source.innerHTML += parsed_data['source'];
    // new_tr.appendChild(new_td_info);
    // new_tr.appendChild(new_td_source);
    // statsTable.appendChild(new_tr);
};

function comparator(a,b) {
    return (new Date(a.date_time) - new Date(b.date_time));
}

function drawChart(inputData) {
    Highcharts.chart('container',{
        chart: {
            zoomType: 'x',
            // backgroundColor: '#242424'
        },
        title: {
            text: 'Total consumption over time',
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime',
            // labels: {
            //     format: '{value:%Y/%m/%d %H:%M %S}',
            // }
        },
        yAxis: {
            title: {
                text: 'Total Consumption'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            },
        },
        series: [{
            // turboThreshold: 0,
            type: 'area',
            name: 'Consumption',
            // data: inputData.map(a => [new Date(a[0]).getTime(), a[1]])
            data: inputData
        }]
    });
}

Highcharts.theme = {
    colors: [
        '#F7BF4F',
    ],
    title: {
        style: {
            color: '#adaec1',
        }
    },
    xAxis: {
        lineColor: '#333333'
    },
    yAxis: {
        gridLineColor: '#333333'
    },
    chart: {
        backgroundColor: '#242424',
        borderColor: '#242424'
    },
};
// Apply the theme
Highcharts.setOptions(Highcharts.theme);


$(()=>{

    // atApiCall();

    // consume().catch((err) => {
    //     console.error('error in consumer: ', err);
    // })

    // setInterval(()=> {
    //     console.log('Health Check ' + count);
    //     count += 1;
    // }, 10000)
    
});

/////-----------------------------
//              API CALLS
/////-----------------------------

///// ACTUAL TOTAL (AT)



function atApiCall() {
    $.ajax({
        url: `http://localhost:9103/total/api/data/${atCountryCode}/${atStartDate}/${atEndDate}`,
        type: 'GET',
        dataType: 'json',
        cache: false,
        async: false,
        success: onSuccessAT,
        error: function(){
            alert("No data :(")
        }
    });
}

function onSuccessAT(data) {
    let rows = data.Data;
    window.alert("New data have arrived : " + rows.length);
}
