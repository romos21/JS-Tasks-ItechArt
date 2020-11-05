const inputDate = document.getElementById('date');
const inputDateFormat = document.getElementById('input-date-format');
const outputDateFormat = document.getElementById('output-date-format');
const formatButton = document.getElementById('format-button');
const resultDateForm = document.getElementById('result-date-form');
const fromNowButton = document.getElementById('from-now-button');
const separator = document.getElementById('separator');

const inputDateFormats = [
    'YYYYMMDD',
    'DDMMYYYY',
    'MMDDYYYY',
    'YYYYDDMM',
    'DDYYYYMM',
    'MMYYYYDD',
]

inputDateFormats.forEach(el => {
    const optionInput = document.createElement('option');
    const optionOutput = document.createElement('option');
    optionInput.value = el;
    optionOutput.value = el;
    optionInput.textContent = el;
    optionOutput.textContent = el;
    inputDateFormat.appendChild(optionInput);
    outputDateFormat.appendChild(optionOutput);
});

function getDatePointer(pointerStr, dateFormat, dateStr) {
    let beginIndex = dateFormat.indexOf(pointerStr),
        lastIndex = dateFormat.lastIndexOf(pointerStr),
        resultPointerVal = '';
    for (let i = beginIndex; i < lastIndex + 1; i++) {
        resultPointerVal += dateStr[i];
    }
    return resultPointerVal;
}

function pushDateToOutputFormat(objectDate, outputFormat, separator) {
    const resultDateIndexes = [];
    const resultDateValues = [];
    for (let key in objectDate) {
        resultDateIndexes.push(objectDate[key].indexInOutput);
        resultDateValues.push(objectDate[key].value);
    }
    for (let i = 1; i < resultDateValues.length; i++)
        for (let j = i; j > 0 && resultDateIndexes[j - 1] > resultDateIndexes[j]; j--) {
            [resultDateValues[j - 1], resultDateValues[j]] = [resultDateValues[j], resultDateValues[j - 1]];
        }
    return resultDateValues.join(separator);
}

function dateFormatter(inputDate, inputDateFormat, outputDateFormat, separator) {
    for (let i = 0; i < inputDate.length; i++) {
        if (!/\d/g.test(inputDate[i])) {
            inputDate = inputDate.replace(inputDate[i], '');
        }
    }
    if (inputDate.length < 8) {
        return 'un correct length of date';
    }
    const dateObj = {
        day: {
            value: '',
            indexInOutput: 0,
        },
        month: {
            value: '',
            indexInOutput: 0,
        },
        year: {
            value: '',
            indexInOutput: 0,
        },
    }

    for (let key in dateObj) {
        dateObj[key].value = getDatePointer(key[0].toUpperCase(), inputDateFormat, inputDate);
        dateObj[key].indexInOutput = outputDateFormat.indexOf(key[0].toUpperCase());
    }

    return pushDateToOutputFormat(dateObj, outputDateFormat, separator);
}

function fromNow(inputDate,inputDateFormat) {
    const dateObj = {
        day: '',
        month: '',
        year: '',
    }
    const dateNow = new Date();
    const dateObjNow = {
        day: dateNow.getDate(),
        month: dateNow.getMonth()+1,
        year: dateNow.getFullYear(),
    }
    for (let key in dateObj) {
        dateObj[key] = getDatePointer(key[0].toUpperCase(), inputDateFormat, inputDate);
    }
    for (let key in dateObj) {
            dateObj[key] = dateObjNow[key]-dateObj[key];
        if(key==='day'){
            if(dateObj.day<0){
                dateObjNow.month--;
                if([1,3,5,7,8,10,12].includes(dateObjNow.month)){
                    dateObj.day+=31;
                } else if([4,6,9,11].includes(dateObjNow.month)){
                    dateObj.day+=30;
                } else if(dateObjNow.month===2){
                    if(dateObjNow.year%4) {
                        dateObjNow.day += 29;
                    } else {
                        dateObjNow.day += 28;
                    }
                }
            }
        }else if(key==='month'){
            if(dateObj.month<0){
                dateObjNow.year--;
                dateObjNow.month+=12;
            }
        }else if(key==='year'){
            if(dateObj.year<0){
                return 'future';
            }
        }
    }
    return dateObj.day+' day(s), '+dateObj.month+' month(s), '+dateObj.year+' years.';
}

fromNowButton.onclick = () => {
    resultDateForm.textContent = fromNow(inputDate.value,inputDateFormat.value);
}
formatButton.onclick = () => resultDateForm.textContent = dateFormatter(inputDate.value, inputDateFormat.value, outputDateFormat.value, separator.value);