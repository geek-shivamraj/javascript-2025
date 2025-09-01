/**
 *  The event handler function can be passed as prop to the Custom Component Function.
 */

export default function TabButton({children, onSelect}) {
    // Check to verify if component is re-executed.
    console.log("Tab Button Component executed!!");

    return (
        <li>
            <button onClick={onSelect}>{children}</button>
        </li>
    );
}