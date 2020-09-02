
// Create Dino Constructor
    const tileTypes = ["anklyosaurus", "brachiosaurus", "elasmosaurus", "pteranodon", "human", "tyrannosaurus rex", "stegosaurus", "triceratops", "pigeon"];

    let Dinosaur = function(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

    // Create Dino Objects
    const dinosData = {};
    fetch("./dino.json")
            .then((response) => response.json())
            .catch((error) => console.error("Error reading dinosaurs file!"))
            .then((data) => {
                data.Dinos.forEach((aDino) => {
                    dinosData[aDino.species.toLowerCase()] = aDino;
                })
            })


    // Use IIFE to get human data from form
    const getHumanData = (function() {
        return function() {
            const name = document.getElementById("name").value;
            const heightFeet = document.getElementById("feet").value;
            let heightInches = document.getElementById("inches").value;
            if (!heightInches) {heightInches = 0};
            const weight = document.getElementById("weight").value;
            return {name: name, heightInches: heightInches + heightFeet * 12, weight: weight}
        }
    })()

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen

function getMissingFieldFromForm() {
    const nameField = document.getElementById("name").value;

    if (!nameField) {
        return "Name";
    }

    const heightField = document.getElementById("feet").value;
    if (!heightField) {
        return "Height";
    }

    const weightField = document.getElementById("weight").value;
    if (!weightField) {
        return "Weight";
    }
    return null;
}

// On button click, prepare and display infographic
document.getElementById("btn").onclick = () => {

    const errorMessageNode = document.getElementById("formMessage");
    errorMessageNode.innerHTML = ``;
    const missingField = getMissingFieldFromForm();
    if (missingField) {
        errorMessageNode.innerHTML = `${missingField} is required!`;
        return false;
    }

    const formData = getHumanData();

    document.getElementById("tryAgainBtn").className="inline-block";

    // Hide form
    const gridNode = document.getElementById("grid");
    document.getElementById("dino-compare").className = "invisible";
    tileTypes.forEach((tileType, index) => {

        const descriptionNode = document.createElement("h3");
        descriptionNode.innerHTML = tileType;
        const trivia = getTriviaForTile(tileType, formData);
        const triviaNode = document.createElement("p");
        triviaNode.innerHTML = trivia;
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "grid-item");
        const image = document.createElement("img");
        image.setAttribute("src", `images/${tileType}.png`);
        newDiv.appendChild(descriptionNode);
        newDiv.appendChild(image);
        newDiv.appendChild(triviaNode);
        gridNode.appendChild(newDiv);
    })

}


document.getElementById("tryAgainBtn").onclick = () => {

    // Remove dinosaur tiles
    const gridNode = document.getElementById("grid");
    while (gridNode.hasChildNodes()) {
        gridNode.removeChild(gridNode.childNodes[0]);
    }

    // Hide this button
    document.getElementById("tryAgainBtn").className="invisible";

    // Show form
    document.getElementById("dino-compare").className = "visible";
}


//TODO: Add trivia for dinosaurs
function getTriviaForTile(species, formData) {
    if (species == "pigeon") {
        return "All birds are dinosaurs."
    } else if (species == "human") {
        return formData.name
    } else {
        return getTriviaForDinosaur(dinosData[species], formData);
    }
}

//TODO: Generate 3 methods to compare dinosaur data with human data
const getTriviaForDinosaur = function(speciesData, humanData) {


    function getTimePeriod() {
        return `Lived during the ${speciesData.when} period`;
    }

    function getLocation() {
        return `Lived in the following regions: ${speciesData.where}`;
    }

    function getFact() {
        return speciesData.fact;
    }

    function compareWeight() {
        const humanName = humanData.name;
        const dinosaurWeight = speciesData.weight
        const humanWeight = humanData.weight;
        if (dinosaurWeight > humanWeight) {
            return `This dinosaur was heavier than ${humanName}: ${dinosaurWeight}lbs vs ${humanWeight}lbs`;
        } else if (dinosaurWeight == humanWeight) {
            return `This dinosaur weighs the same as ${humanName}! ${dinosaurWeight}lbs`;
        } else {
            return `This dinosaur weighs LESS than ${humanName}! ${dinosaurWeight}lbs vs ${humanWeight}lbs`;
        }
    }

    function compareHeight() {
        const humanName = humanData.name;
        const dinosaurHeight = speciesData.height;
        const humanHeight = humanData.height;
        if (dinosaurHeight > humanHeight) {
            return `This dinosaur was taller than ${humanName}: ${dinosaurHeight} inches vs ${humanHeight} inches`;
        } else if (dinosaurHeight == humanHeight) {
            return `This dinosaur was the same height as ${humanName}! ${dinosaurHeight} inches`;
        } else {
            return `This dinosaur was shorter than ${humanName}! ${dinosaurHeight} inches vs ${humanHeight} inches`;
        }
    }

    function compareDiet() {
        const humanName = humanData.name;
        const dinosaurDiet = speciesData.diet
        const humanDiet = humanData.diet;
        if (dinosaurDiet == humanDiet) {
            return `Shared the same diet as ${humanName}`;
        } else {
            return `Enjoyed a different diet than ${humanName}! ${dinosaurDiet} vs ${humanDiet}`;
        }
    }

    // Generate a random fact
    const factOption = Math.floor(Math.random() * 6);
    switch (factOption) {
        case 0: return getTimePeriod(); break;
        case 1: return getLocation(); break;
        case 2: return getFact(); break;
        case 3: return compareWeight(); break;
        case 4: return compareHeight(); break;
        case 5: return compareDiet(); break;
    }
}

//TODO: Write logic to render dinosaur trivia
