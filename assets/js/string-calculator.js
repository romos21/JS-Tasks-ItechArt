const elements = [...document.getElementsByTagName('span')];
const windowCalc = document.getElementById('window');

function calculationStart(exception) {
    let operationCash = exception.split('');
    let exceptionElementFirst='';
    let exceptionElementSecond='';
    let operation='';
    exceptionElementFirst+=operationCash[0];
    let operationPointer=true;
    for(let i=1;i<operationCash.length;i++){
        if(/\d+|[.]/g.test(operationCash[i]) && operationPointer){
            exceptionElementFirst+=operationCash[i]
        }
        if(/[-+*/]/g.test(operationCash[i])){
            if(operationPointer){
                operation=operationCash[i];
                operationPointer=false;
            }
            else {
                exceptionElementSecond+=operationCash[i];
            }
        }else if(!operationPointer) {
            exceptionElementSecond+=operationCash[i];
        }
    }
    console.log(exceptionElementFirst,exceptionElementSecond);
    if (operation === '+') {
        return Number(exceptionElementFirst) + Number(exceptionElementSecond);
    } else if (operation === '-') {
        return Number(exceptionElementFirst) - Number(exceptionElementSecond);
    } else if (operation === '*') {
        return (Number(exceptionElementFirst) * Number(exceptionElementSecond)).toFixed(2);
    } else if (operation === '/') {
        return (Number(exceptionElementFirst) / Number(exceptionElementSecond)).toFixed(2);
    }
}

elements.map(el => {
    el.addEventListener('click', (event) => {
        if(/^[-]?(\d+([.]\d+)?)[-+/*][-]?(\d+([.]\d+)?)$/g.test(windowCalc.textContent)){
            if(event.target.textContent==='=') {
                console.log(windowCalc.textContent);
                windowCalc.textContent = calculationStart(windowCalc.textContent);
            }else if(/[-+/*]/g.test(event.target.textContent)){
                windowCalc.textContent = calculationStart(windowCalc.textContent)+event.target.textContent;
            }else {
                windowCalc.textContent+=event.target.textContent;
            }
        } else{
            if(event.target.textContent!=='=') {
                windowCalc.textContent += event.target.textContent;
            }
        }
    })
})
