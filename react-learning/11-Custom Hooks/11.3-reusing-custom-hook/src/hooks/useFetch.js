import {useEffect, useState} from "react";
import {fetchUserPlaces} from "../http.js";

/**
 * This Custom hook will not only send HTTP request but also manage all the related states to make this hook useful & reusable.
 *  - Step 1: Add generic states & code
 *  - Step 2: Add the props to dependency array on basis of which this hook needs to be executed
 *  - Step 3: Return the state values
 *  - Step 4: Make this hook exportable.
 *  - Step 5: We're not just limited to exposing state values, but we can also expose state updating functions.
 *
 */
export function useFetch(fetchFn, initialValue) {

    // Data state
    const [fetchedData, setFetchedData] = useState(initialValue);

    // Loading state
    const [isFetching, setIsFetching] = useState();

    // Error state
    const [fetchingError, setFetchingError] = useState();

    useEffect(() => {

        async function fetchData() {
            setIsFetching(true);
            try {
                const places = await fetchFn();
                setFetchedData(places);
            } catch (error) {
                setFetchingError({
                    message: error.message || 'Failed to fetch data.'
                });
            }
            setIsFetching(false);
        }
        fetchData()
    }, [fetchFn]);

    // We can group the state in array or object.
    return {
        isFetching, fetchedData, setFetchedData, fetchingError
    }
}