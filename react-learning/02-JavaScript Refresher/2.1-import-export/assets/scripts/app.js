/**
 * For import & export to work in Vanilla JS, we must have <script type="module"> tag present in index.html
 *  -> index.html: <script src="assets/scripts/app.js" type="module"></script>
 *
 */

// Grouping named variable while importing them.
import { key1, key2 } from "./data.js";
import apikey from "./data.js";
import { key3 as newKey } from "./data.js";

console.log(apikey);
console.log(key1);
console.log(key2);
console.log(newKey);


// Group the named variables as JS object.
import * as keys from "./data.js"

console.log(keys.default);
console.log(keys.key1);
console.log(keys.key2);
console.log(keys.key3);


// Importing Function from other js
import { greetingFromMars } from "./data.js";

const greeting = greetingFromMars('Good evening!!')
console.log(greeting);