// maybe have a splash page that asks "is there anywhere you would like to go?" followed by an input field and another button that directs to the train schedule itself
// figures were being posted to firebase, now it doesn't post those values, not sure why that left
//make sure
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


	var train= $("#train-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var military = $("#military-input").val().trim();
    var interval = $("#interval-input").val().trim();
      // Code in the logic for storing and retrieving the most recent train.
      

      var data = {
        title: train,
        locale: destination,
        schedule: military,
        frequency: interval,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      };
      console.log(data);
      userRef.push(data);

    });

    // $("#add-train").on("click", function(snapshot) {

    //   console.log(snapshot.val().train);
    //   console.log(snapshot.val().locale);
    //   console.log(snapshot.val().schedule);
    //   console.log(snapshot.val().frequency);
    //   console.log(snapshot.val().dateAdded);


// // Retrieve new posts as they are added to our database

userRef.on("child_added", function(snapshot, prevChildKey) { 
  var newPost = snapshot.val();
  console.log(snapshot.val());
  console.log("Name: " + newPost.title);
  console.log("Headed to: " + newPost.locale);
  console.log("Beginning at: " + newPost.military);
  console.log("Departing every: " + newPost.frequency);
  console.log("Train Schedule added on: " + newPost.dateAdded);
  console.log("Previous Post ID: " + prevChildKey);
   	console.log(snapshot.val().title);
    console.log(snapshot.val().locale);
   	console.log(snapshot.val().schedule);
    console.log(snapshot.val().frequency);
    console.log(snapshot.val().dateAdded);

    $("#train > tbody").append("<tr><td>" + newPost.title + "</td><td>" + newPost.locale + "</td><td>" +
  	newPost.frequency + "</td><td>" + newPost.military + "</td><td>" 
  	//use this to add the calculated minutes away from the present time
	// + empRate + "</td><td>" + empBilled + "</td></tr>"
	);


});



