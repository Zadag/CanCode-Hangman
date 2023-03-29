#!/usr/bin/env node

import prompt from "readline-sync";
import wordBank from "./word-bank.js";
import hangmanStates from "./hangman-states.js";

let winCount = 0;

const getRandomWord = () => {
  return wordBank[Math.floor(Math.random() * wordBank.length)];
};

const welcomeMessage = `Welcome to hangman!`;
const winMessage = (guesses) => {
  return `
You won with ${guesses} guesses to spare!  That brings your wincount to ${winCount}.  
  
`;
};

const inputMessage = (guesses) => {
  return `You have ${guesses} guesses remaining. Type any letter to make a guess`;
};

const exitReminder = 'Press "ctrl + c" to exit the game';

const displayGuessSpaces = (guesses, word) => {
  const wordLength = word.length;
  let output = "";
  let wordCopy = "";
  for (let i = 0; i < wordLength; i++) {
    if (guesses.includes(word[i])) {
      wordCopy += `  ${word[i]}  `;
    } else {
      wordCopy += "     ";
    }
    output += " ___ ";
  }
  return `
  ${wordCopy}
  ${output}
  `;
};

const recieveGuess = (guesses) => {
  while (true) {
    const guess = prompt.question("Guess a letter: ").toLowerCase();
    if (guess.length !== 1) {
      console.log("One letter at a time.");
    } else if (guesses.includes(guess)) {
      console.log(`You already guessed ${guess}.`);
    } else if (guess.toLowerCase() === guess.toUpperCase()) {
      console.log(`I said guess a LETTER. ${guess} isn't a letter.`);
    } else return guess;
  }
};

// the isWon function takes an array of characters, a string, and determines whether the characters can from the string.
// Logic is essentially, remove any duplicate letters from the word, remove letters that aren't in the word from the characters,
// and compare the 2 arrays.  If their contents are the same, then the game is won.
const isWon = (guesses, word) => {
  const wordAsArr = word.split("");
  const sharedLetters = guesses.filter((letter) => wordAsArr.includes(letter));
  const wordWithoutDuplicates = wordAsArr.filter(
    (letter, index) => wordAsArr.indexOf(letter) === index
  );

  return sharedLetters.length === wordWithoutDuplicates.length;
};

const game = () => {
  let remainingGuesses = 6;
  const randomWord = getRandomWord().toLowerCase();
  const guessedLetters = [];

  console.log(welcomeMessage);
  while (remainingGuesses > 0) {
    console.log(`


${hangmanStates[Math.abs(remainingGuesses - 6)]}

${inputMessage(remainingGuesses)}


${displayGuessSpaces(guessedLetters, randomWord)}
${exitReminder}
`);

    const guess = recieveGuess(guessedLetters);
    guessedLetters.push(guess);
    if (!randomWord.split("").includes(guess)) remainingGuesses -= 1;
    if (isWon(guessedLetters, randomWord)) {
      winCount += 1;
      console.log(`
${winMessage(remainingGuesses)}
      `);
      const playAgain = prompt.keyInYN("Would you like to play again?: ");
      if (playAgain) game();
      else console.log("Thank you for playing!");
      return;
    }
  }
  console.log(hangmanStates[6]);
  const loserPlayAgain = prompt.keyInYN(
    `You lose :(.  The word was ${randomWord}.  Would you like to try again? `
  );
  if (loserPlayAgain) {
    winCount = 0;
    game();
  } else console.log("Thank you for playing! Goodbye");
};

game();
