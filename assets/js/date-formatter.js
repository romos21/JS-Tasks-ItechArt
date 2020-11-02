const inputDate = document.getElementById('date');
const inputDateFormat = document.getElementById('input-date-format');
const outputDateFormat = document.getElementById('output-date-format');
const formatButton = document.getElementById('format-button');
const resultDateForm = document.getElementById('result-date-form');
const fromNowButton = document.getElementById('from-now-button');
const resultDateFromNow = document.getElementById('result-date-from-now');

const dateFormats = [
    'YYYYMMDD',
    'DDMMYYYY',
    'DD-MM-YYYY',
    'YYYY-MM-DD',
    'YYYY.MM.DD',
    'DD.MM.YYYY',
    'DD MM YYYY',
    'YYYY MM DD'
]

dateFormats.forEach(el => {
    const optionInput = document.createElement('option');
    const optionOutput = document.createElement('option');
    optionInput.value = el;
    optionOutput.value = el;
    optionInput.textContent = el;
    optionOutput.textContent = el;
    inputDateFormat.appendChild(optionInput);
    outputDateFormat.appendChild(optionOutput);
});


let dateValue = '';

inputDate.onchange = () => {
    dateValue = inputDate.value;
}

formatButton.addEventListener('click', () => {
    resultDateForm.textContent = dateFormatter(dateValue, inputDateFormat.value, outputDateFormat.value);
})

function deleteSeparators(dateException) {
    if (dateException.match(/[^\d]/g)) {
        console.log('here');
        return dateException.replaceAll(/[^\d]/g, '');
    }
    return dateException;
}

const dateFormatter = (dateException, inputRegFormat = 'DDMMYYYY', outputRegFormat = 'DD-MM-YYYY') => {
    dateException = deleteSeparators(dateException);
    let separator = '';
    if (dateException.length === 8 && /^\d+$/.test(dateException)) {
        let resultDateForm = {};
        if (/^DD/.test(inputRegFormat)) {
            resultDateForm = {
                day: dateException.slice(0, 2),
                month: dateException.slice(2, 4),
                ...resultDateForm,
            };
        } else if (/DD$/.test(inputRegFormat)) {
            resultDateForm = {
                day: dateException.slice(-2),
                month: dateException.slice(4, 6),
                ...resultDateForm,
            };
        }
        if (/^YYYY/.test(inputRegFormat)) {
            resultDateForm = {
                ...resultDateForm,
                month: dateException.slice(4, 6),
                year: dateException.slice(0, 4),
            };
        } else if (/YYYY$/.test(inputRegFormat)) {
            resultDateForm = {
                ...resultDateForm,
                month: dateException.slice(2, 4),
                year: dateException.slice(-4),
            };
        }
        const outputRegFormatArray = outputRegFormat.split('');
        let separatorNew = outputRegFormatArray.find(el => !/[YDM]/g.test(el));
        separator = separatorNew ?? separator;
        if (/YYYY$/.test(outputRegFormat)) {
            return (resultDateForm.day + separator + resultDateForm.month + separator + resultDateForm.year);
        } else {
            return (resultDateForm.year + separator + resultDateForm.month + separator + resultDateForm.day);
        }
    } else {
        return 'not correct format';
    }
}


fromNowButton.onclick = () => resultDateFromNow.textContent=fromNow(resultDateForm.textContent);

function fromNow(date) {
    if (!date.length || outputDateFormat.value !== 'DD-MM-YYYY') {
        return 'format date to \'DD-MM-YYYY\' please';
    }
    date = date.split('-');
    const dateNow = new Date();
    const day = dateNow.getDate();
    const month = dateNow.getMonth();
    const year = dateNow.getFullYear();
    console.log(date);
    let resultYear = year - date[2];
    let resultMonth = month - date[1];
    let resultDay = day - date[0];
    return (resultDay + ' days,' + resultMonth + ' month,' + resultYear + ' years');

}
