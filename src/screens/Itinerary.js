import React, { useState, useContext } from 'react';
import { View, Button, Text } from 'react-native';
import styled from 'styled-components';
import ItineraryList from "../components/Itinerary/ItineraryList"
import { ItineraryContext } from "../context/ItineraryContext";
import TripModal from "../components/Modal"
const Wrapper = styled.View`
`;

export default () => {

    const { showModal, setModalState, removeTripFromList } = useContext(ItineraryContext);
    return (
        <Wrapper style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
            <TripModal />
            <ItineraryList />


        </Wrapper>
    )
}