const creaturesUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const creatureName = document.getElementById("creature-name");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureTypes = document.getElementById("types");
const specialStrength = document.getElementById("creature-strength");
const creatureId = document.getElementById("creature-id");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

let dataArr = [];




const fetchData = async () => {
    try {
        const res = await fetch(creaturesUrl);
        const data = await res.json();
        console.log(data);
        dataArr = data;
    } catch (err) {
        console.log(err);
    }
}
fetchData();

const findMatch = (input) => {
    const inputNormalized = isNaN(input) ? input.toLowerCase() : Number(input);
    const match = dataArr.find((creature) => creature.id === inputNormalized  || creature.name.toLowerCase() === inputNormalized);
        if (match) {
            getCreatureData(match.name);
        } else {
            alert("Creature not found");
        }
    }


const updateUI = (data) => {
    const {height, id, name, special, stats, types, weight } = data;
    const { name: specialName, description } = special;
    creatureName.textContent = name.toUpperCase();
    creatureId.textContent = `#${id}`;
    creatureWeight.innerText = `Weight: ${weight}`;
    creatureHeight.innerText = `Height: ${height}`;

    creatureTypes.innerHTML = types.map((item) => {
        return `<div class="${item.name}">${item.name.toUpperCase()}</div>\n`
    }).join("");

    specialStrength.innerHTML = `
    <strong>${specialName}</strong>
    <p>${description}</p>
    `;

    stats.forEach((stat) => {
        const element = document.getElementById(stat.name);
        if (element) {
            element.textContent = stat.base_stat;
        }
    });
    
    

}

const getCreatureData = async (nameOrId) => {
    try {
        const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${nameOrId}`);
        const data = await res.json();
        updateUI(data);
    } catch (err) {
        console.log(err);
    }
} 

searchButton.addEventListener("click", ()=> {
    findMatch(searchInput.value);
});

searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        findMatch(searchInput.value);
    }
})