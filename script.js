const numberButtons = document.querySelectorAll('.number');

const operands = {
    firstOperand : '',
    secondOperand : '',
    operator : ''
};


numberButtons.forEach(button =>
    button.addEventListener('click', (e) => operate(e.target))
);

function operateNumber(button) {
    if(operands.operator) {
        secondOperand += button.textContent;
    }
    else {
        firstOperand += button.textContent;
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