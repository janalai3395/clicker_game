const clickBtn = document.getElementById("clickBtn");

// 클릭시 돈 증가
clickBtn.addEventListener("click", () => {
    const earned = clickValue * clickMultiplier;
    money += earned;

    stats.totalClicks += 1;
    stats.totalEarned += earned;

    updateMoneyDisplay();
    updateStatsDisplay();
});


