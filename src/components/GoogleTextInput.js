import React, { useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { View, ActivityIndicator } from 'react-native';
import constants from '../constants';
import ContextCreator from '../context/ContextCreator'
import Constants from 'expo-constants';

export default (props) => {

    const [showList, setShowList] = useState('auto')

    return (
        <ContextCreator.Consumer>
            {context => {
                return (
                    <GooglePlacesAutocomplete
                        placeholder="Try Paris"
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        fetchDetails={true}

                        onPress={async (data, details = null) => { // 'details' is provided when fetchDetails = true
                            props.onPressEvent(data)
                            setShowList(!showList)

                        }}
                        listViewDisplayed={showList}
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
                                marginTop: props.margin
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
                        renderLeftButton={context.searchLoading ? () => <ActivityIndicator /> : () => <View />}
                    />)
            }}
        </ContextCreator.Consumer>

    )
}
