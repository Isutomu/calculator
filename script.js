const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.del');

const operands = {
    firstOperand : '',
    operator : '',
    secondOperand : '',
};


numberButtons.forEach(button =>
    button.addEventListener('click', updateNumber)
);
function updateNumber(evt) {
    const button = evt.target;
    console.log(evt.target);

    let operandToUpdate = operands.operator ? 'secondOperand' : 'firstOperand';
    let numberUpdate = button.textContent;

    if ((numberUpdate === '.' && operands[operandToUpdate].includes('.')) ||
        (numberUpdate === '0' && operands[operandToUpdate] === '0')) {
        return;
    }
    if(operands[operandToUpdate] === '0' && '123456789'.includes(numberUpdate)){
        operands[operandToUpdate] = '';
    }
    operands[operandToUpdate] += numberUpdate;
    display.textContent = Object.values(operands).join('');
}

operatorButtons.forEach(button => 
    button.addEventListener('click', updateOperator)
);
function updateOperator(evt) {
    const button = evt.target;
    console.log(evt.target);

    if (Object.values(operands).join('') === '') return;

    if (operands.firstOperand && operands.secondOperand === '') {
        if (button.textContent === '=') {
            operands.operator = '';
        } else {
            operands.operator = button.textContent;
        }
    } else {
        try {
            operate(operands.operator);
        } catch(e) {
            console.log(e);
            return;
        }

        operands.secondOperand = '';
        if (button.textContent !== '=') {
            operands.operator = button.textContent;
        } else {
            operands.operator = '';
        }
    }

    display.textContent = Object.values(operands).join('');
}

function operate(operator) {
    switch (operator) {
        case '+' :
            operands.firstOperand = add(operands.firstOperand, operands.secondOperand);
            break;
        case '-' :
            operands.firstOperand = subtract(operands.firstOperand, operands.secondOperand);
            break;
        case 'x' :
            operands.firstOperand = multiply(operands.firstOperand, operands.secondOperand);
            break;
        case '/' :
            operands.firstOperand = divide(operands.firstOperand, operands.secondOperand);
            break;
    }
}


clearButton.addEventListener('click', clear);
function clear() {
    operands.firstOperand = '';
    operands.operator = '';
    operands.secondOperand = '';
    display.textContent = '';
}


deleteButton.addEventListener('click', deleteNumber);
function deleteNumber() {
    if (operands.operator) {
        operands.secondOperand = operands.secondOperand.slice(0, -1);
    } else {
        operands.firstOperand = operands.firstOperand.slice(0, -1);
    }

    display.textContent = Object.values(operands).join(''); 
}

function add(x, y) {
    return Math.round((Number(x)+Number(y)) *100)/100;
}

function subtract(x, y){
    return Math.round((Number(x)+Number(y)) *100)/100;
}

function multiply(x, y){
    return Math.round((Number(x)+Number(y)) *100)/100;
}

function divide(x, y){
    if(y === '0') {
        alert('OOOOOPS');
        clear();
        throw 'Divison by 0';
    }
    return Math.round((Number(x)+Number(y)) *100)/100;
}