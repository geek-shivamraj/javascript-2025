/**
 *  The event handler function can be passed as prop to the Custom Component Function.
 */
export default function TabButton({children, onSelect, isSelected}) {
    return (
        <li>
            <button className={isSelected ? 'active' : undefined} onClick={onSelect}>{children}</button>
        </li>
    );
}