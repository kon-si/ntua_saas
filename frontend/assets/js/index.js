import "../css/main.scss"
import "./nav.js"

var api_domain = '127.0.0.1:9101';
// var api_domain = 'authentication-service-47nenum5kq-ew.a.run.app';
// var web_domain = '127.0.0.1:80';
var web_domain = 'localhost:80';

// GET USER NAME
// var url = new URL(document.URL);
// const params = url.searchParams;
// console.log(params);
// $('.username-label').text(params.get('user'));

console.log('HI');

$(function() {
    if (checkCookie('x-access-token')) {
        let userToken = getCookie('x-access-token');

        const Http = new XMLHttpRequest();
        const url = 'http://'+api_domain+'/authorisation/api/userinfo/'+userToken;
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            if (Http.readyState === XMLHttpRequest.DONE) {
                const response = JSON.parse(Http.responseText);
                console.log(response);

                let pictureURL = '/images/icons/icons-user-default.png';
                let pictureDiv = document.getElementById('user-photo');
                let pictureObj = document.createElement('img');
                pictureObj.src = pictureURL;
                pictureObj.alt = 'user-picture';
                pictureDiv.appendChild(pictureObj);

                //second picture url
                let pictureDivPopUp = document.getElementById('user-photo-popup');
                let pictureObjPopUp = document.createElement('img');
                pictureObjPopUp.src = pictureURL;
                pictureDivPopUp.appendChild(pictureObjPopUp);

                //username info
                $('.username-label').html(response['username']);

                //email info 
                let userEmail = response['email'];
                $('#user-email').html(userEmail);
            }
        }

    }
    else if (checkCookie('google-user-jwt')) {
        let googleToken = getCookie('google-user-jwt');

        const Http = new XMLHttpRequest();
        const url = 'https://oauth2.googleapis.com/tokeninfo?id_token='+googleToken;
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            if (Http.readyState === XMLHttpRequest.DONE) {
                const response = JSON.parse(Http.responseText);
                console.log(response);
                let pictureURL = response['picture'];
                let pictureDiv = document.getElementById('user-photo');
                let pictureObj = document.createElement('img');
                pictureObj.src = pictureURL;
                pictureObj.alt = 'user-picture';
                pictureDiv.appendChild(pictureObj);

                //second picture url
                let pictureDivPopUp = document.getElementById('user-photo-popup');
                let pictureObjPopUp = document.createElement('img');
                pictureObjPopUp.src = pictureURL;
                pictureDivPopUp.appendChild(pictureObjPopUp);

                //username info
                $('#username-label-popup').html(response['name']);
                $('#username-label-home').html(response['given_name']);

                //email info 
                let userEmail = response['email'];
                $('#user-email').html(userEmail);

            }
        }
    }
});