import utilities from './utilities.js';

class Calculator {
  constructor(previousOperandSel, currentOperandSel) {
    this.previousOperandSel = previousOperandSel;
    this.currentOperandSel = currentOperandSel;
    this.previousOperand = '';
    this.currentOperand = '0';
    this.waitingForSecondOperand = false;
    this.operator = null;
    this.operatorSign = '';
  }

  static compute(previousOperand, currentOperand, operator) {
    const a = utilities.toNumber(previousOperand);
    const b = utilities.toNumber(currentOperand);
    let computation;

    switch (operator) {
      case '+':
        computation = a + b;
        break;
      case '-':
        computation = a - b;
        break;
      case '*':
        computation = a * b;
        break;
      case '/':
        computation = a / b;
        break;
      case '%':
        computation = a % b;
        break;
      case '^':
        computation = a ** b;
        break;
      default:
        computation = 0;
    }

    return Number.isFinite(computation) ? computation : 0;
  }

  delete() {
    this.currentOperand =
      this.currentOperand.length > 1 ? (this.currentOperand = this.currentOperand.slice(0, -1)) : '0';
  }

  inputDecimal(dot) {
    if (this.waitingForSecondOperand) {
      this.currentOperand = '0.';
      return;
    }

    if (!this.currentOperand.includes(dot)) {
      this.currentOperand += dot;
    }
  }

  handleOperator(nextOperator, nextOperatorSign) {
    if (nextOperator === '=') {
      if (!this.operator || this.waitingForSecondOperand) return;

      const result = Calculator.compute(this.previousOperand, this.currentOperand, this.operator);

      history.addToHistory(this.previousOperand, this.currentOperand, this.operatorSign, result);

      this.previousOperand = '';
      this.currentOperand = parseFloat(result.toFixed(7)).toString();
      this.waitingForSecondOperand = false;
      this.operatorSign = null;
      this.operator = null;
      return;
    }

    if (nextOperator === '+/-') {
      this.currentOperand = this.currentOperand.startsWith('-')
        ? this.currentOperand.slice(1)
        : `-${this.currentOperand}`;
      return;
    }

    if (this.operator && !this.waitingForSecondOperand) {
      const result = Calculator.compute(this.previousOperand, this.currentOperand, this.operator);
      this.previousOperand = parseFloat(result.toFixed(7)).toString();
      this.currentOperand = '';
      this.waitingForSecondOperand = true;
    }

    if (!this.operator) {
      this.waitingForSecondOperand = true;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }

    this.operatorSign = nextOperator === '^' ? '^' : nextOperatorSign;
    this.operator = nextOperator;
  }

  inputDigit(digit) {
    if (this.waitingForSecondOperand) {
      this.waitingForSecondOperand = false;
    }

    if (this.currentOperand === '-0') {
      this.currentOperand = `-${digit}`;
    } else if (this.currentOperand === '0') {
      this.currentOperand = digit;
    } else {
      this.currentOperand += digit;
    }
  }

  updateDisplay() {
    const previousOperandString = utilities.numberToLocaleString(this.previousOperand, 7);
    const currentOperandString = utilities.numberToLocaleString(this.currentOperand, 7);

    if (!Number.isNaN(parseFloat(this.previousOperand))) {
      this.previousOperandSel.textContent = `${previousOperandString} ${this.operatorSign}`;
    } else {
      this.previousOperandSel.textContent = '';
    }

    if (this.currentOperand.endsWith('.')) {
      this.currentOperandSel.textContent = `${currentOperandString}.`;
    } else {
      this.currentOperandSel.textContent = Number.isNaN(currentOperandString) ? '' : currentOperandString;
    }
  }
}

const previousOperandSel = document.querySelector('.calculator-previous-operand');
const currentOperandSel = document.querySelector('.calculator-current-operand');
const calcKeypadSel = document.querySelector('.calculator-keypad');

const calculator = new Calculator(previousOperandSel, currentOperandSel);

calcKeypadSel.addEventListener('click', (e) => {
  if (!e.target.matches('button')) return;

  if (e.target.classList.contains('operator')) {
    calculator.handleOperator(e.target.value, e.target.textContent);
  } else if (e.target.classList.contains('decimal')) {
    calculator.inputDecimal(e.target.value);
  } else if (e.target.classList.contains('delete')) {
    calculator.delete();
  } else {
    calculator.inputDigit(e.target.value);
  }

  calculator.updateDisplay();
});
