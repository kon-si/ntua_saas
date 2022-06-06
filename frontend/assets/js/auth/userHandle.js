var api_domain = '127.0.0.1:9101';
// var web_domain = '127.0.0.1:80';
var web_domain = 'localhost:80';

$(function() {

    // CHECK LOGIN 
    
    if (checkCookie('google-user-jwt')) {
        console.log("User is logged in ! (Google)");
    } else {
        $.ajax({
            url: 'http://'+api_domain+'/authorisation/api/welcome',
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
                window.location.replace('http://'+web_domain+'/login');
                console.log("Not logged in :(");
            }
        });
    }

    // LOGOUT 
    $('#logout-btn').on('click', function () {
        if (checkCookie('google-user-jwt')) {
            deleteCookie('google-user-jwt');
            window.location.replace('http://'+web_domain+'/login');
        } else {
            $.ajax({
                url: 'http://'+api_domain+'/authorisation/api/logout',
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                xhrFields: {
                    withCredentials: true  
                },
                success: function () {
                    window.location.replace('http://'+web_domain+'/login');
                },
                error: function(){  // NO TOKEN
                    window.location.replace('http://'+web_domain+'/login');
                }
            });
        }
    });

}); 