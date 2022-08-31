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
            let array = []; // can not name processArray, which is a built-in function
            let number = '';
            for(let i=0;i<processWithoutEquation.length;i++){
                // item of index match operator in processWithoutEquation  
                // find out operator, push number and operator into array                   
                if(isNaN(Number(processWithoutEquation[i]))){
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

             // loop through processArray, first of all, find '*' and '/' and operate it, 
             // remove items of the operator, items before and after the operator, 
             // push result into processArray; latter, find '+' and '-', and do the above
             let counter = 0;
             let iarray = ['12', '+', '5', 'x', '2','x','2'];
             const length = iarray.length;
             for(let i = 0; i < length; i++){
                 let answer = '';
                 if(iarray[i] === 'x'){
                     answer += operate(multiply, Number(iarray[i - 1]),Number(iarray[i + 1]));  
                     iarray.splice(i - 1, 3, answer);    
                     counter++;       
                     console.log(iarray[i]);
                     console.log({answer});   
                     console.log({iarray});  
                 }else if(iarray[i] === '/'){
                     answer += operate(divide, Number(iarray[i - 1]),Number(iarray[i + 1]));
                     iarray.splice(i - 1, 3, answer);
                 }else { // if reach number, "jumps over" one iteration in the loop
                     continue;
                 };
                 console.log(iarray.length);
                       
             }
             console.log({counter});
            for(let i = 0; i < length; i++){
                let answer = '';
                if(iarray[i] === '+'){
                    answer += operate(add, Number(iarray[i - 1]),Number(iarray[i + 1]));  
                    iarray.splice(i - 1, 3, answer);           
                }else if(iarray[i] === '-'){
                    answer += operate(subtract, Number(iarray[i - 1]),Number(iarray[i + 1]));
                    iarray.splice(i - 1, 3, answer);
                }else {
                    continue;
                };
                console.log(iarray[i]);
                console.log({answer});   
                console.log({iarray});        
            }
             result.textContent = iarray[0];
             console.log({iarray});
             console.log(iarray.length);
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