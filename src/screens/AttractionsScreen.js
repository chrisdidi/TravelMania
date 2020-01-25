import React, {useContext} from 'react';
import styled from 'styled-components';
import { View, ActivityIndicator, Text } from 'react-native'
import AttractionsList from "../components/Attractions/AttractionsList"
import TripModal from "../components/Modal"
import SecondaryButton from '../components/SecondaryButton';
import constants from '../constants'
import { ContextCreator } from '../context/ContextCreator'

const Wrapper = styled.View`
`;

export default (props) => {

    const {trips} = useContext(ContextCreator)
    const tripIndex = props.navigation.state.params.index
    return (
        <Wrapper style={{ width: "100%", height: "100%" }}>            
            <TripModal />
            {trips[tripIndex].attractions.length === 0 ? <View style={{ height: "100%", backgroundColor: '#ffffff', alignItems: "center", justifyContent: 'center', padding: 40}}><Text style={{textAlign: 'center'}}>No attractions yet. Add a location into this itinerary to start planning!</Text></View> : <AttractionsList style={{ height: "100%" }} navigation={props.navigation} attractions={props.navigation.state.params.attractions} trip={props.navigation.state.params.trip} tripIndex={tripIndex}/>}
        </Wrapper>
    )
}