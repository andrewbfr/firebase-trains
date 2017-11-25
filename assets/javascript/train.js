// maybe have a splash page that asks "is there anywhere you would like to go?" followed by an input field and another button that directs to the train schedule itself
// figures were being posted to firebase, now it doesn't post those values, not sure why that left------> it was an issue with moving two variables back into global scope
//make sure to set an interval that will refresh the "minutes until next train" that refreshes every one minute or so

//make train schedules disappear when they are deleted from the Firebase database
//make buttons for each train by name, populate the table with their data when the button is clicked.
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
    var military = moment($("#military-input").val().trim(),"HH:mm").format("x");
    var interval = $("#interval-input").val().trim();
      // Code in the logic for storing and retrieving the most recent train.
      // passing firebase an object, formatted to our liking, with the train's information
      

    var data = {
        title: train,
        locale: destination,
        start: military,
        frequency: interval,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      };
      console.log(data);
      userRef.push(data);

  });

// var dateString = moment.unix(value).format("MM/DD/YYYY");


// // Retrieve new posts as they are added to our database

userRef.on("child_added", function(snapshot, prevChildKey) { 
  var newPost = snapshot.val();
  var present = moment().valueOf();
  console.log(present);
  //parse unix code into hours and minutes to display first train
  var startTime = parseInt(newPost.start);  
  console.log(startTime);
  var numStart = moment(startTime).format("HH:mm");
  console.log(numStart);
  //now we're working with numbers!
  var trainInit = moment(newPost.dataAdded).format();
  console.log(trainInit);

  //name of train 
  console.log("Name: " + newPost.title);
  //train's destination
  console.log("Headed to: " + newPost.locale);
  //first instance of train
  console.log("Beginning at: " + numStart);
  //frequency of train departures
  console.log("Departing every: " + newPost.frequency);
  //a firebase-returned value, also displayed in UNIX Epoch
  console.log("Train Schedule added on: " + newPost.dateAdded);
  //interesting to know how firebase references input but not needed in this project
  // console.log("Previous Post ID: " + prevChildKey);

  var remainder = numStart % newPost.frequency;
  var minutes = newPost.frequency - remainder;
  var arrival = moment().add(minutes,"m").format("hh:mm A");
// DOM Manipulation, specifically, creating new table rows and data cells that display the Train object's values from Firebase
    $("#train > tbody").append("<tr><td>" + newPost.title + "</td><td>" + newPost.locale + "</td><td>" +
    newPost.frequency + "</td><td>" + arrival + "</td><td>" + remainder + "</td></tr>");
});


 //    var trainStart = newPost.start;
 //    var milTime = "HH:mm";
 //    var convertedDate = moment(trainStart, milTime);
 // //    var trainInit = newPost.military;
	// // var s = m.toISOString();
 //    console.log(convertedDate);

 //    var dateString = trainStart;
 //    console.log(trainStart);

    // for loop to display the start, next train and minutes until in the correct tables
    // for (var i = 0; i > ; i++){

    // }

    //i have the string defining the start time. The start time needs to be converted into a code that moment.js understands. The string may be derived from the Firebase data object. then it is run through the math and displayed as "next train" and displays the number of minutes until the next arrival. right now "next arrival" is just displaying the current time.


    // var momentObj = moment(dateString, "HH:mm");
    // var momentString = momentObj.format("HH:mm");
    // console.log("this is the train start time: " + momentString);

    // var tFrequency = newPost.frequency;

    // console.log(tFrequency);

    // // Time is 3:30 AM
    // var firstTime = convertedDate;
    // console.log(firstTime);

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(convertedDate), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


    //need to display Next Arrival time and Minutes away from current moment



    
  	






