import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { View } from 'react-native'
import PrimaryButton from '../components/PrimaryButton'
import ContextCreator from '../context/ContextCreator'
import GoogleTextInput from '../components/GoogleTextInput'

const Wrapper = styled.View`
`;

const SearchBarWrapper = styled.View`
    width: 100%;
    marginTop: 100;
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
            <View style={{ marginTop: 10, width: "100%", height: "100%", backgroundColor: "#2C3D63", borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                <SearchBarWrapper>
                    <GoogleTextInput onPressEvent={async (data) => {
                        let latLng = await getLatLngFromGoogle(data.place_id)
                        setBeginPoint(latLng)
                    }}
                        margin={0} />
                    <GoogleTextInput onPressEvent={async (data) => {
                        let latLng = await getLatLngFromGoogle(data.place_id)
                        setEndPoint(latLng)
                    }}
                        margin={80} />
                </SearchBarWrapper>
                <PrimaryButton
                    text="Find Route"
                    onPress={async () => {
                        await optimizeRoute(props.navigation.state.params.index, beginPoint, endPoint)
                        navigation.goBack(null)
                    }}
                />
            </View>
        </Wrapper >
    )
}