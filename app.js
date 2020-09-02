
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
    const dinos = fetch("./dino.json")
            .then((response) => response.json())
            .catch((error) => console.error("Error reading dinosaurs file!"))
            .then((data) => {
                const dinosData = data.Dinos;
                return data.Dinos;
            })

    // Use IIFE to get human data from form
    const getHumanData = (function() {
        return function() {
            const name = document.getElementById("name").value;
            const heightFeet = document.getElementById("feet").value;
            const heightInches = document.getElementById("inches").value;
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


// On button click, prepare and display infographic
document.getElementById("btn").onclick = () => {

    // console.log(getHumanData())
    document.getElementById("CloseButton").className="visible";

    // Hide form
    const gridNode = document.getElementById("grid");
    document.getElementById("dino-compare").className = "invisible";
    tileTypes.forEach((tileType, index) => {

        const descriptionNode = document.createElement("h3");
        descriptionNode.innerHTML = tileType;
        const trivia = getTriviaForTile(tileType);
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


document.getElementById("CloseButton").onclick = () => {

    // Remove dinosaur tiles
    const gridNode = document.getElementById("grid");
    while (gridNode.hasChildNodes()) {
        gridNode.removeChild(gridNode.childNodes[0]);
    }

    // Hide this button
    document.getElementById("CloseButton").className="invisible";

    // Show form
    document.getElementById("dino-compare").className = "visible";
}


//TODO: Add trivia for dinosaurs
function getTriviaForTile(species) {
    if (species == "pigeon") {
        return "All birds are dinosaurs."
    } else if (species == "human") {
        return "Human Name"
    } else {
        return "Everybody walk a dinosaur!"
    }
}

//TODO: Generate 3 methods to compare dinosaur data with human data
//TODO: Write logic to render dinosaur trivia
