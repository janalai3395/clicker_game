// 🎯 통계 데이터
const stats = {
  totalClicks: 0,
  totalEarned: 0,
  autoIncomeEarned: 0,
};

// 통계 UI 요소
const statClicks = document.getElementById("stat_clicks");
const statTotalEarned = document.getElementById("stat_totalEarned");
const statAutoIncomeEarned = document.getElementById("stat_autoIncomeEarned");

// UI 업데이트 함수
function updateStatsDisplay() {
  statClicks.textContent = stats.totalClicks.toLocaleString();
  statTotalEarned.textContent = stats.totalEarned.toLocaleString();
  statAutoIncomeEarned.textContent = stats.autoIncomeEarned.toLocaleString();
}
