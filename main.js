import './style.css'
import $ from "jquery"

var firstValue = ""
var secondValue = ""
var isCalc = false
var symbol = ""
var isDot = false

const numberArray = ["0","1","2","3","4","5","6","7","8","9"]
const calcArray = ["*","/","+","-"]
const buttons = document.querySelectorAll('input[type="button"]')
const result = document.getElementById("result")
const dot = document.getElementById("dot")

$(dot).on("click",()=>{
if(isCalc && !isDot){
  secondValue += "."
  isDot = true
  result.value = firstValue + " " + `${symbol} ${secondValue}`

}
else if(!isCalc && !isDot)
{
  firstValue += "."
  isDot = true
  result.value = firstValue 

}
})

const clear = document.getElementById("clear")

$(clear).on("click",()=>{
  result.value = ""
  isCalc = false
  firstValue = ""
  secondValue = ""
  isDot = false
})
buttons.forEach(button =>{
  if (numberArray.includes(button.value))
  {
    button.addEventListener("click",(e)=>{
      if(isCalc){
       secondValue += e.target.defaultValue
       if (firstValue.length ==0){
        firstValue = 0;
       }
       result.value = firstValue + " " + `${symbol} ${secondValue}`

      }
      else{
        firstValue += e.target.defaultValue
        result.value = firstValue 
      }
    })
  }
  else if 
  (calcArray.includes(button.value) ){
    button.addEventListener("click",(e)=>{
      getData(e.target.defaultValue)
    })
  }
} )

function getData(input){
  
  symbol = input
  if (!isCalc){
    isCalc = true
    isDot = false
    result.value = firstValue + " " + `${symbol} ${secondValue}`
  
    }
  console.log(typeof input)
}
$("#showResults").on("click",()=>{
  console.log("s")
  console.log(symbol)
  var finalRes;
  switch(symbol){
    case "+" : 
    finalRes = parseFloat(firstValue) + parseFloat(secondValue)
    break;
    case "-":
    finalRes = parseFloat(firstValue) - parseFloat(secondValue)
    break;
    case "*":
    finalRes = parseFloat(firstValue) * parseFloat(secondValue)
    break;
    case "/":
    finalRes = parseFloat(firstValue) / parseFloat(secondValue)
    break;
    default:
      finalRes = firstValue
  }
  result.value = finalRes
  isCalc = false
  isDot = false
  firstValue = ""
  secondValue = ""
})
