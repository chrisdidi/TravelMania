import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ContextCreator from '../../context/ContextCreator';
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

export default class AttractionCard extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <ContextCreator.Consumer>
                {context => {
                    return (
                        <TouchableOpacity onPress={() => {
                            context.navigation.navigate({
                                routeName: 'Details', params: {
                                    attraction: context.currentSuggestions[this.props.index],
                                    isSuggestion: true,
                                    index: this.props.index
                                }, key: 'MAIN_ROUTE_EXPLORE'
                            })
                        }}>
                            <Wrapper>
                                <Img source={{ uri: this.props.img }} />
                                <Name>{this.props.name}</Name>
                            </Wrapper>
                        </TouchableOpacity>
                    )
                }}
            </ContextCreator.Consumer>
        )
    }
}

