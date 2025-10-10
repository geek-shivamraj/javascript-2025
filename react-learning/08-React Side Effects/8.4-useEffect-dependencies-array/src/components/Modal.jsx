import {useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';

// If we define the dependency array, then React will only execute the side effect function if dependency value is changed.
export default function Modal({children, open, onClose}) {
    const dialog = useRef();

    useEffect(() => {
        if(open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    return createPortal(
        <dialog className="modal" ref={dialog} onClose={onClose}>
            {open ? children : null}
        </dialog>,
        document.getElementById('modal')
    );
}
