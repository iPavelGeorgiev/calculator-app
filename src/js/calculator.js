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

  calculator.inputDigit(e.target.value);
  calculator.updateDisplay();
});
