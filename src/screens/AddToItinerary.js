import React, {useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import styled from 'styled-components'
import Constants from 'expo-constants'
import constants from '../constants';
import ContextCreator from '../context/ContextCreator';
import Itinerary from '../components/AddToItinerary/Itinerary';
import BigButton from '../components/BigButton';
import CreateItinerary from '../components/CreateItinerary';

const Wrapper = styled.View`
    height: ${constants.height - Constants.statusBarHeight - 20};
    marginTop: ${Constants.statusBarHeight + 20};
    width: ${constants.width};
    backgroundColor: #fff;
    borderTopLeftRadius: 18;
    borderTopRightRadius: 18;
    padding: 20px;
    elevation: 5;
    shadowColor: #000000;
    shadowOpacity: 0.2;
`;

const Title = styled.Text`
    marginBottom: 8px;
    fontWeight: bold;
    fontSize: 18;
`;

export default ({navigation}) => {

    const attractionIndex = navigation.getParam('index')
    const [ added, setAdded ] = useState(false)

    function goBack(){
        navigation.goBack()
    }

    function changeCta(){
        setAdded(true)
    }

    return (
        <ContextCreator.Consumer>
            {context => {
                return(
                <Wrapper>
                    <Title>Add {context.currentSuggestions[attractionIndex].name} to...</Title>
                    <CreateItinerary width={constants.width - 40}/>
                    <ScrollView style={{borderTopWidth: 1, borderColor: '#F1F3F6'}}>
                    {context.trips.length === 0 ? <Text style={{alignSelf: 'center', marginTop: 20}}>No itinerary yet.</Text> : context.trips.map((itinerary, index) => {
                        return <Itinerary index={index} attractionIndex={attractionIndex} changeCta={changeCta} navigation={navigation} attractionCount={itinerary.attractions === undefined ? 0 : itinerary.attractions.length} tripName={itinerary.name} key={index}/>
                    })}                    
                    </ScrollView>
                    <BigButton text={added ?  'DONE' : 'CANCEL'} success={added}onPress={added ? () => {
                            navigation.goBack('MAIN_ROUTE_EXPLORE')
                    } : () => {
                        navigation.goBack()
                    }}/>
                </Wrapper>
                )
            }}
        </ContextCreator.Consumer>
    )
}