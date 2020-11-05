
const inputStringHTMLElement=document.getElementById('input-string');
const inputRowLengthHTMLElement=document.getElementById('row-length');
const inputRowsCountHTMLElement=document.getElementById('rows-count');
const inputFormatTypeHTMLElement=document.getElementById('format-type');
const inputResultHTMLElement=document.getElementById('result');
const formatButton=document.getElementById('text-formatter-button');


let str=inputStringHTMLElement.value;
let rowLength=inputRowLengthHTMLElement.value;
let rowsCount=inputRowsCountHTMLElement.value;
let formatType=inputFormatTypeHTMLElement.value;

inputFormatTypeHTMLElement.onchange=()=>{
    formatType=inputFormatTypeHTMLElement.value;
    console.log(formatType);
};
inputRowLengthHTMLElement.onchange=()=>rowLength=inputRowLengthHTMLElement.value;
inputRowsCountHTMLElement.onchange=()=>rowsCount=inputRowsCountHTMLElement.value;
inputStringHTMLElement.onchange=()=>str=inputStringHTMLElement.value;

const textFormatter = (str, formatType = 'without', rowLength = Infinity, rowsCount = Infinity) => {
    let warning=true;
    let checkStrArr=[];
    if (str.length > rowLength * rowsCount && warning) {
        console.log('string size is not correspond with rowLength/rowsCounts params');
        warning=false;
    }
    if (formatType === 'by symbol') {
        let arr = str.match(/./g).filter(el => el !== ' ');
        console.log(arr);
        checkStrArr=arr;
        if (arr.length > rowsCount && warning) {
            console.log('string size is not correspond with rowsCounts param');
            warning=false;
        }
    } else if (formatType === 'by word') {
        checkStrArr = str.split(' ');
        if (checkStrArr.length > rowsCount && warning) {
            console.log('rowsCount param will be ignore before output because of size');
            warning=false;
        }
        for (let i = 0; i < checkStrArr.length; i++) {
            if (checkStrArr[i].length > rowLength && warning) {
                console.log('rowLength param will be ignore before output because of size');
                warning=false;
            }
        }
    } else if (formatType === 'by sentence') {
        checkStrArr = str.split('.');
        if (checkStrArr.length > rowsCount && warning){
            console.log('rowsCount param will be ignore before output because of size');
            warning=false;
        }
        for (let i = 0; i < checkStrArr.length; i++) {
            if (checkStrArr[i].length > rowLength && warning) {
                console.log('rowLength param will be ignore before output because of size');
                warning=false;
            }
        }
    }
    console.log(checkStrArr);
    checkStrArr.forEach(el=>inputResultHTMLElement.innerHTML+=`<div>${el}</div>`);
}

formatButton.onclick=()=>{
    inputResultHTMLElement.textContent='';
    textFormatter(str,formatType,rowLength??Infinity, rowsCount??Infinity);
};
