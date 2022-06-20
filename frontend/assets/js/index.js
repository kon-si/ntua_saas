import "../css/main.scss"
import "./nav.js"

var api_domain = '127.0.0.1:9101';
// var api_domain = 'authentication-service-47nenum5kq-ew.a.run.app';
// var web_domain = '127.0.0.1:80';
var web_domain = 'localhost:80';

$(function() {
    if (checkCookie('x-access-token')) {
        // let userToken = getCookie('x-access-token');

        $.ajax({
            url: 'http://'+api_domain+'/authorisation/api/userinfo/',
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

                let remDays = (response['expiration_date'] === null ? 0 : getRemDays(response['expiration_date']));

                setUserElements(response['username'], response['username'], response['email'], '/images/icons/icons-user-default.png', remDays);

            },
            error: function() { // WRONG CREDENTIALS
                console.log('Error with User Data :( !');
            }
        });

        // DEPRICATED

        // const Http = new XMLHttpRequest();
        // const url = 'http://'+api_domain+'/authorisation/api/userinfo/';
        // Http.open("GET", url);
        // Http.send();

        // Http.onreadystatechange = (e) => {
        //     if (Http.readyState === XMLHttpRequest.DONE) {
        //         const response = JSON.parse(Http.responseText);
        //         console.log(response);

        //         let pictureURL = '/images/icons/icons-user-default.png';
        //         let pictureDiv = document.getElementById('user-photo');
        //         let pictureObj = document.createElement('img');
        //         pictureObj.src = pictureURL;
        //         pictureObj.alt = 'user-picture';
        //         pictureDiv.appendChild(pictureObj);

        //         //second picture url
        //         let pictureDivPopUp = document.getElementById('user-photo-popup');
        //         let pictureObjPopUp = document.createElement('img');
        //         pictureObjPopUp.src = pictureURL;
        //         pictureDivPopUp.appendChild(pictureObjPopUp);

        //         //username info
        //         $('.username-label').html(response['username']);

        //         //email info 
        //         let userEmail = response['email'];
        //         $('#user-email').html(userEmail);
        //     }
        // }

    } else if (checkCookie('google-user-jwt')) {
        let googleToken = getCookie('google-user-jwt');

        const Http = new XMLHttpRequest();
        const url = 'https://oauth2.googleapis.com/tokeninfo?id_token='+googleToken;
        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {
            if (Http.readyState === XMLHttpRequest.DONE) {
                const response = JSON.parse(Http.responseText);
                console.log(response);

                setUserElements(response['name'], response['given_name'], response['email'], response['picture'], null);

            }
        }
    } else {
        setUserElements('', '', '', '/images/icons/icons-user-default.png', null);
    }
});

function getRemDays(expirDate) {
    const today = new Date();
    const expiration = new Date(expirDate);
    
    let t1 = today.getTime();
    let t2 = expiration.getTime();

    let remDays = Math.floor((t2-t1)/(24*3600*1000));

    return remDays;
}

function setUserElements (name, firstName, email, picture, daysRem) {
    let pictureURL = picture;
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
    $('#username-label-popup').html(name);
    $('#username-label-home').html(firstName);

    //email info 
    let userEmail = email;
    $('#user-email').html(userEmail);

    // subscription days
    let daysRemActual = (daysRem <= 0 ? 0 : daysRem);
    $('.subscription-time').html(daysRemActual.toString() + ' days left');
}

