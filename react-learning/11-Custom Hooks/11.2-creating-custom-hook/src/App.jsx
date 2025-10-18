import {useRef, useState, useCallback} from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import {fetchUserPlaces, updateUserPlaces} from "./http.js";
import ErrorPage from "./components/ErrorPage.jsx";
import {useFetch} from "./hooks/useFetch.js";

function App() {
    const selectedPlace = useRef();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();


    const {
        isFetching,
        fetchedData: userPlaces,
        setFetchedData: setUserPlaces,
        fetchingError: apiError
    } = useFetch(fetchUserPlaces, []);


    function handleStartRemovePlace(place) {
        setModalIsOpen(true);
        selectedPlace.current = place;
    }

    function handleStopRemovePlace() {
        setModalIsOpen(false);
    }

    async function handleSelectPlace(selectedPlace) {
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
            await updateUserPlaces([selectedPlace, ...userPlaces]);
        } catch (error) {
            setUserPlaces(userPlaces);
            setErrorUpdatingPlaces({
                message: error.message || 'Failed to update places.',
            });
        }

    }

    // Now we've to add setUserPlaces as dependency to this callback hook.
    // Ideally it's not required as React guarantees for all state updating function that they will never change.
    const handleRemovePlace = useCallback(async function handleRemovePlace() {
        setUserPlaces((prevPickedPlaces) =>
            prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );

        try {
            await updateUserPlaces(
                userPlaces.filter((place) => place.id !== selectedPlace.current.id)
            );
        } catch (error) {
            setUserPlaces(userPlaces);
            setErrorUpdatingPlaces({
                message: error.message || 'Failed to delete place.',
            });
        }


        setModalIsOpen(false);
    }, [userPlaces, setUserPlaces]);

    const handleError = () => {
        setErrorUpdatingPlaces(null);
    }

    return (
        <>
            <Modal open={errorUpdatingPlaces} onClose={handleError}>
                {errorUpdatingPlaces &&
                    <ErrorPage title="An error occurred!" message={errorUpdatingPlaces.message}
                               onConfirm={handleError}/>}
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
                {apiError && <ErrorPage title="An error occurred!" message={apiError.message}/>}
                {!apiError && <Places
                    title="I'd like to visit ..."
                    isLoading={isFetching}
                    loadingText="Fetching your places..."
                    fallbackText="Select the places you would like to visit below."
                    places={userPlaces}
                    onSelectPlace={handleStartRemovePlace}
                />}

                <AvailablePlaces onSelectPlace={handleSelectPlace}/>
            </main>
        </>
    );
}

export default App;
