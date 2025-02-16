// const combine = require('./combine.js');

// var canvas, stage;

// var mouseTarget;
// var dragStarted;
// var offset;
// var update = true;
// var initial = ["flour", "water", "sugar"];
//     var all = ["flour", "water", "sugar", "egg", "lemon", "milk", "butter", "dough",
//     "tomato", "sweet water", "cake", "lemonade", "pancake", "cheese", "grilled cheese", 
//     "paneer", "curry", "paneer tikka", "egg curry", "waffle", "butter toast", "whipped cream",
//     "cheese cake", "ice cream", "cream cheese"];

// var elements = [];
// var discovered = [];
// var elOffset = 0;
// var yCoord = 520;


// document.addEventListener("DOMContentLoaded", function() {
// 	canvas = document.getElementById("bodyCanvas");
// 	stage = new createjs.Stage(canvas);
  
// 	stage.enableMouseOver(10);
// 	stage.mouseMoveOutside = true;
  
// 	// Right-side modal
// 	var winModal = new createjs.Shape();
// 	winModal.graphics.beginFill('ivory');
// 	winModal.graphics.setStrokeStyle(2,'round').beginStroke('#357EBD');
// 	winModal.alpha = 1;
// 	winModal.graphics.drawRect(1240, 100, 500, 300);
// 	winModal.graphics.endFill();
// 	winModal.visible = false;
	
// 	// Position winModal to the right
// 	winModal.x = canvas.width - winModal.getBounds().width - 90; // 20px for margin
  
// 	var winModalLabel = new createjs.Text("You Win!", "80px Arial", "#000");
// 	winModalLabel.x = winModal.x + winModal.getBounds().width / 2;  // Align label within the modal
// 	winModalLabel.y = 190;
// 	winModalLabel.textAlign = 'center';
// 	winModalLabel.lineWidth = 800;
// 	winModalLabel.lineHeight = 50;
// 	winModalLabel.visible = false;
  
// 	stage.addChild(winModal);
// 	stage.addChild(winModalLabel);
  
	
  

//   line.graphics.setStrokeStyle(10);
//   line.graphics.beginStroke("black");
//   line.graphics.moveTo(500,0);
//   line.graphics.lineTo(500, 1000);
//   line.graphics.endStroke();

// 	stage.addChild(line);

// 	var disContainer = new createjs.Container();
//  	stage.addChild(disContainer);

// 	var mask = new createjs.Shape();
// 	mask.graphics.f("#f00").dr(0,505,1000,500);
// 	disContainer.mask = mask;

// 	var wrapper;
// 	var canvasHeight;
// 	var vScrollHeight;
// 	var canvasWrapperHeight=300;

// 	$(".bar").draggable({
// 		containment: "parent"
// 	});

// 	$(".bar").on("drag", function (event, ui) {
// 		stage.children[1].y = 0 - ui.position.top * 5.8;
// 		stage.update();
// 	});

// 	var mainContainer = new createjs.Container();
// 	stage.addChild(mainContainer);
// 	mainContainer.setBounds(0,0,1000,500);

// 	stage.addChild(winModal);
// 	stage.addChild(winModalLabel);

// 	$(".cheat").on("click", (e) => {
// 		elOffset = 0;
// 		yCoord = 520;
// 		stage.children[1].removeAllChildren();
// 		stage.children[2].removeAllChildren();
// 		winModal.visible = false;
// 		winModalLabel.visible = false;

// 		if (stage.children[11] && stage.children[11].children) {
// 			stage.children[11].removeAllChildren();
// 		}
// 		discovered = [];
// 		update = true;
// 		if(e.currentTarget.textContent === "Unlock All") {
// 			e.currentTarget.textContent = "Start Over";
// 			all.forEach(el => {
// 				let image = new Image();
// 				image.src = `./assets/img/${el}.png`;
// 				let elObj = {name: el};
// 				image.onload = handleImageLoad.bind(elObj);
// 			});
// 		} else {
// 			e.currentTarget.textContent = "Unlock All";
// 			initial.forEach(el => {
// 				let image = new Image();
// 				image.src = `./assets/img/${el}.png`;
// 				let elObj = {name: el};
// 				image.onload = handleImageLoad.bind(elObj);
// 			});
// 		}
// 	});


// 	update = true;

//   initial.forEach(el => {
//     let image = new Image();
// 		image.src = `./assets/img/${el}.png`;
// 		let elObj = {name: el};
//     image.onload = handleImageLoad.bind(elObj);
//   });

// });

// function stop() {
// 	createjs.Ticker.removeEventListener("tick", tick);
// }

// function handleImageLoad(event) {
//   var image = event.target;
// 	var bitmap;
// 	var container = new createjs.Container();
// 	bitmap = new createjs.Bitmap(image);

// 	if (this.discovered) {
// 		bitmap.x = this.altX;
// 		bitmap.y = this.altY;
// 		stage.children[2].addChild(bitmap);
// 		elements.push(bitmap);
// 	} else {
// 		bitmap.x = this.x || 40 + elOffset;
// 		bitmap.y = this.y || yCoord;
// 		stage.children[1].addChild(container);
// 		container.addChild(bitmap);
// 	}
// 	bitmap.regX = bitmap.width / 2 | 0;
// 	bitmap.regY = bitmap.height / 2 | 0;
// 	bitmap.name = this.name;
// 	bitmap.scaleX = bitmap.scaleY = bitmap.scale = .5;
// 	bitmap.cursor = "pointer";

// 	var text = new createjs.Text(this.name, "18px Fantasy", "#ff7700");
// 	text.y = this.y + 55 || yCoord + 55;
// 	text.x = bitmap.x + 5;
// 	container.addChild(text);

// 	if (!this.x && !this.discovered) {
// 		if (elOffset > 700) {
// 			elOffset = 0;
// 			yCoord += 100;
// 		} else {
// 			elOffset += 140;
// 		}
// 	}

// 	if(discovered.every(el => el.name !== bitmap.name)) {
// 		discovered.push(bitmap);
// 	}

// 	stage.children.forEach(child => {
// 		if (child.name === "foundCount") {
// 			stage.removeChild(child);
// 		}
// 	});

// 	var foundCount = new createjs.Text(`${discovered.length}/100`, "72px Fantasy", "#ff7700");
// 	foundCount.x = 25;
// 	foundCount.y = 25;
// 	foundCount.name = "foundCount";
// 	stage.addChild(foundCount);

// 	update = true;

// 	bitmap.on("mousedown", function (evt) {
//     if(evt.currentTarget.y > 465 ) {
// 			stage.children[2].addChild(bitmap);
// 			let bitmapDup = bitmap.clone(true);
//       var imageDup = new Image();
//       imageDup.src = this.image.src;
//       imageDup.onload = handleImageLoad.bind(bitmapDup);

// 			this.y = evt.stageY - 20;
//       this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
//     } else {
// 			this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
// 		}
// 	});

//   bitmap.on("pressup", function (evt) {
// 		if(!elements.includes(bitmap)) elements.push(bitmap);
//     if(this.y < 465 ) {
//       let toRemove = [];
//       for (var i = 0; i < elements.length; i++) {
//         let element = elements[i];
//         if (this !== element && !(element.x - 15 > this.x + 15 ||
//                                   element.x + 15 < this.x - 15 ||
//                                   element.y - 15 > this.y + 15 ||
//                                   element.y + 15 < this.y - 15)) {

// 				 if([this.name, element.name].sort().join()===["atomic bomb", "earth"].join()) {
// 					 let kimContainer = new createjs.Container;
// 					 for (var i = 0; i < 250; i++) {
// 					 	let kim = new Image();
// 						kim.src="./assets/img/kim-yong-trump.jpg";
// 						let kimbitmap = new createjs.Bitmap(kim)
// 						kimContainer.addChild(kimbitmap);
// 						kimbitmap.x = Math.random() * 1000;
// 						kimbitmap.y = Math.random() * 1000;
// 					 }
// 					 if(!mute) createjs.Sound.play("explode")
// 					 stage.addChild(kimContainer);
// 					 $('.cheat').text("Start Over");
// 					 update = true;
// 				 }
// 				 let combined = combine(this.name, elements[i].name);
// 				 if (combined !== undefined) {
// 					 combined = combined[0];
// 					 var discoveredEl = new Image();
// 					 discoveredEl.src = `./assets/img/${combined}.png`;
// 					 if(discovered.every(el => el.image.src !== discoveredEl.src)) {
// 						 let elObj = {name: combined};
// 						 discoveredEl.onload = handleImageLoad.bind(elObj);
// 					 }
// 					 let elObj = {name: combined, altX: this.x, altY: this.y, discovered: true};
// 		       let imageDup = new Image();
// 		       imageDup.src = discoveredEl.src
// 		       imageDup.onload = handleImageLoad.bind(elObj);
// 					 if(!mute) createjs.Sound.play("greatJob");
// 				 } else {
// 					 if(!mute) createjs.Sound.play("laugh");
// 				 }
// 				 stage.children[1].removeChild(this.parent);
// 				 stage.children[1].removeChild(element.parent);
// 				 stage.children[2].removeChild(this);
// 				 stage.children[2].removeChild(element);
// 				 toRemove.push(element);
// 				 toRemove.push(this);
//         }
//       }
//       elements = elements.filter((el) => {
//         return !(toRemove.includes(el));
//       });
//     } else {
//       stage.children[1].removeChild(this.parent);
// 			stage.children[2].removeChild(this);
//     }
//     update = true;
//   });

// 	bitmap.on("pressmove", function (evt) {

//     if(this.y < 465) {
//       if(evt.stageY < 465) {
//         this.y = evt.stageY + this.offset.y;
//       }
//       this.x = evt.stageX + this.offset.x;
//     } else {
//       this.x = evt.stageX + this.offset.x;
//       this.y = evt.stageY + this.offset.y;
//     }
// 		update = true;
// 	});


// 	bitmap.on("rollover", function (evt) {
// 		this.scaleX = this.scaleY = this.scale * 1.2;
// 		update = true;
// 	});

// 	bitmap.on("rollout", function (evt) {
// 		this.scaleX = this.scaleY = this.scale;
// 		update = true;
// 	});

// 	if (stage.children[1].children.length >= 100) {
// 		if(!mute) createjs.Sound.play("win");
// 		winModal.visible = true;
// 		winModalLabel.visible = true;
// 		update = true;
// 	} else {
// 		winModal.visible = false;
// 		winModalLabel.visible = false;
// 	}

// 	createjs.Ticker.addEventListener("tick", tick);
// }

// function tick(event) {

// 	if (update) {
// 		update = false;
// 		stage.update(event);
// 	}

// }





const combine = require('./combine.js');

var canvas, stage;

var mouseTarget;
var dragStarted;
var offset;
var update = true;
var initial = ["flour","water","sugar"];
var all = ["milk", "grass", "sugar", "tomates", "flour", "water","dough","cake","egg","pancake","lemon","lemonade","cheese","grilledCheese","paneer"];

var elements = [];
var discovered = [];
var elOffset = 0;
var yCoord = 520;


// var winModal = new createjs.Shape();
// winModal.graphics.beginFill('ivory');
// winModal.graphics.setStrokeStyle(2,'round').beginStroke('#357EBD');
// winModal.alpha = 1;
// winModal.graphics.drawRect(240, 100, 500, 300);
// winModal.graphics.endFill();
// winModal.visible = false;

// var winModalLabel = new createjs.Text("You Win!", "80px Arial", "#000");
// winModalLabel.x = 490;
// winModalLabel.y = 190;
// winModalLabel.textAlign = 'center';
// winModalLabel.lineWidth = 800;
// winModalLabel.lineHeight = 50;
// winModalLabel.visible = false;


document.addEventListener("DOMContentLoaded", function() {
	canvas = document.getElementById("bodyCanvas");
	stage = new createjs.Stage(canvas);
  
	stage.enableMouseOver(10);
	stage.mouseMoveOutside = true;
  
	// Right-side modal
	var winModal = new createjs.Shape();
	winModal.graphics.beginFill('ivory');
	winModal.graphics.setStrokeStyle(2,'round').beginStroke('#357EBD');
	winModal.alpha = 1;
	winModal.graphics.drawRect(240, 100, 500, 300);
	winModal.graphics.endFill();
	winModal.visible = false;
	
	// Position winModal to the right
	winModal.x = canvas.width - winModal.getBounds().width - 20; // 20px for margin
  
	var winModalLabel = new createjs.Text("You Win!", "80px Arial", "#000");
	winModalLabel.x = winModal.x + winModal.getBounds().width / 2;  // Align label within the modal
	winModalLabel.y = 190;
	winModalLabel.textAlign = 'center';
	winModalLabel.lineWidth = 800;
	winModalLabel.lineHeight = 50;
	winModalLabel.visible = false;
  
	stage.addChild(winModal);
	stage.addChild(winModalLabel);
  
	
  

  line.graphics.setStrokeStyle(10);
  line.graphics.beginStroke("black");
  line.graphics.moveTo(500,0);
  line.graphics.lineTo(500, 1000);
  line.graphics.endStroke();

	stage.addChild(line);

	var disContainer = new createjs.Container();
 	stage.addChild(disContainer);

	var mask = new createjs.Shape();
	mask.graphics.f("#f00").dr(0,505,1000,500);
	disContainer.mask = mask;

	var wrapper;
	var canvasHeight;
	var vScrollHeight;
	var canvasWrapperHeight=300;

	$(".bar").draggable({
		containment: "parent"
	});

	$(".bar").on("drag", function (event, ui) {
		stage.children[1].y = 0 - ui.position.top * 5.8;
		stage.update();
	});

	var mainContainer = new createjs.Container();
	stage.addChild(mainContainer);
	mainContainer.setBounds(0,0,1000,500);

	stage.addChild(winModal);
	stage.addChild(winModalLabel);

	$(".cheat").on("click", (e) => {
		elOffset = 0;
		yCoord = 520;
		stage.children[1].removeAllChildren();
		stage.children[2].removeAllChildren();
		winModal.visible = false;
		winModalLabel.visible = false;

		if (stage.children[11] && stage.children[11].children) {
			stage.children[11].removeAllChildren();
		}
		discovered = [];
		update = true;
		if(e.currentTarget.textContent === "Unlock All") {
			e.currentTarget.textContent = "Start Over";
			all.forEach(el => {
				let image = new Image();
				image.src = `./assets/img/${el}.png`;
				let elObj = {name: el};
				image.onload = handleImageLoad.bind(elObj);
			});
		} else {
			e.currentTarget.textContent = "Unlock All";
			initial.forEach(el => {
				let image = new Image();
				image.src = `./assets/img/${el}.png`;
				let elObj = {name: el};
				image.onload = handleImageLoad.bind(elObj);
			});
		}
	});


	update = true;

  initial.forEach(el => {
    let image = new Image();
		image.src = `./assets/img/${el}.png`;
		let elObj = {name: el};
    image.onload = handleImageLoad.bind(elObj);
  });

});

function stop() {
	createjs.Ticker.removeEventListener("tick", tick);
}

function handleImageLoad(event) {
  var image = event.target;
	var bitmap;
	var container = new createjs.Container();
	bitmap = new createjs.Bitmap(image);

	if (this.discovered) {
		bitmap.x = this.altX;
		bitmap.y = this.altY;
		stage.children[2].addChild(bitmap);
		elements.push(bitmap);
	} else {
		bitmap.x = this.x || 40 + elOffset;
		bitmap.y = this.y || yCoord;
		stage.children[1].addChild(container);
		container.addChild(bitmap);
	}
	bitmap.regX = bitmap.width / 2 | 0;
	bitmap.regY = bitmap.height / 2 | 0;
	bitmap.name = this.name;
	bitmap.scaleX = bitmap.scaleY = bitmap.scale = .5;
	bitmap.cursor = "pointer";

	var text = new createjs.Text(this.name, "18px Fantasy", "#ff7700");
	text.y = this.y + 55 || yCoord + 55;
	text.x = bitmap.x + 5;
	container.addChild(text);

	if (!this.x && !this.discovered) {
		if (elOffset > 700) {
			elOffset = 0;
			yCoord += 100;
		} else {
			elOffset += 140;
		}
	}

	if(discovered.every(el => el.name !== bitmap.name)) {
		discovered.push(bitmap);
	}

	stage.children.forEach(child => {
		if (child.name === "foundCount") {
			stage.removeChild(child);
		}
	});

	var foundCount = new createjs.Text(`${discovered.length}/100`, "72px Fantasy", "#ff7700");
	foundCount.x = 25;
	foundCount.y = 25;
	foundCount.name = "foundCount";
	stage.addChild(foundCount);

	update = true;

	bitmap.on("mousedown", function (evt) {
    if(evt.currentTarget.y > 465 ) {
			stage.children[2].addChild(bitmap);
			let bitmapDup = bitmap.clone(true);
      var imageDup = new Image();
      imageDup.src = this.image.src;
      imageDup.onload = handleImageLoad.bind(bitmapDup);

			this.y = evt.stageY - 20;
      this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
    } else {
			this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
		}
	});

  bitmap.on("pressup", function (evt) {
		if(!elements.includes(bitmap)) elements.push(bitmap);
    if(this.y < 465 ) {
      let toRemove = [];
      for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        if (this !== element && !(element.x - 15 > this.x + 15 ||
                                  element.x + 15 < this.x - 15 ||
                                  element.y - 15 > this.y + 15 ||
                                  element.y + 15 < this.y - 15)) {

				 if([this.name, element.name].sort().join()===["atomic bomb", "earth"].join()) {
					 let kimContainer = new createjs.Container;
					 for (var i = 0; i < 250; i++) {
					 	let kim = new Image();
						kim.src="./assets/img/kim-yong-trump.jpg";
						let kimbitmap = new createjs.Bitmap(kim)
						kimContainer.addChild(kimbitmap);
						kimbitmap.x = Math.random() * 1000;
						kimbitmap.y = Math.random() * 1000;
					 }
					 if(!mute) createjs.Sound.play("explode")
					 stage.addChild(kimContainer);
					 $('.cheat').text("Start Over");
					 update = true;
				 }
				 let combined = combine(this.name, elements[i].name);
				 if (combined !== undefined) {
					 combined = combined[0];
					 var discoveredEl = new Image();
					 discoveredEl.src = `./assets/img/${combined}.png`;
					 if(discovered.every(el => el.image.src !== discoveredEl.src)) {
						 let elObj = {name: combined};
						 discoveredEl.onload = handleImageLoad.bind(elObj);
					 }
					 let elObj = {name: combined, altX: this.x, altY: this.y, discovered: true};
		       let imageDup = new Image();
		       imageDup.src = discoveredEl.src
		       imageDup.onload = handleImageLoad.bind(elObj);
					 if(!mute) createjs.Sound.play("greatJob");
				 } else {
					 if(!mute) createjs.Sound.play("laugh");
				 }
				 stage.children[1].removeChild(this.parent);
				 stage.children[1].removeChild(element.parent);
				 stage.children[2].removeChild(this);
				 stage.children[2].removeChild(element);
				 toRemove.push(element);
				 toRemove.push(this);
        }
      }
      elements = elements.filter((el) => {
        return !(toRemove.includes(el));
      });
    } else {
      stage.children[1].removeChild(this.parent);
			stage.children[2].removeChild(this);
    }
    update = true;
  });

	bitmap.on("pressmove", function (evt) {

    if(this.y < 465) {
      if(evt.stageY < 465) {
        this.y = evt.stageY + this.offset.y;
      }
      this.x = evt.stageX + this.offset.x;
    } else {
      this.x = evt.stageX + this.offset.x;
      this.y = evt.stageY + this.offset.y;
    }
		update = true;
	});


	bitmap.on("rollover", function (evt) {
		this.scaleX = this.scaleY = this.scale * 1.2;
		update = true;
	});

	bitmap.on("rollout", function (evt) {
		this.scaleX = this.scaleY = this.scale;
		update = true;
	});

	if (stage.children[1].children.length >= 100) {
		if(!mute) createjs.Sound.play("win");
		winModal.visible = true;
		winModalLabel.visible = true;
		update = true;
	} else {
		winModal.visible = false;
		winModalLabel.visible = false;
	}

	createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {

	if (update) {
		update = false;
		stage.update(event);
	}

}
