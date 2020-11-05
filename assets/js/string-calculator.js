const elements = [...document.getElementsByTagName('span')];
const windowCalc = document.getElementById('window');


function operationCashFormatter(operationCash){
    console.log(operationCash);
    let firstEl=operationCash[0],
        secEl='',
        operation='';

    for(let i=1;i<operationCash.length;i++){
        console.log(operationCash[i]);
        if(!operation.length) {
            while (!/[-+*/]/g.test(operationCash[i])) {
                firstEl += operationCash[i];
                i++;
            }
        }
        if (/[-+*/]/g.test(operationCash[i])){
            operation=operationCash[i];
        } else {
            secEl+=operationCash[i];
        }
    }
    firstEl=Number(firstEl);
    secEl=Number(secEl);
    return {firstEl,secEl,operation};
}

function calculationStart(exception) {
    const {firstEl,secEl,operation}=operationCashFormatter(exception);

    console.log(firstEl,secEl,operation);


    if (operation === '+') {
        return Number(firstEl+secEl);
    } else if (operation === '-') {
        return Number(firstEl-secEl);
    } else if (operation === '*') {
        return Number(firstEl*secEl);
    } else if (operation === '/') {
        return Number(firstEl/secEl);
    }
}

elements.map(el => {
    el.addEventListener('click', (event) => {
        if(el.textContent==='AC'){
            windowCalc.value ='';
            return ;
        }
        if(/^[-]?(\d+([.]\d+)?)[-+/*][-]?(\d+([.]\d+)?)$/g.test(windowCalc.value)){
            if(event.target.textContent==='=') {
                windowCalc.value = calculationStart(windowCalc.value);
            }else if(event.target.className==='operation'){
                windowCalc.value = calculationStart(windowCalc.value)+event.target.textContent;
            }else {
                windowCalc.value+=event.target.textContent;
            }
        } else{
            if(event.target.textContent!=='=') {
                windowCalc.value += event.target.textContent;
            }
        }
        console.log(windowCalc.value);
    })
})
