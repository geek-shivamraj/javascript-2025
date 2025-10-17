import {useRef, useState, useCallback} from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {updateUserPlaces} from "./http.js";
import ErrorPage from "./components/ErrorPage.jsx";

function App() {
    const selectedPlace = useRef();

    const [userPlaces, setUserPlaces] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

    function handleStartRemovePlace(place) {
        setModalIsOpen(true);
        selectedPlace.current = place;
    }

    function handleStopRemovePlace() {
        setModalIsOpen(false);
    }

    // We will need to add await to updateUserPlaces & await can only be supported with async function.
    // We can easily convert this function into async as we're setting this up as event listener function that gets
        // trigger when we select a place.
    // And since we can use await, we can use try, catch as well.
    async function handleSelectPlace(selectedPlace) {

        // Not optimistic update
        //await updateUserPlaces([selectedPlace, ...userPlaces]);

        // This is optimistic update i.e., the UI is updated instantly & the request is sent at the same time to BE.
        setUserPlaces((prevPickedPlaces) => {
            if (!prevPickedPlaces) {
                prevPickedPlaces = [];
            }
            if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
                return prevPickedPlaces;
            }
            return [selectedPlace, ...prevPickedPlaces];
        });

        try {
            // Here we want to send the places to Backend as well.
            // Below will not work as we've scheduled the state update that will be available in next render.
            // updateUserPlaces(userPlaces);
            await updateUserPlaces([selectedPlace, ...userPlaces]);
        } catch (error) {
            // Since we're performing optimistic update. In case update fails, we need to rollback the state to prev state
            setUserPlaces(userPlaces);
            setErrorUpdatingPlaces({
                message: error.message || 'Failed to update places.',
            });
        }

    }

    const handleRemovePlace = useCallback(async function handleRemovePlace() {
        setUserPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );

        setModalIsOpen(false);
    }, []);

    const handleError = () => {
        setErrorUpdatingPlaces(null);
    }

    return (
        <>
            <Modal open={errorUpdatingPlaces} onClose={handleError}>
                {errorUpdatingPlaces &&
                    <ErrorPage title="An error occurred!" message={errorUpdatingPlaces.message} onConfirm={handleError} />}
            </Modal>

            <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
                <DeleteConfirmation
                    onCancel={handleStopRemovePlace}
                    onConfirm={handleRemovePlace}
                />
            </Modal>

            <header>
                <img src={logoImg} alt="Stylized globe"/>
                <h1>PlacePicker</h1>
                <p>
                    Create your personal collection of places you would like to visit or
                    you have visited.
                </p>
            </header>
            <main>
                <Places
                    title="I'd like to visit ..."
                    fallbackText="Select the places you would like to visit below."
                    places={userPlaces}
                    onSelectPlace={handleStartRemovePlace}
                />

                <AvailablePlaces onSelectPlace={handleSelectPlace}/>
            </main>
        </>
    );
}

export default App;
