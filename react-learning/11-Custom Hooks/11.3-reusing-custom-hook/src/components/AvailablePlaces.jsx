import Places from './Places.jsx';
import ErrorPage from "./ErrorPage.jsx";
import {sortPlacesByDistance} from "../loc.js";
import {fetchAvailablePlaces} from "../http.js";
import {useFetch} from "../hooks/useFetch.js";

async function fetchSortedPlaces() {
    const places = await fetchAvailablePlaces();

    // return Promise once we got the current position/location
    /**
     *  By using Promise Constructor, we're promising below code here i.e., we're turning below code into a promise
     *   - As useFetch custom hook expects a fetchFn() to yield a promise since we're awaiting the result there.
     */

    // We can use "reject" feature to throw an error (not required in our case)
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);

            // Calling resolve once the value/response is here so that useFetch hook will know that wait is over.
            // Below value will be returned at the end by the overall promise returned by fetchSortedPlaces function.
            // This is standard JS feature to convert a non-promise feature/API into a promise-based feature
            resolve(sortedPlaces);
        });
    });

}



export default function AvailablePlaces({onSelectPlace}) {

    // const {
    //     isFetching,
    //     fetchedData: availablePlaces,
    //     setFetchedData: setAvailablePlaces,
    //     fetchingError: apiError
    // } = useFetch(fetchAvailablePlaces, [])

    // Now we will pass fetchSortedPlaces as fetchFn for useFetch so that it can call fetchSortedPlaces func
    const {
        isFetching,
        fetchedData: availablePlaces,
        fetchingError: apiError
    } = useFetch(fetchSortedPlaces, [])

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
