import './style.css'
import $ from "jquery"
const cl = console.log.bind(document)

var firstValue = ""
var secondValue = "";
var historyArray =[];
var historyValues =[];
var symbol = "";



var isDot = false;
var isRoot = false;
var isCalc = false;
var isSquare = false

// TODO:
// Implement new button actions
// Repeating calcultations
// 

const numberArray = ["0","1","2","3","4","5","6","7","8","9"]
const calcArray = ["*","/","+","-"]
const buttons = document.querySelectorAll('input[type="button"]')
const displayResult = document.getElementById("displayResult")


// Init square button and Listener
const square = document.getElementById("square")
$(square).on("click",()=>{
  if(isCalc && !isSquare){
    secondValue = secondValue + "²"
    isSquare = true
    displayResult.value = firstValue + " " + `${symbol} ${secondValue}`
  
  }
  else if(!isCalc && !isSquare)
  {
    firstValue = firstValue+ "²" 
    isSquare = true
    displayResult.value = firstValue 
  
  }
})

// Init deleteButton and Listener
const deleteButton = document.getElementById("deleteButton")
$(deleteButton).on("click",()=>{

//if is not empty delete
// switch case for every letter you delete if is square disable is square

if (isCalc){
switch(secondValue.slice(-1)){
  case ".":
    isDot = false  
    break;
  case "√":
    isRoot = false;
    break;
  case "²":
    isSquare = false
    break; 
  default:
}
secondValue = secondValue.slice(0,-1)

displayResult.value = firstValue + " " + `${symbol} ${secondValue}`
}
else{
  switch(firstValue.slice(-1)){
    case ".":
      isDot = false  
      break;
    case "√":
      isRoot = false;
      break;
    case "²":
      isSquare = false
      break; 
    default:
  }
  firstValue = firstValue.slice(0,-1)
  displayResult.value = firstValue 

}

})

// dot button init and listener
const dot = document.getElementById("dot")
$(dot).on("click",()=>{
if(isCalc && !isDot){
  secondValue += "."
  isDot = true
  displayResult.value = firstValue + " " + `${symbol} ${secondValue}`

}
else if(!isCalc && !isDot)
{
  firstValue += "."
  isDot = true
  displayResult.value = firstValue 

}
})
//Square Root Init and Listener
const squareRoot = document.getElementById("squareRoot")
$(squareRoot).on("click",()=>{
if(isCalc && !isRoot){
  secondValue = "√" + secondValue
  isRoot = true
  displayResult.value = firstValue + " " + `${symbol} ${secondValue}`

}
else if(!isCalc && !isRoot)
{
  firstValue = "√" + firstValue
  isRoot = true
  displayResult.value = firstValue 

}
})

//Clear button init and listener
const clear = document.getElementById("clear")
$(clear).on("click",()=>{
  displayResult.value = ""
  isCalc = false
  firstValue = ""
  secondValue = ""
  isDot = false
  isRoot = false

})


buttons.forEach(button =>{
  if (numberArray.includes(button.value))
  {
    button.addEventListener("click",(e)=>{
      if(isCalc){
       secondValue += e.target.defaultValue
       if (firstValue.length ==0){
        firstValue = "0";
       }
       displayResult.value = firstValue + " " + `${symbol} ${secondValue}`

      }
      else{
        firstValue += e.target.defaultValue
        displayResult.value = firstValue 
      }
    })
  }
  else if 
  (calcArray.includes(button.value) ){
    button.addEventListener("click",(e)=>{
      getCalcData(e.target.defaultValue)
    })
  }
} )

function getCalcData(input){
  symbol = input
  isCalc = true
  isDot = false
  isRoot = false
  isSquare = false
  displayResult.value = firstValue + " " + `${symbol} ${secondValue}`
}


$("#showResults").on("click",()=>{
  var finalRes;
  var specialFirst
  var specialSecond

  if( firstValue.includes("√")){

    specialFirst = firstValue.replace("√","")
    specialFirst = Math.sqrt(parseFloat(specialFirst))
  }
  if (secondValue.includes("√")){
    specialSecond = secondValue.replace("√","")
    specialSecond = Math.sqrt(parseFloat(specialSecond))
    }

    if(firstValue && firstValue.includes("²")){
      specialFirst = firstValue.replace("²","")
      specialFirst = parseFloat(specialFirst) * parseFloat(specialFirst)
    }
    if (secondValue.includes("²")){
      specialSecond = secondValue.replace("²","")
      specialSecond = parseFloat(specialSecond) * parseFloat(specialSecond)
      }


  switch(symbol){
    case "+" : 
    finalRes = parseFloat(specialFirst ? specialFirst : firstValue) + parseFloat(specialSecond ? specialSecond : secondValue)
    break;
    case "-":
    finalRes = parseFloat(specialFirst ? specialFirst : firstValue) - parseFloat(specialSecond ? specialSecond : secondValue)
    break;
    case "*":
    finalRes = parseFloat(specialFirst ? specialFirst : firstValue) * parseFloat(specialSecond ? specialSecond : secondValue)
    break;
    case "/":
    finalRes = parseFloat(specialFirst ? specialFirst : firstValue) / parseFloat(specialSecond ? specialSecond : secondValue)
    break;
    default:
    finalRes = parseFloat(specialFirst ? specialFirst : firstValue)

  }

  if (finalRes || finalRes === 0){
  
  historyArray.push(`${firstValue} ${symbol} ${secondValue} = ${finalRes}`)
  historyValues.push({
    firstValue: firstValue,
    symbol: symbol,
    secondValue : secondValue,
  })
  $("#history").empty()     
  var listSelector = $("#history")
  $.each(historyArray, function(i, item) {
      listSelector.append(`<li class="history-text">${item}<button id=${i} class="history-button">Revert</button></li>`)
  });
  displayResult.value = finalRes
  isCalc = false
  isDot = false
  firstValue = finalRes
  secondValue = ""
  setupHistoryButtons()

  }
})


function setupHistoryButtons(){
var historyButtons = document.querySelectorAll(".history-button")
historyButtons.forEach(button =>{
button.addEventListener("click",function(){

  firstValue = historyValues[this.id].firstValue
  symbol = historyValues[this.id].symbol
  secondValue = historyValues[this.id].secondValue
  isCalc = true
  displayResult.value = `${historyValues[this.id].firstValue} ${historyValues[this.id].symbol} ${historyValues[this.id].secondValue}`
})
})
}