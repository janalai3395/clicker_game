// --------------------- 블랙잭 설정 -------------------------
let deck = [];
let playerCards = [];
let dealerCards = [];
let gameOver = false;

// HTML 요소
const playerDisplay = document.getElementById("playerCards");
const dealerDisplay = document.getElementById("dealerCards");
// 🔥 HTML에서 결과 span id 가 'bjResult' 라고 가정
const resultDisplay = document.getElementById("bjResult");

// --------------------- 카드 생성 --------------------------
function createDeck() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  deck = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < 4; j++) { // 4벌 (♠ ♥ ♦ ♣)
      deck.push(numbers[i]);
    }
  }
}

// 카드를 한 장 뽑음
function drawCard() {
  return deck.splice(Math.floor(Math.random() * deck.length), 1)[0];
}

// 총합 계산
function calcTotal(cards) {
  return cards.reduce((a, b) => a + b, 0);
}

// 화면 업데이트
function updateDisplay() {
  if (!playerDisplay || !dealerDisplay) return;

  playerDisplay.textContent =
    `플레이어: ${playerCards.join(", ")} (총 ${calcTotal(playerCards)})`;
  dealerDisplay.textContent =
    `딜러: ${dealerCards.join(", ")} (총 ${calcTotal(dealerCards)})`;
}

// --------------------- 게임 종료 처리 -------------------------
function endGame() {
  const hitBtn = document.getElementById("btnHit");
  const standBtn = document.getElementById("btnStand");

  if (hitBtn) hitBtn.disabled = true;
  if (standBtn) standBtn.disabled = true;
  gameOver = true;
}

// --------------------- 게임 시작 -------------------------
function startBlackjack() {
  createDeck();
  gameOver = false;

  const hitBtn = document.getElementById("btnHit");
  const standBtn = document.getElementById("btnStand");

  if (hitBtn) hitBtn.disabled = false;
  if (standBtn) standBtn.disabled = false;

  playerCards = [drawCard(), drawCard()];
  dealerCards = [drawCard()];

  if (resultDisplay) resultDisplay.textContent = "";
  updateDisplay();
}

// 🔥 HTML에서 onclick="openBlackjack()" 을 쓰고 있으므로 이 함수가 필요함
function openBlackjack() {
  if (money < 1000) {
    addLog("❌ 블랙잭 입장료가 부족합니다! (1000원 필요)");
    return;
  }

  money -= 1000;
  updateMoneyDisplay();
  addLog("🃏 블랙잭 입장! 1000원 차감!");

  const area = document.getElementById("blackjackArea");
  const openBtn = document.getElementById("btnOpenBlackjack");

  if (area) area.classList.remove("hidden");
  if (openBtn) openBtn.style.display = "none";

  startBlackjack();
}

// ---------------------- HIT --------------------------
document.getElementById("btnHit")?.addEventListener("click", () => {
  if (gameOver) return;

  playerCards.push(drawCard());
  updateDisplay();

  if (calcTotal(playerCards) > 21) {
    if (resultDisplay) resultDisplay.textContent = "💣 21 초과! 패배!";
    stats.minigameLosses += 1;
    updateStatsDisplay();
    endGame();
  }
});

// ---------------------- STAND --------------------------
document.getElementById("btnStand")?.addEventListener("click", () => {
  if (gameOver) return;

  while (calcTotal(dealerCards) < 17) {
    dealerCards.push(drawCard());
  }

  updateDisplay();

  const playerTotal = calcTotal(playerCards);
  const dealerTotal = calcTotal(dealerCards);

  if (dealerTotal > 21 || playerTotal > dealerTotal) {
    if (resultDisplay) resultDisplay.textContent = "🎉 승리! 토큰 +3";
    stats.minigameWins += 1;
    updateStatsDisplay();
    addTokens(3); // 승리 보상
  } else if (playerTotal < dealerTotal) {
    if (resultDisplay) resultDisplay.textContent = "❌ 패배!";
    stats.minigameLosses += 1;
    updateStatsDisplay();
  } else {
    if (resultDisplay) resultDisplay.textContent = "🤝 무승부!";
  }

  endGame();
});

// ---------------------- 다시 시작 --------------------------
document.getElementById("btnRestart")?.addEventListener("click", () => {
  const hitBtn = document.getElementById("btnHit");
  const standBtn = document.getElementById("btnStand");

  if (hitBtn) hitBtn.disabled = false;
  if (standBtn) standBtn.disabled = false;

  startBlackjack();
});
