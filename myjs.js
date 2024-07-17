let currentInput = '';

function appendToDisplay(value) {
    currentInput += value;
    document.getElementById('display').value = currentInput;
}

function backspace() {
    currentInput = currentInput.substring(0, currentInput.length - 1);
    document.getElementById('display').value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    document.getElementById('display').value = '';
}

function calculateResult() {
    try {
        const result = evaluateExpression(currentInput);
        document.getElementById('display').value = result;
        currentInput = result.toString();
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function evaluateExpression(expression) {
    let result = 0;
    let currentOperator = '+';
    let numberBuffer = '';

    for (let i = 0; i < expression.length; i++) {
        const char = expression.charAt(i);
        if (char === '0' || char === '1' || char === '2' || char === '3' || char === '4' ||
            char === '5' || char === '6' || char === '7' || char === '8' || char === '9' ||
            char === '.') {
            numberBuffer += char;
        } else if (char === '+' || char === '-' || char === '*' || char === '/') {
            const number = parseFloat(numberBuffer);

            if (isNaN(number)) {
                alert('Error!');
                return 'Error!';
            }

            if (currentOperator === '+') {
                result += number;
            } else if (currentOperator === '-') {
                result -= number;
            } else if (currentOperator === '*') {
                result *= number;
            } else if (currentOperator === '/') {
                if (number === 0) {
                    alert('Infinity.');
                    return 'Infinity.';
                }
                result /= number;
            } else {
                alert('Error! Unknown operator.');
                return 'Error!';
            }

            numberBuffer = '';
            currentOperator = char;
        } else {
            alert('Error! Unknown symbol: ' + char);
            return 'Error!';
        }
    }

    const lastNumber = parseFloat(numberBuffer);

    if (isNaN(lastNumber)) {
        alert('Error!');
        return 'Error!';
    }

    if (currentOperator === '+') {
        result += lastNumber;
    } else if (currentOperator === '-') {
        result -= lastNumber;
    } else if (currentOperator === '*') {
        result *= lastNumber;
    } else if (currentOperator === '/') {
        if (lastNumber === 0) {
            alert('Infinity.');
            return 'Infinity.';
        }
        result /= lastNumber;
    } else {
        alert('Error! Unknown operator.');
        return 'Error!';
    }
    return result.toString();
}



function copyToClipboard() {
    const textToCopy = document.getElementById('display').value;

    const tempInput = document.createElement('textarea');
    tempInput.value = textToCopy;

    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 100);

    document.execCommand('copy');

    document.body.removeChild(tempInput);

    alert('The text is copied to the clipboard: ' + textToCopy);
}
