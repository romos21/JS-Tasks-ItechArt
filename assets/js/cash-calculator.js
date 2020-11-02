const firstValueInput=document.getElementById('first-value');
const secondValueInput=document.getElementById('second-value');
const operationSymbol=document.getElementById('operation-symbol');
const calcButton=document.getElementById('calc-button');
const resultValue=document.getElementById('result');

console.log('addawdw');

const object={
    firstValue:firstValueInput.value,
    secondValue:secondValueInput.value,
    operationSymbolValue:operationSymbol.value,
    result: '',
    calculationHistory:[],
    switchResult: function (){
        switch (this.operationSymbolValue){
            case'+':return Number(this.firstValue)+Number(this.secondValue);
            case'-':return Number(this.firstValue)-Number(this.secondValue);
            case'*':return Number(this.firstValue)*Number(this.secondValue);
            case'/':return Number(this.firstValue)/Number(this.secondValue);
        }
    },
    calculation: function (){
        let cashCheck=this.calculationHistory.find(exc=>{
            if(exc.exception===this.firstValue+this.operationSymbolValue+this.secondValue){
                return exc;
            }
        })
        if(cashCheck){
            return cashCheck.result;
        }
        if(!/[+-]?\d+[.]?[\d+]?/g.test(this.firstValue) && !/[+-]?\d+[.]?[\d+]?/g.test(this.secondValue)){
            resultValue.style.display='none';
            document.getElementById('calc-error').style.display='block';
            return 0;
        }

        this.result=this.switchResult().toString();

        if(this.result.toString().length>5)
        {
            this.result=this.result.toFixed(3);
        }

        this.calculationHistory=[
            ...this.calculationHistory,
            {
                exception:this.firstValue+this.operationSymbolValue+this.secondValue,
                resultSymbol:'=',
                result:this.result,
            }
        ];
        return this.result;
    }
}

firstValueInput.onchange=()=>{
    object.firstValue=firstValueInput.value;
};

secondValueInput.onchange=()=>{
    object.secondValue=secondValueInput.value;
};

operationSymbol.onchange=()=>{
    object.operationSymbolValue=operationSymbol.value;
}

calcButton.addEventListener('click',()=>{
    resultValue.textContent=object.calculation();
})
