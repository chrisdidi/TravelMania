import React from 'react';
import styled from 'styled-components';
import AttractionsList from "../components/Attractions/AttractionsList"
import TripModal from "../components/Modal"
import SecondaryButton from '../components/SecondaryButton';
import constants from '../constants'

const Wrapper = styled.View`
`;

export default (props) => {
    return (
        <Wrapper style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
            <TripModal />
            <AttractionsList attractions={props.navigation.state.params.attractions} trip={props.navigation.state.params.trip} />
            <SecondaryButton style={{ paddingBottom: 20, marginLeft: 20 }} text="Find best route!" buttonWidth={constants.width} style={{ marginBottom: 10, marginLeft: 50 }} onPress={() => {
                let index = this.props.navigation.getParam('index')
                this.props.navigation.navigate('Select Itinerary', {
                    index: index
                })
            }} />
        </Wrapper>
    )
}