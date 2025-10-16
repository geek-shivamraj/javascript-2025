import { log } from '../../log.js';
import {memo} from "react";

/**
 * Wrapping <IconButton> with memo() function to stop its & its child component execution.
 *  - This will not work though.
 *  - Actually it did work but "prop" values got changed. How ?
 *      - children prop is simply text ---> Didn't change
 *      - icon prop receives a pointer to a component - Just the name of the component so, it also didn't change
 *      - ...props: we're setting "onClick" prop here & this indeed the problem here
 *          - These handleFunction that onClick refers to, they are created inside the Counter Component i.e., nested function
 *          - Therefore, they will be technically re-created every time, the Counter function executes.
 *          - So every time the state changes, the component function as an object will be re-created.
 *
 *   Solution: We can use "useCallback() hook" to prevent re-creation of a function.
 */

const IconButton = memo(function IconButton({ children, icon, ...props }) {
    log('<IconButton /> rendered', 2);

    const Icon = icon;
    return (
        <button {...props} className="button">
            <Icon className="button-icon" />
            <span className="button-text">{children}</span>
        </button>
    );
});

export default IconButton;
