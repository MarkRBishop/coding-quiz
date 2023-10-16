const questionList = [
    {
        question: "question1",
        options: ["option 1", "option2", "option3", "option4"],
        answer: "option 1"
    },
    {
        question: "question2",
        options: ["option 1", "option2", "option3", "option4"],
        answer: "option 1"
    },
    {
        question: "question3",
        options: ["option 1", "option2", "option3", "option4"],
        answer: "option 1"
    },
    {
        question: "question4",
        options: ["option 1", "option2", "option3", "option4"],
        answer: "option 1"
    },
];




const timerElement = document.querySelector(".timer");
const startButton = document.querySelector("#start-button");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("questions");

var timer;
var timerCount = 60;


let currentQuestionIndex = 0;

//start quiz and set timer then hide it
function startQuiz(){
    startButton.style.display = "none"

    timer = setInterval(function(){
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount <= 0){
            endGame()
        }
    }, 1000);
    showQuestion(currentQuestionIndex);
}

//check if answer is correct
//Show correct or wrong
//Deduct time from timer

function checkAnswer(selectedOpt){

    var answerEl = document.createElement("p")

    if (selectedOpt === questionList[currentQuestionIndex].answer){
        answerEl.textContent = ("You're Correct!!")
    } else {
        answerEl.textContent = ("Incorrect, Good luck with the next question!" )
        timerCount -=10
    }

    quizContainer.appendChild(document.createElement("hr"))
    quizContainer.appendChild(answerEl)
    
    setTimeout(function(){
        currentQuestionIndex++;
        if (currentQuestionIndex < questionList.length) {
            showQuestion(currentQuestionIndex)
        } else {
            winGame()
        }

    }, 2000);
}
//load next question
function showQuestion(currentQuestionIndex){
    
    var quizContainer = document.getElementById("quiz-container");

    quizContainer.innerHTML = '';

    var questionElement = document.createElement("h1")
    questionElement.textContent = questionList[currentQuestionIndex].question
    questionElement.style.display = "block"
    quizContainer.appendChild(questionElement)


    var options = questionList[currentQuestionIndex].options
    for (var i = 0; i < options.length; i++){
        var optionButton = document.createElement("button");
        optionButton.textContent= options[i]
        optionButton.style.display = "block"
        optionButton.addEventListener("click", function(selectedOpt) {
            return function() {
            checkAnswer(selectedOpt);
            }
        }(options[i]))
        quizContainer.appendChild(optionButton);
    }
}

//timer runs out, show game over
function endGame(){
    quizContainer.innerHTML = ''

    var endGameEl = document.createElement ("p")
    endGameEl.textContent = "Good luck next time"
    quizContainer.appendChild(endGameEl)

    var retryButton = document.createElement("button")
    refreshButton.textContent = "Retry"
    retryButton.style.display = "block"
    quizContainer.appendChild(retryButton)
   
}

//Show quiz complete, display score, and get input of initials
function winGame(){
    timerElement.style.display = "none"
    quizContainer.innerHTML = ''
    var score = timerCount

    var winMessage = document.createElement("p")
    winMessage.textContent = "Your score was " + score
    winMessage.style.display = "block"
    quizContainer.appendChild(winMessage)

    var nameInput = document.createElement("input")
    nameInput.setAttribute("type", "text")
    nameInput.setAttribute("placeholder", "Enter your initials")
    quizContainer.appendChild(nameInput)

    var submitBtn = document.createElement("button")
    submitBtn.textContent = "Submit"
    submitBtn.style.display = "Block"
    submitBtn.addEventListener("click", function(event) {
        event.preventDefault()
        var highScore = {
            name: nameInput.value,
            score: score
        }
        localStorage.setItem("highScore", JSON.stringify(highScore))

    })
    quizContainer.appendChild(submitBtn)
}

//save score to local storage
function saveScore(){
    
}

//show scores of local storage
function showScores(){

}

startButton.addEventListener("click", startQuiz);
