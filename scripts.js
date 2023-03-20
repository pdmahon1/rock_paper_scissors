let formatChoice = (choice) => {
    return (choice && choice.length > 1) ?
        choice.trim()
            .charAt(0)
            .toUpperCase()
            .concat(choice.slice(1).toLowerCase()) :
        choice;
};

let getWinningChoice = (choice, choices) => {
    switch(choice){
        case choices[0]:
            return choices[1];
        case choices[1]:
            return choices[2];
        case choices[2]:
            return choices[0];
    }
}

let getRandomChoice = () => Math.floor(Math.random()*3);

let isValidChoice = (choice = '', choices) => choices.includes(choice);

let getComputerChoice = (choices) => choices[getRandomChoice()];

let trim = (choice) => (choice) ? choice.trim() : choice;

let getPlayerChoice = (choices) => 
    trim(
        formatChoice(
            prompt(`Make a choice between ${choices[0]}, ${choices[1]}, or ${choices[2]}`)
        )
    );

let getCorrectInput = (getPlayerChoice, choices) => {
    let input;
    let inputWasWrong = false;

    do {
        if(inputWasWrong){
            console.warn(`'${input}' was invalid. Please try again.`);
        }
        input = getPlayerChoice(choices);
        inputWasWrong = true;
    } while(input !== null && !isValidChoice(input, choices))

    return input;
}

function playOneRound(playerSelection, computerSelection, choices) {
    if(playerSelection === computerSelection){
        return "It's a tie!";
    }
    
    return (playerSelection === getWinningChoice(computerSelection, choices)) ?
        `You Win! ${playerSelection} beats ${computerSelection}` :
        `You Lose! ${computerSelection} beats ${playerSelection}`;
}

function playTheGame(){
    //NOTE: [0] loses to [1]. [1] loses to [2]. [2] loses to [0]
    const CHOICES = ["Rock", "Paper", "Scissors"];
    const numberOfRounds = 5;
    let playerSelection, computerSelection;

    for(let i = 1; i <= numberOfRounds; i++) {
        console.log(`GAME ${i}`);

        playerSelection = getCorrectInput(getPlayerChoice, CHOICES);
        if(!playerSelection){
            console.error("User canceled the game.");
            break;
        }
        
        computerSelection = getComputerChoice(CHOICES);
        console.log(
            playOneRound(playerSelection, computerSelection, CHOICES)
        );
    }
}

playTheGame();

