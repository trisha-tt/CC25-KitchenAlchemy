// var allRecipes = require('./combos.js');

// function combine(el1, el2) {
//     let recipe = [el1, el2].sort().join(',');
//     return allRecipes[recipe];
// }

// module.exports = combine;

const allRecipes = __webpack_require__(2);

// Function to combine two ingredients, using recipes
function combine(el1, el2) {
    let recipe = [el1, el2].sort().join(',');
    return allRecipes[recipe];
}

// Export combine function to make it accessible in other files
module.exports = combine;