const searchMeal = document.getElementById("input");
const searchBtn = document.getElementById("search");

// console.log(searchMeal.value);


function fetchMeal() {
  if (searchMeal.value) {
    // console.log(searchMeal.value);
    let URL = `https://themealdb.com/api/json/v1/1/search.php?s=${searchMeal.value}`;

    fetch(URL).then((res) => res.json()).then((meals) => showMeal(meals.meals));
    document.getElementById("noMeal").style.display = "none";
  } else {
    alert("Search for a food first :");
    document.getElementById("noMeal").style.display = "block";
  }
}

function showMeal(meals) {
  // console.log('Show Meal:', meals);
  for (let meal of meals) {
    document.querySelector(".meal-wrapper").innerHTML += `
    <div class="meal-box border border-gray-500 p-5 rounded-xl">
        <img src=${meal.strMealThumb}
        alt=${meal.strMeal}
        class="rounded h-[200px] w-full object-cover">
        <div class="mt-3">
          <h3 class="heading text-white font-semibold text-3xl">${meal.strMeal}</h3>
          <p class="text-gray-400 my-3">${meal.strInstructions.slice(0, 100)} ...</p>
          <p class="text-white text-2xl my-3"><span> ${meal.strArea} </span> <span>${meal.strCategory}</span></p>
          <div class="my-4">
            <a href=${meal.strYoutube} target="_blank" class=" btn">Watch</a>
            <button class="text-white text-xl" onclick= "mealDetails('${meal.idMeal}')">View Recipe</button>
          </div>
        </div>
      </div>
    `
  }
}

function mealDetails(id) {
  console.log(id);
  let URL = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  fetch(URL).then((res) => res.json()).then((meals) => mealDetailsPopup(meals.meals[0]));
}

function mealDetailsPopup(meal) {
  console.log(meal);
  const mealPopup = document.getElementById("mealPopup");
  mealPopup.classList.add("visible");
  mealPopup.classList.remove("invisible");

  mealPopup.innerHTML = `
  <div class="popup bg-white p-5 w-[70%] min-h-[500px]">
    <h2 class="text-2xl font-bold mb-4">${meal.strMeal}</h2>
    <p class="text-gray-700 mb-5">${meal.strInstructions}</p>
    <a href=${meal.strYoutube}
    class="mt-5 py-2 px-4 rounded btn">
                Watch
    </a>
    <button onclick="closePopup()" class=" mx-3 px-4 py-3 bg-purple-500 hover:bg-purple-700 text-red-500 rounded">
                Close
    </button>
  </div>
  
  `

}

function closePopup() {
  mealPopup.classList.add("invisible");
  mealPopup.classList.remove("visible");
}



// 54: 26 / 1:05: 45
// https://themealdb.com/api.php

searchBtn.addEventListener("click", () => {
  fetchMeal();
});



