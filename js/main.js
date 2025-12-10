// 전역 게임 상태
let money = 500;
let clickValue = 1;
let highestMoney = 0;
let tokens = 0;
let clickMultiplier = 1;
let autoIncomeMultiplier = 1;


// DOM elements
const moneyDisplay = document.getElementById("money");
const logBox = document.getElementById("logBox");

// UI 갱신
function updateMoneyDisplay() {
  moneyDisplay.textContent = money.toLocaleString();

  if (money > highestMoney) {
    highestMoney = money;
  }

  updateRankDisplay();
}
// 토큰 추가
function addTokens(amount) {
  tokens += amount;
  updateTokenDisplay();
}

function useTokens(amount) {
  if (tokens >= amount) {
    tokens -= amount;
    updateTokenDisplay();
    return true;
  }
  addLog("❌ 토큰이 부족합니다");
  return false;
}

// 등급 갱신
function updateRankDisplay() {
  const rankDisplay = document.getElementById("rankDisplay");

  if (highestMoney >= 10000000) rankDisplay.textContent = "⭐ 전설의 재벌";
  else if (highestMoney >= 1000000) rankDisplay.textContent = "🌍 글로벌 독점기업";
  else if (highestMoney >= 100000) rankDisplay.textContent = "🏦 전국 재벌";
  else if (highestMoney >= 10000) rankDisplay.textContent = "🏢 지역 재벌";
  else if (highestMoney >= 1000) rankDisplay.textContent = "💼 소상공";
  else rankDisplay.textContent = "🧑‍💼 신입 창업가";
}
// 토큰 UI 갱신
function updateTokenDisplay() {
  const tokenDisplay = document.getElementById("tokenDisplay");
  if (tokenDisplay) tokenDisplay.textContent = tokens.toLocaleString();

  const tokenDisplayRoulette = document.getElementById("tokenDisplayRoulette");
  if (tokenDisplayRoulette) tokenDisplayRoulette.textContent = tokens.toLocaleString();
}



// 로그 출력
function addLog(message) {
  const p = document.createElement("p");
  p.textContent = message;
  logBox.appendChild(p);

  // 로그 10개 제한
  const logs = logBox.querySelectorAll("p");
  if (logs.length > 10) {
    logs[0].remove(); // 가장 오래된 로그 삭제
  }

  logBox.scrollTop = logBox.scrollHeight;
}

