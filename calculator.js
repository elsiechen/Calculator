let process = document.querySelector('.process');
let result = document.querySelector('.result');
let btns = document.querySelectorAll('button');

btns.forEach(btn => {
    btn.addEventListener('click', display);
});

function display(){
    let clickedValue = this.value;
    
    // btn is AC
    if(clickedValue === 'AC'){
        process.textContent = '';
        result.textContent = '';
    } 
    // btn is number 
    else if(Number(clickedValue) < 10){
        let processText = process.textContent;
        console.log({processText});
        // if last char of processText is '=', remove previous operation, show new number in result
        if(processText[processText.length - 1] === '='){       
            process.textContent = '';
            result.textContent = clickedValue;
        }else{
            result.textContent += clickedValue;
        }
    }
    // btn is dot
    else if(clickedValue === '.'){
        let processText = process.textContent;
        let resultText = result.textContent;
        if(resultText[resultText.length -1] === '.'){
            alert('You already have decimal point.')
        }else if(resultText === ''){
            result.textContent = '0.'
        }else if(processText[processText.length - 1] === '='){
            process.textContent = '';
            result.textContent = '0.';
        }else{
            result.textContent += clickedValue;
        }
    }
    // btn is =
    else if(clickedValue === '='){
        let processText = process.textContent;
        // the equation end with operator
        if(result.textContent === '' && processText){
            alert('You can not end an equation with non number character.');
        }else if(result.textContent === '' && processText === ''){
            alert('Please enter an equation');
        }else if(result.textContent && processText === ''){
            alert('Please enter an operator.');
        }else if(processText[processText.length - 1] === '='){
            alert('You have already entered "=".');
        }else{
            process.textContent = process.textContent + result.textContent + '=';
            let processWithoutEquation = process.textContent.slice(0, -1);
            console.log({processWithoutEquation});

            // Find indexes of operator
            let index = [];
             for(let i=0;i<processWithoutEquation.length;i++){
                //if(isNaN(Number(processWithoutEquation[i]))) index.push(i); this includes decimal point
                if(processWithoutEquation[i] === 'x' ||
                   processWithoutEquation[i] === '/' ||
                   processWithoutEquation[i] === '+' ||
                   processWithoutEquation[i] === '-' 
                )index.push(i);
             }
            console.log({index});
            console.log(`index length: ${index.length}`);

             // separate string into array of number and operators
            let array = []; // can not name processArray, which is a built-in function
            let number = '';
            for(let i=0;i<processWithoutEquation.length;i++){
                // item of index match operator in processWithoutEquation  
                // find out operator, push number and operator into array                   
                if(processWithoutEquation[i] === 'x' ||
                   processWithoutEquation[i] === '/' ||
                   processWithoutEquation[i] === '+' ||
                   processWithoutEquation[i] === '-'
                ){
                    array.push(`${number}`);
                    array.push(`${processWithoutEquation[i]}`);
                    number = '';
                } else { // find number in array
                    number += processWithoutEquation[i];
                    // reach last index, push last number
                    if(i === processWithoutEquation.length - 1){
                        array.push(`${number}`);
                    }
                }
            }
            console.log({array});

             // loop through array, find '*','/','+','-' and operate it to get answer, 
             // remove items of the operator, items before and after the operator, 
             // push answer into array; get the final result
             while(array.includes('x')){
                let index=array.findIndex(e => e === 'x'); 
                let answer = ''; 
                answer += operate(multiply, Number(array[index - 1]), Number(array[index + 1])); 
                array.splice(index - 1, 3, answer); 
            }

            while(array.includes('/')){
                let index=array.findIndex(e => e === '/'); 
                let answer = ''; 
                answer += operate(divide, Number(array[index - 1]), Number(array[index + 1])); 
                array.splice(index - 1, 3, answer); 
            }

            while(array.includes('+')){
                let index=array.findIndex(e => e === '+'); 
                let answer = ''; 
                answer += operate(add, Number(array[index - 1]), Number(array[index + 1])); 
                array.splice(index - 1, 3, answer);
            }

            while(array.includes('-')){
                let index=array.findIndex(e => e === '-'); 
                let answer = ''; 
                answer += operate(subtract, Number(array[index - 1]), Number(array[index + 1])); 
                array.splice(index - 1, 3, answer); 
            }
             result.textContent = Number(array[0]).toFixed(2);
             console.log({array});
        }
    }
    // btn is + - * /
    else{
        if(result.textContent === ''){
            alert(`You must enter a number before entering '${clickedValue}'.`);
        }else{
            process.textContent = process.textContent + result.textContent + clickedValue;
            result.textContent = '';
        }
        
    }
    console.log({clickedValue});
}


function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

function operate(operator, a, b){
    return operator(a, b);
}
