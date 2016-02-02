function Card(){
  this.val = null;
  //Numerical card value
  this.operation = '';
  //Add, subtract
  this.deck = '';
  //side or main
};

function randomInt(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
};

function makeMainDeck(){
  for (var j = 0; j < 4; j++){
    for(var i = 1; i < 11; i++){
      var newCard = new Card();
      newCard.val = i;
      newCard.operation = '+';
      newCard.deck = 'main';
      mainDeck.push(newCard);
    }
  }
};

function makeSideDeck(){
  for (var j = 0; j < 2; j++){
    console.log(j);
    for (var i = 0; i < 10; i++){
      var cardValueRandom = randomInt(1, 7);
      var newCard = new Card();
      newCard.val = cardValueRandom;
      newCard.operation = '+';
      newCard.deck = 'side';
      sideDecks[j].push(newCard);
    }
  }
};

function dealHands(){
  
};

var hands = [[],[]];
var sideDecks = [[],[]];
var mainDeck = [];
