const container = document.querySelector('.container');
const lines = [];
for (let i=0; i<=4; i++) {
    const singleLine = document.createElement('div');
    singleLine.className = 'row';
    lines.push(singleLine);
} 

const buttonsText = [
    ['1', '2', '3', '+'],
    ['4', '5', '6', '-'],
    ['7', '8', '9', 'x'],
    ['=', '.', '0', '/'],
    ['clear', 'del']
];

for (let i=0; i<=4; i++) {
    buttonsText[i].forEach(key => {
        const button = document.createElement('button');
        button.textContent = key;

        if ('1234567890.'.includes(key)) {
            button.className = 'number';
        } else if ('+-x/='.includes(key)) {
            button.className = 'operator';
        } else {
            button.className = key;
        }

        lines[i].appendChild(button);
    })

    container.appendChild(lines[i]);
}

