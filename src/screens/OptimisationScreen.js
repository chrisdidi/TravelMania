import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { View, Text, KeyboardAvoidingView, TextInput } from 'react-native'
import PrimaryButton from '../components/PrimaryButton'
import ContextCreator from '../context/ContextCreator'
import GoogleTextInput from '../components/GoogleTextInput'

const Wrapper = styled.View`
`;

const SearchBarWrapper = styled.View`
    width: 100%;
    marginTop: 10;
    alignItems: center;
    zIndex: 2;
    position: absolute;
`;

export default (props) => {

    const [beginPoint, setBeginPoint] = useState("");
    const [endPoint, setEndPoint] = useState("");
    const { optimizeRoute, navigation, getLatLngFromGoogle } = useContext(ContextCreator)

    return (
        <Wrapper style={{
            flex: 1, elevation: 5,
            justifyContent: 'space-between', backgroundColor: "white"
        }}>
            <KeyboardAvoidingView behavior="padding" enabled style={{ width: "100%", height: "100%", backgroundColor: "#2C3D63", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <SearchBarWrapper>
                    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, marginHorizontal: 5 }}>
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

                        <Text
                            style={{
                                fontSize: 22,
                                color: "#FFFFFF",
                                fontWeight: "bold",
                                marginTop: 100,
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
                        >e.g. The airport you’ll be arriving, the hotel you’ll be staying and etc
                    </Text>
                        <GoogleTextInput onPressEvent={async (data) => {
                            let latLng = await getLatLngFromGoogle(data.place_id)
                            setEndPoint(latLng)
                        }}
                            margin={10}
                        />

                    </KeyboardAvoidingView>
                </SearchBarWrapper>

                <View style={{ bottom: 30, position: 'absolute' }}>
                    <PrimaryButton
                        text="Find Route"
                        onPress={async () => {
                            await optimizeRoute(props.navigation.state.params.index, beginPoint, endPoint)
                            navigation.goBack(null)
                        }}
                    />
                </View>

            </KeyboardAvoidingView>
        </Wrapper >
    )
}
<PrimaryButton
    text="Find Route"
    onPress={async () => {
        await optimizeRoute(props.navigation.state.params.index, beginPoint, endPoint)
        navigation.goBack(null)
    }}
/>