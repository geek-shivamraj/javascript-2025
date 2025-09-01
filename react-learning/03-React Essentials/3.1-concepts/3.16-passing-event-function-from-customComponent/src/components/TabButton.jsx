/**
 *  The event handler function can be passed as prop to the Custom Component Function.
 */

export default function TabButton({children, onSelect}) {
    return (
        <li>
            <button onClick={onSelect}>{children}</button>
        </li>
    );
}