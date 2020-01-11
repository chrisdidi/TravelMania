import React from 'react';
import { View, Button } from 'react-native';
import styled from 'styled-components';
import ItineraryList from '../components/Itinerary/ItineraryList'
import Itinerary from './Itinerary';
const Wrapper = styled.View`
    flex: 1;
    backgroundColor: ${props => props.theme.darkBlueColor};
    alignItems: center;
    justifyContent: center;
`;

const RandomText = styled.Text`

`;

export default (props) => {
    console.log(props)
    return (
        <Wrapper>
            <Button title="Go to itineraries"
                onPress={() => props.navigation.navigate("ItineraryList")}
            >
            </Button>
        </Wrapper>
    )
}