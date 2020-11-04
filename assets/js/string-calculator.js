const elements = [...document.getElementsByTagName('span')];
const windowCalc = document.getElementById('window');


function operationCashFormatter(operationCash){
    let firstEl='',
        secEl='',
        operation='';
    for(let i=0;i<operationCash.length;i++){
        if(!operation.length) {
            while (!/[-+*/]/g.test(operationCash[i])) {
                firstEl += operationCash[i];
                i++;
            }
        }
        if (/[-+*/]/g.test(operationCash[i])){
            operation=operationCash[i];
        } else {
            secEl=operationCash[i];
        }
    }
    firstEl=Number(firstEl);
    secEl=Number(secEl);
    return {firstEl,secEl,operation};
}

function calculationStart(exception) {
    const {firstEl,secEl,operation}=operationCashFormatter(exception);

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
            windowCalc.textContent ='';
            return ;
        }
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
