class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.allClear()
  }

  allClear() {
    this.previousOperand = ''
    this.currentOperand = ''
    this.operation = undefined
  }

  deleteNumber() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
    console.log(this)
  }

  appendNumber(number) {
    if (this.computationPerformed) {
      this.currentOperand = ''
      this.computationPerformed = false
    }
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return

    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation

    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)

    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break

      case '-':
        computation = prev - current
        break

      case '×':
        computation = prev * current
        break

      case '÷':
        computation = prev / current
        break
      default:
        return
    }

    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
    this.computationPerformed = true
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand

    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

const numberButton = document.querySelectorAll('[data-number]')
const operatorButton = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
// const keyBoardEvent = document.querySelectorAll('button')
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
)
const currentOperandTextElement = document.querySelector(
  '[data-current-operand]'
)

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
)

numberButton.forEach((number) => {
  number.addEventListener('click', () => {
    calculator.appendNumber(number.innerText)
    calculator.updateDisplay()
  })
})

operatorButton.forEach((operation) => {
  operation.addEventListener('click', () => {
    calculator.chooseOperation(operation.innerText)
    calculator.updateDisplay()
  })
})

equalButton.addEventListener('click', (equal) => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', (equal) => {
  calculator.allClear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', (button) => {
  calculator.deleteNumber()
  calculator.updateDisplay()
})

document.addEventListener('keypress', (event) => {
  // Check which key was pressed
  const key = event.key

  // Check if the key pressed was a number
  if (!isNaN(key)) {
    calculator.appendNumber(key)
    calculator.updateDisplay()
  }

  // Check if the key pressed was an operator
  if (key === '+' || key === '-' || key === '*' || key === '/') {
    calculator.chooseOperation(key)
    calculator.updateDisplay()
  }

  // Check if the key pressed was the equal sign
  if (key === 'Enter') {
    calculator.compute()
    calculator.updateDisplay()
  }

  // Check if the key pressed was the all clear key
  if (key === 'c') {
    calculator.allClear()
    calculator.updateDisplay()
  }

  // Check if the key pressed was the delete key
  if (key === 'Delete') {
    calculator.deleteNumber()
    calculator.updateDisplay()
  }
})


