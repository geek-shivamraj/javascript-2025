import {useRef, useState, useEffect} from 'react';

import Places from './components/Places.jsx';
import {AVAILABLE_PLACES} from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from "./loc.js";

/**
 *  Not All Side Effects Need useEffect
 *
 */

const SELECTED_PLACES = 'selectedPlaces';
// Below 2 lines will run only once.
const storedIds = JSON.parse(localStorage.getItem(SELECTED_PLACES)) || [];
const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));

function App() {
    const modal = useRef();
    const selectedPlace = useRef();

    const [availablePlaces, setAvailablePlaces] = useState([]);
    // Initializing browser stored local places as initial value.
    const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

    /**
     * This is redundant usage of useEffect:
     *  - Becoz below code where we use local storage, runs synchronously unlike navigation code; Here we will get the data instantly.
     *      and therefore, the App component function doesn't finish its execution cycle before fetching the data is done.
     *  - For getting the user's location, we've async code i.e., a callback func will be used to perform further logic in the future.
     *
     *  - That's why we should remove below way of using "useEffect" & add the code at the starting of our app
     */
    // useEffect(() => {
    //     const storedIds = JSON.parse(localStorage.getItem('storedPlaces')) || [];
    //     const storedPlaces = storedIds.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));
    //     setPickedPlaces(storedPlaces);
    // }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
            setAvailablePlaces(sortedPlaces);
        })
    }, []);

    function handleStartRemovePlace(id) {
        modal.current.open();
        selectedPlace.current = id;
    }

    function handleStopRemovePlace() {
        modal.current.close();
    }

    function handleSelectPlace(id) {
        setPickedPlaces((prevPickedPlaces) => {
            if (prevPickedPlaces.some((place) => place.id === id)) {
                return prevPickedPlaces;
            }
            const place = AVAILABLE_PLACES.find((place) => place.id === id);
            return [place, ...prevPickedPlaces];
        });

        /** Use Case (1) of Side Effect
         * - Side Effect Code without useEffect() hook: Adding selected places list to the local storage
         * - This code is side effect as this feature is not directly related to rending this JSX code.
         *    - Adding this code here, so that the local storage will be updated with each state change.
         *
         * - We're not using useEffect() hook here. Why? becoz
         *  1. We're not allowed to use hook inside a function.
         *  2. Also, we don't need useEffect hook here as there is nothing wrong with below functionality & it doesn't create infinite loop.
         *      - As this code only executes when this handleSelectPlaces func is called & not on the App component func re-execution.
         *      - Even if we're updating any state in below code, this will also not create an infinite loop.
         *
         * [] is the fallback.
        */
        const storedIds = JSON.parse(localStorage.getItem(SELECTED_PLACES)) || [];
        if(storedIds.indexOf(id) === -1) {
            localStorage.setItem(SELECTED_PLACES, JSON.stringify([id, ...storedIds]));
        }
    }

    function handleRemovePlace() {
        setPickedPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
        );
        modal.current.close();

        /** Use Case (1) of Side Effect:
         *   - Updating the local storage with removed ids.
         */
        const storedIds = JSON.parse(localStorage.getItem(SELECTED_PLACES)) || [];
        localStorage.setItem(SELECTED_PLACES, JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current)));
    }

    return (
        <>
            <Modal ref={modal}>
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

export default App;
