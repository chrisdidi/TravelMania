import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { ContextCreator } from "../../context/ContextCreator"

export default function AttractionsItem(props) {

    const { navigation, openModalToRemoveTrip } = useContext(ContextCreator)
    const attraction = props.attraction.attraction
    const distance = (lat1, lon1, lat2, lon2) => {
        let p = 0.017453292519943295; // Math.PI / 180
        let c = Math.cos;
        let a =
            0.5 -
            c((lat2 - lat1) * p) / 2 +
            (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

        return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
    };

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate({
                routeName: 'Details', params: {
                    attraction: attraction,
                    isSuggestion: false
                }, key: 'MAIN_ROUTE_EXPLORE'
            })}
            onLongPress={() => {
                openModalToRemoveTrip("", props.tripIndex, props.attractionIndex)
            }}
            style={styles.itemView}
        >
            <View style={styles.imgColumn}>
                <Image
                    style={{
                        width: "90%",
                        height: "90%",
                        borderRadius: 10,
                    }}
                    source={{
                        uri: attraction.img
                    }}
                />
            </View>
            <View style={styles.textColumn}>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                    {attraction.name}
                </Text>

                {props.currCoordinates !== undefined && <Text
                    style={{
                        marginTop: 25,
                        color: "#878787",
                        fontWeight: "normal"
                    }}
                >
                    {(Math.round(distance(props.currCoordinates.latitude, props.currCoordinates.longitude, attraction.coordinates.lat, attraction.coordinates.lng)) / 1000).toFixed(2)}km
                </Text>}

            </View>

        </TouchableOpacity>


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
