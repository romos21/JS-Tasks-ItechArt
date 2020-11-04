const inputArrayHTMLElement = document.getElementById('array');
const resultHTMLElement = document.getElementById('result');
const searchButtonHTMLElement = document.getElementById('search-button');
const sequenceButtonHTMLElement = document.getElementById('sequence-button');
const maximalSumButtonOn2HTMLElement = document.getElementById('maximal-sum-button-0n2');
const maximalSumButtonOn1HTMLElement = document.getElementById('maximal-sum-button-0n1');

inputArrayHTMLElement.onchange = () => {
    objectArrProcessTools.arr = inputArrayHTMLElement.value.trim().split(' ').map(el => Number(el));
    console.log(objectArrProcessTools.arr);
};

const objectArrProcessTools = {
    arr: [],
    arrElCheck: function () {
        if (this.arr.includes(NaN)) {
            resultHTMLElement.style.backgroundColor = '#f85454'
            resultHTMLElement.textContent = 'some element(s) in array is not correct. Result could fail';
            return false;
        }
        resultHTMLElement.style.backgroundColor = '#56e360';
        return true;
    },
    negativeNumbersCheck: function (){
        const arrTmpM = this.arr.filter(el => el < 0);
        if (arrTmpM.length === this.arr.length) {
            let result = this.search().split('').filter(el => Number(el));
            return -result[0];
        }
        return null;
    },
    subSumOn1: function () {
        const negativeNumbersAll=this.negativeNumbersCheck();
        if(negativeNumbersAll){
            return negativeNumbersAll;
        }
        let arrTmp = this.arr;
        let maxSum = 0;
        let currSum = 0;
        for (let i = 0; i < arrTmp.length; i++) {
            if (currSum + arrTmp[i] >= 0) {
                currSum += arrTmp[i];
            }
            if (currSum > maxSum) {
                maxSum = currSum;
            }
        }
        return maxSum;
    },
    subSumOn2: function () {
        const negativeNumbersAll=this.negativeNumbersCheck();
        if(negativeNumbersAll){
            return negativeNumbersAll;
        }
        let sum = 0;
        let currentSum = 0;
        for (let i = 0; i < this.arr.length; i++) {
            console.log('i++ ' + i);
            while (this.arr[i] < 1 && i < this.arr.length) {
                console.log('<0');
                i++;
            }
            currentSum = this.arr[i];
            if (currentSum > sum) {
                sum = currentSum;
            }
            if (i === this.arr.length - 1) {
                console.log(this.arr[i] + ' last el');
                console.log('curS:' + currentSum, 'sum: ' + sum, 'in I');
                break;
            }
            for (let j = i + 1; j < this.arr.length; j++) {
                console.log(this.arr[i], this.arr[j], currentSum);
                if ((this.arr[j] < 0) && (Math.abs(this.arr[j]) > currentSum)) {
                    console.log('- Elem: ' + this.arr[j]);
                    i = j;
                    if (currentSum > sum) {
                        sum = currentSum;
                    }
                    break;
                } else {
                    console.log('Суммируем');
                    currentSum += this.arr[j];
                }
                console.log('curS:' + currentSum, 'sum: ' + sum, 'in J');
                if (currentSum > sum) {
                    sum = currentSum;
                }
            }
        }
        return sum;
    },
    search: function () {
        let arrTmp = [];
        arrTmp = this.arr.map(el => {
            if (!arrTmp.includes(el)) {
                return el;
            }
        })
        console.log(arrTmp);
        const arrLength = arrTmp.length;
        if (!arrLength) {
            console.log('array is empty');
            return 'array is empty';
        }
        let max = arrTmp[0], min = arrTmp[0];
        let canFindMiddle = arrLength % 2;
        let mid = canFindMiddle ? arrTmp[0] : '';
        if (arrLength === 1) {
            return 'max: ' + arrTmp[0] + ' min: ' + arrTmp[0] + ' middle:' + arrTmp[0];
        }
        if (arrLength === 2) {
            if (arrTmp[1] > arrTmp[0]) {
                return 'max: ' + arrTmp[1] + ' min: ' + arrTmp[0] + ' middle:' + mid;
            }
            return 'max: ' + arrTmp[0] + ' min: ' + arrTmp[1] + ' middle:' + mid;
        }
        for (let i = 1; i < arrLength; i++) {
            let lessElementsLength = 0, greatElementsLength = 0;
            for (let j = 0; j < arrLength && canFindMiddle; j++) {
                console.log('arrTmp[i]:' + arrTmp[i], 'arrTmp[j]:' + arrTmp[j]);
                if (j !== i) {
                    if (arrTmp[j] < arrTmp[i]) {
                        lessElementsLength++;
                    } else {
                        greatElementsLength++;
                    }
                }
            }
            if (lessElementsLength === greatElementsLength) {
                mid = arrTmp[i];
            }
            if (this.arr[i] > max) {
                max = this.arr[i];
            }
            if (this.arr[i] < min) {
                min = this.arr[i];
            }
        }
        return 'max: ' + max + ' min: ' + min + ' middle:' + mid;
    },
    sequence: function () {
        let resultSequenceLength = 1;
        let currentSequenceLength = 1;
        for (let i = 0; i < this.arr.length - 1; i++) {
            currentSequenceLength = 1;
            for (let j = i; j < this.arr.length; j++) {
                if (this.arr[j] < this.arr[j + 1]) {
                    currentSequenceLength++;
                } else {
                    i = j;
                    break;
                }
            }
            if (currentSequenceLength > resultSequenceLength) {
                resultSequenceLength = currentSequenceLength;
            }
        }
        return resultSequenceLength;
    }
}


searchButtonHTMLElement.onclick = () => {
    if (objectArrProcessTools.arrElCheck()) {
        resultHTMLElement.textContent = objectArrProcessTools.search().toString()
    }
};

sequenceButtonHTMLElement.onclick = () => {
    if (objectArrProcessTools.arrElCheck()) {
        resultHTMLElement.textContent = objectArrProcessTools.sequence().toString();
    }
};

maximalSumButtonOn2HTMLElement.onclick = () => {
    if (objectArrProcessTools.arrElCheck()) {
        resultHTMLElement.textContent = objectArrProcessTools.subSumOn2().toString();
    }
}

maximalSumButtonOn1HTMLElement.onclick = () => {
    if (objectArrProcessTools.arrElCheck()) {
        resultHTMLElement.textContent = objectArrProcessTools.subSumOn1().toString();
    }
}

