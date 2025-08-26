/**
 * Way 1: We can create object by adding attributes & method inside as curly braces{}
*/
const user = {
  name: "Mad Max",
  age: 34,
  greet() {
    console.log(this.age);
  }
};

console.log(user.name);
user.greet();

/**
 * Way 2: We can create object of a specific class by using new operator
 *  Class: we can create a class by adding attributes, constructor & method.
 */
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log("Hi!" + this.name + ", I'm " + this.age);
  }
}
// Object Creation by using new operator
const user1 = new User("Manuel", 35);
const user2 = new User("Manuel", 37);
console.log(user2);
user1.greet();