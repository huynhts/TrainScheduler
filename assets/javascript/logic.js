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


$('.btn-primary').on('click', function(){
    event.preventDefault();

    var inputTime = $('#start-time').val().trim();

    trainName = $('#train-name').val().trim();
    trainDestination = $('#train-destination').val().trim();
    startTime = moment(inputTime, 'HH:mm').format('x');
    frequency = $('#frequency').val().trim();

    console.log(inputTime);
    console.log(trainName);
    console.log(trainDestination);
    console.log(startTime);
    console.log(frequency);

    database.ref("/trains").push ({
        tName: trainName,
        tDestination: trainDestination,
        tTime: startTime,
        tFrequency: frequency,
        // tNextArrival: nextArrival,
        // tMinutesAway: minutesAway,
        
    });

    formReset();
});


function formReset() {
    $('#train-name').val('');
    $('#train-destination').val('');
    $('#start-time').val('');
    $('#frequency').val('');
}
















});