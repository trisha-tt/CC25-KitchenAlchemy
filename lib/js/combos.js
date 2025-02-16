var recipes = [["dough",["flour", "water"]],["cake", ["dough", "egg"]],["lemonade", ["lemon", "sweet water"]],["pancake", ["dough", "milk"]],
              ["cheese", ["lemon", "milk"]], ["paneer", ["cheese", "cheese"]],["grilled cheese", ["dough", "cheese"]] ];

var allRecipes = recipes.reduce((comb, [first, second]) => {
  if (!comb.hasOwnProperty(second)) comb[second] = [];
  comb[second].push(first);
  return comb;
}, {});
