// console.log('connected');

//set global variables:
var amount = 3;//number of questions, global var 
 
//get information from api
var url = "https://opentdb.com/api.php?amount=" + amount + "&type=multiple"; //the API
var score = 0; // sets the starting score on zero
var questionIndex = 0; // sets the question index on zero
var questions = 0; // sets the questions on zero
var correctAnswer = ''; // display the correct answer as string
var count = 3; //give time in seconds

// console.log(questionIndex, amount);

getQuestions();

///////////////////////////////////////// Create a function with information from the API
function getQuestions(){
fetch(url)
    .then(
        function (response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function (data) {
                questions = data; //show data as questions
                // console.log(" from the fetch questions = ");
                // console.log(questions);
                showQuestion(questions, questionIndex); //make another function which contains the questions (data) and use questionIndex = 0
                // console.log("from the fetch questionIndex = " + questionIndex);
            });
        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
}

//////////////////////////////// make a function for the specific data from above
function showQuestion(data, i) { 
    console.log(`Function showQuestion Started!`);
    console.log('showquestion ' + questionIndex, amount);
    // console.log("in showQuestion questionIndex= " + questionIndex);

    showOutput();

    showQuestionInfo(data.results[i].category, data.results[i].difficulty, data.results[i].question); //get the category, difficulty and question

    correctAnswer = (data.results[i].correct_answer); 

    var answerArray = createAndShuffleArray(data, i); //shuffle the array data and index

    showAnswers(answerArray); //create a function with the answers shuffled above
}

function showOutput(){
    // console.log("showOutput started");
    document.getElementById("score").innerHTML = score; //show the score on the output

    //if index is smaller then amount count +1 on index, if index equals amount show the same number:
    if (questionIndex <= (amount -1) ){
    document.getElementById('qNumber').innerHTML = (questionIndex + 1) + "/" + amount; //count +1 on question number on output
    document.getElementById('button1').textContent = "Check Answer"; // change button 1 text to; Check Answer
    document.getElementById('button2').textContent = "Next Question"; //change button 2 text to Next Question
    } else if (questionIndex > (amount -1)) {
        document.getElementById('qNumber').innerHTML = questionIndex + "/" + amount; 
        document.getElementById('button1').textContent = "Show Score"; // change the button text to; Show Score when quiz is finished
        document.getElementById('button2').textContent = "Restart Quiz"; //change the button text to restart quiz
        document.getElementById("fScore").innerHTML = "You scored: " + score; //output; You scored + the final score
    }
}

// create function and show it in the output with the fetched information from above
function showQuestionInfo(category, difficulty, question){ 
    // console.log(`Function showQuestionInfo Started!`);  
    document.getElementById("category").innerHTML = category;
    document.getElementById("difficulty").innerHTML = difficulty;
    document.getElementById("question").innerHTML = question; 
}

////////////////////////////////////////////shuffle all the answers in the array each time
function createAndShuffleArray(d, i){  
    // console.log(`Function createAndShuffleArray Started!`);   
    var myArray = [d.results[i].correct_answer, d.results[i].incorrect_answers[0], d.results[i].incorrect_answers[1], d.results[i].incorrect_answers[2]];   
    shuffle(myArray);  
    return myArray;  
}

function shuffle(ARRAY) {
    // console.log(`Function shuffle(array) Started!`); 
    for (let i = ARRAY.length - 1; i > 0; i--) { // i = array length - 1, i = bigger then 0, minus 1 from i
        const j = Math.floor(Math.random() * (i + 1)); //x i value + 1
        [ARRAY[i], ARRAY[j]] = [ARRAY[j], ARRAY[i]];
    }
    return ARRAY;
}

////////////////////////////////////////// Show all the possible answers with this function 
function showAnswers(answers){
    // console.log(`Function showAnswers Started!`); 
    document.getElementById("answers").innerHTML = ``;
    for (var answer of answers) {
        document.getElementById("answers").innerHTML += `<p><input class="answers" type="radio" name="ans" value="${answer}">${answer}</p>`; //display each answer as radiobutton option in the html with += 
    }
}

//////////////////////////////////////////////////////////////////////////////// timer
const time = function() {
    // console.log('time function started');  
    document.getElementById('count').innerHTML = count; //output in html
    count--; //count down

    if (count === 0 && questionIndex <= (amount -1)){ //if count is equal to 0
        score--; //-1 score if count is 0
        questionIndex++; //count +1 on questionIndex
        showQuestion(questions, questionIndex); //give next question
        count = 3; //reset timer on 15sec
    }  else if (questionIndex > (amount -1)){ //stop timer when end of number of questions  
        clearInterval(interval); //stop the timer
        console.log('timer stopped ' + questionIndex, amount);
    } 
}      
//create a var for the timer, to use it everywhere in the script
var interval = setInterval(time, 1000); //time = function above, 1000 = time in milliseconds so 1sec.

/////////////////////////////////////////////////////////////////////////////////Check button 











