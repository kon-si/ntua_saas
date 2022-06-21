var atCountryCode = 'BE';
var atStartDate = '20220101';
var atEndDate = '20220103';

$('#at-start-date').val(atStartDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
$('#at-end-date').val(atEndDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3"));
atApiCall();

$('#at-submit-btn').on('click', function() {
  atApiCall();
}); 

function atApiCall() {
  atStartDate = $('#at-start-date').val().replace(/-/g, "");
  atEndDate = $('#at-end-date').val().replace(/-/g, "");
  var source = new EventSource(`http://localhost:9103/total/api/stream/${atCountryCode}/${atStartDate}/${atEndDate}`);
  source.onmessage = function(event) {
    var parsedData = JSON.parse(event.data);
    let dataList = parsedData['Data'];
    dataList.sort(comparator);
    let chartData = dataList.map(a => [new Date(a.date_time).getTime(), parseFloat(a.total_load_value)]);
    drawChart(chartData); 
  };
}

function comparator(a,b) {
  return (new Date(a.date_time) - new Date(b.date_time));
}

function drawChart(inputData) {
  Highcharts.chart('container', {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Total Consumption over Time'
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