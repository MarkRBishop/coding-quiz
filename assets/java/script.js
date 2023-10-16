const questionList = [
    {
        question: "What does the typeof operator in JavaScript return when used with a string?",
        options: ["string", "number", "boolean", "function"],
        answer: "string"
    },
    {
        question: " In JavaScript, which keyword is used to declare a variable?",
        options: ["define", "alloc", "let", "declare"],
        answer: "let"
    },
    {
        question: "How do you write a comment in JavaScript?",
        options: ["/* This is a comment */", "// This is a comment", "<!-- This is a comment -->", "' This is a comment '"],
        answer: "// This is a comment"
    },
    {
        question: " Which function is used to parse a string and return it as an integer in JavaScript?",
        options: ["parseFloat()", "toInteger()", "parseInteger()", "parseInt()"],
        answer: "parseInt()"
    },
];



const timerDisplay = document.querySelector(".timer-display")
const timerElement = document.querySelector(".timer");
var startButton = document.querySelector("#start-button");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("questions");
var scoreBtn = document.querySelector("#high-score");

let timer;
let timerPaused = false
let timerCount = 60;

let currentQuestionIndex = 0;

//start quiz and set timer then hide it
function startQuiz(){
    startButton.style.display = "none"

    timer = setInterval(function(){
        if (!timerPaused) {
            timerCount--;
            timerElement.textContent = timerCount;
            if (timerCount <= 0){
                endGame()
            }
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
        answerEl.textContent = ("Sorry, that's Incorrect." )
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

    }, 1000);
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
    clearInterval(timer)

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
    clearInterval(timer)
    timerDisplay.style.display = "none"
    quizContainer.innerHTML = ''
    var score = timerCount
    

    var winMessage = document.createElement("p")
    winMessage.textContent = "Your score was " + score +"!"
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
        
        var highScores = JSON.parse(localStorage.getItem("highScores")) || []
        
        var highScore = {
            name: nameInput.value,
            score: score
        }
        highScores.push(highScore)
        localStorage.setItem("highScores", JSON.stringify(highScores))

        displayHighScores()

    })
    quizContainer.appendChild(submitBtn)
}

//sort and show scores of local storage
function displayHighScores (){

    quizContainer.innerHTML = ''
    timerDisplay.style.display = "none"
    scoreBtn.style.display = "none"
    clearInterval(timer)

    const highScores = JSON.parse(localStorage.getItem("highScores")) || []

    highScores.sort((a,b) => b.score - a.score)

    const highScoresList = document.createElement("ul")
    highScoresList.id = "high-scores-list"

    highScores.forEach((score, index) => {
        const listItem = document.createElement("li")
        listItem.textContent = `${index + 1}. ${score.name}: ${score.score}`
        highScoresList.appendChild(listItem)
    })

    
    quizContainer.appendChild(highScoresList)

    var returnBtn = document.createElement("button")

    
    returnBtn.textContent = "Return"
    returnBtn.style.display = "block"
    quizContainer.appendChild(returnBtn)

    returnBtn.addEventListener("click", function(){
        quizContainer.innerHTML = ''
        timerDisplay.style.display = "block"
        scoreBtn.style.display = "block"
        startButton.style.display = "block"
        timerCount = 60
        timerElement.textContent = timerCount
        currentQuestionIndex = 0
        

        var title = document.createElement("h1")
        title.textContent = "Coding Quiz"
        title.style.display = "Block"
        quizContainer.appendChild(title)

        var description = document.createElement("p")
        description.innerHTML = "You will have 60 seconds to answer 4 questions. <br> Each time you get an answer wrong, you will be penalized by 10seconds! <br> Good luck!"
        description.style.display = "block"
        quizContainer.appendChild(description)

        var restartButton = document.createElement("button")
        restartButton.textContent = "Start Quiz"
        restartButton.style.display = "block"
        quizContainer.appendChild(restartButton)
        restartButton.addEventListener("click", startQuiz)

    })
}


scoreBtn.addEventListener("click", displayHighScores)
startButton.addEventListener("click", startQuiz)
