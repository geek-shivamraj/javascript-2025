import Places from './Places.jsx';
import {useEffect, useState} from "react";
import ErrorPage from "./ErrorPage.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../http.js";
import {useFetch} from "../hooks/useFetch.js";

export default function AvailablePlaces({onSelectPlace}) {
    // Data state
    const [availablePlaces, setAvailablePlaces] = useState([]);
    // Loading state
    const [isFetching, setIsFetching] = useState(false);
    // Error state
    const [apiError, setApiError] = useState();

    useEffect(() => {
        setIsFetching(true);
        async function fetchPlaces() {
            try {

                const places = await fetchAvailablePlaces();

                navigator.geolocation.getCurrentPosition((position) => {
                    const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
                    setAvailablePlaces(sortedPlaces);

                    setIsFetching(false);
                });
            } catch (error) {
                setApiError({
                   message: error.message || 'Could not fetch places, Please try again later.',
                });

                setIsFetching(false);
            }
        }

        fetchPlaces();
    }, []);

    if(apiError) {
        return <ErrorPage title="An error occurred!" message={apiError.message} />
    }

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
