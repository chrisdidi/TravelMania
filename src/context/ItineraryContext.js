import React, { createContext, useState, useEffect } from "react";

export const ItineraryContext = createContext();

const ItineraryContextProvider = props => {

    const [trips, setTrips] = useState([
        {
            tripName: "First Trip",
            country: "Italy",
            attractions: 2,
            image:
                "https://s31706.pcdn.co/wp-content/uploads/2019/02/Best-Places-to-Visit-in-Italy-Venezia.jpg"
        },
        {
            tripName: "Second Trip",
            country: "Germany",
            attractions: 8,
            image:
                "https://s31706.pcdn.co/wp-content/uploads/2019/02/Best-Places-to-Visit-in-Italy-Venezia.jpg"
        },
        {
            tripName: "Third Trip",
            country: "United States Of America",
            attractions: 1,
            image:
                "https://s31706.pcdn.co/wp-content/uploads/2019/02/Best-Places-to-Visit-in-Italy-Venezia.jpg"
        },
        {
            tripName: "Fourth Trip",
            country: "Lithuania",
            attractions: 5,
            image:
                "https://s31706.pcdn.co/wp-content/uploads/2019/02/Best-Places-to-Visit-in-Italy-Venezia.jpg"
        },
        {
            tripName: "Fifth Trip",
            country: "Canada",
            attractions: 4,
            image:
                "https://s31706.pcdn.co/wp-content/uploads/2019/02/Best-Places-to-Visit-in-Italy-Venezia.jpg"
        }
    ])// we create trips here, at the beginning mocking data

    const [showModal, setShowModal] = useState(false);

    const [tripToRemove, setTripToRemove] = useState()

    removeTripFromList = () => {
        setShowModal(false)
        let filteredArray = trips.filter((trip => trip !== tripToRemove))
        setTrips(filteredArray)
    }

    setModalState = state => {
        setShowModal(state)
    }

    openModalToRemoveTrip = (trip) => {
        setShowModal(true)
        setTripToRemove(trip)
    }
    return (
        <ItineraryContext.Provider
            value={{
                trips,
                showModal,
                removeTripFromList,
                openModalToRemoveTrip,
                setModalState
            }}
        >
            {props.children}
        </ItineraryContext.Provider>
    );

}

export default ItineraryContextProvider;