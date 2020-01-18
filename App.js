import React, { Component, useContext } from "react";
import { Text, View, Alert, Platform } from "react-native";
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { AppLoading } from 'expo';
import { ThemeProvider } from "styled-components";
import StackNavigation from "./src/navigations/StackNavigations";
import Store from './src/context/Store.js';
import ContextCreator from './src/context/ContextCreator'
import styles from "./src/styles/Theme";
import ItineraryContextProvier from "./src/context/ItineraryContext"

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      locationLoaded: false
    }
  }

  findCurrentLocationAsync = () => {
    return new Promise(async resolve => {
      try {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          Platform.OS === 'ios' ?
            Alert.alert('Permission to use location required!', 'Please grant permission to use location service in your settings and try again.', [
              {
                text: 'Grant Permission', onPress: async () => {
                  let permission = await this.checkPermissions()
                  if (permission === false) {
                    resolve(false)
                  }
                }
              }
            ]) :
            Alert.alert('Permission to use location required!', 'Please grant location service permission in order to continue using the app.', [
              {
                text: 'Grant Permission', onPress: () => {
                  this.setState({
                    locationLoaded: false
                  })
                  resolve(false)
                }
              }
            ])
          this.setState({
            locationLoaded: false
          })
        }
        let location = await Location.getCurrentPositionAsync({})
        location.coords.lat = location.coords.latitude
        location.coords.lon = location.coords.longitude
        this.setState({
          locationLoaded: true
        })
        resolve(true)
      } catch (error) {
        console.log(error)
      }
    })
  }

  checkPermissions = async () => {
    return new Promise(async resolve => {
      let { status } = await Permissions.getAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          locationLoaded: false
        })
        resolve(false)
      } else {

        this.setState({
          locationLoaded: true
        })
        resolve(true)
      }
    })
  }

  componentDidMount = async () => {
    let locationPermission = await this.checkPermissions()
    if (locationPermission === false) {
      do {
        await this.findCurrentLocationAsync()
      } while (this.state.locationLoaded === false)
    } else {

    }
  }

  render() {
    return (<Store theApp={this.state.locationLoaded ? <ThemeProvider theme={styles}>
      <View style={{ flex: 1, backgroundColor: styles.lightGreyColor }}>
        <StackNavigation />
      </View>
    </ThemeProvider> : <AppLoading />}>
    </Store>
    )
  }
}

App.contextType = ContextCreator;
