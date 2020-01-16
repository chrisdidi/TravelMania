import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import constants from '../constants';
import styled from 'styled-components';

const Wrapper = styled.TouchableOpacity`
    backgroundColor: ${props => props.theme.pinkColor};
    padding: 12px;
    alignItems: center;
    justifyContent: center;
    borderRadius: 12px;
    width: ${props => props.buttonWidth};
`;

const ButtonText = styled.Text`
    color: #fff;
    fontSize: 18px;
`;

export default ({text, buttonWidth = constants.width, onPress}) => {

    return (
        <Wrapper buttonWidth={buttonWidth} onPress={onPress}>
            <ButtonText>{text}</ButtonText>
        </Wrapper>
    )
}