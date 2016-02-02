function Card(){
  this.val = null;
  //Numerical card value
  this.operation = '';
  //Add, subtract
  this.deck = '';
  //side or main
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



var mainDeck = [];
