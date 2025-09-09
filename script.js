const display = document.getElementById('display');
const scientificPanel = document.getElementById('scientific');
const modeLabel = document.getElementById('modeLabel');
const themeToggle = document.getElementById('themeToggle');
const themeLabel = document.getElementById('themeLabel');
const calculatorDiv = document.getElementById('calculator');
const historyContainer = document.getElementById('historyContainer');
const historyList = document.getElementById('historyList');
const buttons = document.querySelectorAll('button');
const body = document.body;

let memory = 0;

// Toggle Standard/Scientific Mode
function toggleMode() {
    if(scientificPanel.style.display === "flex") {
        scientificPanel.style.display = "none";
        modeLabel.textContent = "Standard Mode";
    } else {
        scientificPanel.style.display = "flex";
        modeLabel.textContent = "Scientific Mode";
    }
}

// Toggle Dark/Light Theme
function toggleTheme() {
    if(themeToggle.checked) {
        body.classList.add('light');
        calculatorDiv.classList.add('light');
        display.classList.add('light');
        historyContainer.classList.add('light');
        buttons.forEach(btn => btn.classList.add('light'));
        themeLabel.textContent = "Light Mode";
    } else {
        body.classList.remove('light');
        calculatorDiv.classList.remove('light');
        display.classList.remove('light');
        historyContainer.classList.remove('light');
        buttons.forEach(btn => btn.classList.remove('light'));
        themeLabel.textContent = "Dark Mode";
    }
}

// Input & Operations
function appendNumber(num) { display.value += num; }
function appendOperator(op) { display.value += (op === '^') ? '**' : op; }
function clearDisplay() { display.value = ''; }
function deleteLast() { display.value = display.value.slice(0, -1); }

// Calculate Result & Save to History
function calculateResult() {
    try {
        let result = eval(display.value);
        addToHistory(display.value + ' = ' + result);
        display.value = result;
    } catch { display.value = 'Error'; }
}

function addToHistory(entry) {
    const li = document.createElement('li');
    li.textContent = entry;
    li.onclick = () => { display.value = entry.split(' = ')[1]; };
    historyList.prepend(li);
}

// Memory Functions
function memoryClear() { memory = 0; }
function memoryRecall() { display.value += memory; }
function memoryAdd() { memory += parseFloat(display.value) || 0; }
function memorySubtract() { memory -= parseFloat(display.value) || 0; }

// Scientific Functions
function scientific(func) {
    try {
        let current = parseFloat(display.value);
        switch(func){
            case 'sqrt': display.value = Math.sqrt(current); break;
            case 'x²': display.value = Math.pow(current,2); break;
            case 'x³': display.value = Math.pow(current,3); break;
            case 'factorial': display.value = factorial(current); break;
            case 'sin': display.value = Math.sin(current*Math.PI/180); break;
            case 'cos': display.value = Math.cos(current*Math.PI/180); break;
            case 'tan': display.value = Math.tan(current*Math.PI/180); break;
            case 'asin': display.value = Math.asin(current)*180/Math.PI; break;
            case 'acos': display.value = Math.acos(current)*180/Math.PI; break;
            case 'atan': display.value = Math.atan(current)*180/Math.PI; break;
            case 'sinh': display.value = Math.sinh(current); break;
            case 'cosh': display.value = Math.cosh(current); break;
            case 'tanh': display.value = Math.tanh(current); break;
            case 'log': display.value = Math.log10(current); break;
            case 'exp': display.value = Math.exp(current); break;
            case 'pi': display.value = Math.PI; break;
        }
    } catch { display.value = 'Error'; }
}

function factorial(n){
    if(n < 0) return 'Error';
    let fact = 1;
    for(let i=1;i<=n;i++) fact *= i;
    return fact;
}

// -------------------
// Keyboard Support
// -------------------
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key)) {          // Numbers 0-9
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+') {
        appendOperator('+');
    } else if (key === '-') {
        appendOperator('-');
    } else if (key === '*') {
        appendOperator('*');
    } else if (key === '/') {
        appendOperator('/');
    } else if (key === 'Enter') {
        event.preventDefault();
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === '(') {
        appendOperator('(');
    } else if (key === ')') {
        appendOperator(')');
    }
});
