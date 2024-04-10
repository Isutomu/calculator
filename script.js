const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operands');
const display = document.querySelector('.display');

const operands = {
    firstOperand : '',
    secondOperand : '',
    operator : ''
};


numberButtons.forEach(button =>
    button.addEventListener('click', (e) => updateNumber(e.target))
);
function updateNumber(button) {
    let operandToUpdate = operands.operator ? 'secondOperand' : 'firstOperand';
    let numberUpdate = button.textContent;

    if (operands[operandToUpdate] === '') {
        if (['0', '.'].includes(numberUpdate)) {
            return;
        }
    } else if (
        (numberUpdate === '.') && operands[operandToUpdate].includes('.')
    ) {
        return;
    }

    operands[operandToUpdate] += numberUpdate;
}

operatorButtons.forEach(button => 
    button.addEventListener('click', (e) => updateOperator(e.target))
);
function updateOperator(button) {
    if (Object.values(operands).join('') === '') return;

    if (operands.firstOperand && operands.secondOperand === '') {
        if (button.textContent === '=') {
            operands.operator = '';
        } else {
            operands.operator = button.textContent;
        }
    } else {
        operate(operands.operator);

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


function add(x, y) {
    return Math.round((x+y) *100)/100;
}

function subtract(x, y){
    return Math.round((x-y) *100)/100;
}

function multiply(x, y){
    return Math.round((x*y) *100)/100;
}

function divide(x, y){
    return Math.round((x/y) *100)/100;
}