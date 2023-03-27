import { prompt } from "readline-sync";
import wordBank from "./word-bank.js";

console.log("test");

const getRandomWord = () => {
  return wordBank[Math.floor(Math.random() * wordBank.length)];
};
const welcomeMessage = "Welcome to hangman!";
const inputMessage = "Guess a letter";
const exitReminder = 'Press "ctrl + c" to exit the game';

console.log(`${getRandomWord()} ${exitReminder}`);

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

console.log(`
${welcomeMessage}

${hangmanStates[0]}

${exitReminder}
`);
