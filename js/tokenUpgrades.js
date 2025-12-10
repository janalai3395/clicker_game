// 토큰 업그레이드 설정
const tokenUpgrades = {
  master: { name:"경제 마스터", cost:20, effect:"auto2x", purchased:false },
  booster: { name:"클릭 부스터", cost:15, effect:"click3x", purchased:false }
};

// 업그레이드 구매 함수
function buyTokenUpgrade(type) {
  const up = tokenUpgrades[type];

  if (tokens < up.cost) {
    addLog("❌ 토큰이 부족합니다!");
    return;
  }
  if (up.purchased) {
    addLog("이미 구매한 업그레이드입니다!");
    return;
  }

  tokens -= up.cost;
  up.purchased = true;
  updateTokenDisplay();
  applyTokenUpgradeEffect(up.effect);

  addLog(`🎉 ${up.name} 업그레이드가 적용되었습니다!`);
  updateTokenUpgradeDisplay();
}

// 효과 적용
function applyTokenUpgradeEffect(effect) {
  if (effect === "auto2x") {
    autoIncome = autoIncome * 2;
  }
  if (effect === "click3x") {
    clickValue = clickValue * 3;
  }
}

// UI 갱신
function updateTokenUpgradeDisplay() {
  const masterBtn = document.querySelector("button[onclick=\"buyTokenUpgrade('master')\"]");
  const boosterBtn = document.querySelector("button[onclick=\"buyTokenUpgrade('booster')\"]");

  if (tokenUpgrades.master.purchased) masterBtn.classList.add("disabled");
  if (tokenUpgrades.booster.purchased) boosterBtn.classList.add("disabled");
}


// 시작 UI 업데이트
updateTokenUpgradeDisplay();
