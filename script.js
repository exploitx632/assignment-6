// all plants
const allPlants = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAllPlants(data.plants));
};
const showAllPlants = (plants) => {
  const plantsContainer = document.getElementById("plants-container");
  plantsContainer.innerHTML = "";

  plants.forEach((plant) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="p-4 flex flex-col justify-around items-start space-y-5 bg-white rounded-lg h-full">
                     <div  class="w-[320px] h-[186px] rounded-md bg-[url(${plant.image})] bg-cover bg-center"></div>
                    <h2 onclick="loadPlantDetails(${plant.id})" class="text-[14px] cursor-pointer font-bold">${plant.name}</h2>
                    <p class="text-[12px]">${plant.description}</p>
                    <div class="text-[14px] flex flex-row justify-between w-full h-[28px] items-center">
                        <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-3xl">${plant.category}</button>
                        <p class="font-bold">৳${plant.price}</p>
                    </div>
                    <button class="btn text-white bg-[#15803D] w-full">Add to Cart</button>
                </div>`;
    plantsContainer.appendChild(div);
  });
};
allPlants();

// remove active class function
const removeActiveBtn = () => {
  const removeActive = document.querySelectorAll(".category-btn");
  removeActive.forEach((btn) => btn.classList.remove("active"));
};

const manageSpinner = (status) => {
  if (status === true) {
    document.getElementById("spinner-container").classList.remove("hidden");
    document.getElementById("all-plants-container").classList.add("hidden");
  } else {
    document.getElementById("all-plants-container").classList.remove("hidden");
    document.getElementById("spinner-container").classList.add("hidden");
  }
};

// all categories
const allCategories = () => {
  manageSpinner(true);
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showAllCategory(data.categories);
    });
};

// show all of the category btn
const showAllCategory = (categories) => {
    manageSpinner(false);
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = " ";
  categoryContainer.innerHTML = `<button onclick="allPlants()" class=" category-btn h-[40px] py-2 px-4 rounded-sm  w-full text-left cursor-pointer hover:bg-green-600" id="categoryBtnAll">All Trees</button>`;

  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <button onclick="categoryPlant(${category.id})" class="category-btn h-[40px] py-2 px-4 rounded-sm  w-full text-left cursor-pointer hover:bg-green-600" id="categoryBtn${category.id}">${category.category_name}</button>`;
    categoryContainer.appendChild(div);
  });
  document.getElementById("categoryBtnAll").addEventListener("click", () => {
    removeActiveBtn();
    document.getElementById("categoryBtnAll").classList.add("active");
  });
};

// plants by categories

const categoryPlant = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveBtn();
      document.getElementById(`categoryBtn${id}`).classList.add("active");
      showCategoryPlant(data.plants);
    });
};

// show all of the plant by clicking its category
const showCategoryPlant = (plants) => {
  manageSpinner(false);
  const plantsContainer = document.getElementById("plants-container");
  plantsContainer.innerHTML = "";

  plants.forEach((plant) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class="p-4 flex flex-col justify-around items-start space-y-5 bg-white rounded-lg h-full">

                    <div  class="w-[320px] h-[186px] rounded-md bg-[url(${plant.image})] bg-cover bg-center"></div>
                    
                    <h2 onclick="loadPlantDetails(${plant.id})" class="text-[14px] font-bold cursor-pointer">${plant.name}</h2>
                    <p class="text-[12px]">${plant.description}</p>
                    <div class="text-[14px] flex flex-row justify-between w-full h-[28px] items-center">
                        <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-3xl">${plant.category}</button>
                        <p class="font-bold">৳${plant.price}</p>
                    </div>
                    <button class="btn text-white bg-[#15803D] w-full">Add to Cart</button>
                </div>`;
    plantsContainer.appendChild(div);
  });
};

const loadPlantDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPlantDetails(data.plants));
};

const showPlantDetails = (plant) => {
  const plantDetailContainer = document.getElementById(
    "plant-detail-container"
  );
  plantDetailContainer.innerHTML = `<h2  class="text-2xl font-bold">${plant.name}</h2>
                    <div class="bg-[url(${plant.image})] h-[200px] w-full rounded-sm bg-cover bg-center"></div>
                    <p ><span class="font-semibold text-xl">Category:</span> ${plant.category}</p>
                    <p ><span class="font-bold">Price:</span> ৳${plant.price}</p>
                    <p> <span class="font-bold">Description:</span> ${plant.description}</p>`;
  document.getElementById("plant_modal").showModal();
};

allCategories();
