// 블랙잭 미니게임
let playerCards = [];
let dealerCards = [];

const playerDisplay = document.getElementById("playerCards");
const dealerDisplay = document.getElementById("dealerCards");
const resultDisplay = document.getElementById("bjResult");

// 블랙잭 열기
function openBlackjack() {
  if (money < 1000) {
    addLog("❌ 돈이 부족해서 블랙잭을 시작할 수 없습니다 (1000원 필요)");
    return;
  }

  money -= 1000;
  updateMoneyDisplay();
  addLog("🃏 블랙잭 시작 - 입장료 1000원 차감!");

  document.getElementById("blackjackArea").classList.remove("hidden");
  document.getElementById("btnOpenBlackjack").style.display = "none"; // 버튼 숨기기

  startBlackjack();
}



// 카드 뽑기 (1~11 랜덤)
function drawCard() {
  return Math.floor(Math.random() * 11) + 1;
}

// 합계 계산
function calcTotal(cards) {
  return cards.reduce((a, b) => a + b, 0);
}

// 시작
function startBlackjack() {
  playerCards = [drawCard(), drawCard()];
  dealerCards = [drawCard()];

  updateDisplay();
  resultDisplay.textContent = "게임 중...";
}

// UI 업데이트
function updateDisplay() {
  playerDisplay.textContent = playerCards.join(", ") + " (" + calcTotal(playerCards) + ")";
  dealerDisplay.textContent = dealerCards.join(", ") + " (" + calcTotal(dealerCards) + ")";
}

// Hit
document.getElementById("btnHit").addEventListener("click", () => {
  playerCards.push(drawCard());
  updateDisplay();

  if (calcTotal(playerCards) > 21) {
    resultDisplay.textContent = "❌ 21 초과! 패배";
    stats.minigameLosses += 1;
    updateStatsDisplay();
  }
});

// Stand
document.getElementById("btnStand").addEventListener("click", () => {
  while (calcTotal(dealerCards) < 17) {
    dealerCards.push(drawCard());
  }

  updateDisplay();

  const playerTotal = calcTotal(playerCards);
  const dealerTotal = calcTotal(dealerCards);

  if (dealerTotal > 21 || playerTotal > dealerTotal) {
    resultDisplay.textContent = "🎉 승리!";
    stats.minigameWins += 1;
    updateStatsDisplay();

  } else if (playerTotal < dealerTotal) {
    resultDisplay.textContent = "❌ 패배!";
    stats.minigameLosses += 1;
    updateStatsDisplay();

  } else {
    resultDisplay.textContent = "🤝 무승부!";
  }
});

// Restart
document.getElementById("btnRestart").addEventListener("click", () => {
  startBlackjack();
  document.getElementById("btnOpenBlackjack").style.display = "none"; // 재시작 때도 숨김 계속 유지
});

