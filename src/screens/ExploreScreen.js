import React, { Component } from 'react';
import { View, Text, TextInput, SafeAreaView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Constants from 'expo-constants';
import styled from 'styled-components';
import constants from '../constants';
import ContextCreator from '../context/ContextCreator';
import styles from '../styles/Theme';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, Callout } from 'react-native-maps';
import Drawer from '../components/ExploreScreen/Drawer';
import AttractionCard from '../components/ExploreScreen/AttractionCard';
import GoogleTextInput from '../components/GoogleTextInput';

const Wrapper = styled.View`
    flex: 1;
    backgroundColor: ${props => props.theme.lightGreyColor};
    alignItems: center;
    justifyContent: flex-end;
`;

const SearchBarWrapper = styled.View`
    position: absolute;
    width: 100%;
    top: ${Constants.statusBarHeight + 10};
    alignItems: center;
    zIndex: 2;
`;

const Button = styled.View`
    height: 60;
    width: 60;
    marginTop: -75;
    marginBottom: 15;
    marginRight: 15;
    borderRadius: 30;
    elevation: 5;
    shadowColor: #000000;
    shadowOpacity: 0.2;
    backgroundColor: ${props => props.theme.pinkColor};
`;


export default class ExploreScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showList: 'auto'
        }
    }

    componentDidMount = () => {
        this.context.getCurrentLocation()
        this.context.saveNavigation(this.props.navigation)
    }

    render() {
        return (
            <Wrapper>
                <ContextCreator.Consumer>
                    {context => {
                        return (
                            <>
                                <MapView
                                    style={{ width: constants.width, height: constants.height, zIndex: 0 }}
                                    initialRegion={{
                                        latitude: context.currentLocation.lat,
                                        longitude: context.currentLocation.lng,
                                        latitudeDelta: 0.05,
                                        longitudeDelta: 0.05,
                                    }}
                                    region={{
                                        latitude: context.currentLocation.lat,
                                        longitude: context.currentLocation.lng,
                                        latitudeDelta: 0.05,
                                        longitudeDelta: 0.05,
                                    }}
                                >
                                    <Marker
                                        coordinate={{
                                            latitude: context.currentLocation.lat,
                                            longitude: context.currentLocation.lng,
                                            latitudeDelta: 0.005,
                                            longitudeDelta: 0.005,
                                        }}
                                    ><MaterialCommunityIcons name='human-male' size={45} color={styles.darkBlueColor} /></Marker>
                                    {context.currentSuggestions.map((attraction, index) => {
                                        return (<Marker
                                            coordinate={{
                                                latitude: attraction.coordinates.lat,
                                                longitude: attraction.coordinates.lng,
                                            }}
                                            title={attraction.name}
                                            key={index}
                                        >
                                            <MaterialCommunityIcons name='map-marker' size={32} color={styles.darkBlueColor} />
                                            <Callout>
                                                <AttractionCard name={attraction.name} placeId={attraction.placeId} img={attraction.img} key={index} />
                                            </Callout>
                                        </Marker>
                                        )
                                    })}
                                </MapView>
                                <SearchBarWrapper>
                                    <GoogleTextInput onPressEvent={async (data) => {
                                        let latLng = await context.getLatLngFromGoogle(data.place_id)
                                        context.updateCurrentLocation(latLng)
                                        await context.searchNearbyAttractions(latLng)
                                    }} />
                                </SearchBarWrapper>
                            </>
                        )
                    }}
                </ContextCreator.Consumer>
                <Drawer navigation={this.props.navigation} />
            </Wrapper>
        )
    }
}

ExploreScreen.contextType = ContextCreator;