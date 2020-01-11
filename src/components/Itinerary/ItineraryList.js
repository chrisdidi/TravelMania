import React, { useContext } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import { ItineraryContext } from "../../context/ItineraryContext";



import ItineraryItem from "./ItineraryItem";

export default function ItineraryList(props) {

  const { trips } = useContext(ItineraryContext);
  data = trips.map((elem, index) => ({ id: index, itinerary: elem }));

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "center",
      }}
      style={styles.scrollView}
      data={data}

      renderItem={({ item }) => <ItineraryItem itinerary={item.itinerary} />}
      keyExtractor={item => item.id + item.itinerary.tripName}
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
