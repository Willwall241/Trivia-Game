//Declare variables
//Make array of question obj
//create start page with button(hide start button when clicked)
//create timer function
//create function to show timer
//Initialize game 
//Function to pick one question from the array put on page, loop to put choices on page
//functin to check if answer is correct and change screen when choice is clicked
//function to show final score and reset button(hide button once pressed)

var questionArray = [
  {
    q: "What actor plays the 9th Doctor?",
    ansr: ["David Tennant", "Christopher Eccleston", "Arthur Darvill", "John Barrowman"],
    correct: 1,
  },

  {
    q: "Who is the Doctor's main companion in Season 3?",
    ansr: ["Amy Pond", "Rose Tyler", "Martha Jones", "Donna Noble"],
    correct: 2,
  },

  {
    q: "What is the 10th Doctor's favorite catchphrase?",
    ansr: ["Fantastic!", "Allons-y!", "Who da man?", "Do you want a jelly baby?"],
    correct: 1,
  },

  {
    q: "What is Rose Tyler's alter ego?",
    ansr: ["The Impossible Girl", "The Bad Wolf", "The Empty Child", "The Girl Who Waited"],
    correct: 1,
  },

  {
    q: "John Barrowman plays what character in Doctor Who?",
    ansr: ["The 10th Doctor", "Rory Williams", "Mickey Smith", "Jack Harkness"],
    correct: 3,
  },
];

var messageArray = ["You are Correct!", "That is Incorrect!", "Time's Up!", "Final Score"];

var time;
var seconds;
var currentQuestion;
var indexOfQuestion = 0;
var answeredQ;
var userGuess;
var correctScore=0;
var incorrectScore=0;
var unansweredScore=0;


$("#restart").hide();

$("#startGame").on("click", function () {
  initilizeGame();
  $(this).hide();

});

$("#restart").on("click", function () {
  initilizeGame();
  $(this).hide();

});

function startTimer() {
  seconds = 25;
  $("#timer").html("Time Remaining: " + seconds);
  time = setInterval(count, 1000);

};

function count() {
  seconds--;

  $("#timer").html("Time Remaining: " + seconds);

  //if statement for when time runs out
  if (seconds < 1) {
    eval();
    clearInterval(time);
  }
};


function initilizeGame() {
  indexOfQuestion = 0;
  incorrectScore = 0;
  correctScore = 0;
  unansweredScore = 0;
  
  newQuestion();
  
  $("#answer").empty();
  $("#gif").empty();
  $("#correct").empty();
  $("#incorrect").empty();
  $("#unanswered").empty();

};

function newQuestion() {
$("#message").empty();
  $("#timer").show();

  $("#question").text(questionArray[indexOfQuestion].q);

  for (i = 0; i < questionArray[indexOfQuestion].ansr.length; i++) {

    var choiceDiv = $("<div>");
    var option = questionArray[indexOfQuestion].ansr[i];
    choiceDiv.add(choiceDiv).text(option).addClass("thisChoice");
    choiceDiv.data('data-index', i)
    $("#choices").append(choiceDiv);
    console.log($(".thisChoice").data('data-index'));
    console.log($(".thisChoice").attr("class"));

  };
  startTimer();
  $(".thisChoice").on("click", function () {
    answeredQ = true;
    userGuess = $(this).data('data-index');
    clearInterval(time);
    eval();
    console.log("1");
    console.log(userGuess);
    
    

  });

};

function eval() {
  $("#question").empty();
  $("#choices").empty();
  $("#timer").empty();

  var rightAnswer = questionArray[indexOfQuestion].correct;
  if (userGuess == rightAnswer && answeredQ == true) {
    correctScore++;
    $("#message").text(messageArray[0]);
  }
  else if (userGuess != rightAnswer && answeredQ == true) {
    incorrectScore++;
    $("#message").text(messageArray[1]);
  }
  else {
    unansweredScore++;
    $("#message").text(messageArray[2]);
    answeredQ = false;
  }

  if (indexOfQuestion == questionArray.length-1) {
    indexOfQuestion++;
    setTimeout(finalScore, 1000);
  }
  else {

    indexOfQuestion++;

    setTimeout(newQuestion, 1000);
  }


};

function finalScore () {
  $("#message").empty();
  $("#answer").empty();
  $("#gif").empty();

  $("#correct").text(correctScore);
  $("#incorrect").text(incorrectScore);
  $("#unanswered").text(unansweredScore);
  $("#restart").show();


};