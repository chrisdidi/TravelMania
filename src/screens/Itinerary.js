import React from 'react';
import styled from 'styled-components';
import ItineraryList from "../components/Itinerary/ItineraryList"
import TripModal from "../components/Modal"
const Wrapper = styled.View`
`;

export default (props) => {
    return (
        <Wrapper style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
            <TripModal />
            <ItineraryList navigation={props.navigation} />
        </Wrapper>
    )
}