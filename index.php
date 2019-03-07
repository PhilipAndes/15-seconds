<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <title>Trivia</title>
</head>
<!-- <body onload="time()"> -->
<body>
    <!-- Start quiz-->

    <!-- <div id="count">
        <div id="count-number"></div>
        <svg>
            <circle r="18" cx="20" cy="20"></circle>
        </svg>
    </div> -->

    <div class="quizCard debug">
        <h1 class="quizName">15-Seconds!</h1>

        <div class="cardInfo">Current Score
            <div id="score"></div>
        </div><br />

        <div class="cardInfo">Difficulty
            <p id="difficulty"><p>
        </div>

        <div class="cardInfo">Category
            <p id="category"><p>
        </div>

        <div class="cardInfo">Question Nr
            <div id="qNumber"></div>
        </div><br />

        <div class="cardInfo">Question
            <p id="question"><p>
        </div>

        <div class="cardInfo">Answers
            <div id="answers"></div>
        </div>

        <div class="cardInfo">Time:
            <div id="count"></div>
        </div><br/>


        <!---------------------------------------------- Trigger/Open The Modal -->
        <button  id="button1" onclick="compareValues()">Check Answer</button>

    </div>
        <!-- The Modal -->
        <div id="myModal" class="modal">

          <!-- Modal content -->
            <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                        <h2>Result</h2>
                </div>
                <div class="modal-body">
                    <p id="cans1"></p>
                    <p id="cans"></p>
                    <p id="fScore"></p>
                </div>
                <div class="modal-footer">
                <p></p>
                <button id="button2" onclick="nextQuestion()">Next Question</button>
                    <!-- <h3>Modal Footer</h3> -->
                </div>
            </div>
        </div>
    
        
    
    <script src="js/main.js"></script>
</body>
</html>