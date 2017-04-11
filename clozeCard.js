function clozeCard(question, cloze) {
  this.question = question;
  this.cloze = cloze;
}

clozeCard.prototype.printInfo = function() {
  console.log('Question: ' + this.question + '\nCloze: ' + this.clozeGen() + '\nThis question has been added!');
  return this.cloze;
}

clozeCard.prototype.clozeGen = function() {
  //if string was george washington is the first president of the united starters
  //would return .. was the first president of the united states
  var str = this.question;
  var cloze = this.cloze;
  var partialStr = str.replace(cloze, '...');
  this.question = partialStr;
  return this.question;
}

module.exports = clozeCard;
