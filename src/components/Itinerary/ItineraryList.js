import React from "react";
import { StyleSheet, ScrollView } from "react-native";

import ItineraryItem from "./ItineraryItem";

export default function PlacesList(props) {
  let mockData = [
    {
      tripName: "First Trip",
      country: "Italy",
      attractions: 2,
      image:
        "https://s31706.pcdn.co/wp-content/uploads/2019/02/Best-Places-to-Visit-in-Italy-Venezia.jpg"
    },
    {
      tripName: "Second Trip",
      country: "Germany",
      attractions: 8,
      image:
        "https://s31706.pcdn.co/wp-content/uploads/2019/02/Best-Places-to-Visit-in-Italy-Venezia.jpg"
    },
    {
      tripName: "Third Trip",
      country: "United States Of America",
      attractions: 1,
      image:
        "https://s31706.pcdn.co/wp-content/uploads/2019/02/Best-Places-to-Visit-in-Italy-Venezia.jpg"
    },
    {
      tripName: "Fourth Trip",
      country: "Lithuania",
      attractions: 5,
      image:
        "https://s31706.pcdn.co/wp-content/uploads/2019/02/Best-Places-to-Visit-in-Italy-Venezia.jpg"
    },
    {
      tripName: "Fifth Trip",
      country: "Canada",
      attractions: 4,
      image:
        "https://s31706.pcdn.co/wp-content/uploads/2019/02/Best-Places-to-Visit-in-Italy-Venezia.jpg"
    }
  ];
  contextToShow = mockData.map(itineraryItem => (
    <ItineraryItem
      key={
        itineraryItem.tripName +
        itineraryItem.country +
        itineraryItem.attractions
      }
      itinerary={itineraryItem}
    />
  ));

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center"
      }}
      style={styles.scrollView}
    >
      {contextToShow}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    backgroundColor: "white",
    width: "100%"
  }
});
