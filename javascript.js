async function start(){
    
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        
        createbreedList(data.message)

    
  
   

}
let timer
let deleteFirstePhotoDelay
start()

function createbreedList(breedList){
    document.getElementById("breed").innerHTML = `
                <select onchange="loadByBreed(this.value)">
                    <option>Choose a dog Breed</option>
                    ${Object.keys(breedList).map(function(breed){
                        return `<option>${breed}</option>`               
                        

                    }).join('')}
                </select>
    `

}

async function loadByBreed(breed){
    if(breed != "Choose a dog Breed"){
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideshow(data.message)

    }
}
function createSlideshow(images){
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstePhotoDelay)

    document.getElementById("slideshow").innerHTML =  `
    <img class="slide"  src='${images[0]}'>
    `
    currentPosition +=2
    timer = setInterval(nextSlide, 3000)
    function nextSlide(){
        
        document.getElementById("slideshow").insertAdjacentHTML("beforeend",`<img class="slide"  src='${images[currentPosition]}'>`)
        deleteFirstePhotoDelay = setTimeout(function(){
            document.querySelector(".slide").remove()
        },1000)
        if(currentPosition + 1 >=images.length){
            currentPosition=0

        }else{
            currentPosition++

        }
    
    }
}

