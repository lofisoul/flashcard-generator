function basicCard(question, answer) {
  this.question = question;
  this.answer = answer;
}

basicCard.prototype.printInfo = function() {
  console.log('Question: ' + this.question + '\nAnswer: ' + this.answer + '\nThis question has been added!');
}

module.exports = basicCard
