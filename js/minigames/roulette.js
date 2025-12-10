let tokens = 0;

const slot1 = document.getElementById("slot1");
const slot2 = document.getElementById("slot2");
const slot3 = document.getElementById("slot3");
const resultText = document.getElementById("rouletteResult");
const spinButton = document.getElementById("spinButton");

function openRoulette() {
  if (money < 1000) {
    addLog("❌ 돈이 부족해서 슬롯을 시작할 수 없습니다 (1000원 필요)");
    return;
  }

  money -= 1000;
  updateMoneyDisplay();
  addLog("🎰 슬롯 시작 - 입장료 1000원 차감!");

  document.getElementById("rouletteArea").classList.remove("hidden");
  document.getElementById("btnOpenRoulette").style.display = "none";
}

// 난수 (0~9)
function randomSlotNumber() {
  return Math.floor(Math.random() * 10);
}

// SPIN
spinButton.addEventListener("click", () => {
  spinButton.disabled = true;
  resultText.textContent = "돌리는 중...";

  let r1 = randomSlotNumber();
  let r2 = randomSlotNumber();
  let r3 = randomSlotNumber();

  // 애니메이션 효과 (0.1초 간격으로 숫자 변환)
  let count = 0;
  const spinInterval = setInterval(() => {
    slot1.textContent = randomSlotNumber();
    slot2.textContent = randomSlotNumber();
    slot3.textContent = randomSlotNumber();

    count++;
    if (count >= 10) { // 1초 후 멈춤
      clearInterval(spinInterval);

      slot1.textContent = r1;
      slot2.textContent = r2;
      slot3.textContent = r3;

      checkResult(r1, r2, r3);

      spinButton.disabled = false;
    }
  }, 100);
});

// 결과 처리
function checkResult(a, b, c) {

  if (a === 7 && b === 7 && c === 7) {
    tokens += 30;
    resultText.textContent = "🎉 JACKPOT!!! (+30 TOKEN)";
  }
  else if (a === b && b === c) {
    tokens += 10;
    resultText.textContent = "🔥 3개 일치! (+10 TOKEN)";
  }
  else if (a === b || b === c || a === c) {
    tokens += 4;
    resultText.textContent = "✨ 2개 일치! (+4 TOKEN)";
  }
  else {
    resultText.textContent = "❌ 실패!";
  }

  updateTokenDisplay();
  updateStatsDisplay();
}
