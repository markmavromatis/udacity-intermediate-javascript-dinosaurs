
// Internally we store dinosaur and human height in inches.
// This function converts the inches to a more legible feet/inches.
function convertInchesToFeetInches(inches) {
    const returnString = parseInt(inches / 12) + "'" + (inches % 12) + "\"";
    return returnString
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

    // Compare dinosaur and human weight, return results
    function compareWeight() {
        const humanName = humanData.name;
        const dinosaurWeight = speciesData.weight;
        const dinosaurWeightFormatted = Number(dinosaurWeight).toLocaleString();
        const humanWeight = humanData.weight;
        if (dinosaurWeight > humanWeight) {
            return `This dinosaur was heavier than ${humanName}: ${dinosaurWeightFormatted}lbs ` +
                `vs ${humanWeight}lbs`;
        } else if (dinosaurWeight == humanWeight) {
            return `This dinosaur weighs the same as ${humanName}! ${dinosaurWeightFormatted}lbs`;
        } else {
            return `This dinosaur weighs LESS than ${humanName}! ${dinosaurWeightFormatted}lbs ` +
                `vs ${humanWeight}lbs`;
        }
    }

    // Compare dinosaur and human height, return results
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

    // Compare dinosaur and human diet, return results
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

// Dinosaur Constructor
let Dinosaur = function(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
}

Dinosaur.prototype.getDescription = function() {
    return this.species;
}

Dinosaur.prototype.getImageFileName = function() {
    return this.species;
}

Dinosaur.prototype.getTrivia = function(humanData) {
    if (this.species == "Pigeon") {
        return "All birds are dinosaurs."
    } else {
        // Retrieve a random trivia fact
        return getTriviaForDinosaur(this, humanData);
    }
}

let Human = function(name, height, weight, diet) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.diet = diet;
}

Human.prototype.getDescription = function() {
    return this.name;
}

Human.prototype.getImageFileName = function() {
    return "human";
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

const dinosaurs = [];

// Load dinosaur objects from JSON file
fetch("./dino.json")
    .then((response) => response.json())
    .catch((error) => console.error("Error reading dinosaurs file!"))
    .then((data) => {
        data.Dinos.forEach((aDino) => {
            dinosaurs.push(new Dinosaur(aDino.species, aDino.weight, aDino.height, aDino.diet,
                aDino.where, aDino.when, aDino.fact))
        })
    })

// Use IIFE to retrieve human data from the HTML form
const convertFormDataToHuman = (function() {
    return function() {
        const name = document.getElementById("name").value;
        const heightFeet = document.getElementById("feet").value;
        let heightInches = parseInt(document.getElementById("inches").value);
        if (!heightInches) {heightInches = 0};
        heightInches += heightFeet * 12;

        const weight = document.getElementById("weight").value;
        const diet = document.getElementById("diet").value;
        return new Human(name, heightInches, weight, diet);
    }
})()

// Logic for implementing Compare onClick event
function compareButtonClicked() {

    // Check form fields for invalid data
    const errorMessageNode = document.getElementById("formMessage");
    errorMessageNode.innerHTML = ``;
    const validationError = getFormValidationError();
    if (validationError) {
        errorMessageNode.innerHTML = validationError;
        return false;
    }

    // Convert form fields to a Human object
    const human = convertFormDataToHuman();

    // Hide form
    document.getElementById("dino-compare").className = "invisible";

    // Render tiles
    const gridNode = document.getElementById("grid");

    // Create dinosaur count + 1 tiles. Put human tile in the middle.
    const dinosaurCount = dinosaurs.length;
    const tileCount = dinosaurCount + 1;
    // 8 dinosaurs. 9 tiles.
    // Human is 5th. (index 4 or # dinosaurs / 2)
    const humanTileIndex = dinosaurCount / 2;

    // Copy array elements from dinosaurs data to tiles data
    const tileData = [...dinosaurs];
    // Add the human in the middle
    tileData.splice(humanTileIndex, 0, human);

    // Now create the tiles with their descriptions, images, and trivia facts.
    for (let i = 0; i < tileData.length; i++) {

        const thisTile = tileData[i];

        // Create a new 'div' tile
        const newDiv = document.createElement("div");

        // Set description field
        const description = thisTile.getDescription();
        const descriptionNode = document.createElement("h3");
        descriptionNode.innerHTML = description;
        newDiv.appendChild(descriptionNode);

        // Draw the species image
        newDiv.setAttribute("class", "grid-item");
        const image = document.createElement("img");
        const imageFileName = thisTile.getImageFileName();
        image.setAttribute("src", `images/${imageFileName}.png`);
        newDiv.appendChild(image);

        // Generate trivia from randomized facts
        if (thisTile instanceof Dinosaur) {
            const trivia = thisTile.getTrivia(human);
            const triviaNode = document.createElement("p");
            triviaNode.innerHTML = trivia;
            newDiv.appendChild(triviaNode);
        }

        // Add the tile to our grid
        gridNode.appendChild(newDiv);

    }

    // Show Try Again button
    document.getElementById("tryAgainBtn").className="inline-block";


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
