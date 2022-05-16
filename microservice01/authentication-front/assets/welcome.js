$(function() {
    console.log('HELLO');

    // LOGIN REQUEST
    // $.ajax({
    //     url: 'http://127.0.0.1:9101/authorisation/api/login',
    //     type: 'POST',
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     xhrFields: {
    //         withCredentials: true   // Sends http requests with credentials (ex. cookies)
    //     },
    //     data: JSON.stringify({
    //         "username" : "nickbel7",
    //         "email" : "bellos@gmail.com",   
    //         "password" : "123456"
    //     }),
    //     success: function() {
    //         console.log('You are logged in !');
    //     },
    //     error: function() { // WRONG CREDENTIALS
    //         window.location.replace("http://127.0.0.1:80/login");
    //         // console.log('Oops, something went wrong !');
    //     }
    // });

    // REGISTER REQUEST
    // $.ajax({
    //     url: 'http://127.0.0.1:9101/authorisation/api/register',
    //     type: 'POST',
    //     dataType: 'json',
    //     contentType: 'application/json',
    //     xhrFields: {
    //         withCredentials: true   // Sends http requests with credentials (ex. cookies)
    //     },
    //     data: JSON.stringify({
    //         "fist_name" : "",
    //         "last_name" : "",
    //         "username" : "nickbel1",
    //         "email" : "bellos1@gmail.com",   
    //         "password" : "123456"
    //     }),
    //     success: function() {
    //         console.log('You are logged in !');
    //     },
    //     error: function() { // WRONG CREDENTIALS
    //         window.location.replace("http://127.0.0.1:80/register");
    //         console.log('Oops, something went wrong !');
    //     }
    // });

    // CHECK LOGIN 
    $.ajax({
        url: 'http://127.0.0.1:9101/authorisation/api/welcome',
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
            window.location.replace("http://127.0.0.1:80/login");
            console.log("Not logged in :(");
        }
    });


    // LOGOUT 
    $('#home-logout-btn').on('click', function () {
    
        $.ajax({
            url: 'http://127.0.0.1:9101/authorisation/api/logout',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            xhrFields: {
                withCredentials: true  
            },
            success: function () {
                window.location.replace("http://127.0.0.1:80/login");
                console.log('You are logged out');
            },
            error: function(){  // NO TOKEN
                window.location.replace("http://127.0.0.1:80/login");
                console.log("Not logged in :(");
            }
        });

    });

    var url = new URL(document.URL);
    const params = url.searchParams;

    $('#username-label').text(params.get('user'));

}); 