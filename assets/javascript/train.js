// maybe have a splash page that asks "is there anywhere you would like to go?" followed by an input field and another button that directs to the train schedule itself

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBRfBqVGuVxWCHz5wbJyULjhIGUZ10xBMU",
    authDomain: "train-timers-57799.firebaseapp.com",
    databaseURL: "https://train-timers-57799.firebaseio.com",
    projectId: "train-timers-57799",
    storageBucket: "train-timers-57799.appspot.com",
    messagingSenderId: "936426178638"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

    var userRef = database.ref("/new-train");

     // Capture Button Click
    $("#add-train").on("click", function() {
      // Don't refresh the page!
      event.preventDefault();


      // Code in the logic for storing and retrieving the most recent user.
      var train= $("#train-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var military = $("#military-input").val().trim();
      var interval = $("#interval-input").val().trim();

      var data = {
        title: train,
        locale: destination,
        schedule: military,
        frequency: interval
      };

      userRef.push(data);
    });