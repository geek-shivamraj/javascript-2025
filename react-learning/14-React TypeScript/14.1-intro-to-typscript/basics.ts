// Primitive: number, string, boolean
// More Complex type: arrays, objects
// Function types, parameters


// Primitives

let age: number;
age = 12;

let userName: string;
userName = 'John';

let isInstructor: boolean;
isInstructor = true;


// More Complex Types

// Array types
let hobbies: string[];
hobbies = ['Sports', 'Cooking']


// Object types
let person: {
    name: string;
    age: number;
}

person = {
    name: 'Max',
    age: 32
}

// Object [] types
let people: {
    name: string;
    age: number;
}[];

// Type inference

let course = 'React - The Complete Guide';

// Union Types
let new_course: string | number;
new_course = 1234;
new_course = 'I am React Native Course';

// Type Aliases

type Person = {
    name: string;
    age: number;
}

let new_person: Person;
new_person = {
    name: 'Raj',
    age: 20
}

let new_person_array: Person[];


// Functions & types

function add(a: number, b: number) {
    return a + b;
}

function printOutput(value: any) {
    console.log(value);
}

// Generic

// will have "any" as return type
function insertAtBeginning(array:any, value:any) {
    return [value, ...array];
}
const demoArray = [1, 2, 3, 4];
const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3, 4]

updatedArray[0].split(''); // this will give at runtime

// will have 'T' as return type.
function insertAtBeginningGeneric<T>(array: T[], value: T) {
    return [...array, value];
}

const numberArray = insertAtBeginningGeneric([1, 2, 3], -1);
const stringArray = insertAtBeginningGeneric(['a', 'b', 'c'], 'd');

// numberArray[0].split('');    // This will give error
stringArray[0].split('');