// 클릭 업그레이드 상태
let clickUpgradeCost = 10;

// 버튼 DOM
const clickUpgradeBtn = document.getElementById("btnClickUpgrade");
const clickPowerDisplay = document.getElementById("clickPower");
const upgradeCostDisplay = document.getElementById("upgradeCost");

// 업그레이드 버튼 이벤트
clickUpgradeBtn.addEventListener("click", () => {
  if (money >= clickUpgradeCost) {
    money -= clickUpgradeCost; // 비용 지불
    clickValue += 1;           // 클릭 수익 증가
    clickUpgradeCost *= 2;     // 비용 상승

    updateMoneyDisplay();
    updateUpgradeDisplay();
    addLog("🖱 클릭 수익이 증가했습니다!");
  } else {
    addLog("❌ 돈이 부족합니다!");
  }
});

// UI 갱신
function updateUpgradeDisplay() {
  clickPowerDisplay.textContent = clickValue;
  upgradeCostDisplay.textContent = clickUpgradeCost;
    updateTokenDisplay();
}

// 페이지 처음 로드 시 UI 표시
updateUpgradeDisplay();
