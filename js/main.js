
//....................Selectors...................

var hidden = document.getElementById('hidden');
var navbar = document.getElementById('navbar');
var logo = document.getElementById('logo');

var links = Array.from(document.querySelectorAll('ul li a'));
var showData = document.getElementById('show');
var searchInput = document.getElementById('search');

var currentMeal;
var member = document.getElementById('car');
var meals = [];
var showModal = document.getElementById('showModal');
var result;


//............call API for GET the data and show it............ 

for(var i = 0; i < links.length; i++){
    links[i].addEventListener('click' , function (e) {
        currentMeal = e.target.text.toLowerCase();
        getAllRecipes(currentMeal);
        showData.classList.replace('d-none','d-block');
        hidden.classList.add('d-none');
    })
}


// .......................................looking in input for Data to show it.........................

searchInput.addEventListener('input' , function (){
    if(searchInput.value != null || searchInput.value != undefined)
    {
        currentMeal =  this.value.toLowerCase();
        getAllRecipes(currentMeal);
        showData.classList.replace('d-none','d-block');
    }
    else
    {
        showData.classList.replace('d-block','d-none');
    }
})


// .........................................call Api.................................

async function getAllRecipes(index){
    try
    {
        var myHttp = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${index}`);
        myHttp = await myHttp.json();
        meals = myHttp.recipes;
        displayData();
    }
    catch (error) {
        onerror = true;
    }
}


// .....................display Data after get it...............................

function displayData(){
    var row = '';
    for(var i = 0; i < meals.length; i++){
        row +=
        `<div class="col-md-4">
            <div class="meal p-3 text-center">
                <img src="${meals[i].image_url}" class="w-100" alt="">
                <h3 class=" my-2">${meals[i].title}</h3>
                <a target="_blank" href="${meals[i].source_url}" class="btn btn-primary text-decoration-none text-white">Source</a>
                <a target="_blank" onclick='getRecipeModal(${meals[i].recipe_id})' data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning text-decoration-none text-white">Details</a>
            </div>
        </div>
        `
    }
    member.innerHTML = row;
}


//............call API for GET the data and show it in popup............ 

async function getRecipeModal(index){
    try
    {
        result = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${index}`);
        result = await result.json();
        displayModal(result);
    }
    catch (error) {
        onerror = true;
    }
}

function displayModal(indexMeal){
    var foo =
    `
    <img src="${indexMeal.recipe.image_url}" class="w-100" alt="">
    <h3 class="text-center my-3 bg-warning text-black w-75 mx-auto p-2">${indexMeal.recipe.title}</h3>
    `
    showModal.innerHTML = foo;
}


// ...............if scroll...............

window.addEventListener('scroll' , function(){
    if(this.scroll > 25)
    {
        navbar.classList.add('bg-dark')
        logo.classList.replace('text-danger','text-white');
    }
    else
    {
        navbar.classList.remove('bg-dark')
        logo.classList.replace('text-white','text-danger');
    }
})
