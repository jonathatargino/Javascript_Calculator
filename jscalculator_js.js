var numbers = document.querySelectorAll(".number"),
display = document.querySelector("#display"),
clear = document.querySelector("#clear"),
equal = document.querySelector("#equals"),
operators = document.querySelectorAll(".opr"),
dot = document.querySelector("#dot"),
firstNum = '',
secondNum = '',
operator = '',
result = '';

const floatMath = function(first, second, operator){
  let decimalPlaces_first = first.slice(first.indexOf('.')).length - 1,
  decimalPlaces_second = second.slice(second.indexOf('.')).length - 1,
  firstWithoutDot = parseInt(first.replace(".", "")),
  secondWithoutDot = parseInt(second.replace(".", ""));
  switch(operator){
    case '+':
      if(decimalPlaces_first > decimalPlaces_second){
        return (firstWithoutDot + (secondWithoutDot * 10**(decimalPlaces_first - decimalPlaces_second))) / (10**(decimalPlaces_first));
      }else {
        return ((firstWithoutDot * 10**(decimalPlaces_second - decimalPlaces_first)) + secondWithoutDot) / (10**(decimalPlaces_second));
      }
      break;
    case '-':
      if(decimalPlaces_first > decimalPlaces_second){
        return (firstWithoutDot - (secondWithoutDot * 10**(decimalPlaces_first - decimalPlaces_second))) / (10**(decimalPlaces_first));
      }else {
        return ((firstWithoutDot * 10**(decimalPlaces_second - decimalPlaces_first)) - secondWithoutDot) / (10**(decimalPlaces_second));
      }
      break;
    case '*':
      return (firstWithoutDot * secondWithoutDot) / (10**(decimalPlaces_first + decimalPlaces_second));
      break;
    case '/':
      return first / second
  }
}

const setNum = function(number){
  if(result){
    result = ''
    firstNum = ''
    secondNum = ''
    display.innerHTML = ''
    display.innerHTML += number.getAttribute('value');
    firstNum += number.getAttribute('value');
  }else{
    display.innerHTML += number.getAttribute('value');
    firstNum += number.getAttribute('value');
  }
}

const moveNum = function(){
  secondNum = firstNum;
  firstNum = '';
}

numbers.forEach((number) => {
  number.addEventListener("click", (event) => {
     setNum(number);
   })
})

dot.addEventListener("click", (event) => {
  if(firstNum === ''){
    firstNum = '0.';
    display.innerHTML += '0.';
  }else if(firstNum.indexOf('.') > -1){
  }else{
    firstNum += '.';
    display.innerHTML += '.';
  }
})

operators.forEach((opr) => {
  opr.addEventListener("click", (event) => {
    display.innerHTML += event.target.textContent;
    operator = event.target.getAttribute('data');
    moveNum();
  })
})

equals.addEventListener("click", (event) => {
  switch(operator){
    case 'divided by':
      result = parseFloat(secondNum) / parseFloat(firstNum);
      break;
    case 'times':
      result = floatMath(secondNum, firstNum, '*');
      break;
    case 'plus':
      result = floatMath(secondNum, firstNum, '+');
      break;
    case 'minus':
      result = floatMath(secondNum, firstNum, '-');
      break;
    default:
      result = floatMath(secondNum, firstNum, '/')
  }if(!(result) && result != 0){
    result = 'you broke it'
    display.innerHTML = result
  }else{
    if(result % 1 === 0){
      display.innerHTML = parseInt(result);
    }else{
      display.innerHTML = result;
    }
  }
})

clear.addEventListener("click", (event) => {
  display.innerHTML = '';
  firstNum = '';
  secondNum = '';
  operator = '';
})