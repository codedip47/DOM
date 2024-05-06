let randomNumber = parseInt(Math.random()*100 + 1);

const submit = document.querySelector('#submit-button');
const userInput = document.querySelector('#guess-number');
const guessList = document.querySelector('.previous-guess');
const remainingGuess = document.querySelector('.guess-remaining');
const lowOrhigh = document.querySelector('.lowOrhigh');

let prevGuess = [];
let numGuesses = 1;
let playGame = true;

if(playGame)
{
    submit.addEventListener('click',function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);

    });
}


/* cheking guess is valid or not */
function validateGuess(guess)
{
    if(isNaN(guess))
    {
        alert('Please Enter a Valid Number');
    }    
    else if(guess < 1){
        alert('Please Enter a Number more than 1');
    }
    else if(guess > 100){
        alert('Please Enter a Number less than 100');
    }else {
        prevGuess.push(guess);
        displayGuess(guess);
        if(numGuesses >= 11){
            displayMessage(`Game Over, Random Number was ${randomNumber}`);
            let tag=document.getElementById("submit-button");
            tag.style.backgroundColor = 'red';
            endGame();
        }
        else
        {
            checkGuess(guess);
        }
    }

}
/* check number equal to guess number or low & high display accordingly */
function checkGuess(guess)
{
    if(guess === randomNumber){
        displayMessage(`You guessed it Right!`);
        let tag=document.getElementById("submit-button");
        tag.style.backgroundColor = '#4dc615';
        endGame();
    }
    else if(guess < randomNumber){
        displayMessage(`Number is Too low`);
    }else if(guess > randomNumber){
        displayMessage(`Number is Too high`);
    }
}
/* just print the message */
function displayMessage(message)
{
    lowOrhigh.innerHTML = `<h2>${message}</h2>`;
}
/* update guess array & remaining count */
function displayGuess(guess)
{
    userInput.value = '';
    guessList.innerHTML += `${guess}  `;
    ++numGuesses;
    remainingGuess.innerHTML = `${11 - numGuesses}`;
}

function newGame()
{
    const reset = document.querySelector('#reset');
    reset.addEventListener('click',function(e){
        let tag=document.getElementById("submit-button");
        tag.style.backgroundColor = 'whitesmoke';
        randomNumber = parseInt(Math.random()*100 + 1);
        prevGuess = [];
        numGuesses = 1;
        guessList.innerHTML = '';
        remainingGuess.innerHTML = `${11 - numGuesses}`;
        lowOrhigh.innerHTML = '';
        document.getElementById("submit-button").disabled = false;
        playGame = true;
    });
}
/* for realtime reset*/
const reset = document.querySelector('#reset');
reset.addEventListener('click',function(e){
        randomNumber = parseInt(Math.random()*100 + 1);
        prevGuess = [];
        numGuesses = 1;
        userInput.value = '';
        lowOrhigh.innerHTML = '';
        guessList.innerHTML = '';
        remainingGuess.innerHTML = `${11 - numGuesses}`;
        document.getElementById("submit-button").disabled = false;
        playGame = true;
    });


function endGame()
{
    userInput.value = '';
    document.getElementById("submit-button").disabled = true;
    playGame = false;
    newGame();
}