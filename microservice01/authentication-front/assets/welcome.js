$(document).ready(function(){
    console.log('HELLO');

    

    const response = $.ajax({
        url: 'http://localhost:9103/authorisation/api/login',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true
        },
        headers: {
            
        },
        data: JSON.stringify({
            "username" : "nickbel7",
            "email" : "bellos@gmail.com",   
            "password" : "123456"
        }),
        success: function() {
            console.log('You are logged in !');
        },
        error: function() {
            console.log('Oops, something went wrong !');
        }
    });

    // $.ajax({
    //     url: 'http://127.0.0.1:9103/authorisation/api/welcome',
    //     type: 'POST',
    //     dataType: 'json',
    //     success: function () {
    //         console.log('It works');
    //     },
    //     error: function(){
    //         window.location.replace("http://localhost:80/login");
    //         console.log("Not logged in :(");
    //     }
    // });


}); 