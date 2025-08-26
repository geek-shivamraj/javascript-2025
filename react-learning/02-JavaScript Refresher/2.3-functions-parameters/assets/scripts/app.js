import { greetingFromMars, greetingFromVenus } from "./normalFunction.js";
import defaultGreetingFromPluto from "./normalFunction.js";
import arrowFunctionGreet from "./arrowFunction.js";

// Function Definition
/**
 * Note: 
 *  - Default parameter doesn't need to be the end parameter in JS.
 *  - Issue if default param is not end parameter: We have to supply every time the value as we can't skip
 *      can move to next param. That's why default params are kept in the end
*/
function createGreeting(userName, greeting = "Hello!") {
  return greeting + "!! I am " + userName + ". ";
}

// Function call
const greeting1 = createGreeting('Shivam', 'Good morning!!');
console.log(greeting1);

// Function call
const greeting2 = createGreeting('Shivam');
console.log(greeting2);

/**
 * Function call to outside this file
 *  -> Without import, if we call outside function, we will get ReferenceError: greetingFromMars is not defined.
 *  -> With import, it will work fine.
*/
const greeting3 = greetingFromMars('Good evening!!');
console.log(greeting3);

const greeting4 = greetingFromVenus();
console.log(greeting4);

const greeting5 = defaultGreetingFromPluto();
console.log(greeting5);

const arrowGreeting = arrowFunctionGreet('Jackie Chan', 'Welcome ');
console.log(arrowGreeting);

const arrowGreeting1 = () => 'Inline Greetings';
console.log(typeof(arrowGreeting1));
console.log(arrowGreeting1.apply());