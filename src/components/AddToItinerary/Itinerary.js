import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import constants from '../../constants';
import styled from 'styled-components';
import ContextCreator from '../../context/ContextCreator';

const Wrapper = styled.TouchableOpacity`
    width: ${constants.width - 40};
    backgroundColor: ${props => props.backgroundColor};
    paddingTop: 12px;
    paddingBottom: 12px;
    borderBottomWidth: 1px;
    borderColor: ${props => props.theme.lightGreyColor};
`;

const TripName = styled.Text`
    fontWeight: bold;
    fontSize: 16px;
`;

const AttractionCount = styled.Text`
    fontSize: 14px;
    color: ${props => props.theme.darkGreyColor};
`;

export default ({attractionCount, attractionIndex, tripName, index, navigation, changeCta}) => (

    <ContextCreator.Consumer>
        {context => {
            return(
                <Wrapper backgroundColor={attractionCount >= 10 ? '#F1F3F6' : '#FFFFFF'} onPress={attractionCount >= 10 ? () => {
                    Alert.alert("Maximum of 10 attractions each itinerary is allowed!")
                } : () => {
                    navigation.navigate('Confirm Itinerary', {
                        tripIndex: index,
                        changeCta: changeCta,
                        attractionIndex: attractionIndex
                    })
                }}>
                    <TripName>{tripName}</TripName>
                    <AttractionCount>{attractionCount} attractions</AttractionCount>
                </Wrapper>
            )
        }}
    </ContextCreator.Consumer>
)