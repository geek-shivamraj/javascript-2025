import Places from './Places.jsx';
import {useEffect, useState} from "react";
import ErrorPage from "./ErrorPage.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../http.js";

export default function AvailablePlaces({onSelectPlace}) {

    // Data state
    const [availablePlaces, setAvailablePlaces] = useState([]);

    // Loading state
    const [isFetching, setIsFetching] = useState(false);

    // Adding an error state
    const [apiError, setApiError] = useState();

    useEffect(() => {
        setIsFetching(true);
        async function fetchPlaces() {
            try {
                // Idea is to extract this code to http.js to reuse wherever required.
                const places = await fetchAvailablePlaces();

                // Sort the places
                navigator.geolocation.getCurrentPosition((position) => {
                    const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
                    setAvailablePlaces(sortedPlaces);
                    // Keeping this here coz sorting the place will take time.
                    setIsFetching(false);
                });
            } catch (error) {
                setApiError({
                   message: error.message || 'Could not fetch places, Please try again later.',
                });

                // Keeping this here in case a exception occurs.
                setIsFetching(false);
            }
            // This below code will execute too early as we want to wait till the places are sorted.
            // setIsFetching(false);
        }

        fetchPlaces();
    }, []);

    // To show in case we get apiError
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
