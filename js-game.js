




const problemElement = document.querySelector(".problem")

const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointNeeded = document.querySelector(".points-needed")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const  progressBar = document.querySelector(".progress-inner")
const endMessage = document.querySelector(".end-message")
const resetButton = document.querySelector(".reset-button")




/*dette er object*/
let state={
    score:0,
    wrongAnswers:0
}
/*dette function update html elmenentet*/
function updateProblem(){
    state.currenProblem = generateProblem()
    problemElement.innerHTML=`${state.currenProblem.numberOne} ${state.currenProblem.operator} ${state.currenProblem.numberTwo}`

    ourField.value=""
    ourField.focus()

}
updateProblem();


/*genere tal fra 0 til 10 og afrund den*/
function generateNumber(max){
    return Math.floor(Math.random() * max+1)
}
/*dette function retuner et object der har disse property inside*/
function generateProblem(){
    return{
        numberOne: generateNumber(10),
        numberTwo: generateNumber(10),
        operator:['+','-','x',][generateNumber(2)]
    }
}

ourForm.addEventListener("submit",handleSubmit)

    function handleSubmit(e){
        e.preventDefault()

        let correctAnswer
        const p = state.currenProblem
        if(p.operator =="+") correctAnswer = p.numberOne + p.numberTwo
        if(p.operator =="-") correctAnswer = p.numberOne - p.numberTwo
        if(p.operator =="x") correctAnswer = p.numberOne * p.numberTwo



        if(parseInt(ourField.value,10) == correctAnswer){
                state.score++
                pointNeeded.textContent =  10 - state.score
                updateProblem()    
                renderPrograssBar()
        }else{
            state.wrongAnswers++
            mistakesAllowed.textContent = 2 - state.wrongAnswers

            problemElement.classList.add("animate-wrong")
            setTimeout(()=>problemElement.classList.remove("animate-wrong"),1000)
            
        
           
        }


         checkLogic()
    }
    function checkLogic(){
        // if you won 
        if(state.score === 10){
            endMessage.textContent = "Congrats! You Won."
            document.body.classList.add("overlay-is-open")
            setTimeout(() => resetButton.focus(),331)
            
        }

        //if you lost
        if(state.wrongAnswers){
            endMessage.textContent = "Try Again! You Lost."
            document.body.classList.add("overlay-is-open")
            setTimeout(() => resetButton.focus(),331)
            
           
        }

    }
    resetButton.addEventListener("click", resetGame)

    function resetGame(){
        document.body.classList.remove("overlay-is-open")
        updateProblem()
        update.score=0;
        update.wrongAnswers =0;
        pointNeeded.textContent =10;
        mistakesAllowed.textContent=2; 
        renderPrograssBar()

    }

    function renderPrograssBar(){
        progressBar.style.transform =`scaleX(${state.score / 10})`
    }

