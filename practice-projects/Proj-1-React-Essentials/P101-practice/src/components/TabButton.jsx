
// Task 5: Add a new component "TabButton" with children prop
// Task 8: Highlight the tab button via isSelected prop
export default function TabButton({children, isSelected, onSelect}) {

    return (
        <li>
            <button className={isSelected ? 'active' : undefined} onClick={onSelect}>{children}</button>
        </li>
    );
}