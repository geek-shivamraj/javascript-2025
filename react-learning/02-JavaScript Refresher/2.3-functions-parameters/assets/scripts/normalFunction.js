// Function Definition
/**
 * 1. We can't have more than 1 default function in a single JS file (SyntaxError: Duplicate export of 'default' )
 * 2. We can have more than 1 non-default function in a single JS file.
 */

export default function defaultGreetingFromPluto(greeting = 'Hello!') {
  return greeting + "$$$$ Default: I am Will Smith from Pluto" + ". ";
}

// Not Allowed
// export default function defaultGreetingFromPluto1(greeting = 'Hello!') {
//   return greeting + "$$$$ Default: I am Will Smith from Pluto" + ". ";
// }

export function greetingFromMars(greeting = "Hello!") {
  return greeting + "$$$$ I am Elon Musk from Mars" + ". ";
}

export function greetingFromVenus(greeting = "Hello!") {
  return greeting + "$$$$ I am Json Husk from Venus" + ". ";
}
