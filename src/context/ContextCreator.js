import React, { useEffect, createContext, useState } from "react";
import { Linking } from 'react-native'
import * as Location from 'expo-location'
import { AsyncStorage } from "react-native";

export const ContextCreator = createContext(null);

const API_KEY = "AIzaSyCgQNpZtDRvveEeDUkVBOrzy-TcV1QWbMU"

const ContextCreatorProvider = props => {

    const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 })
    const [searchLoading, setSearchLoading] = useState(false)
    const [currentSuggestions, setCurrentSuggestions] = useState([])
    const [trips, setTrips] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [tripToRemove, setTripToRemove] = useState("")
    const [attractionToRemove, setAttractionToRemove] = useState("")
    const [tripToRemoveAttraction, setTripToRemoveAttraction] = useState("")
    const [activePlaceId, setActivePlaceId] = useState()
    const [navigation, setNavigation] = useState()
    const [exFunction, setExFunction] = useState()

    removeTripFromList = async () => {
        let filteredArray = []
        let currTrips = trips
        
        if (tripToRemove !== "") {
            currTrips.splice(tripToRemove, 1)
            filteredArray = currTrips
        }
        else {
            currTrips[tripToRemoveAttraction].attractions.splice(attractionToRemove, 1)
            filteredArray = currTrips
        }

        setTrips(filteredArray)
        // setTripToRemove("")
        // setAttractionToRemove("")
        // setTripToRemoveAttraction("")
        setShowModal(false)

        try {
            await AsyncStorage.setItem(
                "@SavedTrips",
                JSON.stringify(filteredArray));
        }
        catch (e) { }
    }

    setModalState = state => {
        setShowModal(state)
    }

    openModalToRemoveTrip = (tripIndexToRemove , tripIndexOfAttractionToRemove, attractionIndexToRemove) => {
        setShowModal(true)
        setTripToRemove(tripIndexToRemove)
        setTripToRemoveAttraction(tripIndexOfAttractionToRemove)
        setAttractionToRemove(attractionIndexToRemove)
    }

    updateCurrentLocation = coordinates => {
        setCurrentLocation(coordinates)
    }

    getCurrentLocation = async () => {
        let location = await Location.getCurrentPositionAsync({})
        setCurrentLocation({ lat: location.coords.latitude, lng: location.coords.longitude })
    }

    getReviews = placeId => {
        return new Promise(resolve => {
            const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + placeId + "&fields=review&key=" + API_KEY
            fetch(url)
                .then((response) => response.json())
                .then(async (JsonResponse) => {
                    resolve(JsonResponse.result.reviews)
                })
        })
    }

    searchNearbyAttractions = coordinates => {
        return new Promise(resolve => {
            setSearchLoading(true)
            const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' + coordinates.lat + ',' + coordinates.lng + '&radius=3000&type=tourise_attraction&key=' + API_KEY;
            fetch(url)
                .then((response) => response.json())
                .then(async (JsonResponse) => {
                    let results = JsonResponse.results
                    results.shift()
                    let currentSuggestions = []
                    for (let i = 0; i < 10; i++) {
                        let reviews = await getReviews(results[i].place_id)
                        let img = ""
                        if (results[i].photos === undefined) {
                            img = "https://visualsound.com/wp-content/uploads/2019/05/unavailable-image.jpg"
                        } else {
                            img = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + results[i].photos[0].photo_reference + "&key=" + API_KEY
                        }
                        let attraction = {
                            coordinates: results[i].geometry.location,
                            placeId: results[i].place_id,
                            name: results[i].name,
                            img: img,
                            reviews: reviews,
                        }
                        currentSuggestions = [...currentSuggestions, attraction]
                    }
                    setCurrentSuggestions(currentSuggestions)
                    setActivePlaceId(currentSuggestions[0].placeId)
                    setSearchLoading(false)
                    resolve(true)
                })
                .catch((error) => {
                    console.log(error)
                });
        })
    }

    getLatLngFromGoogle = placeId => {
        return new Promise(resolve => {
            setSearchLoading(true)
            let url = "https://maps.googleapis.com/maps/api/geocode/json?place_id=" + placeId + "&key=" + API_KEY
            fetch(url)
                .then((response) => response.json())
                .then(async (JsonResponse) => {
                    setSearchLoading(false)
                    resolve(JsonResponse.results[0].geometry.location)
                })
                .catch((error) => {
                    alert("An error occurred, please try again.")
                });
        })
    }

    updateActivePlaceId = placeId => {
        setActivePlaceId(placeId)
    }

    saveNavigation = navigation => {
        setNavigation(navigation)
    }

    addToItinerary = async (attractionIndex, tripIndex) => {
        let currTrips = trips
        if (currTrips[tripIndex].attractions.length === 0) {
            currTrips[tripIndex].image = currentSuggestions[attractionIndex].img
        }
        currTrips[tripIndex].attractions = [...trips[tripIndex].attractions, currentSuggestions[attractionIndex]]
        setTrips(currTrips)

        try {
            await AsyncStorage.setItem(
                "@SavedTrips",
                JSON.stringify(currTrips));
        }
        catch (e) { }
    }

    checkAttractionExistence = (attractionIndex, tripIndex) => {
        let placeId = currentSuggestions[attractionIndex].placeId
        let currTrips = trips
        const existence = currTrips[tripIndex].attractions.some(attraction => attraction.placeId === placeId)
        return existence
    }

    removeAttractionFromItinerary = async (placeId, tripIndex) => {
        let currTrips = trips
        let attractionPlaceId = placeId
        let newIndex = 0;
        for (let i = 0; i < currTrips[tripIndex].attractions.length; i++) {
            if (currTrips[tripIndex].attractions[i].placeId === attractionPlaceId) {
                break
            }
            newIndex = newIndex + 1
        }
        currTrips[tripIndex].attractions.splice(newIndex, 1)
        setTrips(currTrips)
        try {
            await AsyncStorage.setItem(
                "@SavedTrips",
                JSON.stringify(currTrips));
        }
        catch (e) { }
    }

    createNewItinerary = async (name, description) => {
        let newTrip = {
            name: name,
            description: description,
            attractions: [],
            image: ""
        }

        try {
            await AsyncStorage.setItem(
                "@SavedTrips",
                JSON.stringify([...trips, newTrip]));
        }
        catch (e) { }

        setTrips([...trips, newTrip])

    }

    openGoogleMap = (name, placeId) => {
        Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + name.replace(" ", '%20') + '&query_place_id=' + placeId)
    }

    optimizeRoute = (tripIndex, origin, destination) => {
        return new Promise((resolve,reject)=> {
            let currTrips = trips
            let waypoints = ""
            for (let i = 0; i < currTrips[tripIndex].attractions.length; i++) {
                waypoints = waypoints + "%7C" + currTrips[tripIndex].attractions[i].coordinates.lat + '%2C' + currTrips[tripIndex].attractions[i].coordinates.lng
            }
            let url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin.lat + ',' + origin.lng + '&destination=' + destination.lat + ',' + destination.lng + '&waypoints=optimize:true' + waypoints + '&key=' + API_KEY
            fetch(url)
                .then(response => response.json())
                .then(JSONResponse => {
                    if(JSONResponse.routes.length === 0){
                        resolve(false)
                    }else{
                    let route = JSONResponse.routes[0].waypoint_order
                    let newOrder = []
                    for (let i = 0; i < route.length; i++) {
                        newOrder = [...newOrder, currTrips[tripIndex].attractions[route[i]]]
                    }
                    currTrips[tripIndex].attractions = newOrder
                    setTrips(currTrips)

                    try {
                        AsyncStorage.setItem(
                            "@SavedTrips",
                            JSON.stringify(currTrips));
                    }
                    catch (e) { }
                    resolve(currTrips)
                    }
                })
        })

    }

    useEffect(async () => {
        try {
            const savedTrips = await AsyncStorage.getItem("@SavedTrips");
            if (savedTrips !== null && savedTrips.length != 0) {
                let parsedTrips = JSON.parse(savedTrips);
                setTrips(parsedTrips)
            }
        } catch (error) {
            // Error retrieving data
        }
    }, [])

    return (
        <ContextCreator.Provider value={{
            currentLocation,
            searchLoading,
            currentSuggestions,
            trips,
            showModal,
            tripToRemove,
            attractionToRemove,
            tripToRemoveAttraction,
            activePlaceId,
            navigation,
            removeTripFromList,
            setModalState,
            openModalToRemoveTrip,
            updateCurrentLocation,
            getCurrentLocation,
            getLatLngFromGoogle,
            searchNearbyAttractions,
            updateActivePlaceId,
            saveNavigation,
            createNewItinerary,
            addToItinerary,
            checkAttractionExistence,
            removeAttractionFromItinerary,
            openGoogleMap,
            optimizeRoute,
        }}>
            {props.theApp}
        </ContextCreator.Provider>
    );
}

export default ContextCreatorProvider;