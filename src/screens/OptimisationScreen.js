import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import PrimaryButton from '../components/PrimaryButton'
import constants from '../constants';
import ContextCreator from '../context/ContextCreator'
import Constants from 'expo-constants';

const Wrapper = styled.View`
`;

const SearchBarWrapper = styled.View`
    width: 100%;
    marginTop: 100;
    alignItems: center;
    zIndex: 2;
    position: absolute;
`;

export default (props) => {

    const [beginPoint, setBeginPoint] = useState("");
    const [endPoint, setEndPoint] = useState("");
    const { optimizeRoute, navigation, getLatLngFromGoogle } = useContext(ContextCreator)

    return (
        <Wrapper style={{
            flex: 1, elevation: 5,
            justifyContent: 'space-between', backgroundColor: "white"
        }}>
            <View style={{ marginTop: 10, width: "100%", height: "100%", backgroundColor: "#2C3D63", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <SearchBarWrapper>
                    <GooglePlacesAutocomplete
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        fetchDetails={true}
                        onPress={async (data, details = null) => { // 'details' is provided when fetchDetails = true
                            let latLng = await getLatLngFromGoogle(data.place_id)
                            setBeginPoint(latLng)
                        }}
                        getDefaultValue={() => {
                            return ''; // text input default value
                        }}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyCgQNpZtDRvveEeDUkVBOrzy-TcV1QWbMU',
                            language: 'en', // language of the results
                        }}
                        styles={{
                            description: {
                                fontWeight: 'bold',
                                color: '#000',
                                fontSize: 16
                            },
                            textInputContainer: {
                                width: constants.width - 60,
                                backgroundColor: '#fff',
                                borderTopWidth: 0,
                                borderBottomWidth: 0
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                            listView: {
                                backgroundColor: '#fff',
                                width: constants.width - 60,
                                padding: 5,
                                height: '100%'
                            },
                            container: {
                                backgroundColor: '#fff',
                                borderRadius: 12,
                                paddingLeft: 10,
                                paddingRight: 10,
                                elevation: 5,
                                shadowColor: '#000000',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.2,
                                zIndex: 3,
                            },
                            powered: {
                                display: 'none',
                                height: 0
                            },
                            poweredContainer: {
                                padding: 0,
                                height: 0
                            }
                        }}

                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: 'food',
                        }}
                        GooglePlacesDetailsQuery={{
                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                            fields: 'formatted_address',
                        }}

                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    />


                    <GooglePlacesAutocomplete
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        fetchDetails={true}
                        onPress={async (data, details = null) => { // 'details' is provided when fetchDetails = true
                            let latLng = await getLatLngFromGoogle(data.place_id)
                            setEndPoint(latLng)
                        }}
                        getDefaultValue={() => {
                            return ''; // text input default value
                        }}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyCgQNpZtDRvveEeDUkVBOrzy-TcV1QWbMU',
                            language: 'en', // language of the results
                        }}
                        styles={{
                            description: {
                                fontWeight: 'bold',
                                color: '#000',
                                fontSize: 16
                            },
                            textInputContainer: {
                                width: constants.width - 60,
                                backgroundColor: '#fff',
                                borderTopWidth: 0,
                                borderBottomWidth: 0
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                            listView: {
                                backgroundColor: '#fff',
                                width: constants.width - 60,
                                padding: 5,
                                height: '100%'
                            },
                            container: {
                                backgroundColor: '#fff',
                                borderRadius: 12,
                                paddingLeft: 10,
                                paddingRight: 10,
                                elevation: 5,
                                shadowColor: '#000000',
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.2,
                                zIndex: 3,
                                marginTop: 80,
                            },
                            powered: {
                                display: 'none',
                                height: 0
                            },
                            poweredContainer: {
                                padding: 0,
                                height: 0
                            }
                        }}

                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            types: 'food',
                        }}
                        GooglePlacesDetailsQuery={{
                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                            fields: 'formatted_address',
                        }}

                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                    />
                </SearchBarWrapper>
                <PrimaryButton
                    text="Find Route"
                    onPress={async () => {
                        await optimizeRoute(props.navigation.state.params.index, beginPoint, endPoint)
                        navigation.goBack(null)
                    }}
                />
            </View>
        </Wrapper>
    )
}