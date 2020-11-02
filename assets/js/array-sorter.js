const arrayHTMLElement=document.getElementById('array');
const select=document.getElementById('select');
const buttonSort=document.getElementById('button-sort');
const result=document.getElementById('result');

arrayHTMLElement.onchange=()=>{
    objectSorter.arr=arrayHTMLElement.value.split(' ').map(el=>Number(el));
};


const objectSorter = {
    arr: arrayHTMLElement.value,
    bubbleSort: function () {
        for (let i = 0; i < this.arr.length - 1; i++) {
            for (let j = i + 1; j < this.arr.length; j++) {
                if (this.arr[i] > this.arr[j]) {
                    [this.arr[i], this.arr[j]] = [this.arr[j], this.arr[i]];
                }
            }
        }
    },
    shellSort: function () {
        const l = this.arr.length;
        let gap = Math.floor(l / 2);
        while (gap >= 1) {
            for (let i = gap; i < l; i++) {
                const current = this.arr[i];
                let j = i;
                while (j > 0 && this.arr[j - gap] > current) {
                    this.arr[j] = this.arr[j - gap];
                    j -= gap;
                }
                this.arr[j] = current;
            }
            gap = Math.floor(gap / 2);
        }
    },
    chooseSort: function () {
        for (let i = 0; i < this.arr.length - 1; i++) {
            let min = i;
            for (let j = i + 1; j < this.arr.length; j++) {
                if (this.arr[min] > this.arr[j]) {
                    min = j;
                }
            }
            [this.arr[min], this.arr[i]] = [this.arr[i], this.arr[min]];
        }
    },
    insertionSort: function () {
        for (let i = 1; i < this.arr.length; i++) {
            for (let j = i; j > 0 && this.arr[j - 1] > this.arr[j]; j--) {
                [this.arr[j - 1], this.arr[j]] = [this.arr[j], this.arr[j - 1]];
            }
        }
    }


}


function sortMethodChoose(sortMethod){
    switch (sortMethod) {
        case 'bubble':
            objectSorter.bubbleSort();
            break;
        case 'choose':
            objectSorter.chooseSort();
            break;
        case 'insertion':
            objectSorter.insertionSort();
            break;
        case 'shell':
            objectSorter.shellSort();
            break;
    }
    return objectSorter.arr;
}

 buttonSort.onclick=()=>{
    result.textContent=sortMethodChoose(select.value);
 }
