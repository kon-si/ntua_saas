$(function() {
    $('#login-submit-btn').on('click', function () {
        let user = $('#login-user-input').val().toString();
        let password = $('#login-password-input').val().toString();

        let username = (user.includes('@') ? "" : user);
        let email = (user.includes('@') ? user : "");

        makeLoginCall(username, email, password);
    })

    window.gapi.load('client:auth2', () => {
        window.gapi.client.init({
            clientId: '672536076610-rogv5neidkecehc646ag644c6j8e59o7.apps.googleusercontent.com',
            scope: "email",
            plugin_name: "dashboard"
        })
    });

});

// LOGIN REQUEST
function makeLoginCall(username, email, password) {
    $.ajax({
        url: 'http://127.0.0.1:9101/authorisation/api/login',
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {
            withCredentials: true   // Sends http requests with credentials (ex. cookies)
        },
        data: JSON.stringify({
            "username" : username,
            "email" : email,   
            "password" : password
        }),
        success: function() {
            console.log('You are logged in !');
            window.location.replace("http://127.0.0.1:80/?user="+username);
        },
        error: function() { // WRONG CREDENTIALS
            console.log('Error in login !');
            // window.location.replace("http://127.0.0.1:80/login");
        }
    });
}

function onSignIn(googleUser) {
    // console.log('IT WORKS');
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(JSON.stringify(id_token));

    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    // window.location.replace("http://127.0.0.1:80/?user="+profile.getName());
}
