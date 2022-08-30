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
        // if last char of processText is '=', remove previous operation
        if(Number(processText[processText.length - 1]) === '='){
            process.textContent = '';
        }
        result.textContent += clickedValue;
        
    }
    // btn is dot
    else if(clickedValue === '.'){
        let resultText = result.textContent;
        if(resultText[resultText.length -1] === '.'){
            alert('You already have decimal point.')
        }else if(resultText === ''){
            result.textContent = '0.'
        }else{
            result.textContent += clickedValue;
        }
    }
    // btn is =
    else if(clickedValue === '='){
        // the equation end with operator
        if(result.textContent === ''){
            alert('You can not end an equation with non number character.');
        }else{
            process.textContent = process.textContent + result.textContent + '=';
            let processWithoutEquation = process.textContent.slice(0, -1);
            console.log({processWithoutEquation});
            console.log(`length of processWithoutEquation:${processWithoutEquation.length}`);
            // Find indexes of operator
            let index = [];
             for(let i=0;i<processWithoutEquation.length;i++){
                if(isNaN(Number(processWithoutEquation[i]))) index.push(i);
             }
            console.log({index});
            console.log(`index length: ${index.length}`);

             // separate string into array of number and operators
             let processArray = [];
             let number = '';
             for(let i = 0; i < processWithoutEquation.length; i++){
                for(let j = 0; j < index.length; j++){
                    
                    // find out number in processArray
                    if(i !== Number(index[j])){                       
                        number += processWithoutEquation[i];
                        console.log(`i: ${i}`);
                    }
                    // if find out operator, push number and operator into processArray
                    else if(i === Number(index[j])){
                        console.log({number});
                        processArray.push(number);
                        processArray.push(processWithoutEquation[i]);
                        number = '';
                    }
                    // reach last index, push last number
                    else if(i === processWithoutEquation.length - 1){
                        processArray.push(number);
                    }
                }
             }
             console.log({processArray});

             // loop through processArray, first of all, find '*' and '/' and operate it, 
             // remove items of the operator, items before and after the operator, 
             // push result into processArray; latter, find '+' and '-', and do the above
             for(let i = 0; i < processArray.length; i++){
                let answer = '';
                if(processArray[i] === '*') answer = operate(multiply, Number(processArray[i - 1]),Number(processArray[i + 1]));             
                else if(processArray[i] === '/') answer = operate(divide, Number(processArray[i - 1]),Number(processArray[i + 1]));
                processArray.splice(i - 1, 3, answer);               
             }

             for(let i = 0; i < processArray.length; i++){
                let answer = '';
                if(processArray[i] === '+') answer = operate(add, Number(processArray[i - 1]),Number(processArray[i + 1]));             
                else if(processArray[i] === '-') answer = operate(subtract, Number(processArray[i - 1]),Number(processArray[i + 1]));
                processArray.splice(i - 1, 3, answer);               
             }
             result.textContent = processArray[0];
             console.log({processArray});
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