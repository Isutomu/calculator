const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.del');

document.onkeydown = (e) => {
    if (Number(e.key)) {
        console.log(e.key);
        updateNumber(e.key);
    }
};

const operands = {
    firstOperand : '',
    operator : '',
    secondOperand : '',
};


numberButtons.forEach(button =>
    button.addEventListener('click', evt => updateNumber(evt.target.textContent))
);
function updateNumber(key) {
    let operandToUpdate = operands.operator ? 'secondOperand' : 'firstOperand';
    let numberUpdate = key;

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
    button.addEventListener('click', evt => updateOperator(evt.target.textContent))
);
function updateOperator(key) {
    if (Object.values(operands).join('') === '') return;

    if (operands.firstOperand && operands.secondOperand === '') {
        if (key === '=') {
            operands.operator = '';
        } else {
            operands.operator = key;
        }
    } else {
        try {
            operate(operands.operator);
        } catch(e) {
            console.log(e);
            return;
        }

        operands.secondOperand = '';
        if (key !== '=') {
            operands.operator = key;
        } else {
            operands.operator = '';
        }
    }

    display.textContent = Object.values(operands).join('');
}

function operate(operator) {
    switch (operator) {
        case '+' :
            operands.firstOperand = String(add(operands.firstOperand, operands.secondOperand));
            break;
        case '-' :
            operands.firstOperand = String(subtract(operands.firstOperand, operands.secondOperand));
            break;
        case 'x' :
            operands.firstOperand = String(multiply(operands.firstOperand, operands.secondOperand));
            break;
        case '/' :
            operands.firstOperand = String(divide(operands.firstOperand, operands.secondOperand));
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
    return Math.round((Number(x)-Number(y)) *100)/100;
}

function multiply(x, y){
    return Math.round((Number(x)*Number(y)) *100)/100;
}

function divide(x, y){
    if(y === '0') {
        alert('OOOOOPS');
        clear();
        throw 'Divison by 0';
    }
    return Math.round((Number(x)/Number(y)) *100)/100;
}