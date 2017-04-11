/*REQUIRES*/
var inquirer = require('inquirer');
var fs = require('fs');
var clozeCard = require('./clozeCard.js');
var basicCard = require('./basicCard.js');

/*GLOBAL VARS*/
var action = process.argv[2];
var basicQuestions = [];
var clozeQuestions = [];

if (action === undefined) {
  console.log('\n************************************************************************************************\n');
  console.log('Please enter either "basic" to create a basic flashcard or "cloze" to create a cloze flashcard.');
  console.log('\n************************************************************************************************\n');
}

else if(action.toLowerCase() === 'basic') {
  basicPrompt();
}

else if(action.toLowerCase() === 'cloze') {
  clozePrompt();
}

function basicPrompt() {
  inquirer.prompt([

    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Enter a trivia question.",
      name: "question"
    },
    {
      type: "input",
      message: "Enter an answer.",
      name: "answer"
    }
]).then(function(resp) {
  var flashcard = new basicCard(resp.question, resp.answer);
  var flashcardJSON = JSON.stringify(flashcard);
  basicQuestions.push(flashcardJSON);
  fs.appendFile('basicflashcard.txt', flashcardJSON + '\n');
  
  //inquire about restart
  inquirer.prompt({
    type: 'confirm',
    name: 'restart',
    message: 'Would you like to make another card?',
    default: true
  }).then(function(res) {
      if (res.restart === true) {
        basicPrompt();
      }
      else {
        console.log('\n************************************************************************************************\n');
        console.log('Thanks for adding these flashcards to the database!');
        console.log('\n************************************************************************************************\n');
      }
    });
  });
}

function clozePrompt() {
  inquirer.prompt([

    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Enter a trivia statement.",
      name: "question"
    },
    {
      type: "input",
      message: "Enter the word from that statement that is the answer.",
      name: "answer"
    }
]).then(function(resp) {
  var flashcard = new clozeCard(resp.question, resp.answer);
  if(resp.question.includes(resp.answer)) {
    //generate the cloze statement
    flashcard.question = flashcard.clozeGen();
    var flashcardJSON = JSON.stringify(flashcard);
    fs.appendFile('clozeflashcard.txt', flashcardJSON + '\n');
    //inquire about restart
    inquirer.prompt({
      type: 'confirm',
      name: 'restart',
      message: 'Would you like to make another card?',
      default: true
    }).then(function(res) {
      if (res.restart === true) {
        clozePrompt();
      }
      else {
        console.log('\n************************************************************************************************\n');
        console.log('Thanks for adding these flashcards to the database!');
        console.log('\n************************************************************************************************\n');
      }
    });
  }
  else {
        console.log('\n************************************************************************************************\n');
        console.log('Error!! Your cloze word doesn\'t appear in your statement! Try again!');
        console.log('\n************************************************************************************************\n');
        clozePrompt();
  }
  });
}