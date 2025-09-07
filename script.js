// all plants
const allPlants = ()=>{
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
    .then(res => res.json())
    .then(data => showAllPlants(data.plants))
}
const showAllPlants = (plants)=>{
    const plantsContainer = document.getElementById("plants-container");
    plantsContainer.innerHTML="";

    plants.forEach(plant =>{
        const div = document.createElement('div');
        div.innerHTML = `<div class="p-4 flex flex-col justify-around items-start space-y-5 bg-white rounded-lg h-full">
                    <img src="${plant.image}" alt="" class="w-[318px] h-[186px] rounded-md">
                    <h2 class="text-[14px] font-bold">${plant.name}</h2>
                    <p class="text-[12px]">${plant.description}</p>
                    <div class="text-[14px] flex flex-row justify-between w-full h-[28px] items-center">
                        <button class="btn bg-[#DCFCE7] text-[#15803D] rounded-3xl">${plant.category}</button>
                        <p class="font-bold">৳${plant.price}</p>
                    </div>
                    <button class="btn text-white bg-[#15803D] w-full">Add to Cart</button>
                </div>`
        plantsContainer.appendChild(div);
    })
}
allPlants();

