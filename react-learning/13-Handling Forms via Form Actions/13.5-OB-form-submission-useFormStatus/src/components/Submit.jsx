import {useFormStatus} from "react-dom";

/**
 *  useFormStatus hook returns various piece of information about the current status
 *      of the form in which this component is being used.
 *      - For e.g., const { pending, data, method, action } = useFormStatus();
 *      - Refer: https://react.dev/reference/react-dom/hooks/useFormStatus
 *
 *  - We can use 'pending' property to conditionally disable the button by setting "disabled" prop to pending.
 *
 *  - This is a reusable Submit component that we can use in any form that uses formAction to
 *      output a button that adjusts to the current submission status.
 */
export default function Submit() {

    const {pending} = useFormStatus();
    return (
        <p className="actions">
            <button type="submit" disabled={pending}>
                {pending ? 'Submitting...' : 'Submit'}
            </button>
        </p>
    );
}