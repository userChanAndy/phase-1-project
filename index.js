//json server api
const coffeeShopData = `http://localhost:3000/coffeeShops`

//run javascript async whie DOM is loading
document.addEventListener("DOMContentLoaded", () => shopBtn()) 
document.addEventListener("DOMContentLoaded", () => locateUser())

//grab from html
const buttonContainer = document.querySelector("#button-container")
const imgContainer = document.querySelector("#img-container")
const homePage = document.querySelector(".homePage")
const modal = document.querySelector(".modal")
// exitModal = document.querySelector(".exitModal")

//create html elements being rendered to dom 
const images = document.createElement("img")
images.id = "imgs"
const shopInfo = document.createElement("div")
shopInfo.id = "info"
const shopName = document.createElement("h1")
shopName.id = "shopName"
const shopAddress = document.createElement("button")
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
const submit = document.createElement("input")
submit.type = "submit"
submit.value = "submit"
const deleteBtn = document.createElement("button")
deleteBtn.id = "deleteBtn"
const like = '🤍'
const liked = '❤️'
const reviewSection = document.createElement("div")
reviewSection.id = "reviewSection"
const reviewSubmitted = document.createElement("p")
reviewSubmitted.id = "reviewSubmitted"


// take coffeeShops names and append to dom as buttons
// take coffeeShops images and renders them on DOM
const shopBtn = () => {
    fetch(coffeeShopData)
    .then(res => res.json())
    .then(shopData => shopIterator(shopData))
}

//iterate through shops and create button for each shop
const shopIterator = (shopData) => {
    shopData.forEach(shop => {
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
const generator = shop => {
//hides default home text
    homePage.style.display = "none" 
//render image on DOM
    renderImgs(shop)
//prepare div containing description
    renderShopInfo(shop)
//render shop name to DOM
    renderShopName(shop)
// render shop address to DOM
    renderShopAddress(shop)
//render like button
    renderLikeButton(shop)
//render submit review form
    renderSubmit(shop)
//render delete review butn
    renderDelete(shop)
}

const renderImgs = shop => {
    imgContainer.innerHTML= ""
    images.src = shop.image
    imgContainer.appendChild(images)
}

const renderShopInfo = shop => {
    shopInfo.innerHTML = ""
    imgContainer.appendChild(shopInfo)
}

const renderShopName = shop => {
    shopName.innerHTML = ""
    shopName.innerHTML = shop.name
    shopInfo.appendChild(shopName)
}

const renderShopAddress = shop => {
    shopAddress.innerHTML = ""
    shopAddress.innerHTML = shop.address
    shopInfo.appendChild(shopAddress)
}

shopAddress.addEventListener("click", event => {
    event.preventDefault()
    modal.style.display = "flex"
})

const renderLikeButton = shop => {
    liker.innerHTML = ""
    liker.innerHTML = like
    shopInfo.appendChild(liker)
}

liker.addEventListener("click", event => {
    event.preventDefault()
    likeHandler()
})

const likeHandler = () => {
    if(liker.innerHTML === like) {
        liker.innerHTML = ""
        liker.innerHTML = liked
      } else {
        liker.innerHTML = ""
        liker.innerHTML = like
      }
}

const renderSubmit = shop => {
    label.innerHTML = "Leave a Review:  "
    form.appendChild(label)
    form.appendChild(input)
    form.appendChild(submit)
    shopInfo.appendChild(form)
}

//event listener on submit calls submitHandler for every submit is being submitted
submit.addEventListener("click", event => {
    event.preventDefault()
    submitHandler()
})


const submitHandler = () => {
    reviewSubmitted.innerHTML = input.value
    shopInfo.appendChild(reviewSection)
    reviewSection.appendChild(reviewSubmitted)
    reviewSection.style.display = "flex"
    form.reset()
}

const renderDelete = () => {
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

 //render modal functionality
document.querySelector(".exitModal").addEventListener("click", event => {
    event.preventDefault()
    modal.style.display = "none"
})


const exitModalHandler = () => {
    modal.style.display = "none"
}

//mapbox API
mapboxgl.accessToken = "pk.eyJ1IjoiZGV2a2luZ2FuZHkiLCJhIjoiY2t2aTgyNXFsMXdtdzJucWY2M3J4dmZ6eiJ9.klv-mYgNLY27BsMOP9l-Mg"
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
});


//gets user location
const  locateUser = () => navigator.geolocation.getCurrentPosition(success, error, {enableHighAccuracy: true})

const success = position => {
    setupMap([position.coords.longitude, position.coords.latitude])
}

const error = () => {
    setupMap([0,0])
}
const setupMap = (center) => {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 15
    });

    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)

    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    })

    map.addControl(directions, "top-left")
}

