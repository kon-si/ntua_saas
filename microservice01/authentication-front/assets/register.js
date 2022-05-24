var api_domain = '127.0.0.1:9101';
// var web_domain = '127.0.0.1:80';
var web_domain = 'localhost:80';

$(function() {
    $('#register-submit-btn').on('click', function () {
        let username = $('#register-username-input').val().toString();
        let email = $('#register-email-input').val().toString();
        let password = $('#register-password-input').val().toString();

        makeRegisterCall(username, email, password);
    })
});

// REGISTER REQUEST
function makeRegisterCall(username, email, password) {
    $.ajax({
        url: 'http://'+api_domain+'/authorisation/api/register',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true   // Sends http requests with credentials (ex. cookies)
        },
        data: JSON.stringify({
            "fist_name" : "",
            "last_name" : "",
            "username" : username,
            "email" : email,   
            "password" : password
        }),
        success: function() {
            window.location.replace('http://'+web_domain+'/');
        },
        error: function() { // WRONG CREDENTIALS
            console.log('Oops, something went wrong !');
        }
    });

}