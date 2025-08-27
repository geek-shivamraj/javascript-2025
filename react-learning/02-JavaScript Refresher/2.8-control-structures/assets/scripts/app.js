/**
 * Control Structures: if - else if - else, for loop
 */

const user = 'shivam';

if (user === 'shivam') {
    console.log('User exists!');
} else if (user === 'raj') {
    console.log('User does not exist!');
} else {
    console.log('User is not allowed!');
}

const users = ['shivam', 'max', 'ravi', 'abhi'];
for (const user of users) {
    console.log(`User: ${user} exists!`);
}