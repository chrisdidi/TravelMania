import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import ContextCreator from "../../context/ContextCreator"

export default function AttractionsItem(props) {

    const [currCoordinates, setCurrCoordinates] = useState();

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
        console.log(currCoordinates)
    };

    const distance = (lat1, lon1, lat2, lon2) => {
        var p = 0.017453292519943295; // Math.PI / 180
        var c = Math.cos;
        var a =
            0.5 -
            c((lat2 - lat1) * p) / 2 +
            (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

        return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
    };

    return (
        <ContextCreator.Consumer>
            {context => {
                return (
                    <TouchableOpacity
                        onPress={() => context.navigation.navigate({
                            routeName: 'Details', params: {
                                attraction: props.attraction,
                                isSuggestion: false
                            }, key: 'MAIN_ROUTE_EXPLORE'
                        })}
                        onLongPress={() => context.openModalToRemoveTrip("", props.attraction, props.trip)}
                        style={styles.itemView}
                    >
                        <View style={styles.imgColumn}>
                            {props.attraction.img !== "" && <Image
                                style={{
                                    width: "90%",
                                    height: "90%",
                                    borderRadius: 10,
                                }}
                                source={{
                                    uri: props.attraction.img
                                }}
                            />}

                            {props.attraction.img === "" && <Text> Photo still not set sorry</Text>}
                        </View>
                        <View style={styles.textColumn}>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                                {props.attraction.name}
                            </Text>

                            {currCoordinates !== undefined && <Text
                                style={{
                                    marginTop: 25,
                                    color: "#878787",
                                    fontWeight: "normal"
                                }}
                            >
                                {Math.round(distance(currCoordinates.latitude, currCoordinates.longitude, props.attraction.coordinates.lat, props.attraction.coordinates.lng) * 100) / 100}m
                </Text>}

                        </View>

                    </TouchableOpacity>
                )
            }}
        </ContextCreator.Consumer>
    );
}

const styles = StyleSheet.create({
    itemView: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "90%",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 150,
        marginTop: 20,
    },
    textColumn: {
        flexDirection: "column",
        flex: 4,
        marginLeft: 20
    },
    imgColumn: {
        flex: 3
    }
});
