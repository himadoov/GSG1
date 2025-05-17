
/* const suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
const values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

let gameStarted = false;
let gameOver = false;
let playerWon = false;

let deck = [];
let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;

const textArea = document.getElementById('text-area');
const playerCardsDisplay = document.getElementById('player-cards');
const dealerCardsDisplay = document.getElementById('dealer-cards');
const playerScoreDisplay = document.getElementById('player-score');
const dealerScoreDisplay = document.getElementById('dealer-score');
const winnerDisplay = document.getElementById('winner');

const newGameBtn = document.getElementById('new-game');
const hitBtn = document.getElementById('hit');
const stayBtn = document.getElementById('stay');

newGameBtn.addEventListener('click', startGame);
hitBtn.addEventListener('click', playerHits);
stayBtn.addEventListener('click', playerStays);

function startGame() {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);

    playerCards = [getNextCard(), getNextCard()];
    dealerCards = [getNextCard(), getNextCard()];

    updateInterface();
    toggleButtons(false);
    textArea.innerText = 'Game started. Good luck!';
}

function createDeck() {
    const newDeck = [];
    suits.forEach(suit => {
    values.forEach(value => {
        newDeck.push({ suit, value });
    });
        });
    return newDeck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Now same as video: randomly pick index from 0 to 51
function getNextCard() {
  const index = Math.floor(Math.random() * deck.length);
    return deck[index];
}

function getCardString(card) {
    return `${card.value} of ${card.suit}`;
}

function getCardValue(card) {
    switch (card.value) {
    case 'Ace': 
		return 1;
    case 'Two': 
		return 2;
    case 'Three':
		return 3;
    case 'Four': 	
		return 4;
    case 'Five': 
		return 5;
    case 'Six': 
		return 6;
    case 'Seven': 
		return 7;
    case 'Eight': 
		return 8;
    case 'Nine': 
		return 9;
		default: 
		return 10; 	
	}
}

function getScore(cardArray) {
    let score = 0;
    let hasAce = false;

    for (let i = 0; i < cardArray.length; i++) {
    score += getCardValue(cardArray[i]);
    if (cardArray[i].value === 'Ace') {
        hasAce = true;
    }
}

    if (hasAce && score + 10 <= 21) {
    return score + 10;
    }
    return score;
}

function updateInterface() {
	playerScore = getScore(playerCards);
	dealerScore = getScore(dealerCards);

	playerCardsDisplay.innerText = playerCards.map(getCardString).join('\n');
	dealerCardsDisplay.innerText = dealerCards.map(getCardString).join('\n');

	playerScoreDisplay.innerText = `Score: ${playerScore}`;
	dealerScoreDisplay.innerText = `Score: ${dealerScore}`;
}

function toggleButtons(showNewGame) {
    newGameBtn.style.display = showNewGame ? 'inline' : 'none';
    hitBtn.style.display = showNewGame ? 'none' : 'inline';
    stayBtn.style.display = showNewGame ? 'none' : 'inline';
}

function playerHits() {
    if (!gameOver) {
    playerCards.push(getNextCard());
    updateInterface();
    if (getScore(playerCards) > 21) {
        endGame('Dealer');
		}
	}
}

function playerStays() {
    gameOver = true;

    while (getScore(dealerCards) < 17) {
    dealerCards.push(getNextCard());
    }

    updateInterface();

    const playerFinal = getScore(playerCards);
    const dealerFinal = getScore(dealerCards);

    if (playerFinal > 21) {
    endGame('Dealer');
    } else if (dealerFinal > 21 || playerFinal > dealerFinal) {
    endGame('Player');
    } else if (dealerFinal > playerFinal) {
    endGame('Dealer');
    } else {
    endGame('No one');
    }
}

function endGame(winner) {
    winnerDisplay.innerText = `${winner} Won!`;
    toggleButtons(true);
} */


	// Blackjack Game - Beginner Friendly Version (Based on Traversy Media Style)

// ==== Variables for cards ====
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

// ==== DOM Elements ====
let textArea = document.getElementById('text-area');
let playerCardsParagraph = document.getElementById('player-cards');
let dealerCardsParagraph = document.getElementById('dealer-cards');
let playerScoreParagraph = document.getElementById('player-score');
let dealerScoreParagraph = document.getElementById('dealer-score');
let newGameButton = document.getElementById('new-game');
let hitButton = document.getElementById('hit');
let stayButton = document.getElementById('stay');
let winnerText = document.getElementById('winner');

// ==== Game Variables ====
let gameStarted = false;
let gameOver = false;
let playerWon = false;

let deck = [];
let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;

// ==== Event Listeners ====
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

// ==== Functions ====
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
