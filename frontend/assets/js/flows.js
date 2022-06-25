var api_domain = 'http://localhost:9102';

var countryCodeFrom = '';
var countryCodeTo = '';
var startDate = '20220101';
var endDate = '20220301';

$('#flows-countries-list-from').val(countryCodeFrom);
$('#flows-countries-list-to').val(countryCodeTo);
$('#flows-start-date').val(startDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
$('#flows-end-date').val(endDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
// atApiCall();

let conn = null;

$('#flows-submit-btn').on('click', function() {
  if (conn !== null && conn !== undefined) {conn.close();}
  conn = atApiCall();
}); 

function atApiCall() {

  countryCodeFrom = $('#flows-countries-list-from').val()
  countryCodeTo = $('#flows-countries-list-to').val()
  if (countryCodeFrom == '' || countryCodeTo == '') {
    window.alert('! Please select both Countries');
    return;
  }
  startDate = $('#flows-start-date').val().replace(/-/g, "");
  endDate = $('#flows-end-date').val().replace(/-/g, "");


  var source = new EventSource(`${api_domain}/flows/api/stream/${countryCodeFrom}/${countryCodeTo}/${startDate}/${endDate}`);
  source.onmessage = function(event) {
    var parsedData = JSON.parse(event.data);
    let dataList = parsedData['Data'];
    console.log('Data size : ' + dataList.length);
    if (dataList.length == 0) {
      window.alert('! No data for ' + countriesList[countryCodeFrom] +' -> '+ countriesList[countryCodeTo]);
    }
    dataList.sort(comparator);
    let chartData = dataList.map(a => [new Date(a.date_time).getTime(), parseFloat(a.flow_value)]);
    console.log('CHART DATA');
    console.log(chartData);
    drawChart(chartData, 'main-chart-flows'); 
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
      text: 'Physical Energy Flows over Time'
    },
    subtitle: {
      text: '???',
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
        // fillColor: {
        //   linearGradient: {
        //     x1: 0,
        //     y1: 0,
        //     x2: 0,
        //     y2: 1
        //   },
        //   stops: [
        //     [0, Highcharts.getOptions().colors[0]],
        //     [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
        //   ]
        // },
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

drawChart([], 'main-chart-flows'); 

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
let countriesSelectorFrom = document.getElementById('flows-countries-list-from');
let countriesSelectorTo = document.getElementById('flows-countries-list-to');

for (let c in countriesList) {
  let newOptionFrom = document.createElement('option');
  newOptionFrom.value = c;
  newOptionFrom.innerHTML = countriesList[c];
  countriesSelectorFrom.appendChild(newOptionFrom);

  let newOptionTo = document.createElement('option');
  newOptionTo.value = c;
  newOptionTo.innerHTML = countriesList[c];
  countriesSelectorTo.appendChild(newOptionTo);
}

$('#flows-countries-swap').on('click', function() {
    $('#flows-countries-list-from').val(countryCodeTo);
    $('#flows-countries-list-to').val(countryCodeFrom);
    if (conn !== null && conn !== undefined) {conn.close();}
    conn = atApiCall();
});
