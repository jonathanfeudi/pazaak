
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

function clearMainDeck(){
  for (var i = 0; i < mainDeck.length; i++){
    mainDeck.splice(0, mainDeck.length);
  }
};

function makeSideDeck(){
  for (var j = 0; j < 2; j++){
    for (var i = 0; i < 10; i++){
      var cardValueRandom = randomInt(1, 7);
      var oneOfTwo = randomInt(0, 2);
      var newCard = new Card();
      newCard.val = cardValueRandom;
      if (oneOfTwo === 0){
        newCard.operation = '+';
      } else {
        newCard.operation = '-';
        newCard.val *= -1;
      }
      newCard.deck = 'side';
      sideDecks[j].push(newCard);
    }
  }
};

function clearSideDecks(){
  for (var i = 0; i < sideDecks[0].length; i++){
    sideDecks[0].splice(0, sideDecks[0].length);
  }
  for (var i = 0; i < sideDecks[1].length; i++){
    sideDecks[1].splice(0, sideDecks[1].length);
  }
};

function dealHands(){
  for (var j = 0; j < 2; j++){
    for (var i = 1; i < 5; i++){
      var y = sideDecks[j].length;
      var x = randomInt(0,y);
      hands[j].push(sideDecks[j][x]);
      sideDecks[j].splice(x, 1);
    }
  }
  displayHands();
};

function displayHands(){
  var j = 1;
  for (var i = 0; i < 4; i++){
    $("#p1hand" + j).text(hands[0][i].operation + hands[0][i].val);
    $("#p2hand" + j).text(hands[1][i].operation + hands[1][i].val);
    j++;
  }
};

function clearHands(){
  for (var i = 0; i < hands[0].length; i++){
    hands[0].splice(0, hands[0].length);
  }
  for (var j = 0; j < hands[1].length; j++){
    hands[1].splice(0, hands[1].length);
  }
}

function clearHTML(){
  $("#p1cS").text("");
  $("#p1card1").text("");
  $("#p1card2").text("");
  $("#p1card3").text("");
  $("#p1card4").text("");
  $("#p1card5").text("");
  $("#p1card6").text("");
  $("#p1card7").text("");
  $("#p1card8").text("");
  $("#p1card9").text("");
  $("#p2cS").text("");
  $("#p2card1").text("");
  $("#p2card2").text("");
  $("#p2card3").text("");
  $("#p2card4").text("");
  $("#p2card5").text("");
  $("#p2card6").text("");
  $("#p2card7").text("");
  $("#p2card8").text("");
  $("#p2card9").text("");
  $("#p1hand1").text("");
  $("#p1hand2").text("");
  $("#p1hand3").text("");
  $("#p1hand4").text("");
  $("#p2hand1").text("");
  $("#p2hand2").text("");
  $("#p2hand3").text("");
  $("#p2hand4").text("");
}

var player = {
  onCell: [0,0],
  standing: [[false],[false]],
  stand: function(){
    var x = game.whosTurn;
    player.standing[x][0] = true;
    if (game.whosTurn === 0){
      game.whosTurn = 1;
    } else {
      game.whosTurn = 0;
    }
    if ((player.standing[0][0] === true) && (player.standing[1][0] === true)){
      game.checkWin();
      return;
    }
    player.startTurn();
  },
  playCard: function(card){
    var x = game.whosTurn;
    var playerId = game.whosTurn + 1;
    var lastInPlay = inPlay[x].length - 1;
    inPlay[x].push(hands[x][card]);
    var lastInPlay = inPlay[x].length - 1;
    player.onCell[x]++;
    $("#p" + playerId + "card" + player.onCell[game.whosTurn]).text(inPlay[game.whosTurn][lastInPlay].operation + inPlay[game.whosTurn][lastInPlay].val);
    hands[x].splice(card, 1);
    player.cardScore();
  },
  startTurn: function(){
    var x = game.whosTurn;
    if ((player.standing[0][0]) && (player.standing[1][0])){
      game.checkWin();
      return;
    }
    if (player.standing[x][0] === false){
      game.flop();
    } else {
      player.endTurn();
    }
  },
  endTurn: function(){
    var x = game.whosTurn;
    if (player.scoreArray[x][0] > 20){
      game.checkWin();
      return;
    }
    if (player.scoreArray[x][0] == 20){
      player.stand();
      return;
    }
    if (game.whosTurn === 0){
      game.whosTurn = 1;
    } else {
      game.whosTurn = 0;
    }
    player.startTurn();
  },
  cardScore: function(){
    var x = game.whosTurn;
    var playerId = game.whosTurn + 1;
    var cardCount = player.cardArray[x].length;
    if (cardCount > 0){
      player.cardArray[x].splice(0, cardCount);
    }
    if (player.scoreArray[x].length > 0){
      player.scoreArray[x].splice(0, 1);
    }
    for (var i = 0; i < inPlay[x].length; i++){
      player.cardArray[x].push(inPlay[x][i].val);
    }
    var total = player.cardArray[x].reduce(addScores, 0);
    player.scoreArray[x].push(total);
    $("#p" + playerId + "cS").text(player.scoreArray[x][0]);
  },
  cardArray: [[],[]],
  scoreArray: [[0],[0]],
};

var game = {
  whosTurn: null,
  wins: [[0],[0]],
  start: function(){
    var x = randomInt(0, 2);
    game.whosTurn = x;
    makeMainDeck();
    makeSideDeck();
    dealHands();
    game.flop();
  },
  roundStart: function(){
    clearHTML();
    player.onCell = [0,0];
    var x = randomInt(0, 2);
    game.whosTurn = x;
    makeMainDeck();
    game.flop();
  },
  flop: function(){
    var w = game.whosTurn;
    var dl = mainDeck.length;
    var y = randomInt(0,dl);
    var cellNo = player.onCell[w];
    var playerId = game.whosTurn + 1;
    player.onCell[w]++;
    inPlay[w].push(mainDeck[y]);
    console.log(mainDeck[y]);
    var lastInPlay = inPlay[w].length - 1;
    $("#p" + playerId + "card" + player.onCell[game.whosTurn]).text(inPlay[game.whosTurn][lastInPlay].operation + inPlay[game.whosTurn][lastInPlay].val);
    mainDeck.splice(y, 1);
    player.cardScore();
  },
  checkWin: function(){
    if (((player.scoreArray[0][0] > player.scoreArray[1][0]) && !(player.scoreArray[0][0] > 20)) || (!(player.scoreArray[0][0] > 20) && (player.scoreArray[1][0] > 20))){
      console.log('Player 1 Wins');
      game.wins[0][0] += 1;
      $("#p1rS").text(game.wins[0][0]);
      game.clearRound();
    } else if (((player.scoreArray[1][0] > player.scoreArray[0][0]) && !(player.scoreArray[1][0] > 20)) || (!(player.scoreArray[1][0] > 20) && (player.scoreArray[0][0] > 20))){
      console.log('Player 2 Wins');
      game.wins[1][0] += 1;
      $("#p1rS").text(game.wins[1][0]);
      game.clearRound();
    }
  },
  clearRound: function(){
    player.scoreArray[0][0] = 0;
    player.scoreArray[1][0] = 0;
    for (var i = 0; i < player.cardArray[0].length; i++){
      player.cardArray[0].splice(0, player.cardArray[0].length);
    }
    for (var j = 0; j < player.cardArray[1].length; j++){
      player.cardArray[1].splice(0, player.cardArray[1].length);
    }
    for (var h = 0; h < inPlay[0].length; h++){
      inPlay[0].splice(0, inPlay[0].length);
    }
    for (var k = 0; k < inPlay[1].length; k++){
      inPlay[1].splice(0, inPlay[1].length);
    }
    clearMainDeck();
    clearSideDecks();
    player.standing[0][0] = false;
    player.standing[1][0] = false;
    game.gameOver();
  },
  gameOver: function(){
    if ((game.wins[0][0] == 3) || (game.wins[1][0] == 3)){
      console.log('Game over.')
      return;
    }
    if ((game.wins[0][0] < 3) && (game.wins[1][0] < 3)){
      game.roundStart();
    }
  },
};

var inPlay = [[],[]]
var hands = [[],[]];
var sideDecks = [[],[]];
var mainDeck = [];
