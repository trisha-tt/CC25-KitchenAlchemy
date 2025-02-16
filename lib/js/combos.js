var recipes = [["dough",["flour", "water"]],["cake", ["dough", "egg"]],["lemonade", ["lemon", "sweet water"]],["pancake", ["dough", "milk"]],
              ["cheese", ["lemon", "milk"]], ["paneer", ["cheese", "cheese"]],["grilled cheese", ["dough", "cheese"]] ];

var allRecipes = recipes.reduce((comb, [first, second]) => {
  if (!comb.hasOwnProperty(second)) comb[second] = [];
  comb[second].push(first);
  return comb;
}, {});

module.exports = allRecipes;


/*
var initial = ["flour", "water", "sugar"];
var all = ["flour", "water", "sugar", "egg", "lemon", "milk", "butter", "dough",
"tomato", "sweet water", "cake", "lemonade", "pancake", "cheese", "grilled cheese", 
"paneer", "curry", "paneer tikka", "egg curry", "waffle", "butter toast", "whipped cream",
"cheese cake", "ice cream", "cream cheese"];

var recipes = [["egg", ["water", "flour"]], ["sweet water", ["water", "sugar"]], ["cake", ["dough", "egg"]], 
    ["lemonade", ["lemon", "sweet water"]],["pancake", ["dough", "milk"]], ["cheese", ["lemon", "milk"]], 
    ["paneer", ["cheese", "cheese"]], ["grilled cheese", ["dough", "cheese"]],["curry", ["tomato", "water"]], 
    ["paneer tikka", ["curry", "paneer"]], ["buttered toast", ["dough", "butter"]], ["egg curry", ["egg", "curry"]],
    ["waffle", ["pancake", "pancake"]], ["whipped cream", ["milk", "milk"]], ["cream cheese", ["whipped cream", "cheese"]], 
    ["ice cream", ["whipped cream", "milk"]],["cheese cake", ["cream cheese", "cake"]]];

    var allRecipes = recipes.reduce((comb, [first, second]) => {
      if (!comb.hasOwnProperty(second)) comb[second] = [];
      comb[second].push(first);
      return comb;
    }, {});

    module.exports = allRecipes;

*/