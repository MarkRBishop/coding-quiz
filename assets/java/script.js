//Array of questions and answer choices for the quiz as well as the correct answer
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

//Variables that will be called throughout the application
const timerDisplay = document.querySelector(".timer-display")
const timerElement = document.querySelector(".timer");
var startButton = document.querySelector("#start-button");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("questions");
var scoreBtn = document.querySelector("#high-score");

let timer;
let timerCount = 60;

let currentQuestionIndex = 0;

//Start the timer and call the function to show questions
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

//Checks if answer is correct or not
//Creates elements to display correct or not, creates a delay after display before calling the next question
//Deduct time from timer by 10 if answer is incorrect
//Function to check if the questions have all been asked calls the win function
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
//Calls the questions depending on the index, creates the elements that display questions
//loop function to display the array of question answer options
//returns the selected option and runs it through a function to check the answer
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

//Creates the message when the timer runs out and creates a button that refreshes the page to try again
function endGame(){
    quizContainer.innerHTML = ''
    clearInterval(timer)

    var endGameEl = document.createElement ("p")
    endGameEl.textContent = "Good luck next time"
    quizContainer.appendChild(endGameEl)

    var retryButton = document.createElement("button")
    retryButton.id = "retry-button"
    retryButton.textContent = "Retry"
    retryButton.style.display = "block"
    quizContainer.appendChild(retryButton)  

    retryButton.addEventListener("click", function(){
        location.reload()
    })
}

//Stops the timer and uses that as the attempts score
//Show quiz complete, display score, and get input of initials
//Takes the current local storage, adds the new input and score and send it back to local storage
function winGame(){
    clearInterval(timer)
    timerDisplay.style.display = "none"
    quizContainer.innerHTML = ''
    var score = timerCount

    var winMessage = document.createElement("p")
    winMessage.id = "win-message"
    winMessage.textContent = "Your score was " + score +"!"
    winMessage.style.display = "block"
    quizContainer.appendChild(winMessage)

    var nameInput = document.createElement("input")
    nameInput.setAttribute("type", "text")
    nameInput.setAttribute("placeholder", "Enter your initials")
    quizContainer.appendChild(nameInput)

    var submitBtn = document.createElement("button")
    submitBtn.id = "submit-button"
    submitBtn.textContent = "Submit"
    submitBtn.style.display = "inline-Block"
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

//Stops the timer incase someone clicks the view high score btn during an attempt
//Hides some unnecessary elements for the page
//Pulls the local storage, compares the scores and creates a list that ranks the attempts
//Creates buttons to refresh page to return to the start, as well as clear the local storage
function displayHighScores(){

    quizContainer.innerHTML = ''
    timerDisplay.style.display = "none"
    scoreBtn.style.display = "none"
    clearInterval(timer)

    var highScoreElement = document.createElement("h1")
    highScoreElement.id = "high-scores-h1"
    highScoreElement.textContent = "Highscores"
    quizContainer.appendChild(highScoreElement)

    const highScores = JSON.parse(localStorage.getItem("highScores")) || []

    highScores.sort((a,b) => b.score - a.score)

    const highScoresList = document.createElement("ul")

    //added id to help with css
    highScoresList.id = "high-scores-list"

    highScores.forEach((score, index) => {
        const listItem = document.createElement("li")
        listItem.textContent = `${index + 1}. ${score.name}: ${score.score}`
        highScoresList.appendChild(listItem)
    })

    quizContainer.appendChild(highScoresList)

    var returnBtn = document.createElement("button")
    var clearBtn = document.createElement("button")

    //added ids to help with css
    returnBtn.id = "return-button"
    clearBtn.id = "clear-button"

    returnBtn.textContent = "Return"
    clearBtn.textContent = "Clear Highscores"
    returnBtn.style.display = "inline-block"
    clearBtn.style.display = "inline-block"
    quizContainer.appendChild(returnBtn)
    quizContainer.appendChild(clearBtn)

    returnBtn.addEventListener("click", function(){
        location.reload();
    })
    clearBtn.addEventListener("click", function(){
        localStorage.removeItem("highScores")
        displayHighScores()
    })
}

//Event listener for the view high score btn as it's used on multiple "pages"
//Event listener for the start button
scoreBtn.addEventListener("click", displayHighScores)
startButton.addEventListener("click", startQuiz)