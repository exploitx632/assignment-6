// all plants
const allPlants = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAllPlants(data.plants));
};
const showAllPlants = (plants) => {
  innerHTMLfunc(plants);
};
allPlants();

const cartList = [];

// remove active class function
const removeActiveBtn = () => {
  const removeActive = document.querySelectorAll(".category-btn");
  removeActive.forEach((btn) => btn.classList.remove("active"));
  document.getElementById("cart").style.height = "920px";
};

// spinner function when network throttling
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
      document.getElementById("cart").style.height = "400px";
      showCategoryPlant(data.plants);
    });
};

const innerHTMLfunc = (plants) => {
  const plantsContainer = document.getElementById("plants-container");
  plantsContainer.innerHTML = "";

  plants.forEach((plant) => {
    let plantName = plant.name;
    let plantPrice = plant.price;
    const div = document.createElement("div");
    div.innerHTML = `<div class="p-4 flex flex-col justify-around items-start space-y-5 bg-white rounded-lg max-h-[420px]">
                    <div  class="w-[320px] h-[186px] rounded-md bg-[url(${plant.image})] bg-cover bg-center"></div>
                    
                    <h2 onclick="loadPlantDetails(${plant.id})" class="text-[14px] font-bold cursor-pointer " id="plant-name">${plant.name}</h2>
                    <p class="text-[12px]">${plant.description}</p>
                    <div class="text-[14px] flex flex-row justify-between w-full h-[28px] items-center">
                        <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-3xl">${plant.category}</button>
                        <p class="font-bold">৳${plant.price}</p>
                    </div>
                    <button onclick="cartAdd('${plantName}',${plantPrice})" class="btn text-white bg-[#15803D] w-full add-cart">Add to Cart</button>
                </div>`;
    plantsContainer.appendChild(div);

    // let price = plant.price;
  });
};
// show all of the plant by clicking its category
const showCategoryPlant = (plants) => {
  manageSpinner(false);
  innerHTMLfunc(plants);
};
const cartAdd = (name, price) => {
  const addedItem = cartList.find((item) => item.name === name);
  if (addedItem) {
    addedItem.quantity += 1;
  } else {
    cartList.push({ name, price, quantity: 1 });
  }
  updateCart();
};
const updateCart = () => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  let totalPrice = 0;
  cartList.forEach((item, ind) => {
    totalPrice += item.price * item.quantity;
    const div = document.createElement("div");
    div.innerHTML = `
  <div class="h-[64px] w-full p-[15px] bg-[#F0FDF4] rounded-lg mb-3 flex justify-between items-center">
    <div class="flex-1">
        <h2 class="text-[14px] font-semibold">${item.name}</h2>
            <p class="text-[14px]">${item.price} * ${item.quantity}</p>
        </div>
        <div class="remove-btn h-8 w-8 flex justify-center items-center">X</div>
    </div>
    `;

    // delete item from cart
    div.querySelector(".remove-btn").addEventListener("click", () => {
      cartList.splice(ind, 1);
      updateCart();
    });
    cartContainer.appendChild(div);
  });
  document.getElementById("total-price").innerText = `${totalPrice}`;
};

// fetch api for get plants details
const loadPlantDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showPlantDetails(data.plants));
};

// show plants detail from api
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
