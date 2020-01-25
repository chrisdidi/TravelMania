import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { View, Text, KeyboardAvoidingView } from 'react-native'
import PrimaryButton from '../components/PrimaryButton'
import { CheckBox } from 'react-native-elements'
import { ContextCreator } from '../context/ContextCreator'
import GoogleTextInput from '../components/GoogleTextInput'
import constants from '../constants'

const Wrapper = styled.View`
    flex: 1;
    elevation: 5;
    backgroundColor: white;
    width: 100%;
    height: 100%; 
    alignItems: center;
    backgroundColor: #2C3D63;
    borderTopLeftRadius: 18; 
    borderTopRightRadius: 18;
    padding: 15px;
`;

const SearchBarWrapper = styled.View`
    width: 100%;
    marginTop: 10;
    alignItems: center;
    zIndex: 2;
    position: absolute;
`;

const ErrorMessage = styled.Text`
    color: ${props => props.theme.pinkColor};
    opacity: ${props => props.show};
    marginTop: 4;
    marginLeft: 8;
`;

export default (props) => {

    const [beginPoint, setBeginPoint] = useState("");
    const [endPoint, setEndPoint] = useState("");
    const [roundTrip, setRoundTrip] = useState(false);
    const [beginError, setBeginError] = useState(false);
    const [endError, setEndError] = useState(false)
    const { optimizeRoute, navigation, getLatLngFromGoogle } = useContext(ContextCreator)
    const [transportError, setTransportError] = useState(false)

    return (

        <KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={-10} style={{
            height: "10%",
            width: "100%",
            flex: 1,
            backgroundColor: "#2C3D63",
            padding: 15,
            marginTop: 1
        }}>

            <SearchBarWrapper>
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 22,
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            textAlign: 'left'
                        }}
                    >Find best route
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            color: "#FFFFFF",
                            fontWeight: "normal",
                            textAlign: 'left',
                            marginTop: 3
                        }}
                    >Find out the best route to visit all your desired attractions!
                </Text>
                <ErrorMessage show={transportError ? 1 : 0}>Either your departure or one of your destination is not reachable by landed transport. Please review your itinerary!</ErrorMessage>
                    <Text
                        style={{
                            fontSize: 18,
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            marginTop: 20,
                            textAlign: 'left'
                        }}
                    >Begin of your trip
            </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: "#FFFFFF",
                            fontWeight: "normal",
                            textAlign: 'left',
                            marginTop: 3
                        }}
                    >e.g. The airport you have to visit at the end of your trip, the hotel you’ll be staying and etc
        </Text>
                    <GoogleTextInput onPressEvent={async (data) => {
                        let latLng = await getLatLngFromGoogle(data.place_id)
                        setBeginPoint(latLng)
                    }}
                        margin={10} />
                    <ErrorMessage show={beginError ? 1 : 0}>Please enter a valid address!</ErrorMessage>
                    {!roundTrip && <><Text
                        style={{
                            fontSize: 18,
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            marginTop: 30,
                            textAlign: 'left'
                        }}
                    >End of your trip
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: "#FFFFFF",
                                fontWeight: "normal",
                                textAlign: 'left',
                                marginTop: 3,
                            }}
                        >
                            e.g. The airport you’ll be arriving, the hotel you’ll be staying and etc
                    </Text>
                        <GoogleTextInput onPressEvent={async (data) => {
                            let latLng = await getLatLngFromGoogle(data.place_id)
                            setEndPoint(latLng)
                        }}
                            margin={10}
                        />
                        <ErrorMessage show={endError ? 1 : 0}>Please enter a valid address!</ErrorMessage>
                        </>}
                        <CheckBox style={{ width: 100, height: 100 }} checked={roundTrip} title={"Same as departure location."} containerStyle={{ backgroundColor: "#2C3D63", borderColor: "#2C3D63" }} textStyle={{
                        fontSize: 16,
                        color: "#FFFFFF",
                        fontWeight: "normal",
                    }} onPress={() => {
                        setRoundTrip(!roundTrip) 
                        setEndPoint(beginPoint)}}>
                        </CheckBox>


                </View>

                <View style={{ marginTop: 80}}>
                    <PrimaryButton
                        text="Find Route"
                        buttonWidth={constants.width-40}
                        onPress={async () => {
                            if(beginPoint.lat === undefined){
                                setBeginError(true)
                                return
                            }else{
                                setBeginError(false)
                            }
                            if(endPoint.lat === undefined){
                                setEndError(true)
                                return
                            }else{
                                setEndError(false)
                            }
                            let optimizedRoute = await optimizeRoute(props.navigation.state.params.index, beginPoint, endPoint)
                            if(optimizedRoute === false){
                                setTransportError(true)
                                return
                            }else{
                                setTransportError(false)
                                props.navigation.state.params.updateRoute()
                                navigation.goBack(null)
                            }
                        }}
                    />
                </View>
            </SearchBarWrapper>
        </KeyboardAvoidingView>
    )
}
