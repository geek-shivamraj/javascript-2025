import { useRef, useState, useEffect } from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import {sortPlacesByDistance} from "./loc.js";

/**
 *  Step 1:
     *  - Since <App> component is the root component, it's a perfect place to get the website user's location becoz
     *      we want to get this location as early as possible when this app starts up essentially.
     *  - Using browser inbuilt "navigator.geolocation.getCurrentPosition", we can get user's location
     *  - Browser provides the "position" object to use for fetching latitude & longitude
     *  - Ofc, fetching that location can take time though & therefore getCurrentPosition method takes a callback function as i/p
     *  - This callback func will be executed by browser once the location will be fetched.
     *  - This callback func will be called at some point in the future where this App Component function most likely finished its execution already.
     *  - That's why below code is a Side Effect.
 *
 * Step 2:
 *  - To show these sorted place on the screen, and since these sorted places are not available at the start.
 *      We need state to update the places on UI once sorted.
 *  - Now once we received & set the sorted places, the useState will trigger a re-execution for App component.
 *      & here we got the Problem i.e., INFINITE LOOP for Component re-executions.
 *
 *  Problem: INFINITE LOOP for Component re-executions.
 *   - Becoz on each re-execution, user will be asked for location & the side effect will re-execute.
 *
 *  Solution: useEffect() hook from React. As via useEffect() hook, the side effects will be executed by React after every Component execution.
 *   - i.e., When app starts, the side effect functions will not execute right away,
 *      instead only after the <App> component function execution is finished, this side effect function passed to useEffect will be executed by React.
 *   - Now in order for side effect function to run again & again, this dependency array comes into the pic.
 *      - If we define the dependencies array, then React will only execute this side effect again if dependency values changed.
 *      - If we don't have dependencies like [], then React wil never re-executes the effect function again
 *          i.e., SE will be executed only once after the App component function execution for the 1st time.
 *      - If we omit the dependencies array, then React will re-execute the side effect again & again.
 *
 *   - This hook will not return any value unlike useState, or useRef
 *   - useEffect() hook needs 2 args
 *      - arg1: function that will wrap the side effect code.
 *      - arg2: array of dependencies of that side effect function.
 *
 */
function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState([]);

  const [availablePlaces, setAvailablePlaces] = useState([]);
    /**
     *  - This is Side Effect code: Since this code is needed by our app, but it's not directly related to our task / main goal of component function.
     *  - The main goal of every component function is to return renderable JSX code.
     */
   // navigator.geolocation.getCurrentPosition((position) => {
   //     const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
   //     setAvailablePlaces(sortedPlaces);
   // })

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
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();
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
        <img src={logoImg} alt="Stylized globe" />
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
