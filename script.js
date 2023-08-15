const display = document.querySelector('.calc-result');
const numButtons = document.querySelectorAll('.operand');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clean');
const signButton = document.querySelector('.sign');
const percentButton = document.querySelector('.percent');
const decimalButton = document.querySelector('.decimal');
const equalsButton = document.querySelector('.equals');

let displayInput = '';
let displayNum = '';
let currentFirstNum = '';
let currentLastNum = '';
let currentOperator = '';


function init() {
    window.addEventListener('keydown', handleKeyInput);
    for (let i = 0; i < numButtons.length; i++) {
        numButtons[i].addEventListener('click', () => {
            addDisplayNum(numButtons[i].textContent);
        });
    }
    for (let i = 0; i < operatorButtons.length; i++) {
        operatorButtons[i].addEventListener('click', appendFirstNum(operatorButtons[i].textContent));
    }
    clearButton.addEventListener('click', clear);
    equalsButton.addEventListener('click', () => {
        appendLastNum();
        getResult();
    });
}

function handleKeyInput(e) {
    displayInput = e.key;
    if (!isNaN(displayInput)) {
        display.textContent += displayInput;
        displayNum = display.textContent;
    }
    if (displayInput === 'Escape') {
        clear();
    }
    if (displayInput === 'Backspace') {
        removeDisplayNum();
    }
    if (displayInput === '+' || displayInput === '-' || displayInput === '*' || displayInput === '/') {
        appendFirstNum(displayInput);
    }
    if (displayInput === '=') {
        appendLastNum();
        getResult();
    }
}
function clear() {
    displayInput = '';
    displayNum = '';
    currentFirstNum = '';
    currentLastNum = '';
    currentOperator = '';
    display.textContent = '';
}

function addDisplayNum(num) {
    display.textContent += num;
    displayNum = display.textContent;
}

function removeDisplayNum() {
    display.textContent = display.textContent.toString().slice(0, -1);
}

function appendFirstNum(operator) {
    if (displayNum !== '') {
        currentFirstNum = displayNum;
        currentOperator = operator;

        display.textContent = '';
        displayNum = '';
    }
}

function appendLastNum() {
    if (displayNum !== '') {
        currentLastNum = displayNum;

        displayNum = '';
    }
}

function getResult() {
    if (currentFirstNum === '' || currentLastNum === '') {
        showError('Error!');
    } else if (currentLastNum == 0 && currentOperator == '/') {
        showError("Can't divide by 0!");
    } else {
        displayNum = operate(currentFirstNum, currentLastNum, currentOperator);
        currentLastNum = '';
        currentFirstNum = '';
        display.textContent = displayNum;
    }
}

function showError(message) {
    display.textContent = message;
    window.addEventListener('keydown', () => {
        clear();
    }, { once: true });
}

function operate(firstNum, lastNum, operator) {
    firstNum = Number(currentFirstNum);
    lastNum = Number(currentLastNum);
    switch (operator) {
        case '+':
            return add(firstNum, lastNum);
        case '-':
            return substract(firstNum, lastNum);
        case '*':
            return multiply(firstNum, lastNum);
        case '/':
            return divide(firstNum, lastNum).toFixed(2);
        default:
            break;
    }
}

function add(x, y) {
    return x + y;
}

function substract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

window.addEventListener('load', init);