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
        url: 'http://127.0.0.1:9101/authorisation/api/register',
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
            // console.log('You are registerd !');
            window.location.replace("http://127.0.0.1:80/");
        },
        error: function() { // WRONG CREDENTIALS
            // window.location.replace("http://127.0.0.1:80/register");
            console.log('Oops, something went wrong !');
        }
    });

}