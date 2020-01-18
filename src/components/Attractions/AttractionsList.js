import React from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import AttractionsItem from "./AttractionsItem";

export default function AttractionsList(props) {
    const data = props.attractions.map((elem, index) => ({ id: index, attraction: elem }))

    return (

        <FlatList
            contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
            }}
            style={styles.scrollView}
            data={data}

            renderItem={({ item }) => <AttractionsItem attraction={item.attraction} trip={props.trip} />}
            keyExtractor={item => item.id + item.attraction.name + item.attraction.img}
        />

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
