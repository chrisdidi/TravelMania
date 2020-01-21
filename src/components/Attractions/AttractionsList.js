import React, { useContext, useState } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import AttractionsItem from "./AttractionsItem";
import { ContextCreator } from "../../context/ContextCreator";
import SecondaryButton from '../SecondaryButton';
import constants from '../../constants'

export default function AttractionsList(props) {
    const { trips } = useContext(ContextCreator)

    let tripToWork = trips.filter((trip => trip.name === props.trip.name))
    let data = tripToWork[0].attractions.map((elem, index) => ({ id: index, attraction: elem }))
    const [dataHook, setDataHook] = useState(data)

    const updateData = (updatedData) => {
        data = updatedData.attractions.map((elem, index) => ({ id: index, attraction: elem }))
        setDataHook(data)
    }

    return (
        <>
            <FlatList
                contentContainerStyle={{
                    alignItems: "center",
                    justifyContent: "center",
                }}
                style={styles.scrollView}
                data={dataHook}

                renderItem={({ item }) => <AttractionsItem attraction={item.attraction} trip={props.trip} />}
                keyExtractor={item => item.id + item.attraction.name + item.attraction.img}
            />

            <View style={{ bottom: 30, position: 'absolute' }}>
                <SecondaryButton text="Find best route!" buttonWidth={constants.width} style={{ marginBottom: 10, marginLeft: 50 }} onPress={() => {
                    props.navigation.navigate('OptimisationScreen', {
                        index: props.navigation.state.params.index,
                        eventToHandle: updateData
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
