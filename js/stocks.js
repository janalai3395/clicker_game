// 📈 주식 데이터
const stocks = {
  ktech: { price: 120, element: document.getElementById("price_ktech"), lastPrice: 120 },
  kbuild: { price: 80, element: document.getElementById("price_kbuild"), lastPrice: 80 },
  kbio: { price: 150, element: document.getElementById("price_kbio"), lastPrice: 150 },
};
// 📦 보유 주식 데이터
const holdings = {
  ktech: { amount: 0, average: 0 },
  kbuild: { amount: 0, average: 0 },
  kbio: { amount: 0, average: 0 }
};

function buyStock(type) {
  const amount = parseInt(document.getElementById("stockAmount").value);
  const cost = stocks[type].price * amount;

  if (money < cost) {
    addLog("❌ 돈이 부족해서 매수 실패!");
    return;
  }

  money -= cost;
    stats.stockBuy += cost;
    updateStatsDisplay();
  // 평균단가 계산
  const prevAmount = holdings[type].amount;
  const prevAvg = holdings[type].average;

  holdings[type].amount += amount;
  holdings[type].average =
    Math.floor((prevAvg * prevAmount + cost) / holdings[type].amount);

  addLog(`📈 ${type.toUpperCase()} ${amount}주 매수 (평단가 ${holdings[type].average}원)`);

  updateMoneyDisplay();
  updateStockHoldingsDisplay();
}

function sellStock(type) {
  const amount = parseInt(document.getElementById("stockAmount").value);

  if (holdings[type].amount < amount) {
    addLog("❌ 보유 수량 부족!");
    return;
  }

  const revenue = stocks[type].price * amount;
  holdings[type].amount -= amount;
  money += revenue;
  stats.stockSell += revenue;
    stats.stockProfit += (revenue - (holdings[type].average * amount));
    updateStatsDisplay();

  if (holdings[type].amount === 0) {
    holdings[type].average = 0;
  }

  addLog(`📉 ${type.toUpperCase()} ${amount}주 매도 (+${revenue}원)`);

  updateMoneyDisplay();
  updateStockHoldingsDisplay();
}

function updateStockHoldingsDisplay() {
  let text = "📊 보유 주식:<br>";

  Object.keys(holdings).forEach(key => {
    const h = holdings[key];
    const current = stocks[key].price;

    if (h.amount > 0) {
      const profitRate = (((current - h.average) / h.average) * 100).toFixed(1);
      const profitColor = profitRate > 0 ? "green" : profitRate < 0 ? "red" : "black";

      text += `${key.toUpperCase()} | ${h.amount}주 | 평단가: ${h.average} | 현재가: ${current} | 
      <span style="color:${profitColor}">${profitRate}%</span><br>`;
    } else {
      text += `${key.toUpperCase()} | 0주<br>`;
    }
  });

  document.getElementById("stockHoldings").innerHTML = text;
}


// 📉 가격 변동 함수
function updateStockPrices() {
  Object.keys(stocks).forEach(key => {
    let stock = stocks[key];

    // 직전가격 저장
    stock.lastPrice = stock.price;

    // 변동 방향 (50% 확률)
    let direction = Math.random() < 0.5 ? -1 : 1;

    // 변동폭 — -40% ~ +60% (더 큰 변동)
    let changeRate = direction * (10 + Math.random() * 50);  
    // ↓ 10~60% 중 랜덤 (더 폭발적인 흐름)

    // 새로운 가격 계산
    let newPrice = Math.floor(stock.price * (1 + changeRate / 100));

    // 바닥 방지 — 최소 5원 유지
    if (newPrice < 5) newPrice = Math.floor(5 + Math.random() * 10); 
    // → 최소 5~15원 사이에서 다시 회복 가능

    stock.price = newPrice;

    // UI 업데이트
    stock.element.textContent = stock.price.toLocaleString();

    // 색상 변경
    if (stock.price > stock.lastPrice) {
      stock.element.style.color = "green";
    } else if (stock.price < stock.lastPrice) {
      stock.element.style.color = "red";
    } else {
      stock.element.style.color = "black";
    }
  });
}


// 1초마다 가격 변경
setInterval(updateStockPrices, 1000);
updateStockPrices(); // 처음 1회 즉시 실행
