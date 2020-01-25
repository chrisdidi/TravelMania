import React, { useContext } from 'react';
import styled from 'styled-components';
import { View, Text } from 'react-native'
import ItineraryList from "../components/Itinerary/ItineraryList"
import TripModal from "../components/Modal"
import { ContextCreator } from '../context/ContextCreator'
const Wrapper = styled.View`
`;

export default (props) => {
    const { trips } = useContext(ContextCreator)
    
    return (
        <Wrapper style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
            <TripModal />
            {trips.length === 0 ? <View style={{alignItems: "center", justifyContent: 'center', padding: 40}}><Text style={{textAlign: 'center'}}>No trip yet. Create your first itinerary by searching any location!</Text></View> : <ItineraryList navigation={props.navigation} />}
        </Wrapper>
    )
}