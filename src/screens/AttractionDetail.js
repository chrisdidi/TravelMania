import React, { Component } from 'react';
import { View, Image, Text, ScrollView, Linking } from 'react-native';
import ContextCreator from '../context/ContextCreator'
import constants from '../constants'
import styled from 'styled-components';
import Review from '../components/AttractionDetail/Review';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';


const Wrapper = styled.View`
    height: ${constants.height};
    backgroundColor: pink;
`;

const Title = styled.Text`
    fontWeight: bold;
    fontSize: 20;
    marginBottom: 4;
`;

const ReviewCount = styled.Text`
    fontSize: 14;
    color: ${props => props.theme.darkGreyColor};
    marginBottom: 12px;
`;

const Container = styled.View`
    marginTop: -10px;
    height: ${constants.height - 110};
    width: 100%;
    borderTopLeftRadius: 18;
    borderTopRightRadius: 18;
    backgroundColor: white;
    elevation: 5;
    shadowColor: #000000;
    shadowOpacity: 0.2;
    padding: 20px;
`;

const BackgroundImage = styled.Image`
    height: 120px;
    width: ${constants.width};
    backgroundColor: #F1F3F6;
`;

const ContentWrapper = styled.ScrollView`
borderTopWidth: 1px;
borderBottomWidth: 1px;
borderColor: #F1F3F6;
`;

const ButtonsWrapper = styled.View`
    height: 145px;
    paddingTop: 20px;
    paddingBottom: 20px;
    width: ${constants.width - 40};
    justifyContent: space-between;
`;

const NoReview = styled.View`
    height: ${constants.height - 110 - 40 - 50 - 145};
    width: ${constants.width - 40};
    alignItems: center;
    justifyContent: center;
`;


export default class AttractionDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {

        return (
            <Wrapper>
                <BackgroundImage source={{ uri: this.props.navigation.getParam('attraction').img }} />
                <Container>
                    <Title>{this.props.navigation.getParam('attraction').name}</Title>
                    <ReviewCount>{this.props.navigation.getParam('attraction').reviews ? this.props.navigation.getParam('attraction').reviews.length : 0} reviews</ReviewCount>
                    {this.props.navigation.getParam('attraction').reviews ? <ContentWrapper>
                        {this.props.navigation.getParam('attraction').reviews.map((review, index) => {
                            return (<Review author={review.author_name} authorProfilePic={review.profile_photo_url} rating={review.rating} text={review.text} key={index} />)
                        })}
                    </ContentWrapper> :
                        <NoReview>
                            <Text>No reviews yet.</Text>
                        </NoReview>
                    }
                    <ButtonsWrapper style={{ height: this.props.navigation.getParam('isSuggestion') ? 145 : 90 }}>
                        {this.props.navigation.getParam('isSuggestion') && <PrimaryButton text="ADD TO ITINERARY" buttonWidth={constants.width - 40} onPress={() => {
                            let index = this.props.navigation.getParam('index')
                            this.props.navigation.navigate('Select Itinerary', {
                                index: index
                            })
                        }} />}

                        <SecondaryButton text="VISIT NOW" buttonWidth={constants.width - 40} onPress={() => {
                            context.openGoogleMap(this.props.navigation.getParam('attraction').name, this.props.navigation.getParam('attraction').placeId)
                        }} />
                    </ButtonsWrapper>
                </Container>
            </Wrapper>

        )
    }
}