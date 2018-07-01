//variable defining dog breeds
var dogBreeds = [
    "akita",
    "sharpei",
    "chin",
    "shihtzu",
    "shibainu",
    "pug",
    "indog",
    "pekingese",
    "formosan",
    "tibetanmastiff",
    "jindo",
    "chowchow",
   ]

var pictures = [
    //need to add corresponding chosen dog breed with image
]
   
//we want a variable to hold the dog breed that was chosen at random
var breedChosen = ""; 
//number of letters that are blank that will be in the blank div
var blanks = 0;
//holds the letter that was selected and the rest of the _
var blanksCorrect = [];
//holds the letter that is wrong and not part of the chosen word
var wrongletter = [];
   
//holds how many times you are allowed to guess
var remaining = 10;
//holds the wins if you guessed the word right
var wins = 0;
   
//create a function to start the game
function startGame(){
    //resetting
    blanksCorrect = [];
    //resetting 
    wrongletter = [];
    //refining that allocated times able to guess is 10
    remaining = 10;
    //allows for one of the words from dog breeds to be selected randomly each time (pug)
    breedChosen = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
    //this breaks out the word to become individual letters (p.u.g)
    lettersInChosenWord = breedChosen.split("");
    //counts how many letters there are in the word
    blanks = lettersInChosenWord.length;

    //test
    console.log(breedChosen);
    console.log(blanks)
    
    //for loop that repeats, blanks is accounting for how many letters, and it's pushing out _ 
    for(var i = 0; i < blanks; i++){
        blanksCorrect.push("_");
    }

    //test
    console.log(blanksCorrect);
    
    //we are going back and calling the ids in and populating the letter and _ that is blank
    document.getElementById('blank').innerHTML = blanksCorrect.join(" ");
    //showing that you have 10 guesses total to try
    document.getElementById('guessRemaining').innerHTML = remaining;
}

//letter selected is on the bottom of script, but this function is used to check the letters that are being selected
function check(letter){
    //if the letter is not in the word then go straight into else statement
    var letterInWord = false;

    //checks if the letter selected is actually in our chosen word
    for(var i = 0; i < blanks; i++){
        if(breedChosen[i] === letter){
               letterInWord = true;
   
        }
    }

    //if letter is selected and is in chose word then populate it in blanksCorrect
    if(letterInWord){
        for(i = 0; i < blanks; i++){
            if(breedChosen[i] === letter){
               blanksCorrect[i] = letter;
            }
        }
    }
    
    //if letter selected is not in chose word then remove points from letters
    else{
        remaining --;  
        wrongletter.push(letter)
    }
}

//function that is able to start a new round once user gets through the game
function roundComplete(){
    //filling in the HTML
    document.getElementById('blank').innerHTML = blanksCorrect.join(" ");
    document.getElementById('guessRemaining').innerHTML = remaining;
    document.getElementById('lettersGuessed').innerHTML = wrongletter.join(" ");

    //test
    console.log(lettersInChosenWord);
    console.log(blanksCorrect);
    
    //if the letters selected are in the chosen word and it fills all the blanks then alert you win
    if(lettersInChosenWord.join(" ") === blanksCorrect.join(" ")){
        wins++;
        alert("You won this round!!");
        document.getElementById('wins').innerHTML = wins;
        //restart the game by calling the startGame function
        startGame();

        //if you lose out on remaining points then say you lose
        }else if(remaining === 0){
            document.getElementById('lettersGuessed').innerHTML = "";
            alert("Sorry, no more guesses!");        

         //restart the game by calling the startGame function
        startGame();
         }
    }

//call the game
startGame();

//when a letter is selcted
document.onkeyup = function(event){

//letter selected should always be lowercase
var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    
    //test
    console.log("letter youtyped", letterGuessed)
    
    //call check function
    check(letterGuessed)

    //call the roundcomplete when we have gone through the letter checks
    roundComplete();
}