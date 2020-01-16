import React, { Component, createContext, useState } from "react";
import { Linking } from 'react-native'
import ContextCreator from './ContextCreator'
import * as Location from 'expo-location'

const API_KEY = "AIzaSyCgQNpZtDRvveEeDUkVBOrzy-TcV1QWbMU"

export default class Store extends Component{

    constructor(props){
        super(props);

        this.removeTripFromList = () => {
            this.setState({
                showModal: false
            })
            let filteredArray = trips.filter((trip => trip !== tripToRemove))
            this.setState({
                trips: filteredArray
            })
        }

        this.setModalState = state => {
            this.setState({
                showModal: state
            })
        }

        this.openModalToRemoveTrip = (trip) => {
            this.setState({
                showModal: true,
                tripToRemove: trip
            })
        }
    
        this.updateCurrentLocation = coordinates => {
            this.setState({
                currentLocation: coordinates
            })
        }
    
        this.getCurrentLocation = async () => {
            let location = await Location.getCurrentPositionAsync({})
            this.setState({
                currentLocation: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                }
            })
        }

        this.getReviews = placeId => {
            return new Promise(resolve => {
                const url = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+placeId+"&fields=review&key=" + API_KEY
                fetch(url)
                .then((response) => response.json())
                .then(async (JsonResponse) => {
                    resolve(JsonResponse.result.reviews)
                })
            })
        }

        this.searchNearbyAttractions = coordinates => {
            return new Promise(resolve => {
            const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + 'location=' + coordinates.lat + ',' + coordinates.lng + '&radius=3000&type=tourise_attraction&key=' + API_KEY;
            fetch(url)
                .then((response) => response.json())
                .then(async (JsonResponse) => {
                    let results = JsonResponse.results
                    results.shift()
                    let currentSuggestions = []
                    for(let i = 0; i < 10; i++){
                        let reviews = await this.getReviews(results[i].place_id)
                        let img = ""
                        if(results[i].photos === undefined){
                            img = "https://visualsound.com/wp-content/uploads/2019/05/unavailable-image.jpg"
                        }else{
                            img = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + results[i].photos[0].photo_reference + "&key=" + API_KEY
                        }
                        let attraction = {
                            coordinates: results[i].geometry.location,
                            placeId: results[i].place_id,
                            name: results[i].name,
                            img : img,
                            reviews: reviews,
                        }
                        currentSuggestions=[ ...currentSuggestions, attraction]
                    }
                    this.setState({
                        currentSuggestions: currentSuggestions,
                        activePlaceId: currentSuggestions[0].placeId
                    })
                    resolve(true)
                })
                .catch((error) => {
                    console.log(error)
                });
            })
        }

        this.getLatLngFromGoogle = placeId => {
            this.setState({
                searchLoading: true
            })
            let url = "https://maps.googleapis.com/maps/api/geocode/json?place_id=" + placeId+ "&key=" + API_KEY
            fetch(url)
                .then((response) => response.json())
                .then(async (JsonResponse) => {
                    this.updateCurrentLocation(JsonResponse.results[0].geometry.location)
                    await this.searchNearbyAttractions(JsonResponse.results[0].geometry.location)
                    this.setState({
                        searchLoading: false
                    })
                })
                .catch((error) => {
                    alert("An error occurred, please try again.")
                });
        }

        this.updateActivePlaceId = placeId => {
            this.setState({
                activePlaceId: placeId
            })
        }

        this.saveNavigation = navigation => {
            this.setState({
                navigation: navigation
            })
        }

        this.addToItinerary = (attractionIndex, tripIndex) => {
            let trips = this.state.trips
            trips[tripIndex].attractions = [...this.state.trips[tripIndex].attractions, this.state.currentSuggestions[attractionIndex]]
            this.setState({
                trips: trips
            })
        }

        this.checkAttractionExistence = (attractionIndex, tripIndex) => {
            let placeId = this.state.currentSuggestions[attractionIndex].placeId
            let trips = this.state.trips
            const existence = trips[tripIndex].attractions.some(attraction => attraction.placeId === placeId)
            return existence
        }

        this.removeAttractionFromItinerary = (placeId, tripIndex) => {
            let trips = this.state.trips
            let attractionPlaceId = placeId
            let newIndex = 0;
            for(let i = 0; i < trips[tripIndex].attractions.length; i++){
                if(trips[tripIndex].attractions[i].placeId === attractionPlaceId){
                    break
                }
                newIndex = newIndex+ 1
            }
            trips[tripIndex].attractions.splice(newIndex, 1)
            this.setState({
                trips: trips
            })
        }

        this.createNewItinerary = (name, description) => {
            let newTrip = {
                name: name,
                description: description,
                attractions: []
            }
            this.setState({
                trips: [...this.state.trips, newTrip]
            })
        }

        this.openGoogleMap = (name, placeId) => {
            Linking.openURL('https://www.google.com/maps/search/?api=1&query='+ name.replace(" ", '%20') +'&query_place_id=' + placeId)
        }

        this.optimizeRoute = (tripIndex, origin, destination) => {
            let trips = this.state.trips
            let waypoints = ""

            for(let i = 0; i < trips[tripIndex].attractions.length; i++){
                waypoints = waypoints + "%7C" + trips[tripIndex].attractions[i].coordinates.lat + '%2C' + trips[tripIndex].attractions[i].coordinates.lng
            }
            let url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin  + '&destination=' + destination + '&waypoints=optimize:true' + waypoints + '&key=' + API_KEY
            fetch(url)
            .then(response => response.json())
            .then(JSONResponse => {
                let route = JSONResponse.routes[0].waypoint_order
                let newOrder = []
                for(let i = 0; i < route.length; i ++){
                    newOrder = [ ...newOrder, trips[tripIndex].attractions[route[i]]]
                }
                trips[tripIndex].attractions = newOrder
            })
        }

        this.state={
            currentLocation: {
                lat: 0,
                lng: 0
            },
            searchLoading: false,
            currentSuggestions: [],
            trips:[],
            showModal: false,
            tripToRemove: "",
            removeTripFromList: this.removeTripFromList,
            setModalState: this.setModalState,
            openModalToRemoveTrip: this.openModalToRemoveTrip,
            updateCurrentLocation: this.updateCurrentLocation,
            getCurrentLocation: this.getCurrentLocation,
            getLatLngFromGoogle: this.getLatLngFromGoogle,
            searchNearbyAttractions: this.searchNearbyAttractions,
            updateActivePlaceId: this.updateActivePlaceId,
            saveNavigation: this.saveNavigation,
            createNewItinerary: this.createNewItinerary,
            addToItinerary: this.addToItinerary,
            checkAttractionExistence: this.checkAttractionExistence,
            removeAttractionFromItinerary: this.removeAttractionFromItinerary,
            openGoogleMap: this.openGoogleMap,
            optimizeRoute: this.optimizeRoute
        }
    }

    render(){
    return (
        <ContextCreator.Provider value={this.state}>
            {this.props.theApp}
        </ContextCreator.Provider>
    );
    }
}
