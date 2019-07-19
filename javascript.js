class Calculator{

  constructor(previousOperandTextElement, currentOperandTextElement){
    this.currentOperandTextElement = currentOperandTextElement;
    this.previousOperandTextElement = previousOperandTextElement;
    this.clear();
  }

  //clear
  clear(){

    this.currentOperand = '0';
    this.operation = undefined;
    this.previousOperand = '0';
    

  }

  //append number
  appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand  = this.currentOperand.toString() + number.toString();
  }

  //delete
  delete(){

    this.currentOperand = this.currentOperand.toString().slice(0,-1);
    
  }

//choose operation
  chooseOperation(operation){
    if(this.currentOperand === '') return;
    if(this.previousOperand !== ''){
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    

  }

  //compute
  compute(){

    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
    case '+':
     computation = prev + current;
    break;
      
    case '-':
    computation = prev - current;
    break;

    case '*':
    computation = prev * current;
    break;

    case '÷':
    computation = prev / current;
    break;
       
    
    default:
    return;
    }

    this.operation = undefined;
    this.currentOperand = computation; 
    this.previousOperand = ''; 
    
  }

  //decimal display

  getDisplayNumber(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';           
    }else{
      integerDisplay = integerDigits.toLocaleString('en',{maximumFractionDigits: 0});
    }    
    

    if(decimalDigits != null){
      return `${integerDisplay}.${decimalDigits}`;
    }else{
    return integerDisplay;
  }
}

  // getDisplayNumber(number){
  //   const floatNumber = parseFloat(number);
  //   if(isNaN(floatNumber)) return'';
  //   return floatNumber.toLocaleString('en');
  // }

  //display
  updateDisplay(){
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);

    if(this.operation != null){
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)}${this.operation}${this.getDisplayNumber(this.currentOperand)}`;
    }else{
      this.previousOperandTextElement.innerText = '';
    }
    
  }

}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

//creating an object calculator

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button=> {

  button.addEventListener('click',() => {
    
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });

});


operationButtons.forEach(button=> {

  button.addEventListener('click',() => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });

});

equalsButton.addEventListener('click', button => {

  calculator.compute();
  calculator.updateDisplay();

});

allClearButton.addEventListener('click', button => {

  calculator.clear();
  calculator.updateDisplay();

});

deleteButton.addEventListener('click', button => {

  calculator.delete();
  calculator.updateDisplay();

});