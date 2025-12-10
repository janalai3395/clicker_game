// 🎯 플레이어 통계 데이터
const stats = {
  // 기본 게임
  totalClicks: 0,
  totalEarned: 0,
  autoIncomeEarned: 0,

  // 주식 투자
  stockBuy: 0,
  stockSell: 0,
  stockProfit: 0,  // 실현 손익

  // 미니게임
  minigameWins: 0,
  minigameLosses: 0,
};

// 📌 통계 UI 요소
const statClicks = document.getElementById("stat_clicks");
const statTotalEarned = document.getElementById("stat_totalEarned");
const statAutoIncomeEarned = document.getElementById("stat_autoIncomeEarned");
const statStockBuy = document.getElementById("stat_stockBuy");
const statStockSell = document.getElementById("stat_stockSell");
const statStockProfit = document.getElementById("stat_stockProfit");
const statMiniWin = document.getElementById("stat_minigameWin");
const statMiniLose = document.getElementById("stat_minigameLose");

// 📌 UI 업데이트 함수
function updateStatsDisplay() {
  statClicks.textContent = stats.totalClicks.toLocaleString();
  statTotalEarned.textContent = stats.totalEarned.toLocaleString();
  statAutoIncomeEarned.textContent = stats.autoIncomeEarned.toLocaleString();

  statStockBuy.textContent = stats.stockBuy.toLocaleString();
  statStockSell.textContent = stats.stockSell.toLocaleString();
  statStockProfit.textContent = stats.stockProfit.toLocaleString();

  statMiniWin.textContent = stats.minigameWins.toLocaleString();
  statMiniLose.textContent = stats.minigameLosses.toLocaleString();
}
