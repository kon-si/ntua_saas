var api_domain = 'http://localhost:9104';

var countryCode = '';
var prodType = ''
var startDate = '20220101';
var endDate = '20220103';

$('#generation-countries-list').val(countryCode);
$('#production-types-list').val(prodType);
$('#generation-start-date').val(startDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
$('#generation-end-date').val(endDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));

// Sets Date format for Header
setDate();

let conn = null;

$('#generation-submit-btn').on('click', function() {
  if (conn !== null && conn !== undefined) {conn.close();}
  conn = atApiCall();
}); 

$('.reload-data-btn').on('click', function() {
  // Restore the parameters
  $('#generation-countries-list').val(countryCode);
  $('#production-types-list').val(prodType);
  $('#generation-start-date').val(startDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
  $('#generation-end-date').val(endDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
  //  Make call again
  if (conn !== null && conn !== undefined) {conn.close();}
  conn = atApiCall();
});

function atApiCall() {

  countryCode = $('#generation-countries-list').val();
  prodType = $('#production-types-list').val();
  if (countryCode == '') {
    window.alert('! Please select a Country');
    return;
  }
  if (prodType == '') {
    window.alert('! Please select a Production Type');
    return;
  }
  startDate = $('#generation-start-date').val().replace(/-/g, "");
  endDate = $('#generation-end-date').val().replace(/-/g, "");


  var source = new EventSource(`${api_domain}/generation/api/stream/${countryCode}/${prodType}/${startDate}/${endDate}`);
  source.onmessage = function(event) {
    var parsedData = JSON.parse(event.data);
    let dataList = parsedData['Data'];
    console.log('Data size : ' + dataList.length);
    if (dataList.length == 0) {
      window.alert('! No such data available for ' + countriesList[countryCode]);
    }
    dataList.sort(comparator);
    chartData = dataList.map(a => [new Date(a.date_time).getTime(), parseFloat(a.actual_generation_output)]);
    drawChart(chartData, 'main-chart-generation'); 
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
      text: 'Energy Generation over Time'
    },
    subtitle: {
      text: (countryCode == '' ? '' : countriesList[countryCode]) +' '+ (prodType == '' ? '' : '('+productionTypesList[prodType]+')'),
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
      name: 'Generation',
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

drawChart([], 'main-chart-generation'); 

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
let countriesSelector = document.getElementById('generation-countries-list');

for (let c in countriesList) {
  let newOption = document.createElement('option');
  newOption.value = c;
  newOption.innerHTML = countriesList[c];
  countriesSelector.appendChild(newOption);
}

let productionTypesList = {
    "Fossil Brown coal/Lignite": "Lignite",
    "Wind Onshore": "Wind Onshore",
    "Wind Offshore": "Wind Offshore",
    "Fossil Gas": "Fossil Gas",
    "Fossil Hard coal": "Fossil Coal",
    "Fossil Oil": "Fossil Oil",
    "Biomass": "Biomass",
    "Solar": "Solar",
    "Hydro Run-of-river and poundage": "Hydro (River)",
    "Hydro Water Reservoir": "Hydro (Reservoir)",
    "Nuclear": "Nuclear",
    "Waste": "Waste",
    "Geothermal": "Geothermal",
    "Other renewable": "Other renewable",
    "Other": "Other"
}

// Production Types Selector Input
let prodTypesSelector = document.getElementById('production-types-list');

for (let p in productionTypesList) {
  let newOption = document.createElement('option');
  newOption.value = p;
  newOption.innerHTML = productionTypesList[p];
  prodTypesSelector.appendChild(newOption);
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

