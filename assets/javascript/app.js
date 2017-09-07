//Declarations//
var startScreen;
var questionHTML;
var counter = 30;
var questions = [
    ["How many super bowls have the Denver Broncos won?"],
    ["How many TOTAL soccer players should be on the field at the same time?"],
    ["What is the sleepiest animal in the world, sleeping around 22 hours each day?"],
    ["How many planets in our solar system have moons?"],
    ["What sport does Cristiano Ronaldo play?"],
    ["Which branch of physics is devoted to the study of heat and related phenomen?"],
    ["Polar bears feed mainly on what animal?"],
    ["What is the most popular board game of all time?"],
    ["What is the melting point of ice in Fahrenheit?"],
    ["Brazil was once a colony of which European country?"],

];
var answers = [
    ["1", "2", "3", "4"],
    ["9", "10", "11", "22"],
    ["Elephant", "Giraffe", "Koala", "Kangaroo"],
    ["6", "7", "8", "9"],
    ["Soccer", "Basketball", "Lacrosse", "Baseball"],
    ["Classical Mechanics", "Quantum Mechanics", "Relativity", "Thermodynamics"],
    ["Penguins", "Seals", "Fish", "Shrimp"],
    ["Chess", "Scrabble", "Monopoly", "Checkers"],
    ["0", "32", "85", "103"],
    ["Spain", "Italy", "Great Britain", "Portugal"],
];
var rightAnswers = ["3","22","Koala","6","Soccer","Thermodynamics","Seals","Chess","32","Portugal"];

var questionCount = 0;
var chosenAnswer;
var clock;
var answeredCorrect = 0;
var answeredIncorrect = 0;
var answeredNone = 0;



//FUNCTIONS



$(document).ready(function() {

    // start button //
    function startPage() {
         startButton = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg start-button' href='#' role='button'>Click to Start!</a></p>";
         $(".mainScreen").html(startButton);
    }
    startPage();

    // generateHTML Function //
    $("body").on("click", ".start-button", function(event) {
        event.preventDefault();
        generateHTML();
        timeWrapper();
    });

    // Multiple choice click function //
    $("body").on("click", ".answer", function(event) {
        chosenAnswer = $(this).text();
        if (chosenAnswer === rightAnswers[questionCount]) {
            clearInterval(clock);
            winFunction();
        } else {
            clearInterval(clock);
            loseFunction();
        }
    });

    $("body").on("click", ".resetButton", function(event) {
        reset();
    });

});



// Function for no answer

function notAnswered() {
    answeredNone++;
    questionPage = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + rightAnswers[questionCount] + "</p>";
    $(".mainScreen").html(questionPage);
    setTimeout(wait, 3000);
}

// Function for correct answer

function winFunction() {
    answeredCorrect++;
    questionPage = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + rightAnswers[questionCount] + "</p>";
    $(".mainScreen").html(questionPage);
    setTimeout(wait, 4000);
}

// Function for incorrect answer
function loseFunction() {
    answeredIncorrect++;
    questionPage = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + rightAnswers[questionCount] + "</p>";
    $(".mainScreen").html(questionPage);
    setTimeout(wait, 3000);
}

// Function to generate HTML
function generateHTML() {
    questionPage = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questions[questionCount] + "</p><p class='first-answer answer'>" + answers[questionCount][0] + "</p><p class='answer'>" + answers[questionCount][1] + "</p><p class='answer'>" + answers[questionCount][2] + "</p><p class='answer'>" + answers[questionCount][3] + "</p>";
    $(".mainScreen").html(questionPage);

}

//
function wait() {
    if (questionCount < 9) {
        questionCount++;
        generateHTML();
        counter = 30;
        timeWrapper();
    } else {
        final();
    }
}

//
function timeWrapper() {
    clock = setInterval(thirtySeconds, 1000);

    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(clock);
            notAnswered();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}


//
function final() {
    questionHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + answeredCorrect + "</p>" + "<p>Wrong Answers: " + answeredIncorrect + "</p>" + "<p>Unanswered: " + notAnswered + "</p>" + "<p class='text-center resetButton-container'><a class='btn btn-danger btn-lg btn-block resetButton' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainScreen").html(questionHTML);
}

//
function reset() {
    questionCount = 0;
    answeredCorrect = 0;
    answeredIncorrect = 0;
    answeredNone = 0;
    counter = 30;

    generateHTML();
    timeWrapper();
}






