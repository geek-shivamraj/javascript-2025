
// Array Creation
const hobbies = ["Sports", "Cooking", "Reading"];

// Accessing array items via index
console.log(hobbies[0]);

// Add item to array
hobbies.push("Working");
console.log(hobbies);

// finding the index of an item in an array
const index = hobbies.findIndex(item => item === "Working");
console.log(index);

// map the value to object with key as text & value as item
const editedHobbies = hobbies.map(item => ({ text: item }));
console.log(editedHobbies);

console.log("end");
