import Places from './Places.jsx';
import {useEffect, useState} from "react";

export default function AvailablePlaces({onSelectPlace}) {

    const [availablePlaces, setAvailablePlaces] = useState([]);

    /**
     *  Without useEffect, fetch code will run in infinite loop becoz this code is inside the component function
     *      that will trigger fetch call on each re-execution & then state updating func will trigger a re-execution
     *
     *   Solution 1: use "useEffect" hook
     *      - As we've empty dependency array, so this fetch func will be executed only once after the root component is rendered.
     *   Solution 1: use "useEffect" hook
     */

    /*
    // Way 1: Without async & await keyword
    useEffect(() => {
        fetch('http://localhost:3000/places',).then(response => {
            return response.json();
        }).then(responseData => {
            setAvailablePlaces(responseData.places);
        });
    }, []);
    */

    useEffect(() => {
        async function fetchPlaces() {
            const response = await fetch('http://localhost:3000/places');
            const data = await response.json();
            setAvailablePlaces(data.places);
        }

        // We've to call explicitly.
        fetchPlaces();
    }, []);

    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
