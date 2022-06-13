import "../css/main.scss"
import "./nav.js"

// GET USER NAME
var url = new URL(document.URL);
const params = url.searchParams;
console.log(params);
$('.username-label').text(params.get('user'));

$(function() {
    if (checkCookie('google-user-jwt')) {
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

                //email info 
                let userEmail = response['email'];
                $('#user-email').html(userEmail);
                // var emailSpan = document.createElement('span')
                // emailSpan.innerHTML = userEmail;
                // emailSpan.appendChild(emailSpan);

            }
        }
    }
});