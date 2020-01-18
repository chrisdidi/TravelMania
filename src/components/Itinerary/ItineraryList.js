import React from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import ContextCreator from "../../context/ContextCreator";
import ItineraryItem from "./ItineraryItem";

export default function ItineraryList(props) {

  return (
    <ContextCreator.Consumer>
      {context => {
        const data = context.trips.map((elem, index) => ({ id: index, itinerary: elem }))
        return (
          <>
            <FlatList
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
              style={styles.scrollView}
              data={data}

              renderItem={({ item }) => <ItineraryItem itinerary={item.itinerary} navigation={props.navigation} />}
              keyExtractor={item => item.id + item.itinerary.name + item.itinerary.image}
            />
          </>
        )
      }}
    </ContextCreator.Consumer>

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
