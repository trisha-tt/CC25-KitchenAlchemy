// Make the functions global so the function can be called outside this js file

let coins = 10;
let score = 0;
let initial = ["flour", "water", "sugar", "lemon", "milk", "egg"];
let all = ["flour", "water", "sugar", "egg", "lemon", "milk", "butter", "dough",
    "tomato", "sweet water", "cake", "lemonade", "pancake", "cheese", "grilled cheese",
    "paneer", "curry", "paneer tikka", "egg curry", "waffle", "butter toast", "whipped cream",
    "cheese cake", "ice cream", "cream cheese"
];

const tokens = [{
        id: 3,
        name: "Butter",
        cost: 3,
        imageName: "butter",
        quantity: 0
    },
    {
        id: 4,
        name: "Cheese",
        cost: 4,
        imageName: "cheese",
        quantity: 0
    },
    {
        id: 5,
        name: "Egg",
        cost: 5,
        imageName: "egg",
        quantity: 0
    },
    {
        id: 6,
        name: "Milk",
        cost: 6,
        imageName: "milk",
        quantity: 0
    },
    {
        id: 7,
        name: "Tomato",
        cost: 7,
        imageName: "tomato",
        quantity: 0
    },
    {
        id: 10,
        name: "Cake",
        cost: 10,
        imageName: "cake",
        quantity: 0
    }
];

const recipes = [
    ["dough", ["flour", "water"]],
    ["cake", ["dough", "egg"]],
    ["lemonade", ["lemon", "sweet water"]],
    ["pancake", ["dough", "milk"]],
    ["cheese", ["lemon", "sweet water"]],
    ["paneer", ["cheese", "cheese"]],
    ["grilled cheese", ["dough", "cheese"]],
    ["waffle", ["dough", "sugar"]],
    ["egg curry", ["egg", "curry"]],
    ["whipped cream", ["milk", "milk"]],
    ["curry", ["tomato", "water"]],
    ["cream cheese", ["whipped cream", "cheese"]],
    ["ice cream", ["whipped cream", "milk"]],
    ["cheese cake", ["cream cheese", "cake"]],
    ["bread", ["dough"]],
];

let allRecipes = recipes.reduce((comb, [first, second]) => {
    if (!comb.hasOwnProperty(second)) comb[second] = [];
    comb[second].push(first);
    return comb;
}, {});

let stage;
let items = [];

// Function to initialize the canvas
function initCanvas() {
    stage = new createjs.Stage("bodyCanvas"); // Make sure your canvas ID is "canvas"
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}

// Function to update coin display
function updateCoinDisplay() {
    const coinDisplay = document.getElementById("coinDisplay");
    if (coinDisplay) {
        coinDisplay.textContent = `Coins: ${coins}`;
    }
}

// Function to update score display
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById("scoreDisplay");
    if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${score}`;
    }
}

// Function to drag
function makeItemDraggable(item, name) {

    item.on("mousedown", function(evt) {
        let offset = {
            x: item.x - evt.stageX,
            y: item.y - evt.stageY
        };

        // Allow item to be dragged
        item.on("pressmove", function(evt) {
            item.x = evt.stageX + offset.x;
            item.y = evt.stageY + offset.y;

            // Update the stage to reflect changes
            stage.update();
        });

        // When the mouse is released, check for combination
        item.on("pressup", function(evt) {
            checkForCombination(item, name);
            stage.update();
        });
    });
}


// Function to check for combination
function isOverlapping(item1, item2) {
    return !(item1.x + item1.getBounds().width < item2.x ||
        item1.x > item2.x + item2.getBounds().width ||
        item1.y + item1.getBounds().height < item2.y ||
        item1.y > item2.y + item2.getBounds().height);
}

// Function to check for combination
function checkForCombination(item, name) {
    let combined = false;

    items.forEach(otherItem => {
        if (item !== otherItem && isOverlapping(item, otherItem)) {
            const combination = combineElements(item.name, otherItem.name);
            if (combination) {
                combined = true;
                handleCombination(item, otherItem, combination);
            }
        }
    });

    if (!combined) {
        // Item wasn't combined, place it back
        placeItemBack(item);
    }
}

//handle combination
function handleCombination(item1, item2, combination) {
    score += 20; // Increase score for combining
    updateScoreDisplay();

    // Remove the old items from the canvas
    stage.removeChild(item1);
    stage.removeChild(item2);

    // Create and display the new combined item
    const combinedItem = new createjs.Bitmap(`./assets/img/${combination[0]}.png`);
    combinedItem.name = combination[0];
    combinedItem.x = item1.x; // Position the new item at the same location as the first item
    combinedItem.y = item1.y;

    items.push(combinedItem); // Store the new item in items array
    stage.addChild(combinedItem); // Add to the stage
    makeItemDraggable(combinedItem, combination[0]);

    displayDiscovered(combination[0]);

    // Update the inventory
    displayInventory();
    stage.update();
}


//initialize drag items
function initializeDragItems() {
    tokens.forEach(token => {
        if (initial.includes(token.imageName)) {
            let bitmap = new createjs.Bitmap(`./assets/img/${token.imageName}.png`);
            bitmap.name = token.imageName;
            bitmap.x = Math.random() * 200; // Random position for now
            bitmap.y = Math.random() * 200;
            // Add to stage
            stage.addChild(bitmap);
            makeItemDraggable(bitmap, token.imageName);
            items.push(bitmap); // Store the item in items array
        }
    });
    stage.update(); // Update the stage after initializing items
}

// load the canvas
window.addEventListener("load", () => {
    initialize();
    initializeDragItems();
});

// Function to display discovered items below the sidebar
function displayDiscovered(imageName) {
    let image = new Image();
    image.src = `./assets/img/${imageName}.png`;
    image.classList.add("ingredients-imgs");
    const container = document.getElementById("discoveredItems");
    container.appendChild(image);
}

//7. Function to display discovered items below the sidebar
window.displayDiscovered = function(imageName) {
    let image = new Image();
    image.src = `./assets/img/${imageName}.png`;
    image.classList.add("ingredients-imgs");
    const container = document.getElementById("discoveredItems");
    container.appendChild(image);
}

function updateTokenDisplay(itemElement, token) {
    itemElement.src = "/assets/img/purchased.png";
    const label = itemElement.parentElement.querySelector(".shop-label");
    label.textContent = `${token.name}: ${token.quantity}`;
    label.style.color = "green";
}

//5. Function to purchase an ingredient from the shop
function purchaseItemCall(itemElement, tokenId, imageName) {
    const token = tokens.find(t => t.id === tokenId);
    if (!token) return;

    if (coins >= token.cost) {
        coins -= token.cost;
        score += 10;
        token.quantity++; // Increment token quantity
        updateCoinDisplay();
        updateScoreDisplay();
        updateTokenDisplay(itemElement, token);
        displayInventory();
        displayDiscovered(token.imageName);
    } else {
        alert("Not enough coins!");
    }
}

window.purchaseItem = function(itemElement, tokenId, imageName) {
    purchaseItemCall(itemElement, tokenId, imageName);
}

// Make the functions global so the function can be called outside this js file
window.combineElements = function(el1, el2) {
    let recipe = [el1, el2].sort().join(',');
    return allRecipes[recipe];
}

// Make the functions global so the function can be called outside this js file
//4. Update sidebar to show the images of the items in the inventory
window.displayInventory = function() {
    const inventoryDiv = document.getElementById('inventory');
    inventoryDiv.innerHTML = ''; // Clear existing inventory

    tokens.forEach(token => {
        // Find the quantity from the items
        if (token.quantity > 0 || initial.includes(token.imageName)) {
            let img = document.createElement('img');
            img.src = `./assets/img/${token.imageName}.png`;
            img.classList.add("ingredients-imgs");
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('inventory-item');
            itemDiv.appendChild(img);

            const textSpan = document.createElement('span');
            let quantity = token.quantity;
            //Check if the items are initial items
            if (!initial.includes(token.imageName)) {
                textSpan.textContent = `x${token.quantity}`;
            } else {
                textSpan.textContent = 'x1';
            }

            itemDiv.appendChild(textSpan);
            inventoryDiv.appendChild(itemDiv);
        }
    });
}


// js for loading screen
var loadingScreen = document.querySelector(".loadingScreen");
window.addEventListener('load', function() {
	loadingScreen.style.display = 'none';
})

function initialize() {
    initCanvas();
    //  Initialize displays
    updateCoinDisplay();
    updateScoreDisplay();
    displayInventory();
    const popup = document.getElementById("popup");
    const openPopupButton = document.querySelector('.open-shop-button');
    const closePopupButton = document.querySelector('.close-popup-button');
    openPopupButton.addEventListener("click", () => {
        popup.style.display = "flex";
    });
    closePopupButton.addEventListener("click", () => {
        popup.style.display = "none";
    });
}
