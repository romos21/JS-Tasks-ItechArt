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
    subSumOn1: function () {
        let arrTmp = this.arr;
        let maxSum = 0;
        let currSum = 0;
        for (let i = 0; i < arrTmp.length; i++) {
            console.log(currSum,arrTmp[i]);
            if (currSum + arrTmp[i] >= 0) {
                currSum += arrTmp[i];
            }else {
                currSum=0;
            }
            if (currSum > maxSum) {
                maxSum = currSum;
            }
        }
        return maxSum;
    },
    subSumOn2: function () {
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
        const arrTmp=this.arr,
            arrLength=arrTmp.length;
        for(let i=1;i<arrLength;i++) {
            for (let j = i; j > 0 && arrTmp[j - 1] > arrTmp[j]; j--) {
                [arrTmp[j - 1], arrTmp[j]] = [arrTmp[j], arrTmp[j - 1]]
            }
        }

        let median=0;

        if(arrLength%2===0){
            median=(arrTmp[arrLength/2]+arrTmp[arrLength/2-1])/2;
        }else {
            median=arrTmp[Math.floor(arrLength/2)];
        }
        return 'max: ' + arrTmp[arrLength-1] + ' min: ' + arrTmp[0] + ' median:' + median;
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

