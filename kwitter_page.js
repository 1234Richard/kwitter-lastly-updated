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

    user_name = localStorage.getItem("user name");
    Room_name = localStorage.getItem("room name");

function getData() { firebase.database().ref("/"+Room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
        //Start code
          console.log(firebase_message_id);
          console.log(message_data);

          Name = message_data['Name'];
          Message = message_data['Message'];
          like = message_data['likes'];

          name_with_tag = "<h4>" + Name + "<img class='tick' src='tick.png'></h4>";
          message_with_tag = "<h4 class='message_h4'>" + Message + "</h4>";
          like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick=updateLike(this.id)>";
          span = "<span class='glyphicon glyphicon-thumbs-up'>&nbsp;Like : " + like + "</span></button><hr>";

          column = name_with_tag + message_with_tag + like_button + span;
          document.getElementById("output").innerHTML += column;
        //End code
      } });  }); }
getData();

function send() {
      msg = document.getElementById("msg").value;

      firebase.database().ref(Room_name).push({
            Name:user_name,
            Message:msg,
            likes:0
      });
      document.getElementById("msg").value = "";
}

function logout() {
      localStorage.removeItem("user name");
      localStorage.removeItem("room name");
      window.location.replace("index.html");
}

function updateLike(message_id) {
      console.log("Clicked on Like button - " + message_id);
      button_id = message_id;
      liked = document.getElementById(button_id).value;
      updated_likes = Number(liked) + 1;
      console.log(updated_likes);

      firebase.database().ref(Room_name).child(message_id).update({
            likes : updated_likes
      });
}
