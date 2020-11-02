const inputArrayHTMLElement=document.getElementById('array');
const resultHTMLElement=document.getElementById('result');
const searchButtonHTMLElement=document.getElementById('search-button');
const sequenceButtonHTMLElement=document.getElementById('sequence-button');
const maximalSumButtonHTMLElement=document.getElementById('maximal-sum-button');

inputArrayHTMLElement.onchange=()=>{
  object.arr=inputArrayHTMLElement.value.split(' ').map(el=>Number(el));
  console.log(object.arr);
  if(object.arr.includes(NaN)){
      resultHTMLElement.style.backgroundColor='#f85454'
      resultHTMLElement.textContent='some element(s) in array is not correct. Result could fail';
  }
};

const object={
    arr:[],
    subSum: function (){
        let sum = 0;
        let currentSum=0;
        for(let i=0;i<this.arr.length;i++) {
            currentSum = 0;
            for (let j = 0; j < this.arr.length && i + j < this.arr.length; j++) {
                console.log(this.arr[i], this.arr[i + j], currentSum)
                if (this.arr[i] < 0) {
                    break;
                }
                if ((this.arr[i + j] < 0) && (Math.abs(this.arr[i + j]) > currentSum)) {
                    i += j;
                    break;
                } else {
                    currentSum += this.arr[i + j];
                }
            }
            if (currentSum > sum) {
                sum = currentSum;
            }
            return sum;
        }
    },
    search:function (){
        const arrLength=this.arr.length;
        if(!arrLength){
            console.log('array is empty');
            return {};
        }
        if (arrLength===1){
            return {max:this.arr[0],min:this.arr[0],middle:this.arr[0]};
        }
        let max=this.arr[0],min=this.arr[0];
        for (let i=1;i<arrLength;i++){
            if (this.arr[i]>max){
                max=this.arr[i];
            }
            if (this.arr[i]<min){
                min=this.arr[i];
            }
        }
        const middle=this.arr[parseInt(arrLength/2)];
        return 'max: '+max+' mai: '+min+' middle:'+middle;
    },
    sequence: function (){
        let resultSequenceLength=1;
        let currentSequenceLength=1;
        for (let i=0;i<this.arr.length-1;i++) {
            currentSequenceLength=1;
            for (let j = i; j< this.arr.length; j++) {
                if (this.arr[j] < this.arr[j+1]) {
                    currentSequenceLength++;
                } else {
                    i=j;
                    break;
                }
            }
            if(currentSequenceLength>resultSequenceLength){
                resultSequenceLength=currentSequenceLength;
            }
        }
        return resultSequenceLength;
    }
}

searchButtonHTMLElement.onclick=()=>{
    resultHTMLElement.textContent=object.search().toString();
};

sequenceButtonHTMLElement.onclick=()=>{
    resultHTMLElement.textContent=object.sequence().toString();
};

maximalSumButtonHTMLElement.onclick=()=>{
    resultHTMLElement.textContent=object.subSum().toString();
}

