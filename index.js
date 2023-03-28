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

const game = () => {
  const randomWord = getRandomWord();
  const wordLength = randomWord.length;
  const guessedLetters = [];

  while (remainingGuesses > 0) {
    console.log(`
${welcomeMessage}

${hangmanStates[Math.abs(remainingGuesses - 6)]}
${inputMessage}


${displayGuessSpaces(guessedLetters, randomWord)}
${exitReminder}
${randomWord}
`);

    const guess = prompt(inputMessage);
    guessedLetters.push(guess);
  }
};

game();
