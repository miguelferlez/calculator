const display = document.querySelector('.calc-result');
const numButtons = document.querySelectorAll('.operand');

let displayInput = '';
let displayNum = '';
let currentFirstNum = '';
let currentLastNum = '';
let currentOperator = '';


function init() {
    window.addEventListener('keydown', handleKeyInput);
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
        appendFirstNum();
    }
    if (displayInput === '=') {
        appendLastNum();
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
}
function clear() {
    displayInput = '';
    displayNum = '';
    currentFirstNum = '';
    currentLastNum = '';
    currentOperator = '';
    display.textContent = '';
}

function removeDisplayNum() {
    display.textContent = display.textContent.toString().slice(0, -1);
}

function appendFirstNum() {
    if (displayNum !== '') {
        currentFirstNum = displayNum;
        currentOperator = displayInput;

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

function showError(message) {
    display.classList.toggle('error');
    display.textContent = message;
    window.addEventListener('keydown', () => {
        display.classList.toggle('error');
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