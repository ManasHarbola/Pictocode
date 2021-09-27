//Initialize Firebase
var config = {
  apiKey: "AIzaSyC-X6W5Gf-PFA9HxKF1J5aC6pnGlaxzuog",
  authDomain: "ocrtextdb.firebaseapp.com",
  databaseURL: "https://ocrtextdb.firebaseio.com",
  projectId: "ocrtextdb",
  storageBucket: "",
  messagingSenderId: "278938509396",
  appId: "1:278938509396:web:64d9e977720562eefecdc1"
};

firebase.initializeApp(config);

function logIn()
{
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result){

    alert("Sign In Successful! Google Account Linked");

  }).catch(function(err){
    alert("Sign in failed");
    alert(err);
  })

}
function logOut()
{
    //here you implements the log out
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    alert("Successfully signed out of account");
    }).catch(function(error) {
    // An error happened.
    alert("An error occured while signing out\nPlease refresh page");
    });
}

function saveCountry()
{
    //here you can implements the code saving the name of the country you type.
    //note: the variable with the input element calls "info"
    firebase.database().ref().child("Text").set(info.value);
}

function gettingText()
{
    //here you can implements the code you get the name of the countries in your firebase realtime database.
    //notes: don't forget to call the function "displayMessages(key,text)" with the right parameters
    //otherWise the site won't show the countries
    //another note: you have to call the firebase listener always ON change and ON add of an item.

    //Just a test to show stored country in header
    var bigOne = document.getElementById('bigOne');
    var dbRef = firebase.database().ref().child('Text');
    dbRef.on('value', snap => bigOne.value = (snap.val()));

}




//auxiliar functions try take a look if you get what happens

function authStateObserver(user) {
    if (user) { // User is signed in!
      // Get the signed-in user's profile pic and name.
      var profilePicUrl = getProfilePicUrl();
      var userNameLocal = getUserName();

      // Set the user's profile pic and name.
      if(profilePicUrl){
        userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
        userPic.removeAttribute('hidden');
      }
      userName.value= userNameLocal;

      // Show user's profile and sign-out button.
      userName.removeAttribute('hidden');

      out.removeAttribute('hidden');

      // Hide sign-in button.
      inn.setAttribute('hidden', 'true');

    } else { // User is signed out!
      // Hide user's profile and sign-out button.
      userName.setAttribute('hidden', 'true');
      userPic.setAttribute('hidden', 'true');
      out.setAttribute('hidden', 'true');

      // Show sign-in button.
      inn.removeAttribute('hidden');
    }
  }


  function initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged(authStateObserver);
  }

  // Returns the signed-in user's profile Pic URL.
  function getProfilePicUrl() {
    return firebase.auth().currentUser.photoURL;
  }

  // Returns the signed-in user's display name.
  function getUserName() {
    return firebase.auth().currentUser.displayName;
  }

  // Returns true if a user is signed-in.
  function isUserSignedIn() {
    return !!firebase.auth().currentUser;
  }

  function displayMessage(key, text) {
    var container = document.getElementById(key);
    // If an element for that message does not exists yet we create it.
    if (!container) {
      container = document.createElement('li');
      container.setAttribute('id', key);
      container.setAttribute('class',"collection-item");
      collection.appendChild(container);
    }
    container.value = text;

  }

//getting pages elements
var userPic = document.getElementById('pic');
var userName = document.getElementById('nome');
var signInBtn = document.getElementById('login-button');
var signOutBtn = document.getElementById('logout-button');
var collection = document.getElementById('myout');
var send = document.getElementById("send-button");
var info = document.getElementById("country_in");
var inn = document.getElementById("in");
var out = document.getElementById('out');

var Http = new XMLHttpRequest();
var url="https://api.hackerearth.com/v3/code/run/";
const CLIENT_SECRET = '83a49297b4e21f061368dd5a5cb3a05fe41590ed';
const source = "print 'Hello World'"
const input = 'a'

var hackerEarth=require('hackerearth-node'); //require the Library
//Now set your application 
var hackerEarth=new hackerEarth(
                                CLIENT_SECRET, //Your Client Secret Key here this is mandatory
                                ''  //mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
);
var config={};
config.time_limit=1;  //your time limit in integer
config.memory_limit=323244;  //your memory limit in integer
config.source=source;  //your source code for which you want to use hackerEarth api
//config.input=input;  //input against which you have to test your source code
config.language="Py"; //optional choose any one of them or none

//compile your code 
hackerEarth.run(config,function(err,response){
  if(err) {
    //deal with error
  } else {
    document.getElementById("bigOne").value = Http.responseText;
    console.log("a" + Http.responseText)
    console.log("abc")
  }
});





// Http.open("POST", url, true);
// Http.setRequestHeader("Content-Type", 'application/json');
// Http.onreadystatechange = function () {
//   if (Http.readyState === 4) {
//     if (Http.status === 200) {
//       document.getElementById("bigOne").value = Http.responseText;
//       console.log("a" + Http.responseText)
//       console.log("abc")
//     } else {
//       console.error("def");
//     }
//     console.log("ghi")
//   }
// console.log("jkl")
//   // end of state change: it can be after some time (async)
// };

// var data = JSON.stringify({
//   'client_secret': CLIENT_SECRET,
//   'async': 1,
//   'source': source,
//   'lang': "PYTHON",
//   'time_limit': 5,
//   'id': 123,
//   'memory_limit': 262144,
// })
// Http.send(data);



//adding listeners
signInBtn.addEventListener('click',gettingText);
signOutBtn.addEventListener('click',logOut);
send.addEventListener("click", saveCountry);




// Http.open("POST", url, true)
// Http.setRequestHeader("Content-Type", 'application/json');
// Http.send(JSON.stringify({
//   'client_secret': CLIENT_SECRET,
//   'async': 0,
//   'source': source,
//   'lang': "PYTHON",
//   'time_limit': 5,
//   'memory_limit': 262144,
// }))







//calling functions that are listeners
initFirebaseAuth();

gettingCountry();
