// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyA0qFgsog_OAZLKr8loDifsoXZW9N_BZRs",
      authDomain: "kwitter-342ad.firebaseapp.com",
      databaseURL: "https://kwitter-342ad-default-rtdb.firebaseio.com",
      projectId: "kwitter-342ad",
      storageBucket: "kwitter-342ad.appspot.com",
      messagingSenderId: "94487825700",
      appId: "1:94487825700:web:adbaa196600d3cfc8e77b1"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    user_name = localStorage.getItem("user_name");
    document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!!"
//ADD YOUR FIREBASE LINKS HERE
function addroom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding room name"
      });

      localStorage.setItem("Room_Name", room_name);
      window.location = "kwitter_page.html";
}


function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
      Room_names = childKey;
     //Start code
     console.log("Room name is - " + Room_names);
     row = "<div class='room_name' id="+Room_names+" onclick='redirect(this.id)'>#"+Room_names+"</div><hr>";
     document.getElementById("output").innerHTML += row;  
     //End code
     });});}
getData();

function redirect(name) {
      console.log(name);
      localStorage.setItem("Room_name", name);
      window.location = "kwitter_page.html";
}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html"
}