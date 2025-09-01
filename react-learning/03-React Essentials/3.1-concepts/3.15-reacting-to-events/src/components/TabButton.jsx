/**
 *  In React, we add event listener like onClick prop to elements by adding a special attribute or prop.
 *    - These built-in elements/components like <button> etc support many onSomething props which would us to listen to a broad variety of events.
 *    - The value for any event prop is a function i.e., we want to point to the function that should be executed when that event occurs.
 *    - We can define these function inside the main function since these inner functions can only be called from inside main function.
 *    - The advantage of defining these event handlers inside the component function is that they have access to the Component's Prop & State.
 *    - Function as value i.e., function without parenthesis () needs to be passed to the onClick prop. This function should not be executed by us
 *      but instead by React when click on button occurs at some point in the future.
 *    - If we add parenthesis () to the function, then the function would get executed when the specific line of code gets executed.
 */

export default function TabButton({children}) {

    function handleClick() {
        console.log('Hello World!');
    }

    return (
        <li>
            <button onClick={handleClick}>{children}</button>
        </li>
    );
}