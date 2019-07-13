var firebaseConfig = {
    apiKey: "AIzaSyAohM71e4V-sdMa5r9g6JNQIMRniQaZRFU",
    authDomain: "trainscheduler-7fa42.firebaseapp.com",
    databaseURL: "https://trainscheduler-7fa42.firebaseio.com",
    projectId: "trainscheduler-7fa42",
    storageBucket: "trainscheduler-7fa42.appspot.com",
    messagingSenderId: "1001707809387",
    appId: "1:1001707809387:web:2d8719072e8231da"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$(document).ready(function(){

//global variables
var trainName = '';
var trainDestination = '';
var frequency = '';

//on click function takes user input and pushes data to firebase
$('.btn-primary').on('click', function(){
    event.preventDefault();

    var inputTime = $('#start-time').val().trim();

    //stores user input into fields
    var trainName = $('#train-name').val().trim();
    var trainDestination = $('#train-destination').val().trim();
    var startTime = moment(inputTime, 'HH:mm').format('x');
    var frequency = $('#frequency').val().trim();

    var trains = {
        Name: trainName,
        Destination: trainDestination,
        Time: startTime,
        Frequency: frequency
    }

    //code to push child data to parent object train
    database.ref().push(trains);

    console.log(trains.Name);
    console.log(trains.Destination);
    console.log(trains.Time);
    console.log(trains.Frequency);


    //calls reset function to clear user input fileds
    formReset();
});


//clears out usesr input fields
function formReset() {
    $('#train-name').val('');
    $('#train-destination').val('');
    $('#start-time').val('');
    $('#frequency').val('');
}

//add train row to table data in html for all trains added to Firebase db
database.ref().on("child_added", function(childSnapshot) { 
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().Name;
    var trainDestination = childSnapshot.val().Destination;
    var frequency = childSnapshot.val().Frequency;
    console.log(frequency);

    var startTime = childSnapshot.val().Time;
    console.log(startTime);

    var convStartTime = moment.unix(startTime).format("hh:mm");
    console.log(convStartTime);

    var timeDiff = parseInt(startTime) - parseInt(moment().unix());
    console.log(timeDiff);

    var tRemainder = timeDiff % parseInt(frequency)
    console.log(tRemainder);

    var minutesAway = frequency - tRemainder;
    console.log(minutesAway);

    var nextTrain = moment().add(minutesAway, "minutes");
    var prettyNextTrain = moment(nextTrain).format("hh:mm A");

    var newRow = $("<tr>");
    newRow.attr("class", "new-row");
    
    newRow.append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(frequency),
        $("<td>").text(prettyNextTrain),
        $("<td>").text(minutesAway)
    )

    //append new row to table
    $("#table-data").append(newRow);

});














});