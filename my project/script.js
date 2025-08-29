const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Add Transaction
function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  text.value = "";
  amount.value = "";

  init();
}

// Remove Transaction
function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  init();
}

// Update DOM
function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const inc = amounts.filter(item => item > 0)
                     .reduce((acc, item) => acc + item, 0).toFixed(2);
  const exp = (amounts.filter(item => item < 0)
                      .reduce((acc, item) => acc + item, 0) * -1).toFixed(2);

  balance.innerText = `₹${total}`;
  income.innerText = `+₹${inc}`;
  expense.innerText = `-₹${exp}`;
}

// Render List
function renderList() {
  list.innerHTML = "";
  transactions.forEach(t => {
    const sign = t.amount > 0 ? "+" : "-";
    const li = document.createElement("li");
    li.classList.add(t.amount > 0 ? "plus" : "minus");
    li.innerHTML = `
      ${t.text} <span>${sign}₹${Math.abs(t.amount)}</span>
      <button onclick="removeTransaction(${t.id})">❌</button>
    `;
    list.appendChild(li);
  });
}

// Init
function init() {
  list.innerHTML = "";
  renderList();
  updateValues();
}

form.addEventListener("submit", addTransaction);
init();
