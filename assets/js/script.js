/* || Utility Functions */

function clearAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

const questions = [
    {
        text: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correct_ans: "alerts"
    },
    {
        text: "The condition in an if/else statement is enclosed within ____.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        correct_ans: "curly brackets"
    },
    {
        text: "Arrays in JavaScript can be used to store ____.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct_ans: "all of the above"
    },
    {
        text: "String values must be enclosed within ____ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parentheses"],
        correct_ans: "quotes"
    },
    {
        text: "A very useful tool during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console log"],
        correct_ans: "console log"
    },
]

var timeLeft = startTime = 75
var qIndex = 0

if (localStorage.getItem("highscoresArr") === null) {
    var highscoresArr = []
    localStorage.setItem("highscoresArr", JSON.stringify(highscoresArr))
}

else {
    var highscoresArr = JSON.parse(localStorage.getItem("highscoresArr"))
}

/**
 * Fetching some elements from the HTML
 */
mainEl = document.querySelector("main")

var highscoreBtnEl = document.querySelector("#highscore-button")
var timerEl = document.querySelector("#timer")

var topTextEl = document.querySelector("h1")

var startSec = document.querySelector("#start-sec")

var answerSec = document.querySelector("#answer-sec")
var answerListEl = document.querySelector("#answer-list")

var endSec = document.querySelector("#end-sec")
var scoreTallyEl = document.querySelector("#score-tally")
var submitBtnEl = document.querySelector("#submit")

var highscoresSec= document.querySelector("#highscores-sec")
var HSListEl = document.querySelector("#highscores-list")

var resultSec = document.querySelector("#result-sec")
var resultEl = document.querySelector("#result")

/**
 * A function to start the quiz
 */

function startQuiz() {
    window.timer = setInterval(() => {
        timeLeft--
        timerEl.innerText = `Time: ${timeLeft}`
        if (timeLeft == 0) {
            clearInterval(timer)
            showEnd()
        }
    }, 1000);
    showQuestion()
}

/**
 * A function to display the next question when the start button or an answer button is clicked:
 */

function showQuestion() {
    if (qIndex === questions.length) {
        showEnd()
        return
    }
    startSec.style.display = "none"
    answerSec.style.display = "flex"

    var newQuestion = questions[qIndex]
    qIndex++
    
    topTextEl.innerText = newQuestion.text

    var answerListEl = document.querySelector("#answer-list")
    for (let i = 0; i < newQuestion.answers.length; i++) {
        var answerEle = answerListEl.children[i].firstChild
        var answer = newQuestion.answers[i]
        answerEle.innerText = answer
        answerEle.setAttribute("onclick", `gradeAnswer("${answer}", "${newQuestion.correct_ans}")`)
    }
}

function gradeAnswer(ans, correct_ans) {
    resultText = "Correct!"
    if (ans !== correct_ans) {
        resultText = "Incorrect..."
        timeLeft -= 10
        timerEl.innerText = `Time: ${timeLeft}`
    }
    showQuestion()
    showResult(resultText)
}

function showResult(resultText) {
    resultEl.innerText = resultText
    resultSec.style.display = "flex"
    setTimeout(() => {
        resultSec.style.display = "none"
    }, 1000);
}

/**
 * A function to show the end screen after the quiz is completed
 */

function showEnd() {
    clearInterval(timer)
    answerSec.style.display = "none"
    endSec.style.display = "flex"

    topTextEl.innerText = "All done!"
    scoreTallyEl.innerText = `Your final score is ${timeLeft}`

    submitBtnEl.innerText = "Submit"
    submitBtnEl.setAttribute("onclick", "updateHighscores()")
}

function updateHighscores() {
    var player_initials = document.querySelector("#initials").value
    if (player_initials.length < 2) {
        showResult("Initials must be 2-3 characters long!")
        return
    }
    highscoresArr.push({
        initials: player_initials,
        score: timeLeft
    })
    highscoresArr = highscoresArr.sort( (player1, player2) => { return player1.score - player2.score }).reverse()
    localStorage.setItem("highscoresArr", JSON.stringify(highscoresArr))
    showHighscores()
}

function showHighscores() {
    startSec.style.display = "none"
    answerSec.style.display = "none"
    endSec.style.display = "none"
    highscoresSec.style.display = "flex"

    topTextEl.innerText = "Highscores"

    clearAllChildren(HSListEl)
    for (let i = 0; i < highscoresArr.length; i++) {
        var HSObj = highscoresArr[i];
        var HSListItemEl = document.createElement("li")
        HSListItemEl.innerText = `${HSObj.initials} - ${HSObj.score}`
        HSListEl.appendChild(HSListItemEl)
    }
}

function showStart() {
    clearInterval(timer)
    topTextEl.innerText = "Coding Quiz!"
    startSec.style.display = "flex"
    answerSec.style.display = "none"
    endSec.style.display = "none"
    highscoresSec.style.display = "none"

    qIndex = 0
    timeLeft = startTime
    timerEl.innerText = `Time: ${timeLeft}`
}

function clearHighscores() {
    highscoresArr = []
    localStorage.clear()
    showHighscores()
}