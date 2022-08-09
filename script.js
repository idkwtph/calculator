class Calculator {
  constructor(previousOperationTextElement, currentOperationTextElement) {
    this.previousOperationTextElement = previousOperationTextElement;
    this.currentOperationTextElement = currentOperationTextElement;
    this.clear();
  }

  clear() {
    removeChilds(previousOperationTextElement);
    previousOperationTextElement.appendChild(displayNumberElement);
    currentOperationTextElement.textContent = "0";
  }

  delete() {
    this.currentOperationTextElement.textContent =
      currentOperationTextElement.textContent.toString().slice(0, -1);
  }

  appendNumber(number) {
    currentOperationTextElement.textContent += number;
  }

  appendOperation(operation) {
    currentOperationTextElement.textContent += operation;
  }

  compute() {
    previousOperationTextElement.textContent = "";
    let text = currentOperationTextElement.textContent;
    let answer = eval(text);
    currentOperationTextElement.textContent = answer;
    for (let i = 0; i < text.length; i++) {
      if (
        operationList.includes(text.charAt(0)) &&
        previousOperationTextElement.textContent == ""
      ) {
        alert("ERROR! Must have a number between operations!");
        return;
      } else {
        if (!isNaN(text.charAt(i))) {
          let element = document.createElement("span");
          element.classList = "display-number";
          element.textContent = text.charAt(i);
          previousOperationTextElement.appendChild(element);
        } else {
          let element = document.createElement("span");
          element.classList = "display-operation";
          element.textContent = text.charAt(i);
          previousOperationTextElement.appendChild(element);
        }
      }
    }
  }

  changeSign() {
    if (
      Math.abs(currentOperationTextElement.textContent) ==
      currentOperationTextElement.textContent
    ) {
      currentOperationTextElement.textContent =
        "-" + currentOperationTextElement.textContent;
    } else {
      currentOperationTextElement.textContent =
        "+" + currentOperationTextElement.textContent;
    }
  }
}

const modeToggle = document.querySelector(".mode-tog");
const darkMode = document.querySelector(".dark-mode");
const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const allClearButton = document.querySelector(".clear");
const previousOperationTextElement = document.querySelector(
  ".previous-operation"
);
const currentOperationTextElement =
  document.querySelector(".current-operation");
const operationList = ["×", "÷", "+"];
const numbersList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const displayNumberElement = document.createElement("div");
displayNumberElement.classList = "display-number";
displayNumberElement.textContent = 0;
const displayOperationElement = document.createElement("div");
displayOperationElement.classList = "operation-number";
const changeSignButton = document.querySelector(".change-sign");
let numbers = [];
let operations = [];

modeToggle.addEventListener("click", () => {
  darkMode.classList.toggle("active");
  modeToggle.classList.toggle("active");
  if (
    document.documentElement.getAttribute("colour-scheme").valueOf() == "light"
  ) {
    setTimeout(() => {
      document.documentElement.setAttribute("colour-scheme", "dark");
    }, 350);
  } else {
    setTimeout(() => {
      document.documentElement.setAttribute("colour-scheme", "light");
    }, 500);
  }
});

const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};

const calculator = new Calculator(
  previousOperationTextElement,
  currentOperationTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentOperationTextElement.textContent == 0) {
      currentOperationTextElement.textContent = "";
    }
    calculator.appendNumber(button.innerText);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendOperation(button.innerText);
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
});

deleteButton.addEventListener("click", (button) => {
  if (!currentOperationTextElement.textContent == 0) {
    calculator.delete();
  }
});

changeSignButton.addEventListener("click", (button) => {
  calculator.changeSign();
});
