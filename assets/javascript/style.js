var config = {
    apiKey: "AIzaSyB33tOosO0X6cPJ3Et9fzeQX6WA8NELkzc",
    authDomain: "mytrainschedule-6c1bd.firebaseapp.com",
    databaseURL: "https://mytrainschedule-6c1bd.firebaseio.com",
    projectId: "mytrainschedule-6c1bd",
    storageBucket: "mytrainschedule-6c1bd.appspot.com",
    messagingSenderId: "470926713888"
};

firebase.initializeApp(config);

var database = firebase.database();

//storing input into variables
$("#addTrainBtn").on("click", function () {
    var trainName = $("#inputTrainName").val().trim();
    var destination = $("#inputDestination").val().trim();
    var firstTrain = moment($("#inputFirstTrain").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#inputFrequency").val().trim();

    // storing variables onto database
    var addTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    database.ref().push(addTrain);


    $("#inputTrainName").val("");
    $("#inputDestination").val("");
    $("#inputFirstTrain").val("");
    $("#inputFrequency").val("");

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
   
    
    return false;
})

database.ref().on("child_added", function (snapshot) {
    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format('hh:mm A');

$("#tableSchedule > tBody").append("<tr><td>" + trainName + "</td>" + "<td>" + destination + "</td>" + "<td>" + frequency + "</td>" + "<td>" + arrival + "</td>" + "<td>" + minutes + "</td></tr>");



});




