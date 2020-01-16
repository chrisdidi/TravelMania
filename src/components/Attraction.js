import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styled from 'styled-components';
import constants from '../constants'

const Wrapper = styled.TouchableOpacity`
    width: auto;
    padding: 12px;
`;

const RowView= styled.View`
    flexDirection: row;
    alignItems: center;
`;

const ImageWrapper = styled.Image`
    height: 90;
    width: 90;
    borderRadius: 12px;
    backgroundColor: ${props => props.theme.lightGreyColor};
`;

const Name = styled.Text`
    fontWeight: bold;
    fontSize: 18px;
    marginLeft: 8px;
    width: ${constants.width - 40 - 24 - 8 - 90};
`;

export default ({cta, name, img }) => (
    <Wrapper onPress={cta}>
        <RowView>
            <ImageWrapper source={{uri: img}}/>
            <Name>{name}</Name>
        </RowView>
    </Wrapper>
)