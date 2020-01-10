import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled.View`
    flex: 1;
    backgroundColor: ${props => props.theme.darkBlueColor};
`;

const RandomText = styled.Text`

`;

export default () => {
    return(
        <Wrapper>
            <RandomText>Hello</RandomText>
        </Wrapper>
    )
}