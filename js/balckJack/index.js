
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

let textArea = document.getElementById('text-area');
let playerCardsParagraph = document.getElementById('player-cards');
let dealerCardsParagraph = document.getElementById('dealer-cards');
let playerScoreParagraph = document.getElementById('player-score');
let dealerScoreParagraph = document.getElementById('dealer-score');
let newGameButton = document.getElementById('new-game');
let hitButton = document.getElementById('hit');
let stayButton = document.getElementById('stay');
let winnerText = document.getElementById('winner');

let gameStarted = false;
let gameOver = false;
let playerWon = false;

let deck = [];
let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;

newGameButton.addEventListener('click', function () {
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  playerCards = [getNextCard(), getNextCard()];
  dealerCards = [getNextCard(), getNextCard()];

  updateScores();
  showStatus();
  toggleButtons();
});

hitButton.addEventListener('click', function () {
  playerCards.push(getNextCard());
  updateScores();
  showStatus();
  checkForEnd();
});

stayButton.addEventListener('click', function () {
  gameOver = true;
  checkForEnd();
});

function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}

function getNextCard() {
  let randomIndex = Math.floor(Math.random() * deck.length);
  return deck[randomIndex];
}

function getCardString(card) {
  return card.value + ' of ' + card.suit;
}

function getCardValue(card) {
  switch (card.value) {
    case 'Ace': return 1;
    case 'Two': return 2;
    case 'Three': return 3;
    case 'Four': return 4;
    case 'Five': return 5;
    case 'Six': return 6;
    case 'Seven': return 7;
    case 'Eight': return 8;
    case 'Nine': return 9;
    default: return 10;
  }
}

function getScore(cards) {
  let score = 0;
  let hasAce = false;

  for (let i = 0; i < cards.length; i++) {
    score += getCardValue(cards[i]);
    if (cards[i].value === 'Ace') {
      hasAce = true;
    }
  }

  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }

  return score;
}

function updateScores() {
  playerScore = getScore(playerCards);
  dealerScore = getScore(dealerCards);
}

function showStatus() {
  playerCardsParagraph.innerText = playerCards.map(getCardString).join(', ');
  dealerCardsParagraph.innerText = dealerCards.map(getCardString).join(', ');

  playerScoreParagraph.innerText = 'Score: ' + playerScore;
  dealerScoreParagraph.innerText = 'Score: ' + dealerScore;
}

function toggleButtons() {
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
}

function showNewGameButton() {
  newGameButton.style.display = 'inline';
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
}

function checkForEnd() {
  updateScores();

  if (gameOver) {
    while (dealerScore < 17) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }

  if (playerScore > 21) {
    playerWon = false;
    endGame();
  } else if (dealerScore > 21) {
    playerWon = true;
    endGame();
  } else if (gameOver) {
    if (playerScore > dealerScore) {
      playerWon = true;
    } else {
      playerWon = false;
    }
    endGame();
  }
}

function endGame() {
  if (playerWon) {
    winnerText.innerText = 'You Win!';
  } else {
    winnerText.innerText = 'Dealer Wins!';
  }
  showNewGameButton();
}
