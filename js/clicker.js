const clickBtn = document.getElementById("clickBtn");

// 클릭시 돈 증가
clickBtn.addEventListener("click", () => {
  money += clickValue;
  stats.totalClicks += 1;
  stats.totalEarned += clickValue;

  updateMoneyDisplay();
  updateStatsDisplay();
  //addLog(`+${clickValue}원 벌었습니다!`);
});

