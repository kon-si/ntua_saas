var api_domain = 'http://127.0.0.1:9101';

$(function() {
    // Sets Date format for Header
    setDate();
    setName();
});

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

function setName() {
    if (checkCookie('x-access-token')) {
        $.ajax({
            url: `${api_domain}/authorisation/api/userinfo/`,
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true   // Sends http requests with credentials (ex. cookies)
            },
            success: function(data) {
                console.log('User Data retrieved !');
                // const response = JSON.parse(data);
                const response = data;

                $('#greeting-header').html('Hello ' + response['username'] + ' !');
            },
            error: function() { // WRONG CREDENTIALS
                console.log('Error with User Data :( !');
            }
        });
    } else if (checkCookie('google-user-jwt')) {
        let googleToken = getCookie('google-user-jwt');

        const Http = new XMLHttpRequest();
        const url = 'https://oauth2.googleapis.com/tokeninfo?id_token='+googleToken;
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            if (Http.readyState === XMLHttpRequest.DONE) {
                const response = JSON.parse(Http.responseText);

                $('#greeting-header').html('Hello ' + response['given_name'] + ' !');
            }
        };
    } else {
        $('#greeting-header').html('Hello');
    }
}
