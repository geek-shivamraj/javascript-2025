/**
 * Destructuring means pulling values out of Array/Object directly via constants/variables.
 */
/**
 *  Array Destructuring
 */
// Fetch Array items via Index
const userName = ['Shivam', 'Raj']
const userFirstName = userName[0];
const userLastName = userName[1];
console.log(userFirstName);
console.log(userLastName);

// Fetch Array items via Array Destructuring.
const [firstName, lastName] = ['Will', 'Smith'];
console.log(firstName);
console.log(lastName);

const [num1, num2, num3] = [1, 2, 3];
console.log(num1);
console.log(num2);
console.log(num3);

/**
 *  Object Destructing
 */
// Fetch Object attributes via attr name
const userObject = {
    name: 'John',
    age: 15,

    printUserNote() {
        console.log("Function inside UserObject");
    }
};
const userName1 = userObject.name;
const age1 = userObject.age;
console.log(userObject);
console.log(userName1);
console.log(age1);
userObject.printUserNote();

// Fetching object attributes by Object Destructuring
const {name: name2, age: age2, printUserNote1: userNoteFunction, printUserNote2} = {
    name: "Max",
    age: 30,

    printUserNote1() {
        console.log("Function1 inside destructuring object");
    },
    printUserNote2() {
        console.log("Function2 inside destructuring object");
    }
};
console.log(name2);
console.log(age2);
userNoteFunction();
printUserNote2();


/**
 *  Function Parameter Destructing
 */
// Accessing Function params using object reference
function storeOrder1(order) {
    console.log(order.id);
    console.log(order.currency);
    console.log(order.amount);
}
storeOrder1({id: 5, currency: 'USD', amount: 15.99});

// Accessing Function params via destructing
function storeOrder2({ id, currency, amount }) {
    console.log(id);
    console.log(currency);
    console.log(amount);
}
storeOrder2({id: 50, currency: 'INR', amount: 22.32});