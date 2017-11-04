// maybe have a splash page that asks "is there anywhere you would like to go?" followed by an input field and another button that directs to the train schedule itself
// figures were being posted to firebase, now it doesn't post those values, not sure why that left------> it was an issue with moving two variables back into global scope
//make sure to set an interval that will refresh the "minutes until next train" that refreshes every one minute or so

//make train schedules disappear when they are deleted from the Firebase database

// ### Bonus (Extra Challenges)

// * Consider updating your "minutes to arrival" and "next train time" text once every minute. This is significantly more challenging; only attempt this if you've completed the actual activity and committed it somewhere on GitHub for safekeeping (and maybe create a second GitHub repo).

// * Try adding `update` and `remove` buttons for each train. Let the user edit the row's elements-- allow them to change a train's Name, Destination and Arrival Time (and then, by relation, minutes to arrival).

// * As a final challenge, make it so that only users who log into the site with their Google or GitHub accounts can use your site. You'll need to read up on Firebase authentication for this bonus exercise.

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


    // Assumptions
    var randomDate = newPost.military;
    var randomFormat = "HH:mm";
    var convertedDate = moment(randomDate, randomFormat);
 //    var trainInit = newPost.military;
	// var s = m.toISOString();

    var tFrequency = newPost.frequency;

    console.log(tFrequency);

    // Time is 3:30 AM
    var firstTime = convertedDate;
    console.log(firstTime);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


    //need to display Next Arrival time and Minutes away from current moment

    // DOM Manipulation, specifically, creating new table rows and data cells that display the Train object's values from Firebase
    $("#train > tbody").append("<tr><td>" + newPost.title + "</td><td>" + newPost.locale + "</td><td>" +
  	newPost.frequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>"
  	);

  	//use this to add the calculated minutes away from the present time
	// <td>" + empRate + "</td><td>" + empBilled + "</td>



});



