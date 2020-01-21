import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { ContextCreator } from "../../context/ContextCreator"

export default function ItineraryItem(props) {
  const { openModalToRemoveTrip } = useContext(ContextCreator);
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("AttractionsList", { index: props.index, attractions: props.itinerary.attractions, trip: props.itinerary })}
      onLongPress={() => openModalToRemoveTrip(props.itinerary, "", "")}
      style={styles.itemView}
    >
      <View style={styles.textColumn}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {props.itinerary.name}
        </Text>
        <Text
          style={{
            marginTop: 25,
            color: "#878787",
            fontWeight: props.itinerary.attractions === 8 ? "bold" : "normal"
          }}
        >
          Attractions: {props.itinerary.attractions.length}
        </Text>
      </View>

      <View style={styles.imgColumn}>
        {props.itinerary.image !== "" && <Image
          style={{
            width: "100%",
            height: "100%",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10
          }}
          source={{
            uri: props.itinerary.image
          }}
        />}

        {props.itinerary.image === "" && <Text> Photo still not set sorry</Text>}
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
