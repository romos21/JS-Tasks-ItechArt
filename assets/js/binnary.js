const value=document.getElementById('value');
const numSystemValue=document.getElementById('numSystemValue');
const resultNumSystemValue=document.getElementById('resultNumSystemValue');
const button=document.getElementById('button');
const result=document.getElementById('result');

let curValue=0;
let curNumSystemValue=0;
let curResultNumSystemValue=0;

numSystemValue.onchange=()=>curNumSystemValue=parseInt(numSystemValue.value);
value.onchange=()=>curValue=parseInt(value.value);
resultNumSystemValue.onchange=()=>curResultNumSystemValue=parseInt(resultNumSystemValue.value);

function NumSystemChange(value,curNumSystem,resultNumSystem){
    if(curNumSystem!==10){
        value=parseInt(value,curNumSystem);
    }
    return value.toString(resultNumSystem);
}

button.onclick=()=>result.textContent=NumSystemChange(curValue,curNumSystemValue,curResultNumSystemValue);