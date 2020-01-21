import React, { useState, useContext } from 'react'
import { View, Text, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import styled from 'styled-components'
import constants from '../constants'
import BigButton from '../components/BigButton'
import { ContextCreator } from '../context/ContextCreator'
import Confirm from '../components/ConfirmAddToItinerary/Confirm'
import Attraction from '../components/Attraction'

const Wrapper = styled.View`
height: ${constants.height - Constants.statusBarHeight - 20};
marginTop: ${Constants.statusBarHeight + 20};
width: ${constants.width};
backgroundColor: #fff;
borderTopLeftRadius: 18;
borderTopRightRadius: 18;
padding: 20px;
elevation: 5;
shadowColor: #000000;
shadowOpacity: 0.2;
`;

const Title = styled.Text`
    marginBottom: 8px;
    fontWeight: bold;
    fontSize: 18;
`;

const Description = styled.Text`
    fontSize: 16;
    color: #888;
`;

export default function ConfirmAddToItinerary({ navigation }) {

    const tripIndex = navigation.getParam('tripIndex')
    const attractionIndex = navigation.getParam('attractionIndex')
    const { checkAttractionExistence, currentSuggestions, trips, openGoogleMap } = useContext(ContextCreator)
    const [added, setAdded] = useState(false)
    let exist = checkAttractionExistence(attractionIndex, tripIndex)

    return (
        <Wrapper>
            {exist ? <Title>{currentSuggestions[attractionIndex].name} is already in {trips[tripIndex].name}</Title> : <Title>Confirm add {currentSuggestions[attractionIndex].name} to {trips[tripIndex].name}?</Title>}
            {trips[tripIndex].description === "" ? <></> : <Description>{trips[tripIndex].description}</Description>}
            <Confirm attractionIndex={attractionIndex} tripIndex={tripIndex} exist={exist} setAdded={() => {
                setAdded(true)
            }} />
            <ScrollView style={{ borderTopWidth: 1, borderColor: '#F1F3F6' }}>
                {trips[tripIndex].attractions.length === 0 ? <Text style={{ alignSelf: 'center', marginTop: 20 }}>No attractions yet.</Text> : trips[tripIndex].attractions.map((attraction, index) => {
                    return <Attraction cta={() => { openGoogleMap(attraction.name, attraction.placeId) }} name={attraction.name} img={attraction.img} key={index} />
                })}
            </ScrollView>
            <BigButton text={added ? "COMPLETE" : "CANCEL"} success={added ? true : false} onPress={added ? () => {
                navigation.state.params.changeCta()
                navigation.goBack()
            } : () => {
                navigation.goBack()
            }} />
        </Wrapper>

    )
}