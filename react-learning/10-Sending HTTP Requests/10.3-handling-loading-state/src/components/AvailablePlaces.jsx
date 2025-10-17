import Places from './Places.jsx';
import {useEffect, useState} from "react";

export default function AvailablePlaces({onSelectPlace}) {

    const [availablePlaces, setAvailablePlaces] = useState([]);

    // we want to manage the loading state along with data
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function fetchPlaces() {
            setIsFetching(true);
            const response = await fetch('http://localhost:3000/places');
            const data = await response.json();
            setAvailablePlaces(data.places);
            setIsFetching(false);
        }
        fetchPlaces();
    }, []);

    /**
     * Adding a separate prop to handle the loading state.
     *  - only visible if you enable throttling as slow 3G or 4G.
     */
    return (
        <Places
            title="Available Places"
            places={availablePlaces}
            isLoading={isFetching}
            loadingText="Fetching place data..."
            fallbackText="No places available."
            onSelectPlace={onSelectPlace}
        />
    );
}
