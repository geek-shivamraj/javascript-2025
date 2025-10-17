/**
 * Idea is to extract the fetch place code from AvailablePlaces.jsx component to this file.
 */
export async function fetchAvailablePlaces() {
    const response = await fetch('http://localhost:3000/places');

    if (!response.ok) {
        throw new Error('Failed to fetch places');
    }
    const data = await response.json();
    return data.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch(`http://localhost:3000/user-places`, {
        method: 'PUT',
        body: JSON.stringify({places: places}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const resData = await response.json();

    if(!response.ok) {
        throw new Error('Failed to update user data.');
    }

    return resData.message;
}