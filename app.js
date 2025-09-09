const gameContainer = document.getElementById("game-container");
const timerElement = document.getElementById("timer");
const movesElement = document.getElementById("moves");
const restartBtn = document.getElementById("restart-btn");

let cards = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍉", "🍉",
             "🍓", "🍓", "🥝", "🥝", "🍒", "🍒", "🍍", "🍍"];
let flippedCards = [];
let moves = 0;
let matched = 0;
let time = 0;
let timer;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startGame() {
    gameContainer.innerHTML = "";
    cards = shuffle(cards);
    flippedCards = [];
    moves = 0;
    matched = 0;
    time = 0;
    movesElement.textContent = `Actions: ${moves}`;
    timerElement.textContent = `Time: ${time} second`;

    clearInterval(timer);
    timer = setInterval(() => {
        time++;
        timerElement.textContent = `Time: ${time} second`;
    }, 1000);

    cards.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.addEventListener("click", flipCard);
        gameContainer.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains("flipped")) return;

    this.classList.add("flipped");
    this.textContent = this.dataset.emoji;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        movesElement.textContent = `Actions: ${moves}`;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        matched += 2;
        flippedCards = [];
        if (matched === cards.length) {
            clearInterval(timer);
            setTimeout(() => alert(`Congratulations! You have finished the game.\nTime: ${time} seconds\nMovements: ${moves}`), 300);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.textContent = "";
            card2.textContent = "";
            flippedCards = [];
        }, 1000);
    }
}

restartBtn.addEventListener("click", startGame);

startGame();