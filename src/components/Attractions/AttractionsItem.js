import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import ContextCreator from "../../context/ContextCreator"

export default function AttractionsItem(props) {

    return (
        <TouchableOpacity
            onPress={() => console.log("push")}
            onLongPress={() => context.openModalToRemoveTrip(props.attraction)}
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
