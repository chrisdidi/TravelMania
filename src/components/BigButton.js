import React from 'react'
import { TouchableOpacity, Text, Platform } from 'react-native'
import styled from 'styled-components'
import constants from '../constants'
import styles from '../styles/Theme'

const Wrapper = styled.TouchableOpacity`
    width: ${constants.width};
    height: ${constants.height * 0.1};
    padding: 12px;
    backgroundColor: ${props => props.buttonColor}
    position: absolute;
    bottom: ${Platform.OS === 'ios' ? 0 : 40};
    alignItems: center;
    justifyContent: center;

`;

const ButtonText = styled.Text`
    color: #fff;
    fontSize: 18px;
    fontWeight: bold;
`;

export default ({text, success = false, onPress}) => (
    <Wrapper buttonColor={success ? styles.darkBlueColor : styles.pinkColor} onPress={onPress}>
        <ButtonText>{text}</ButtonText>
    </Wrapper>
)