import React, { useContext,useEffect , useState } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import AttractionsItem from "./AttractionsItem";
import {ContextCreator} from "../../context/ContextCreator";
import SecondaryButton from '../SecondaryButton';
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import constants from '../../constants'

export default function AttractionsList(props) {
    const { trips } = useContext(ContextCreator)
    let data = trips[props.tripIndex].attractions.map((elem, index) => ({ id: index, attraction: elem }))
    const [dataHook, setDataHook] = useState(data)
    const [currCoordinates, setCurrCoordinates] = useState("")
    const [optimize, setOptimize] = useState(false)

    useEffect(() => {
        getCoordinates()
    }, [])

    const getCoordinates = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            console.log("Permission not granted");
        }

        let location = await Location.getCurrentPositionAsync({});
        let coordinates = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };
        setCurrCoordinates(coordinates)
    };

    const updateRoute = () => {
        setOptimize(!optimize)
    }

    return (
        <>
            <FlatList
                contentContainerStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                }}
                style={styles.scrollView}
                data={data}
                renderItem={({ item, index }) => <AttractionsItem currCoordinates={currCoordinates} attraction={item} attractionIndex={index} tripIndex={props.tripIndex} />}
                keyExtractor={item => item.id}
            />
            <View style={{ bottom: 30, position: 'absolute', alignItems: "center", width: constants.width }}>
                <SecondaryButton text="Find best route!" buttonWidth={constants.width - 40} style={{ marginBottom: 10, marginLeft: 50 }} onPress={() => {
                    props.navigation.navigate('OptimisationScreen', {
                        index: props.navigation.state.params.index,
                        updateRoute: updateRoute
                    }
                    )
                }} />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "white",
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
});
