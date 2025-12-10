// 자동 수익 총합
let autoIncome = 0;

// 업그레이드 정의
const autoUpgrades = {
  room: { name:"원룸", baseCost:100, cost:100, income:1, count:0 },
  office: { name:"오피스", baseCost:1000, cost:1000, income:5, count:0 },
  mall: { name:"쇼핑센터", baseCost:5000, cost:5000, income:20, count:0 },
  corp: { name:"대기업", baseCost:10000, cost:10000, income:50, count:0 }
};

// 구매 함수
function buyUpgrade(type) {
  const up = autoUpgrades[type];

  if (money >= up.cost) {
    money -= up.cost;
    up.count++;
    autoIncome += up.income;

    up.cost = Math.floor(up.cost * 1.7);

    updateMoneyDisplay();
    updateAutoIncomeDisplay();
    updateStatsDisplay();
    addLog(`🏦 ${up.name}을(를) 구매했습니다! 자동 수익 +${up.income}/초`);
  } else {
    addLog("❌ 돈이 부족합니다!");
  }
}

// UI 갱신
function updateAutoIncomeDisplay() {
  Object.keys(autoUpgrades).forEach(key => {
    const up = autoUpgrades[key];
    document.getElementById("cost_" + key).textContent = up.cost;
    document.getElementById("count_" + key).textContent = up.count;
  });
}

updateAutoIncomeDisplay();

// 1초마다 자동 수익 지급
setInterval(() => {
  if (autoIncome > 0) {
    money += autoIncome;
    stats.autoIncomeEarned += autoIncome;
    stats.totalEarned += autoIncome;
    updateMoneyDisplay();
    updateStatsDisplay();
  }
}, 1000);
