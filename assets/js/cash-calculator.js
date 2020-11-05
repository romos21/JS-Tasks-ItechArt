const firstValueInput = document.getElementById('first-value');
const secondValueInput = document.getElementById('second-value');
const operationSymbol = document.getElementById('operation-symbol');
const calcButton = document.getElementById('calc-button');
const resultValue = document.getElementById('result');


const cashCalculatorObject = {
    firstValue: Number(firstValueInput.value),
    secondValue: Number(secondValueInput.value),
    operationSymbolValue: operationSymbol.value,
    result: '',
    calculationHistory: {},
    isCorrectValue: function () {
        const regEL = isFinite(this.firstValue) && isFinite(this.secondValue);
        return regEL;
    },
    switchResult: function () {
        switch (this.operationSymbolValue) {
            case'+':
                return this.firstValue + this.secondValue;
            case'-':
                return this.firstValue - this.secondValue;
            case'*':
                return this.firstValue * this.secondValue;
            case'/':
                return this.firstValue / this.secondValue;
        }
    },
    calculation: function () {
        if (this.calculationHistory[this.firstValue + this.operationSymbolValue + this.secondValue] !== undefined) {
            return this.calculationHistory[this.firstValue + this.operationSymbolValue + this.secondValue];
        }

        if (!this.isCorrectValue()) {
            resultValue.style.display = 'none';
            document.getElementById('calc-error').style.display = 'block';
            return 0;
        }

        this.result = this.switchResult().toString();
        const key = (this.firstValue + this.operationSymbolValue + this.secondValue).toString();
        this.calculationHistory[key] = this.result;
        return this.result;
    }
}

firstValueInput.onchange = () => {
    cashCalculatorObject.firstValue = Number(firstValueInput.value);
};

secondValueInput.onchange = () => {
    cashCalculatorObject.secondValue = Number(secondValueInput.value);
};

operationSymbol.onchange = () => {
    cashCalculatorObject.operationSymbolValue = operationSymbol.value;
}

calcButton.addEventListener('click', () => {
    resultValue.textContent = cashCalculatorObject.calculation();
})
