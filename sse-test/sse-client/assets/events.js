var count = 1;

var statsTable = document.getElementById("table-body");
// console.log(statsTable);

// var source = new EventSource('http://localhost:8000/events');

var atCountryCode = 'BE';
var atStartDate = '20220101';
var atEndDate = '20220227';
var source = new EventSource(`http://localhost:9103/total/api/data/${atCountryCode}/${atStartDate}/${atEndDate}`);

source.onmessage = function(event) {
    window.alert('new data !!');
    // console.log(event);
    var parsedData = JSON.parse(event.data);
    console.log(parsedData);
    console.log('Data size : ' + parsedData['Data'].length);
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

$(()=>{

    // atApiCall();

    // consume().catch((err) => {
    //     console.error('error in consumer: ', err);
    // })

    setInterval(()=> {
        console.log('Health Check ' + count);
        count += 1;
    }, 10000)
    
});

/////-----------------------------
//              API CALLS
/////-----------------------------

///// ACTUAL TOTAL (AT)



function atApiCall() {
    $.ajax({
        url: `http://localhost:9103/total/api/data/${atCountryCode}/${atStartDate}/${atEndDate}`,
        type: 'POST',
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
