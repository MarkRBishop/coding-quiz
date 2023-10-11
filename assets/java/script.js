const questionList = [
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
var startButton = document.querySelector("#start-button");


var timer;
var timerCount = 60;


let currentQuestionIndex = 0;

//start quiz and set timer
function startQuiz(){
    document.getElementById("start-button").style.display = "none"
    // document.getElementById("description").style.display = "none"

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
    showQuestion(currentQuestionIndex);
}

//check if answer is correct
//Show correct or wrong
//Deduct time from timer
function checkAnswer(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questionList.length){
        showQuestion(currentQuestionIndex);
    } else {
        winGame();
    }
}

//load next question
function showQuestion(currentQuestionIndex){
    var questionElement = document.getElementById("questions");
    var quizContainer = document.getElementById("quiz-container");

    quizContainer.innerHTML = '';

    questionElement.textContent = questionList[currentQuestionIndex].question;
    questionElement.style.display = "block";

    var options = questionList[currentQuestionIndex].options
    for (var i = 0; i <options.length; i++){
        var optionButton = document.createElement("button");
        optionButton.textContent= options[i]
        optionButton.addEventListener("click", function() {
            checkAnswer(options[i]);
        })
        quizContainer.appendChild(optionButton);
    }
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
