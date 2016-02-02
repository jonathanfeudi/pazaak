function Card(){
  this.val = null;
  //Numerical card value
  this.operation = '';
  //Add, subtract
  this.deck = '';
  //side or main
};

function addScores(x, y){
  return x + y;
}
//http://stackoverflow.com/questions/1230233/how-to-find-the-sum-of-an-array-of-numbers

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
  for (var j = 0; j < 2; j++){
    for (var i = 0; i < 4; i++){
      var x = randomInt(0,10);
      hands[j].push(sideDecks[j][x]);
    }
  }
};

var player = {
  playCard: function(card){
    var x = game.whosTurn;
    inPlay[x].push(hands[x][card]);
    hands[x].splice(card, 1);
  },
  endTurn: function(){
    if (game.whosTurn === 0){
      game.whosTurn = 1;
    } else {
      game.whosTurn = 0;
    }
  },
  cardScore: function(){
    var x = game.whosTurn;
    for (var i = 0; i < inPlay[x].length; i++){
      player.cardArray[x].push(inPlay[x][i].val);
    }
    var total = player.cardArray[x].reduce(addScores, 0);
    player.scoreArray[x].push(total);
  },
  cardArray: [[],[]],
  scoreArray: [[],[]],
};

var game = {
  whosTurn: null,
  start: function(){
    makeMainDeck();
    makeSideDeck();
    dealHands();
    var x = randomInt(0, 2);
    game.whosTurn = x;
  },
  flop: function(){
    var w = game.whosTurn;
    var y = randomInt(0,40);
    inPlay[w].push(mainDeck[y]);
    mainDeck.splice(y, 1);
  }
};

var inPlay = [[],[]]
var hands = [[],[]];
var sideDecks = [[],[]];
var mainDeck = [];
