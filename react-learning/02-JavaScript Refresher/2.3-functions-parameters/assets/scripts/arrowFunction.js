/**
 * Arrow Function Definition
 *  1. We can only create 1 arrow function with default keyword in a JS file.
 *  2. We can have create multiple normal function here as well.
*/
export default (userName, greeting = "Hello!") => {
  return greeting + "$$$$ Arrow Function: " + userName +" from Milky Way" + ". ";
}
