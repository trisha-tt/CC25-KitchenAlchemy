// /******/ (function(modules) { // webpackBootstrap
// /******/ 	// The module cache
// /******/ 	var installedModules = {};

// /******/ 	// The require function
// /******/ 	function __webpack_require__(moduleId) {

// /******/ 		// Check if module is in cache
// /******/ 		if(installedModules[moduleId])
// /******/ 			return installedModules[moduleId].exports;

// /******/ 		// Create a new module (and put it into the cache)
// /******/ 		var module = installedModules[moduleId] = {
// /******/ 			exports: {},
// /******/ 			id: moduleId,
// /******/ 			loaded: false
// /******/ 		};

// /******/ 		// Execute the module function
// /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

// /******/ 		// Flag the module as loaded
// /******/ 		module.loaded = true;

// /******/ 		// Return the exports of the module
// /******/ 		return module.exports;
// /******/ 	}


// /******/ 	// expose the modules object (__webpack_modules__)
// /******/ 	__webpack_require__.m = modules;

// /******/ 	// expose the module cache
// /******/ 	__webpack_require__.c = installedModules;

// /******/ 	// __webpack_public_path__
// /******/ 	__webpack_require__.p = "";

// /******/ 	// Load entry module and return exports
// /******/ 	return __webpack_require__(0);
// /******/ })
// /************************************************************************/
// /******/ ([
// /* 0 */
// /***/ function(module, exports, __webpack_require__) {

// 	const combine = __webpack_require__(1);

// 	var canvas, stage;

// 	var mouseTarget;
// 	var dragStarted;
// 	var offset;
// 	var update = true;
// 	var initial = ["flour","water","sugar","lemon", "milk","egg"];
// 	var all = ["flour", "water", "sugar", "egg", "lemon", "milk", "butter", "dough",
// 		"tomato", "sweet water", "cake", "lemonade", "pancake", "cheese", "grilled cheese", 
// 		"paneer", "curry", "paneer tikka", "egg curry", "waffle", "butter toast", "whipped cream",
// 		"cheese cake", "ice cream", "cream cheese"];
	

// 	var elements = [];
// 	var discovered = [];
// 	var elOffset = 0;
// 	var yCoord = 520;
// 	var mute = false;

// 	var winModal = new createjs.Shape();
// 	winModal.graphics.beginFill('ivory');
// 	winModal.graphics.setStrokeStyle(2,'round').beginStroke('#357EBD');
// 	winModal.alpha = 1;
// 	winModal.graphics.drawRect(240, 100, 500, 300);
// 	winModal.graphics.endFill();
// 	winModal.visible = false;

// 	var winModalLabel = new createjs.Text("You Win!", "80px Arial", "#000");
// 	winModalLabel.x = 490;
// 	winModalLabel.y = 190;
// 	winModalLabel.textAlign = 'center';
// 	winModalLabel.lineWidth = 800;
// 	winModalLabel.lineHeight = 50;
// 	winModalLabel.visible = false;


// 	document.addEventListener("DOMContentLoaded", function() {
// 		canvas = document.getElementById("bodyCanvas");

// 		stage = new createjs.Stage(canvas);

// 		stage.enableMouseOver(10);
// 		stage.mouseMoveOutside = true;

// 	  const line = new createjs.Shape();
// 		line.graphics.setStrokeStyle(10);
// 		line.graphics.beginStroke("black");
// 		line.graphics.moveTo(1000,0);
// 		line.graphics.lineTo(1000,1000);
// 		line.graphics.endStroke();

// 		stage.addChild(line);

// 		var disContainer = new createjs.Container();
// 	 	stage.addChild(disContainer);

// 		var mask = new createjs.Shape();
// 		mask.graphics.f("#f00").dr(0,505,1000,500);
// 		disContainer.mask = mask;

// 		var wrapper;
// 		var canvasHeight;
// 		var vScrollHeight;
// 		var canvasWrapperHeight=300;

// 		$(".bar").draggable({
// 			containment: "parent"
// 		});

// 		$(".bar").on("drag", function (event, ui) {
// 			stage.children[1].y = 0 - ui.position.top * 5.8;
// 			stage.update();
// 		});


// 		var mainContainer = new createjs.Container();
// 		stage.addChild(mainContainer);
// 		mainContainer.setBounds(0,0,1000,500);

// 		stage.addChild(winModal);
// 		stage.addChild(winModalLabel);

// 		var aboutModal = new createjs.Shape();
// 		aboutModal.graphics.beginFill('ivory');
// 		aboutModal.graphics.setStrokeStyle(2,'round').beginStroke('#357EBD');
// 		aboutModal.alpha = 1;
// 		aboutModal.graphics.drawRect(540, 100, 500, 300);
// 		aboutModal.graphics.endFill();
// 		stage.addChild(aboutModal);
// 		aboutModal.visible = false;

// 		var modalLabel = new createjs.Text("Really Little Alchemy", "40px Fantasy", "#000");
// 		modalLabel.x = 490;
// 		modalLabel.y = 120;
// 		modalLabel.textAlign = 'center';
// 		modalLabel.lineWidth = 800;
// 		modalLabel.lineHeight = 50;
// 		stage.addChild(modalLabel);
// 		modalLabel.visible = false;

// 		var modalDescription = new createjs.Text("", "20px Fantasy", "#000");
// 		modalDescription.x = 480;
// 		modalDescription.y = 200;
// 		modalDescription.textAlign = 'center';
// 		modalDescription.lineWidth = 300;
// 		modalDescription.lineHeight = 20;
// 		stage.addChild(modalDescription);
// 		modalDescription.visible = false;


// 		var buttonok = new createjs.Shape();
// 		buttonok.graphics.beginFill('black');
// 		buttonok.graphics.setStrokeStyle(2,'round').beginStroke('#357EBD');
// 		buttonok.graphics.drawRoundRect(630, 350, 100, 40, 5);
// 		buttonok.cursor = "pointer";
// 		stage.addChild(buttonok);
// 		buttonok.visible = false;

// 		buttonok.on("click", () => {
// 			aboutModal.visible = false;
// 			modalLabel.visible = false;
// 			modalDescription.visible = false;
// 			buttonokLabel.visible = false;
// 			buttonok.visible = false;
// 			update = true;
// 		});

// 		var buttonokLabel = new createjs.Text("Continue", "20px Fantasy", "white");
// 		buttonokLabel.x = 640;
// 		buttonokLabel.y = 360;
// 		modalDescription.lineWidth = 300;
// 		modalDescription.lineHeight = 20;
// 		stage.addChild(buttonokLabel);
// 		buttonokLabel.visible = false;

// 		$(".about").on("click", () => {
// 			aboutModal.visible === true ? aboutModal.visible = false : aboutModal.visible = true;
// 			modalLabel.visible === true ? modalLabel.visible = false : modalLabel.visible = true;
// 			modalDescription.visible === true ? modalDescription.visible = false : modalDescription.visible = true;
// 			buttonok.visible === true ? buttonok.visible = false : buttonok.visible = true;
// 			buttonokLabel.visible === true ? buttonokLabel.visible = false : buttonokLabel.visible = true;
// 	    stage.setChildIndex(aboutModal, stage.getNumChildren()-1);
// 			stage.setChildIndex(modalLabel, stage.getNumChildren()-1);
// 			stage.setChildIndex(modalDescription, stage.getNumChildren()-1);
// 			stage.setChildIndex(buttonok, stage.getNumChildren()-1);
// 			stage.setChildIndex(buttonokLabel, stage.getNumChildren()-1);
// 			update = true;
// 		});

// 		$(".about").on("click", () => {
// 			aboutModal.visible === true ? aboutModal.visible = false : aboutModal.visible = true;
// 			modalLabel.visible === true ? modalLabel.visible = false : modalLabel.visible = true;
// 			modalDescription.visible === true ? modalDescription.visible = false : modalDescription.visible = true;
// 			buttonok.visible === true ? buttonok.visible = false : buttonok.visible = true;
// 			buttonokLabel.visible === true ? buttonokLabel.visible = false : buttonokLabel.visible = true;
// 	    stage.setChildIndex(aboutModal, stage.getNumChildren()-1);
// 			stage.setChildIndex(modalLabel, stage.getNumChildren()-1);
// 			stage.setChildIndex(modalDescription, stage.getNumChildren()-1);
// 			stage.setChildIndex(buttonok, stage.getNumChildren()-1);
// 			stage.setChildIndex(buttonokLabel, stage.getNumChildren()-1);
// 			update = true;
// 		});

// 		buttonok.on("click", () => {
// 			aboutModal.visible = false;
// 			modalLabel.visible = false;
// 			modalDescription.visible = false;
// 			buttonokLabel.visible = false;
// 			buttonok.visible = false;
// 			update = true;
// 		});

// 		$(".cheat").on("click", (e) => {
// 			elOffset = 0;
// 			yCoord = 520;
// 			stage.children[1].removeAllChildren();
// 			stage.children[2].removeAllChildren();
// 			winModal.visible = false;
// 			winModalLabel.visible = false;

// 			if (stage.children[11] && stage.children[11].children) {
// 				stage.children[11].removeAllChildren();
// 			}
// 			discovered = [];
// 			update = true;
// 			if(e.currentTarget.textContent === "Unlock All") {
// 				e.currentTarget.textContent = "Start Over";
// 				all.forEach(el => {
// 					let image = new Image();
// 					image.src = `./assets/img/${el}.png`;
// 					let elObj = {name: el};
// 					image.onload = handleImageLoad.bind(elObj);
// 				});
// 			} else {
// 				e.currentTarget.textContent = "Unlock All";
// 				initial.forEach(el => {
// 					let image = new Image();
// 					image.src = `./assets/img/${el}.png`;
// 					let elObj = {name: el};
// 					image.onload = handleImageLoad.bind(elObj);
// 				});
// 			}
// 		});


// 		update = true;

// 	  initial.forEach(el => {
// 	    let image = new Image();
// 			image.src = `./assets/img/${el}.png`;
// 			let elObj = {name: el};
// 	    image.onload = handleImageLoad.bind(elObj);
// 	  });

// 	});

// 	function stop() {
// 		createjs.Ticker.removeEventListener("tick", tick);
// 	}

// 	function handleImageLoad(event) {
// 	  var image = event.target;
// 		var bitmap;
// 		var container = new createjs.Container();
// 		bitmap = new createjs.Bitmap(image);

// 		if (this.discovered) {
// 			bitmap.x = this.altX;
// 			bitmap.y = this.altY;
// 			stage.children[2].addChild(bitmap);
// 			elements.push(bitmap);
// 		} else {
// 			bitmap.x = this.x || 40 + elOffset;
// 			bitmap.y = this.y || yCoord;
// 			stage.children[1].addChild(container);
// 			container.addChild(bitmap);
// 		}
// 		bitmap.regX = bitmap.width / 2 | 0;
// 		bitmap.regY = bitmap.height / 2 | 0;
// 		bitmap.name = this.name;
// 		bitmap.scaleX = bitmap.scaleY = bitmap.scale = .5;
// 		bitmap.cursor = "pointer";

// 		var text = new createjs.Text(this.name, "18px Fantasy", "#ff7700");
// 		text.y = this.y + 55 || yCoord + 55;
// 		text.x = bitmap.x + 5;
// 		container.addChild(text);

// 		if (!this.x && !this.discovered) {
// 			if (elOffset > 700) {
// 				elOffset = 0;
// 				yCoord += 100;
// 			} else {
// 				elOffset += 140;
// 			}
// 		}

// 		if(discovered.every(el => el.name !== bitmap.name)) {
// 			discovered.push(bitmap);
// 		}

// 		stage.children.forEach(child => {
// 			if (child.name === "foundCount") {
// 				stage.removeChild(child);
// 			}
// 		});

// 		var foundCount = new createjs.Text(`${discovered.length}/100`, "72px Fantasy", "#ff7700");
// 		foundCount.x = 25;
// 		foundCount.y = 25;
// 		foundCount.name = "foundCount";
// 		stage.addChild(foundCount);

// 		update = true;

// 		bitmap.on("mousedown", function (evt) {
// 	    if(evt.currentTarget.y > 465 ) {
// 				stage.children[2].addChild(bitmap);
// 				let bitmapDup = bitmap.clone(true);
// 	      var imageDup = new Image();
// 	      imageDup.src = this.image.src;
// 	      imageDup.onload = handleImageLoad.bind(bitmapDup);

// 				this.y = evt.stageY - 20;
// 	      this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
// 	    } else {
// 				this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
// 			}
// 		});

// 	  bitmap.on("pressup", function (evt) {
// 			if(!elements.includes(bitmap)) elements.push(bitmap);
// 	    if(this.y < 465 ) {
// 	      let toRemove = [];
// 	      for (var i = 0; i < elements.length; i++) {
// 	        let element = elements[i];
// 	        if (this !== element && !(element.x - 15 > this.x + 15 ||
// 	                                  element.x + 15 < this.x - 15 ||
// 	                                  element.y - 15 > this.y + 15 ||
// 	                                  element.y + 15 < this.y - 15)) {

				
// 					 let combined = combine(this.name, elements[i].name);
// 					 if (combined !== undefined) {
// 						 combined = combined[0];
// 						 var discoveredEl = new Image();
// 						 discoveredEl.src = `./assets/img/${combined}.png`;
// 						 if(discovered.every(el => el.image.src !== discoveredEl.src)) {
// 							 let elObj = {name: combined};
// 							 discoveredEl.onload = handleImageLoad.bind(elObj);
// 						 }
// 						 let elObj = {name: combined, altX: this.x, altY: this.y, discovered: true};
// 			       let imageDup = new Image();
// 			       imageDup.src = discoveredEl.src
// 			       imageDup.onload = handleImageLoad.bind(elObj);
// 						 if(!mute) createjs.Sound.play("greatJob");
// 					 } else {
// 						 if(!mute) createjs.Sound.play("laugh");
// 					 }
// 					 stage.children[1].removeChild(this.parent);
// 					 stage.children[1].removeChild(element.parent);
// 					 stage.children[2].removeChild(this);
// 					 stage.children[2].removeChild(element);
// 					 toRemove.push(element);
// 					 toRemove.push(this);
// 	        }
// 	      }
// 	      elements = elements.filter((el) => {
// 	        return !(toRemove.includes(el));
// 	      });
// 	    } else {
// 	      stage.children[1].removeChild(this.parent);
// 				stage.children[2].removeChild(this);
// 	    }
// 	    update = true;
// 	  });

// 		bitmap.on("pressmove", function (evt) {

// 	    if(this.y < 465) {
// 	      if(evt.stageY < 465) {
// 	        this.y = evt.stageY + this.offset.y;
// 	      }
// 	      this.x = evt.stageX + this.offset.x;
// 	    } else {
// 	      this.x = evt.stageX + this.offset.x;
// 	      this.y = evt.stageY + this.offset.y;
// 	    }
// 			update = true;
// 		});


// 		bitmap.on("rollover", function (evt) {
// 			this.scaleX = this.scaleY = this.scale * 1.2;
// 			update = true;
// 		});

// 		bitmap.on("rollout", function (evt) {
// 			this.scaleX = this.scaleY = this.scale;
// 			update = true;
// 		});

// 		if (stage.children[1].children.length >= 100) {
// 			if(!mute) createjs.Sound.play("win");
// 			winModal.visible = true;
// 			winModalLabel.visible = true;
// 			update = true;
// 		} else {
// 			winModal.visible = false;
// 			winModalLabel.visible = false;
// 		}

// 		createjs.Ticker.addEventListener("tick", tick);
// 	}
		
// 	function tick(event) {
	
// 		if (update) {
// 			update = false;
// 			stage.update(event);
	
// 		}

// 	}


// /***/ },
// /* 1 */
// /***/ function(module, exports, __webpack_require__) {

// 	var allRecipes = __webpack_require__(2);

// 	function combine(el1, el2) {
// 	    let recipe = [el1, el2].sort().join(',');
// 	    return allRecipes[recipe];
// 	}

// 	module.exports = combine;


// /***/ },
// /* 2 */
// /***/ function(module, exports) {

	
// 	var recipes = [["dough",["flour", "water"]],["cake", ["dough", "egg"]],["lemonade", ["lemon", "sweet water"]],["pancake", ["dough", "milk"]],["cheese", ["lemon", "milk"]], ["paneer", ["cheese", "cheese"]],["grilled cheese", ["dough", "cheese"]], ["waffle",["dough","sugar"]],["egg curry", ["egg", "curry"]],["whipped cream", ["milk", "milk"]],["curry", ["tomato", "water"]],["cream cheese", ["whipped cream", "cheese"]],["ice cream", ["whipped cream", "milk"]],["cheese cake", ["cream cheese", "cake"]]];

// 	var allRecipes = recipes.reduce((comb, [first, second]) => {
// 	  if (!comb.hasOwnProperty(second)) comb[second] = [];
// 	  comb[second].push(first);
// 	  return comb;
// 	}, {});

// 	module.exports = allRecipes;


// /***/ }
// /******/ ]);
// app.js - Main Application Logic

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
        if (initial.includes(token.name)) {
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
