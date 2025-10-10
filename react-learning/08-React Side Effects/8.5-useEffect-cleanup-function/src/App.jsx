import {useRef, useState, useEffect, useCallback} from 'react';

import Places from './components/Places.jsx';
import {AVAILABLE_PLACES} from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from "./loc.js";

const SELECTED_PLACES = 'selectedPlaces';
// Below 2 lines will run only once.
const storedIds = JSON.parse(localStorage.getItem(SELECTED_PLACES)) || [];
const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));

/**
 *   Here, we're deleting the selectedPlayer in 3sec timeout on DeleteConfirmation component.
 *   - Now we want to show a progress bar to display user the deletion timeout.
 *   - This is a use case of useEffect's clean function.
 */

export default function App() {

    const selectedPlace = useRef();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [availablePlaces, setAvailablePlaces] = useState([]);
    const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
            setAvailablePlaces(sortedPlaces);
        })
    }, []);

    function handleStartRemovePlace(id) {
        setModalIsOpen(true);
        selectedPlace.current = id;
    }

    function handleStopRemovePlace() {
        setModalIsOpen(false);
    }

    function handleSelectPlace(id) {
        setPickedPlaces((prevPickedPlaces) => {
            if (prevPickedPlaces.some((place) => place.id === id)) {
                return prevPickedPlaces;
            }
            const place = AVAILABLE_PLACES.find((place) => place.id === id);
            return [place, ...prevPickedPlaces];
        });

        const storedIds = JSON.parse(localStorage.getItem(SELECTED_PLACES)) || [];
        if(storedIds.indexOf(id) === -1) {
            localStorage.setItem(SELECTED_PLACES, JSON.stringify([id, ...storedIds]));
        }
    }

    const handleRemovePlace  = useCallback(function handleRemovePlace() {
        setPickedPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
        );
        // Commenting this will cause infinite loop for timer if not wrapped with useCallback() hook.
        setModalIsOpen(false);

        const storedIds = JSON.parse(localStorage.getItem(SELECTED_PLACES)) || [];
        localStorage.setItem(SELECTED_PLACES, JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)));
    }, []);


    return (
        <>
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
                    fallbackText={'Select the places you would like to visit below.'}
                    places={pickedPlaces}
                    onSelectPlace={handleStartRemovePlace}
                />
                <Places
                    title="Available Places"
                    places={availablePlaces}
                    fallbackText="Sorting places by distance..."
                    onSelectPlace={handleSelectPlace}
                />
            </main>
        </>
    );
}