var api_domain = 'http://localhost:9103';

var countryCode = '';
var startDate = '20220101';
var endDate = '20220103';

$('#total-countries-list').val(countryCode);
$('#total-start-date').val(startDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
$('#total-end-date').val(endDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));

// Sets Date format for Header
setDate();

let conn = null;

$('#total-submit-btn').on('click', function() {
  if (conn !== null && conn !== undefined) {conn.close();}
  conn = atApiCall();
}); 

$('.reload-data-btn').on('click', function() {
  // Restore the parameters
  $('#total-countries-list').val(countryCode);
  $('#total-start-date').val(startDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
  $('#total-end-date').val(endDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
  //  Make call again
  if (conn !== null && conn !== undefined) {conn.close();}
  conn = atApiCall();
});

function atApiCall() {

  countryCode = $('#total-countries-list').val()
  if (countryCode == '') {
    window.alert('! Please select a Country');
    return;
  }
  startDate = $('#total-start-date').val().replace(/-/g, "");
  endDate = $('#total-end-date').val().replace(/-/g, "");


  var source = new EventSource(`${api_domain}/total/api/stream/${countryCode}/${startDate}/${endDate}`);
  source.onmessage = function(event) {
    var parsedData = JSON.parse(event.data);
    // console.log(parsedData);
    let dataList = parsedData['Data'];
    console.log(parsedData['Data']);
    console.log('Data size : ' + dataList.length);
    if (dataList.length == 0) {
      window.alert('! No data for ' + countriesList[countryCode]);
    }
    dataList.sort(comparator);
    let chartData = dataList.map(a => [new Date(a.date_time).getTime(), parseFloat(a.total_load_value)]);
    console.log(chartData);

    let hourDict = {
      "0": [0,0], "1" : [0, 0], "2" : [0, 0], "3" : [0, 0], "4" : [0, 0], "5" : [0, 0], "6" : [0, 0], "7": [0,0], "8" : [0, 0], "9" : [0, 0], "10" : [0, 0], "11" : [0, 0], "12" : [0, 0], "13" : [0, 0], "14": [0,0], "15" : [0, 0], "16" : [0, 0], "17" : [0, 0], "18" : [0, 0], "19" : [0, 0], "20" : [0, 0], "21": [0,0], "22" : [0, 0], "23" : [0, 0]
    }
    
    for (let i = 0; i < dataList.length; i++) {
      let temphour = new Date(dataList[i].date_time).getHours(); 
      hourDict[temphour][0] += parseFloat(dataList[i].total_load_value);
      hourDict[temphour][1]++;
    }
    
    let hourArr = [];     
    for (let j = 0; j < Object.keys(hourDict).length; j++) {
      hourArr.push(parseFloat((hourDict[j][0]/hourDict[j][1]).toFixed(2)));
    }

    drawChart(chartData, 'main-chart-total'); 
    drawSideChart(hourArr, 'side-chart-total');
  };

  return source;
}

function comparator(a,b) {
  return (new Date(a.date_time) - new Date(b.date_time));
}

function drawChart(inputData, chart_id) {
  Highcharts.chart(chart_id, {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Total Consumption over Time'
    },
    subtitle: {
      text: (countryCode == '' ? '' : countriesList[countryCode]), 
      align: 'right',
      verticalAlign: 'bottom'
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
          text: 'Consumption (Joules)'
      }
    },
    legend: {
      enabled: false
    }, 
    plotOptions: {
      area: {
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
      }
    },
    series: [{
      type: 'area',
      name: 'Consumption',
      data: inputData
  }]

  })
};

function drawSideChart(inputData, chart_id) {
  Highcharts.chart(chart_id, {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Median Total Consumption'
    },
    subtitle: {
      text: (countryCode == '' ? '' : countriesList[countryCode]), 
      align: 'right',
      verticalAlign: 'bottom'
    },
    yAxis: {
      title: {
        text: 'Consumption (Joules)'
      },
    },
    xAxis: {
      title: {
          text: 'Time (Hours)'
      }
    },
    legend: {
      enabled: false
    }, 
    plotOptions: {
      area: {
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
      series: {
        borderColor: '#f7bf4f'
      }
    },
    series: [{
      type: 'bar',
      name: 'Consumption',
      data: inputData
  }]

  })
};

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
      lineColor: '#242424'
  },
  yAxis: {
      gridLineColor: '#242424'
  },
  chart: {
      backgroundColor: '#333333',
      borderColor: '#242424'
  },
};
// Apply the theme
Highcharts.setOptions(Highcharts.theme); 

drawChart([], 'main-chart-total'); 
drawSideChart([], 'side-chart-total');

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

// Countries Selector Input
let countriesSelector = document.getElementById('total-countries-list');

for (let c in countriesList) {
  let newOption = document.createElement('option');
  newOption.value = c;
  newOption.innerHTML = countriesList[c];
  countriesSelector.appendChild(newOption);
}

function setDate() {
  var objToday = new Date(),
  weekday = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'),
  dayOfWeek = weekday[objToday.getDay()],
  domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
  dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
  months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
  curMonth = months[objToday.getMonth()],
  curYear = objToday.getFullYear();
  var today = dayOfWeek + ", " + dayOfMonth + " of " + curMonth + " " + curYear;
  $('.current-date').html(today.toString());
}


