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

            //result.textContent = Number(processWithoutEquation);

            // Find indexes of operator
            let index = [];
             for(let i=0;i<processWithoutEquation.length;i++){
                if(isNaN(Number(processWithoutEquation[i]))) index.push(i);
             }
            

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