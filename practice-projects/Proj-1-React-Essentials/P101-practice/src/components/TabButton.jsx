
// Task 5: Add a new component "TabButton" with children prop
export default function TabButton({children}) {
    return (
        <li>
            <button>{children}</button>
        </li>
    );
}