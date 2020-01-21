import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { View, Text, KeyboardAvoidingView } from 'react-native'
import PrimaryButton from '../components/PrimaryButton'
import { CheckBox } from 'react-native-elements'
import { ContextCreator } from '../context/ContextCreator'
import GoogleTextInput from '../components/GoogleTextInput'
import constants from '../constants'

const Wrapper = styled.View`
`;

const SearchBarWrapper = styled.View`
    width: 100%;
    marginTop: 10;
    alignItems: center;
    zIndex: 2;
    position: absolute;
    marginHorizontal: 5;
`;

export default (props) => {

    const [beginPoint, setBeginPoint] = useState("");
    const [endPoint, setEndPoint] = useState("");
    const [roundTrip, setRoundTrip] = useState(false);
    const { optimizeRoute, navigation, getLatLngFromGoogle } = useContext(ContextCreator)

    return (

        <KeyboardAvoidingView behavior="position" enabled keyboardVerticalOffset={30} style={{
            flex: 1, elevation: 5,
            justifyContent: 'space-between', backgroundColor: "white", width: "100%", height: "100%", backgroundColor: "#2C3D63", borderTopLeftRadius: 10, borderTopRightRadius: 10
        }}>

            <SearchBarWrapper>
                <View style={{ flex: 1, marginHorizontal: 5 }}>
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
                            textAlign: 'left'
                        }}
                    >Find out the best route to visit all your desired attractions!
                </Text>

                    <Text
                        style={{
                            fontSize: 22,
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            marginTop: 100,
                            textAlign: 'left'
                        }}
                    >Begin of your trip
            </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            color: "#FFFFFF",
                            fontWeight: "normal",
                            textAlign: 'left'
                        }}
                    >e.g. The airport you’ll be arriving, the hotel you’ll be staying and etc
        </Text>
                    <GoogleTextInput onPressEvent={async (data) => {
                        let latLng = await getLatLngFromGoogle(data.place_id)
                        setBeginPoint(latLng)
                    }}
                        margin={10} />

                    <CheckBox style={{ width: 100, height: 100 }} checked={roundTrip} title={"I will start and finish from the same location"} containerStyle={{ backgroundColor: "#2C3D63", borderColor: "#2C3D63" }} textStyle={{
                        fontSize: 16,
                        color: "#FFFFFF",
                        fontWeight: "normal",
                    }} onPress={() => setRoundTrip(!roundTrip)}></CheckBox>
                    {!roundTrip && <><Text
                        style={{
                            fontSize: 22,
                            color: "#FFFFFF",
                            fontWeight: "bold",
                            marginTop: 30,
                            textAlign: 'left'
                        }}
                    >End of your trip
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#FFFFFF",
                                fontWeight: "normal",
                                textAlign: 'left'
                            }}
                        >
                            e.g. The airport you’ll be arriving, the hotel you’ll be staying and etc
                    </Text>
                        <GoogleTextInput onPressEvent={async (data) => {
                            let latLng = await getLatLngFromGoogle(data.place_id)
                            setEndPoint(latLng)
                        }}
                            margin={10}
                        /></>}


                </View>

                <View style={{ marginTop: 10 }}>
                    <PrimaryButton
                        text="Find Route"
                        onPress={async () => {
                            if (roundTrip) {
                                await optimizeRoute(props.navigation.state.params.index, beginPoint, beginPoint)
                            }
                            else {
                                await optimizeRoute(props.navigation.state.params.index, beginPoint, endPoint)
                            }
                            navigation.goBack(null)
                        }}
                    />
                </View>
            </SearchBarWrapper>
        </KeyboardAvoidingView>
    )
}
