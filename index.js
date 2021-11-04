const coffeeShopData = `http://localhost:3000/coffeeShops`
const buttonContainer = document.querySelector("#main-container")
const imgContainer = document.querySelector("#img-container")
const homePage = document.querySelector(".homePage")
const images = document.createElement("img")
images.id = "imgs"
const shopInfo = document.createElement("div")
shopInfo.id = "info"
const shopName = document.createElement("h1")
shopName.id = "shopName"
const shopAddress = document.createElement("p")
shopAddress.id = "addy"
const liker = document.createElement("button")
liker.id = "like-btn"
const form = document.createElement("form")
form.id = "form"
const label = document.createElement("label")
label.id = "review"
label.for = "review"
const input = document.createElement("input")
input.type = "text"
input.id = "input"
input.name = "review"
const deleteBtn = document.createElement("button")
deleteBtn.id = "deleteBtn"
const deleteButton = document.querySelector("#deleteBtn")
const inputValue = document.querySelector("#input")
const submit = document.createElement("input")
submit.type = "submit"
submit.value = "submit"
const like = '🤍'
const liked = '❤️'
const reviewSection = document.createElement("div")
reviewSection.id = "reviewSection"
const reviewSubmitted = document.createElement("p")
reviewSubmitted.id = "reviewSubmitted"
const shopObj = [""]

// take coffeeShops names and append to dom as buttons
// take coffeeShops images and renders them on DOM
const shopBtn = () => {
    fetch(coffeeShopData)
    .then(res => res.json())
    .then(shopData => shopIterator(shopData)
    )}

//iterate through shops and create button for each shop
const shopIterator = (shops) => {
    shops.forEach(shop => {
        const button = document.createElement("button")
        button.innerHTML=""
        button.id = "btn"
        button.innerHTML = shop.name
        buttonContainer.appendChild(button) 
//add event listener "click" to button
//buttons run generator
        button.addEventListener("click", event => {
            event.preventDefault()
            generator(shop)
        })
    })
}

//generates info and images on DOM
const generator = shopObj => {
//hides default home text
    homePageDelete(shopObj)
//render image on DOM
    renderImgs(shopObj)
//prepare div containing description
    renderShopInfo(shopObj)
//render shop name to DOM
    renderShopName(shopObj)
// render shop address to DOM
    renderShopAddress(shopObj)
//render like button
    renderLikeButton(shopObj)
//render submit review form
    renderSubmit(shopObj)
//render delete review butn
    renderDelete(shopObj)
}

const homePageDelete = shopObj => {
    homePage.style.display = "none"
} 

const renderImgs = shopObj => {
    imgContainer.innerHTML= ""
    images.src = shopObj.image
    imgContainer.appendChild(images)
}

const renderShopInfo = shopObj => {
    shopInfo.innerHTML = ""
    imgContainer.appendChild(shopInfo)
}

const renderShopName = shopObj => {
    shopName.innerHTML = ""
    shopName.innerHTML = shopObj.name
    shopInfo.appendChild(shopName)
}

const renderShopAddress = shopObj => {
    shopAddress.innerHTML = ""
    shopAddress.innerHTML = shopObj.address
    shopInfo.appendChild(shopAddress)
}

const renderLikeButton = shopObj => {
    liker.innerHTML = ""
    liker.innerHTML = like
    shopInfo.appendChild(liker)
    liker.addEventListener("click", event => {
        event.preventDefault()
        likeHandler(shopObj)
    })
}

const likeHandler = shopObj => {
    if(liker.innerHTML === like) {
        liker.innerHTML = ""
        liker.innerHTML = liked
      } else if (liker.innerHTML === liked) {
        liker.innerHTML = ""
        liker.innerHTML = like
      }
}

const renderSubmit = shopObj => {
    label.innerHTML = ""
    label.innerHTML = "Leave a Review:  "
    form.appendChild(label)
    form.appendChild(input)
    form.appendChild(submit)
    shopInfo.appendChild(form)
    submit.addEventListener("click", event => {
        event.preventDefault()
        submitHandler()
    })
}

const submitHandler = shopObj => {
    reviewSubmitted.innerHTML = ""
    reviewSubmitted.innerHTML = input.value
    shopInfo.appendChild(reviewSection)
    reviewSection.appendChild(reviewSubmitted)
    input.value = ""
    reviewSection.style.display = ""
}

const renderDelete = shopObj => {
    deleteBtn.innerHTML = "X"
    reviewSection.appendChild(deleteBtn)
    deleteBtn.addEventListener("click", event => {
        event.preventDefault()
        deleteHandler()
    })
}

const deleteHandler = () => {
    reviewSubmitted.innerHTML = ""
    reviewSection.style.display = "none"
}

//run javascript async whie DOM is loading
document.addEventListener("DOMContentLoaded", () => shopBtn()) 
