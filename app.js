// const dinosaurs = require("dino.json");
    // console.log(Dinos);
// alert("HELLO WORLD")
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
    // console.log("CLICK!")
    // console.log(getHumanData())

    // Hide form
    document.getElementById("dino-compare").style.display = "none";

    tileTypes.forEach((tileType, index) => {

        const description = document.createTextNode(tileType);
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "grid-item");
        const image = document.createElement("img");
        image.setAttribute("src", `images/${tileType}.png`);
        newDiv.appendChild(image);
        newDiv.appendChild(description);
        gridNode.appendChild(newDiv);
    })

}
console.log("LOADED!")