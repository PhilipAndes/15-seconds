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
    // console.log("in showQuestion questionIndex= " + questionIndex);

    if (questionIndex < amount){
    console.log(`index = ` + questionIndex);
    showOutput();

    showQuestionInfo(data.results[i].category, data.results[i].difficulty, data.results[i].question); //get the category, difficulty and question

    correctAnswer = (data.results[i].correct_answer); 

    var answerArray = createAndShuffleArray(data, i); //shuffle the array data and index

    showAnswers(answerArray); //create a function with the answers shuffled above
    } 
}

function showOutput(){
    // console.log("showOutput started");
    document.getElementById("score").innerHTML = score; //show the score on the output
    document.getElementById('count').innerHTML = count; //get id from html

    //if index is smaller then amount count +1 on index, if index equals amount show the same number:
    if (questionIndex < amount){
    document.getElementById('qNumber').innerHTML = (questionIndex + 1) + "/" + amount; //count +1 on question number on output
    document.getElementById('button1').textContent = "Check Answer"; // change button 1 text to; Check Answer
    document.getElementById('button2').textContent = "Next Question"; //change button 2 text to Next Question
    } else {
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
    console.log('time function started');
    console.log('time index = ' + questionIndex);  
    count--; //count down

    if (count === 0 && questionIndex < amount){ //if count is equal to 0
        score--; //-1 score if count is 0
        questionIndex++; //count +1 on questionIndex
        showQuestion(questions, questionIndex); //give next question
        count = 3; //reset timer on 15sec
    }  else if (questionIndex == amount){ //stop timer when end of number of questions
        //console.log("questionIndex equals questions ");
        // console.log("questionIndex = " + questionIndex);  
        clearInterval(interval); //stop the timer
        console.log('timer stopped');
        showOutput();
        count = 0;
        console.log('time count = ' + count);
    } 
}      
//create a var for the timer, to use it everywhere in the script
var interval = setInterval(time, 1000); //time = function above, 1000 = time in milliseconds so 1sec.

/////////////////////////////////////////////////////////////////////////////////Check button 
function compareValues() {

    modal.style.display = "block"; //display as block when clicked
    clearInterval(interval); // stop the time
    var givenAnswer = document.querySelector('input[name=ans]:checked').value; //check of the value is correct or incorrect
    correctAnswer = correctAnswer.replace(/^\s+|\s+$/gm,''); //remove spaces before and behind answers

    if (givenAnswer == correctAnswer) { //if givenAnswer equals correctAnswer
        
        score++; //count 1+
        document.getElementById("score").innerHTML = score; //update score in output
        document.getElementById("cans1").innerHTML = "Correct, the answer is: "; //give feedback when correct
        document.getElementById("cans").innerHTML = correctAnswer; //show correct answer 
 
    } else if (questionIndex >= amount) { //if questionIndex is equal or bigger then amount of questions
        // document.getElementById("cans").innerHTML = ''; //show nothing
        document.getElementById('button1').textContent = "Show Score"; //change the button text to; Show Score when quiz is finished
        document.getElementById("fScore").innerHTML = "You scored: " + score;//output; You scored + the final score

    } else {
        score--;
        document.getElementById("score").innerHTML = score;
        document.getElementById("cans1").innerHTML = "Wrong, the correct answer is: "; 
        document.getElementById("cans").innerHTML = correctAnswer; 
    } 
}

//////////////////////////////////////////////////function for the next question
function nextQuestion() {
    console.log(`Next Question;`);
    questionIndex++;
    console.log(questionIndex, amount);
    document.getElementById('button2').textContent = "Next Question"; 

    if (questionIndex >= amount) {
        console.log("EINDE");
        //console.log("in nextQuestion questionIndex > amount = " + questionIndex);

        document.getElementById('qNumber').innerHTML = (questionIndex+1) + "/" + amount; //show next question number on output

        //change the button text to restart quiz.
        document.getElementById('button2').textContent = "Restart Quiz"; 
    
        getQuestions();

        questionIndex = 0; 

        // reset the timer:
        count = 15; 
        // console.log(count);

        // document.getElementById("score").innerHTML = score;

        //reset the timer with the function setInterval
        // interval = setInterval(time, 1000);

        //show the new timer in the output
        document.getElementById('count').innerHTML = count;

    }
    
    modal.style.display = "none"; // hide the modal when next button is clicked
    
    showQuestion(questions, questionIndex); //show next question
    
    console.log("in nextQuestion questionIndex= " + questionIndex);
    
    document.getElementById('qNumber').innerHTML = (questionIndex+1) + "/" + amount; //show next question number on output

    score = 0;

    count = 15; // reset the timer

    interval = setInterval(time, 1000); //reset the timer
 
    document.getElementById('count').innerHTML = count; //show the new timer in the output
}


// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    console.log(`onclick close;`);
    nextQuestion();
}

///////////////////////////////////// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     console.log(`onclick Window;`);
//   if (event.target == modal) {
//     console.log(`onclick Window modal`);
//     nextQuestion();
//   }
// }










