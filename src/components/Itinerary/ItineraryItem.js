import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function ItineraryItem(props) {
  showNearPlaces = location => {
    console.log("test");
  };

  return (
    <TouchableOpacity
      onPress={() => console.log("shaunu")}
      style={styles.itemView}
    >
      <View style={styles.textColumn}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {props.itinerary.tripName}
        </Text>
        <Text style={{ color: "#878787", marginTop: 5 }}>
          Country: {props.itinerary.country}
        </Text>
        <Text
          style={{
            marginTop: 25,
            color: "#878787",
            fontWeight: props.itinerary.attractions === 8 ? "bold" : "normal"
          }}
        >
          Attractions: {props.itinerary.attractions}
        </Text>
      </View>
      <View style={styles.imgColumn}>
        <Image
          style={{
            width: "100%",
            height: "100%",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10
          }}
          source={{
            uri: props.itinerary.image
          }}
        ></Image>
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
    marginRight: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: -2
    }
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
