// var api_domain = 'http://127.0.0.1:9101';
var api_domain = 'https://api-authentication-image-47nenum5kq-ew.a.run.app';
var web_domain = 'http://localhost:80';

$(function() {

    // CHECK LOGIN 
    
    if (checkCookie('google-user-jwt')) {
        console.log("User is logged in ! (Google)");
    } else {
        $.ajax({
            url: `${api_domain}/authorisation/api/welcome`,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true  
            },
            success: function () {
                console.log('You are logged in !');
            },
            error: function(){  // NO TOKEN
                window.location.replace(`${web_domain}/login`);
                console.log("Not logged in :(");
            }
        });
    }

}); 

// LOGOUT 
$('.signout-btn').on('click', function () {
    if (checkCookie('google-user-jwt')) {
        deleteCookie('google-user-jwt');
        window.location.replace(`${web_domain}/login`);
    } else {
        $.ajax({
            url: `${api_domain}/authorisation/api/logout`,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true  
            },
            success: function () {
                deleteCookie('x-access-token');
                deleteCookie('google-user-jwt');
                window.location.replace(`${web_domain}/login`);
            },
            error: function(){  // NO TOKEN
                deleteCookie('x-access-token');
                deleteCookie('google-user-jwt');
                window.location.replace(`${web_domain}/login`);
            }
        });
    }
});

// RENEW SUBSCRIPTION
$('.extend-btn').on('click', function () {
    $.ajax({
        url: `${api_domain}/authorisation/api/renew`,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true  
        },
        data: JSON.stringify({ 
            "days" : 30
        }),
        success: function () {
            console.log('Subscription Renewed !');
            updateRemDays();
        },
        error: function(){  // NO TOKEN
            console.log('Error in subsciption renewal :( !');
        }
    });
});

function updateRemDays() {
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
                const response = data;
                let remDays = (response['expiration_date'] === null ? 0 : getRemDays(response['expiration_date']));
                console.log('Refresh timee');
                // subscription days
                let daysRemActual = (remDays <= 0 ? 0 : remDays);
                $('.subscription-time').html(daysRemActual.toString() + ' days left');
            },
            error: function() { // WRONG CREDENTIALS
                console.log('Error with User Data :( !');
            }
        });
    } else {
        $('.subscription-time').html('0 days left');
    }
}

function getRemDays(expirDate) {
    const today = new Date();
    const expiration = new Date(expirDate);
    
    let t1 = today.getTime();
    let t2 = expiration.getTime();

    let remDays = Math.floor((t2-t1)/(24*3600*1000));

    return remDays;
}