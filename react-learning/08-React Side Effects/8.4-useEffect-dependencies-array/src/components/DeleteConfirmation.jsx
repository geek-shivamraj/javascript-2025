/**
 *
 * New Use case: To define cleanup function to execute right before the effect function runs again by returning it inside the func.
 *  - We want to auto-delete the item on 3sec timeout if the delete is not confirmed.
 *  - We can use useEffect() hook to stop the timer when this component disappears. Not for setting the timer but to stop.
 *
 *  Problem with Object & Function dependencies
 *   - As we know that if we're using props or state values in our effect function, we should add them as dependencies.
 *   - When adding functions as dependencies, there is a danger of creating an infinite loop.
 *      - This passed function is re-created everytime this App component function executes as when a component function is re-executed
 *          all the values defined will be re-created & therefore func defined inside the component will also be re-created.
 *      - Since functions are objects in JS even if the same function will be recreated, they would be different objects.
 *      - Same case for objects too.
 *      - That's why "onConfirm" as effect dependency will be re-created every time the component function re-executes hence INFINITE LOOP.
 *      - In below specific case, we won't enter into INFINITE LOOP as this component will be deleted post confirmation.
 *
 *  Solution 1: Always remove the component post use.
 *
 *  Solution 2: use another hook "useCallback()"
 *    - To make sure the func is not created everytime. Here "onConfirm" function.
 */
import {useEffect} from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onConfirm();
        }, 3000);

        return () => {
            clearTimeout(timer);
        }
    }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
