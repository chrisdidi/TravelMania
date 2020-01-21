import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ContextCreator } from '../../context/ContextCreator';
import styled from 'styled-components';
import constants from '../../constants';

const Wrapper = styled.View`
    height: ${constants.height * 0.28};
    width: ${constants.height * 0.28};
    padding: 10px;
    borderRadius: 8px;
`;

const Img = styled.Image`
    height: ${(constants.height * 0.28) - 60}px;
    width: 100%;
    backgroundColor: ${props => props.theme.lightGreyColor};
    borderRadius: 8;
`;

const Name = styled.Text`
    height: 100%;
    width: 100%;
    padding: 8px;
    fontWeight: bold;
`;

export default function AttractionCard(props) {
    const { navigation, currentSuggestions } = useContext(ContextCreator)
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate({
                routeName: 'Details', params: {
                    attraction: currentSuggestions[props.index],
                    isSuggestion: true,
                    index: props.index
                }, key: 'MAIN_ROUTE_EXPLORE'
            })
        }}>
            <Wrapper>
                <Img source={{ uri: props.img }} />
                <Name>{props.name}</Name>
            </Wrapper>
        </TouchableOpacity>
    )

}

