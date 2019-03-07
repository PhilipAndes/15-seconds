<?php

    $url = "https://opentdb.com/api.php?amount=10&type=multiple"; 

    $json = file_get_contents($url);

    // var_dump($json);

    // echo "<br>";
    // echo "<br>";

    $question = json_decode($json);  

    // var_dump($question);

    // echo "<br>";
    // echo "<br>";

    //echo '<form>'; 
    echo '<br>';
    echo 'Category: ' . $question -> results[0] -> category;
    echo '<br>';
    echo '<br>';
    echo 'Difficulty: ' . $question ->  results[0] -> difficulty;
    echo '<br>';
    echo '<br>';
    echo 'Question: ' . $question ->  results[0] -> question;
    echo '<br>';
    echo '<br>';

    // putting the correct answer on a random place each question
    $ans = array($question -> results[0] -> correct_answer, $question -> results[0] -> incorrect_answers[0], $question -> results[0] -> incorrect_answers[1], $question -> results[0] -> incorrect_answers[2]);
    shuffle($ans);

    foreach ($ans as $answers) {
        echo '<input type="radio" id="radio" name="ans" value="' . $answers . '">' . $answers . '</input>' . '<br>';
    } unset($answers);

    echo '<br>';
    echo '<button id="button1" type="button" onclick="compareValues()">Check</button>';
    echo '<br>';
    echo '<div id="cans">' . $question ->  results[0] -> correct_answer . '</div';
    //echo '</form>'; 
    echo '<br>';      

    $conn = null;   

  ?>