import './style.css'

var value = ""
const buttons = document.querySelectorAll(".grid-item")
buttons.forEach(button=>button.addEventListener("click",(e)=>{
  // console.log(parseInt(e.target.innerHTML))
  value +=e.target.innerHTML
  console.log(parseInt(value))

}))