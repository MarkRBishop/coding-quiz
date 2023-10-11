const questions = [
    {
        question: "question1",
        options: ["option 1", "option2", "option3", "option4"],
        answer: "option1"
    },
    {
        question: "question2",
        options: ["option 1", "option2", "option3", "option4"],
        answer: "option1"
    },
    {
        question: "question3",
        options: ["option 1", "option2", "option3", "option4"],
        answer: "option1"
    },
    {
        question: "question4",
        options: ["option 1", "option2", "option3", "option4"],
        answer: "option1"
    },
];

var timerElement = document.querySelector(".timer");
var startButton = document.querySelector(".start-button");


var currentQuestion = "";
var answer1 = "";
var answer2 = "";
var answer3 = "";
var answer4 = "";
var correctAnswer = "";
var selectedAnswer = "";
var timer;
var timerCount = 60;

//start quiz and set timer
function startQuiz(){
    timer = setInterval(function(){
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0){
            winGame()
        }
        if (timerCount === 0){
            endGame()
        }
    }, 1000);
    
}

//check if answer is correct
//Show correct or wrong
//Deduct time from timer
function checkAnswer(){

}

//load next question
function nextQuestion(){

}

//timer runs out, show game over
function endGame(){

}

//Show quiz complete, display score, and get input of initials
function winGame(){

}

//save score to local storage
function saveScore(){
    
}

//show scores of local storage
function showScores(){

}

startButton.addEventListener("click", startQuiz);
