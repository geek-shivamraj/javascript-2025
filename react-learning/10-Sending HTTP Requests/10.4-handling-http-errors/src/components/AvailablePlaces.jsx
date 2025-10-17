import Places from './Places.jsx';
import {useEffect, useState} from "react";
import ErrorPage from "./ErrorPage.jsx";

export default function AvailablePlaces({onSelectPlace}) {

    // Loading state
    const [availablePlaces, setAvailablePlaces] = useState([]);

    // Data state
    const [isFetching, setIsFetching] = useState(false);

    // Adding an error state
    const [apiError, setApiError] = useState();

    useEffect(() => {
        async function fetchPlaces() {
            try {
                const response = await fetch('http://localhost:3000/placesssss');

                // Handling HTTP Errors
                if (!response.ok) {
                    throw new Error('Failed to fetch places');
                }
                const data = await response.json();
                setAvailablePlaces(data.places);
            } catch (error) {
                // Handling error in UI means we wanna update the UI and show an error message to the user.
                // setApiError(error);
                setApiError({
                   message: error.message || 'Could not fetch places, Please try again later.',
                });
            }
            setIsFetching(false);
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
