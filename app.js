
// Initialize tile species (in order of display)
const tileTypes = ["anklyosaurus", "brachiosaurus", "elasmosaurus", "pteranodon", "human", "tyrannosaurus rex", "stegosaurus", "triceratops", "pigeon"];

// Internally we store dinosaur and human height in inches.
// This function converts the inches to a more legible feet/inches.
function convertInchesToFeetInches(inches) {
    const returnString = parseInt(inches / 12) + "'" + (inches % 12) + "\"";
    return returnString
}

// Check form for missing / invalid fields
function getFormValidationError() {
    const nameField = document.getElementById("name").value;

    if (!nameField) {
        return "Name is a required field!";
    }

    const heightField = document.getElementById("feet").value;
    if (!heightField) {
        return "Height is a required numeric field!";
    } else if (heightField <= 0) {
        return "Height should be a number greater than 0!";
    }

    const heightInchesField = document.getElementById("inches").value;
    if (!heightInchesField) {
        // Do nothing. If inches is left blank, assume 0 inches.
    } else if (heightInchesField < 0 || heightInchesField > 11) {
        return "Height (inches) field should be a number between 0 and 11!";
    }

    const weightField = document.getElementById("weight").value;
    if (!weightField) {
        return "Weight is a required numeric field!";
    } else if (weightField <= 0) {
        return "Weight field should be a number greater than 0!";
    }

    return null;
}

// Load dinosaur objects from JSON file
const dinosData = {};
fetch("./dino.json")
    .then((response) => response.json())
    .catch((error) => console.error("Error reading dinosaurs file!"))
    .then((data) => {
        data.Dinos.forEach((aDino) => {
            dinosData[aDino.species.toLowerCase()] = aDino;
        })
    })

// Use IIFE to retrieve human data from the HTML form
const getHumanData = (function() {
    return function() {
        const name = document.getElementById("name").value;
        const heightFeet = document.getElementById("feet").value;
        let heightInches = document.getElementById("inches").value;
        if (!heightInches) {heightInches = 0};
        const weight = document.getElementById("weight").value;
        console.log("Feet = " + heightFeet);
        console.log("Inches = " + heightInches);
        const diet = document.getElementById("diet").value;
        return {name: name, height: heightInches + heightFeet * 12, weight: weight, diet: diet}
    }
})()

function compareButtonClicked() {
    const errorMessageNode = document.getElementById("formMessage");
    errorMessageNode.innerHTML = ``;
    const validationError = getFormValidationError();
    if (validationError) {
        errorMessageNode.innerHTML = validationError;
        return false;
    }

    const formData = getHumanData();

    document.getElementById("tryAgainBtn").className="inline-block";

    const gridNode = document.getElementById("grid");

    // Hide form
    document.getElementById("dino-compare").className = "invisible";

    // Render tiles
    tileTypes.forEach((tileType, index) => {

        // Create a new 'div' tile
        const newDiv = document.createElement("div");

        // Set species field
        const descriptionNode = document.createElement("h3");
        descriptionNode.innerHTML = tileType;
        newDiv.appendChild(descriptionNode);


        // Draw the species image
        newDiv.setAttribute("class", "grid-item");
        const image = document.createElement("img");
        image.setAttribute("src", `images/${tileType}.png`);
        newDiv.appendChild(image);

        // Generate trivia from randomized facts
        const trivia = getTriviaForTile(tileType, formData);
        const triviaNode = document.createElement("p");
        triviaNode.innerHTML = trivia;
        newDiv.appendChild(triviaNode);

        // Add the tile to our grid
        gridNode.appendChild(newDiv);
    })

}

function tryAgainButtonClicked() {

    // Remove dinosaur tiles
    const gridNode = document.getElementById("grid");
    while (gridNode.hasChildNodes()) {
        gridNode.removeChild(gridNode.childNodes[0]);
    }

    // Hide the "Try Again" button
    document.getElementById("tryAgainBtn").className="invisible";

    // Show form
    document.getElementById("dino-compare").className = "visible";    
}

// When "Compare" button is clicked, prepare and display infographic
document.getElementById("btn").onclick = () => compareButtonClicked()

// When "Try Again" button clicked, revert to original form
document.getElementById("tryAgainBtn").onclick =  () => tryAgainButtonClicked()

// Trivia for the tile depends on whether it's a pigeon, human, or dinosaur
function getTriviaForTile(species, formData) {
    if (species == "pigeon") {
        return "All birds are dinosaurs."
    } else if (species == "human") {
        return formData.name
    } else {
        // Retrieve a random trivia fact
        return getTriviaForDinosaur(dinosData[species], formData);
    }
}

// This function retrieves a random dinosaur trivia item
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
        const dinosaurWeight = Number(speciesData.weight).toLocaleString();
        const humanWeight = humanData.weight;
        if (dinosaurWeight > humanWeight) {
            return `This dinosaur was heavier than ${humanName}: ${dinosaurWeight}lbs ` +
                `vs ${humanWeight}lbs`;
        } else if (dinosaurWeight == humanWeight) {
            return `This dinosaur weighs the same as ${humanName}! ${dinosaurWeight}lbs`;
        } else {
            return `This dinosaur weighs LESS than ${humanName}! ${dinosaurWeight}lbs ` +
                `vs ${humanWeight}lbs`;
        }
    }

    function compareHeight() {
        const humanName = humanData.name;
        const dinosaurHeight = speciesData.height;
        const humanHeight = humanData.height;
        if (dinosaurHeight > humanHeight) {
            return `This dinosaur was taller than ${humanName}: ${convertInchesToFeetInches(
                dinosaurHeight)} inches vs ${convertInchesToFeetInches(humanHeight)} inches`;
        } else if (dinosaurHeight == humanHeight) {
            return `This dinosaur was the same height as ${humanName}! ${convertInchesToFeetInches(
                dinosaurHeight)} inches`;
        } else {
            return `This dinosaur was shorter than ${humanName}! ${convertInchesToFeetInches(
                dinosaurHeight)} inches vs ${convertInchesToFeetInches(humanHeight)} inches`;
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

    // Generate a fact based on a random number from 1 to 5
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
