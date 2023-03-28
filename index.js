import { prompt } from "readline-sync";
import wordBank from "./word-bank.js";

let winCount = 0;

const getRandomWord = () => {
  return wordBank[Math.floor(Math.random() * wordBank.length)];
};

let remainingGuesses = 6;
const welcomeMessage = `Welcome to hangman!`;
const inputMessage = `You have ${remainingGuesses} guesses remaining. Type any letter to make a guess`;
const exitReminder = 'Press "ctrl + c" to exit the game';

const hangmanStates = [
  ` 
+-----+
  |   |
      |
      |
      |
      |
=========`,
  ` 
+-----+
  |   |
  O   |
      |
      |
      |
=========`,
  `
+---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  `
+---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `
+---+
  |   |
  O   |
 /|\  |
      |
      |
=========`,
  `
+---+
  |   |
  O   |
 /|\  |
 /    |
      |
=========`,
  `
+---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========`,
];

const displayGuessSpaces = (arr, word) => {
  const wordLength = word.length;
  let output = "";

  while (wordLength > 0) {
    output += " _ ";
    wordLength -= 1;
  }
};

const game = () => {
  const randomWord = getRandomWord();
  const wordLength = randomWord.length;
  const guessedLetters = [];

  while (remainingGuesses > 0) {
    console.log(`
${welcomeMessage}

${hangmanStates[0]}
${inputMessage}

${exitReminder}
`);

    const guess = prompt(inputMessage);
    break;
  }
};

game();
