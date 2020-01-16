import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import constants from '../../constants'
import ContextCreator from '../../context/ContextCreator'

const Wrapper = styled.TouchableOpacity`
    width: ${constants.width - 40};
    alignItems: center;
    justifyContent: center;
    padding: 12px;
`;

const ButtonText = styled.Text`
    color: ${props => props.theme.pinkColor};
    fontSize: 18px;
`;

export default ({ attractionIndex, tripIndex, exist, setAdded }) => {

    return (
        <ContextCreator.Consumer>
            {context => {
                return (
                    <Wrapper onPress={() => {
                        exist ? context.removeAttractionFromItinerary(context.currentSuggestions[attractionIndex].placeId, tripIndex) : context.addToItinerary(attractionIndex, tripIndex)
                        setAdded()
                    }}>
                    <ButtonText>{exist ? "Remove from itinerary" : "Add to itinerary"}</ButtonText>
                    </Wrapper>
                )
            }}
        </ContextCreator.Consumer>
    )
}