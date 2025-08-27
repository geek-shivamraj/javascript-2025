/**
 *  Spread & Rest Operator (3 dots ...)
 */

/**
 *  Spread Operator:<br>
 *      - Spread Op expands elements.
 *      - It expands an iterable, such as an array or object -> into individual elements or properties.
 *      - Used for easy merging, copying, or passing elements as argument to a function call.
 *
 *  Rest Operator:<br>
 *      - Rest Op condenses them into a single entity
 *      - It collects multiple elements or properties into a single array or object.
 *      - Primarily, Used as function parameters while defining the function to handle variable no. of arguments
 *      - Also, Used in destructuring assignments to capture remaining elements.
 */

console.log('----------------------------------------- Array Use Case ---------------------------------------------------------');
const hobbies1 = ["Sports", "Cooking"];

// Spread Op UseCase 1: Merging of 2 arrays
const mergedHobbies1 = [...hobbies1, "Acting"];
console.log(mergedHobbies1);

const newHobbies1 = ["Reading", "Writing", "Fishing"];
const mergedHobbies2 = [...hobbies1, ...newHobbies1];
console.log(mergedHobbies2);
console.log('-----------------------------------------------------------');

// Spread Op UseCase 2: Copying
const copiedHobbies = [...mergedHobbies1];
console.log(copiedHobbies);
console.log('-----------------------------------------------------------');

const hobbies2 = ["Existing Hobby1", "Existing Hobby2"];

// Rest Op UseCase 1: Func Param to collect variable no. of Args
function addHobbies(...newHobbies2) {
    console.log(newHobbies2);

    // Spread Op UseCase 3: Passing elements as argument to function call
    hobbies2.push(...newHobbies2);
}
// Passing elements as array
addHobbies("New Hobby1", "New Hobby2", "New Hobby3");

console.log(hobbies2);
console.log('-----------------------------------------------------------');

const collection1 = [1, 2, 3, 4, 5];

// Rest Op UseCase 2: Destructuring assignments to capture remaining elements
const [firstElement, ...otherThanFirstElements] = collection1;
console.log(firstElement);
console.log(otherThanFirstElements);

console.log('----------------------------------------- Object Use Case ---------------------------------------------------------');
const employeeDetails1 = {
    'name': 'Will',
    'age': '30'
};
// Spread Op UseCase 1: Merging of 1 Object to another object
const employeeDetails2 = {
    ...employeeDetails1,
    'location': 'India',
}

const employeeDetails3 = {
    'id': 4532
}

// Spread Op UseCase 1: Merging of 2 Object
const employeeDetails4 = {
    ...employeeDetails1,
    ...employeeDetails3
}

console.log(employeeDetails1);
console.log(employeeDetails2);
console.log(employeeDetails3);
console.log(employeeDetails4);
console.log('-----------------------------------------------------------');

// Spread Op UseCase 2: Copying
const copiedEmployee = {...employeeDetails4}
console.log(copiedEmployee);
console.log('-----------------------------------------------------------');

function addEmployeeDetails(employeeDetails) {
    console.log(employeeDetails);
    return {...employeeDetails1, ...employeeDetails}
}

console.log(employeeDetails1);
const newEmployeeDetails = addEmployeeDetails({ ...employeeDetails2, pin: 45453, department: 'Abc' });
console.log(newEmployeeDetails);
console.log('-----------------------------------------------------------');

// Rest Op UseCase 2: Destructuring assignments to capture remaining attributes
const {name, ...remainingEmployeeDetails} = newEmployeeDetails;
console.log(name);
console.log(remainingEmployeeDetails);