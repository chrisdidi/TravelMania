import React from 'react';
import styled from 'styled-components';
import AttractionsList from "../components/Attractions/AttractionsList"
import TripModal from "../components/Modal"
const Wrapper = styled.View`
`;

export default (props) => {
    return (
        <Wrapper style={{ width: "100%", height: "100%", backgroundColor: "white" }}>
            <TripModal />
            <AttractionsList attractions={props.navigation.state.params.attractions} />
        </Wrapper>
    )
}