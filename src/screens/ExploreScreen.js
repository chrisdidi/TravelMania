import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';
import ItineraryList from '../components/Itinerary/ItineraryList'
const Wrapper = styled.View`
    flex: 1;
    backgroundColor: ${props => props.theme.darkBlueColor};
    alignItems: center;
    justifyContent: center;
`;

const RandomText = styled.Text`

`;

export default () => {
    return (
        <Wrapper>
            <RandomText>Hello</RandomText>
        </Wrapper>
    )
}