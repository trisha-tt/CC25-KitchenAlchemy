var recipes = [["dough", ["water", "flour"]], ["sweet water", ["water", "sugar"]], ["cake", ["dough", "egg"]], 
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