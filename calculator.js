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