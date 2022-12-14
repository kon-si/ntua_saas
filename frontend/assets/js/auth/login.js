// var api_domain = 'http://127.0.0.1:9101';
var api_domain = 'https://api-authentication-image-47nenum5kq-ew.a.run.app';
// var web_domain = 'http://localhost:80';
var web_domain = 'https://web-server-image-47nenum5kq-ew.a.run.app';

$(function() {
    $('#login-submit-btn').on('click', function () {
        let user = $('#login-user-input').val().toString();
        let password = $('#login-password-input').val().toString();

        let username = (user.includes('@') ? "" : user);
        let email = (user.includes('@') ? user : "");

        makeLoginCall(username, email, password);
    })
});

// LOGIN REQUEST (with website credentials)
function makeLoginCall(username, email, password) {
    $.ajax({
        url: `${api_domain}/authorisation/api/login`,
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
            deleteCookie('google-user-jwt');
            window.location.replace(`${web_domain}/`);
        },
        error: function() { // WRONG CREDENTIALS
            console.log('Error in login !');
            window.location.replace(`${web_domain}/login`);
        }
    });
}

// LOGIN REQUEST (with google credentials)
var userJWT;

function handleCredentialResponse(data = () => {}) {
    console.log(data);
    userJWT = data['credential'];
    deleteCookie('x-access-token');
    deleteCookie('google-user-jwt');
    setCookie('google-user-jwt', userJWT, 1);
    fetchUserDetails(userJWT);
}

function fetchUserDetails(cred) {
    const Http = new XMLHttpRequest();
    const url = 'https://oauth2.googleapis.com/tokeninfo?id_token='+cred;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        if (Http.readyState === XMLHttpRequest.DONE) {
            console.log(Http.responseText);
            const response = JSON.parse(Http.responseText);
            window.location.replace(`${web_domain}/`);
        }
    }
}