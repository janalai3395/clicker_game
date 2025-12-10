// 📈 주식 데이터
const stocks = {
  ktech: { price: 120, element: document.getElementById("price_ktech"), lastPrice: 120 },
  kbuild: { price: 80, element: document.getElementById("price_kbuild"), lastPrice: 80 },
  kbio: { price: 150, element: document.getElementById("price_kbio"), lastPrice: 150 },
};

// 📉 가격 변동 함수
function updateStockPrices() {
  Object.keys(stocks).forEach(key => {
    let stock = stocks[key];

    stock.lastPrice = stock.price; // 직전가격 저장
    let changeRate = (Math.random() * 40 - 15); // -15% ~ +25%
    
    stock.price = Math.max(1, Math.floor(stock.price * (1 + changeRate / 100)));

    // UI 업데이트
    stock.element.textContent = stock.price.toLocaleString();

    // 가격 색상 설정
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
