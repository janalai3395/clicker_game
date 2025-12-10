// =======================
// 토큰 업그레이드 시스템 
// =======================

const tokenUpgrades = {
  master: {
    name: "경제 마스터",
    level: 0,
    cost: 20,    // 시작 비용
    effect: "autoIncome"
  },
  booster: {
    name: "클릭 부스터",
    level: 0,
    cost: 15, 
    effect: "clickPower"
  }
};

// 구매
function buyTokenUpgrade(type) {
  const up = tokenUpgrades[type];

  if (!useTokens(up.cost)) return;

  up.level++;
  applyTokenUpgradeEffect(up.effect, up.level);

  // 비용 크게 증가
  up.cost = Math.floor(up.cost * 2 + up.level * 10);

  addLog(`✨ ${up.name} LV${up.level} 업그레이드! (다음 비용: ${up.cost} 토큰)`);

  updateTokenUpgradeDisplay();
}


// 효과 반영
function applyTokenUpgradeEffect(effect, level) {
  if (effect === "autoIncome") {
    autoIncomeMultiplier = 1.5 ** level; // 자동 수익 1.5배씩
  }
  if (effect === "clickPower") {
    clickMultiplier = 2 ** level; // 클릭 수익 2배씩
  }

  updateMoneyDisplay();
}

// UI 갱신
function updateTokenUpgradeDisplay() {
  const levelMasterSpan = document.getElementById("level_master");
  const levelBoosterSpan = document.getElementById("level_booster");
  const costMasterSpan = document.getElementById("tokenCost_master");
  const costBoosterSpan = document.getElementById("tokenCost_booster");
  const masterBtn = document.getElementById("btnMasterUpgrade");
  const boosterBtn = document.getElementById("btnBoosterUpgrade");

  if (levelMasterSpan) levelMasterSpan.textContent = tokenUpgrades.master.level;
  if (levelBoosterSpan) levelBoosterSpan.textContent = tokenUpgrades.booster.level;

  if (costMasterSpan) costMasterSpan.textContent = tokenUpgrades.master.cost.toLocaleString();
  if (costBoosterSpan) costBoosterSpan.textContent = tokenUpgrades.booster.cost.toLocaleString();

  if (masterBtn) masterBtn.textContent = "업그레이드";
  if (boosterBtn) boosterBtn.textContent = "업그레이드";
}

updateTokenUpgradeDisplay();