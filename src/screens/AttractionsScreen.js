import React from 'react';
import styled from 'styled-components';
import { View, ActivityIndicator } from 'react-native'
import AttractionsList from "../components/Attractions/AttractionsList"
import TripModal from "../components/Modal"
import SecondaryButton from '../components/SecondaryButton';
import constants from '../constants'

const Wrapper = styled.View`
`;

export default (props) => {
    return (
        <Wrapper style={{ width: "100%", height: "100%" }}>
            <TripModal />
            <AttractionsList style={{ height: "100%" }} attractions={props.navigation.state.params.attractions} trip={props.navigation.state.params.trip} />

            <View style={{ bottom: 30, position: 'absolute' }}>
                <SecondaryButton text="Find best route!" buttonWidth={constants.width} style={{ marginBottom: 10, marginLeft: 50 }} onPress={() => {
                    props.navigation.navigate('OptimisationScreen', {
                        index: props.navigation.state.params.index
                    }
                    )
                }} />
            </View>

        </Wrapper>
    )
}