let btnElement = document.querySelectorAll(".btn");
let popUpElement = document.querySelector(".pop-up");
let newGameBtn = document.getElementById("new-game");
let reStartBtn = document.getElementById("restart");
let msgElement = document.getElementById("message");

const winCases = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let xTurn = true;
let count = 0;

const disableButtons = () => {
  btnElement.forEach(btn => btn.disabled = true);
  popUpElement.classList.remove("hidden");
};

const enableButtons = () => {
  count = 0;
  xTurn = true;
  btnElement.forEach((btn) => {
    btn.innerText = "";
    btn.disabled = false;
  });
  popUpElement.classList.add("hidden");
};

const postWin = (letter) => {
  disableButtons();
  if (letter == "x") msgElement.innerHTML = "&#x1F389; <br> Player 1 Wins";
  else msgElement.innerHTML = "&#x1F389; <br> Player 2 Wins";
};

const drawCase = () => {
  disableButtons();
  msgElement.innerHTML = "&#x1F60E; <br> It's a Draw";
};

const checkWinner = () => {
  for (let i of winCases) {
    let [e1, e2, e3] = [
      btnElement[i[0]].innerText,
      btnElement[i[1]].innerText,
      btnElement[i[2]].innerText,
    ];
    if (e1 != "" && (e2 != "") & (e3 != ""))
      if (e1 == e2 && e2 == e3)
        postWin(e1);
  }
};

btnElement.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      element.innerHTML = `<span>x</span>`;
      element.disabled = true;
    } else {
      xTurn = true;
      element.innerHTML = `<span>o</span>`;
      element.disabled = true;
    }
    count += 1;
    if (count == 9) drawCase();
    checkWinner();
  });
});

newGameBtn.addEventListener("click", () => enableButtons());
reStartBtn.addEventListener("click", () => enableButtons());
window.onload = enableButtons;
