var questionArray = [
  {
    question: "What actor plays the 9th Doctor?",
    answerList: ["David Tennant", "Christopher Eccleston", "Arthur Darvill", "John Barrowman"],
    correct: 1,
  },

  {
    question: "Who is the Doctor's main companion in Season 3?",
    answerList: ["Amy Pond", "Rose Tyler", "Martha Jones", "Donna Noble"],
    correct: 2,
  },

  {
    question: "What is the 10th Doctor's favorite catchphrase?",
    answerList: ["Fantastic!", "Allons-y!", "Who da man?", "Do you want a jelly baby?"],
    correct: 1,
  },

  {
    question: "What is Rose Tyler's alter ego?",
    answerList: ["The Impossible Girl", "The Bad Wolf", "The Empty Child", "The Girl Who Waited"],
    correct: 1,
  },

  {
    question: "John Barrowman plays what character in Doctor Who?",
    answerList: ["The 10th Doctor", "Rory Williams", "Mickey Smith", "Jack Harkness"],
    correct: 3,
  },
];

var displayArray = ["That is Correct, Great Job!", "That is Incorrect!", "Uh Oh Times Up!", "Here is your Final Score!"]

var currentQuestion = 0;
var questionNum = 0;
var correctAns = 0;
var incorrectAns = 0;
var unanswered = 0;
var clicked = true;
var time;
var seconds;
var userSelect;
$("#restart").hide();

//Start button click function
$("#startGame").on("click", function () {
  //When start button is clicked
  //call the startGame function
  startGame();

});

//restart button click function
$("#restart").on("click", function () {
  //call the startGame function
  startGame();

});

//startGame function
function startGame() {
  //clear divs on the stage
  $("#startGame").hide();
  $("#restart").hide();
  $("#message").empty();
  $("#timer").empty();
  $("#question").empty();
  $("#choices").empty();
  $("#correct").empty();
  $("#incorrect").empty();
  $("#unanswered").empty();
  $("#gif").empty();
  currentQuestion = 0;
  correctAns = 0;
  incorrectAns = 0;
  unanswered = 0;
  //call loadQuestion function
  loadQuestion();
};

//startTimer function
function startTimer() {
  //give seconds variable a value for time allotted
  seconds = 20;
  //show seconds on the screen
  $("#timer").html("Time Remaining: " + seconds);
  //set an inteval to call the countdown function and set it to a variable
  time = setInterval(countDown, 1000);
};

//Show countDown function
function countDown() {
  //deincrement seconds by 1
  seconds--;
  //update stage with new time
  $("#timer").html("Time Remaining: " + seconds);
  //if statement to end game if timer runs out and on last question
  if (seconds <= 0) {    
    clicked = false;
    evalAnswer();
    clearInterval(time);
  }

};

//loadQuestion function/answer onclick function
function loadQuestion() {
  
  //push random question from array to stage
  

  if (currentQuestion <= questionArray.length - 1) {
    questionNum = currentQuestion + 1;
    $("#question").text("Question #" + questionNum + ": " + questionArray[currentQuestion].question);
    //fill choices div with answerList as buttons
    for (i = 0; i < questionArray[currentQuestion].answerList.length; i++) {
      var newButton = $("<button>");
      newButton.text(questionArray[currentQuestion].answerList[i]);
      newButton.addClass("choiceList");
      newButton.attr("data-listNum", i);
      $("#choices").append("<br>")
      $("#choices").append(newButton);
      $("#choices").append("<br>")
      $("#choices").append("<br>")
    };
    //call Timer function
    startTimer();
    //on click for buttons that will change page and evaluate answer
    $(".choiceList").on("click", function () {
      clicked = true;
      userSelect = $(this).attr("data-listNum");
      evalAnswer();
      clearInterval(time);

    });
  }
  else {
    finalScore();
  }
};

  //function to evaluate guess
  function evalAnswer() {
    
    $("#timer").empty();
    $("#question").empty();
    $("#choices").empty();

    if (userSelect == questionArray[currentQuestion].correct && clicked == true) {
      correctAns++;
      currentQuestion++;
      $("#message").text(displayArray[0]);
      setTimeout(loadQuestion, 5000);
    }
    else if (userSelect != questionArray[currentQuestion].correct && clicked == true) {
      incorrectAns++;
      currentQuestion++;
      $("#message").text(displayArray[1]);
      setTimeout(loadQuestion, 5000);
    }
    else {
      unanswered++;
      currentQuestion++;
      $("#message").text(displayArray[2]);
      setTimeout(loadQuestion, 5000);
    };
    
  };

//function to show final score
function finalScore() {
  $("#messsage").empty();
  $("#timer").empty();
  $("#choices").empty();
  clearInterval(time);

  $("#message").text(displayArray[3])
  $("#correct").text("Correct Answers: " + correctAns);
  $("#incorrect").text("Incorrect Answers: " + incorrectAns);
  $("#unanswered").text("Unanswered: " + unanswered);
  $("#restart").show();
};