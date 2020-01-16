import React from 'react';
import { View, Text, Image } from 'react-native';
import styled from 'styled-components';
import constants from '../../constants';

const Wrapper = styled.View`
    width: ${constants.width - 40};
    padding: 12px;
    borderBottomWidth: 1px;
    borderColor: #F1F3F6;
`;

const Row = styled.View`
    flexDirection: row;
`;

const Profile = styled.Image`
    height: 45px;
    width: 45px;
    borderRadius: 8px;
`;

const TextContainer = styled.View`
    paddingLeft: 15px;
    paddingRight: 15px;
    width: ${constants.width - 40 - 45 - 15}
`;

const Name = styled.Text`
    fontWeight: bold;
    fontSize: 16px;
`;

const Review = styled.Text`
    fontSize: 14px;
    color: #888;
`;

export default ({author, authorProfilePic, rating, text}) => (
    <Wrapper>
        <Row>
            <Profile source={{uri: authorProfilePic}}/>
            <TextContainer>
                <Name>{author}</Name>
                <Review>{text}</Review>
            </TextContainer>
        </Row>
    </Wrapper>
)