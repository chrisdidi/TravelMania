import React, { useState, useEffect } from "react";
import { Text, View, Alert, Platform } from "react-native";
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { AppLoading } from 'expo';
import { ThemeProvider } from "styled-components";
import StackNavigation from "./src/navigations/StackNavigations";
import ContextCreatorProvider from './src/context/ContextCreator'
import styles from "./src/styles/Theme";

export default function App() {

  const [locationLoaded, setLocationLoaded] = useState(false)

  findCurrentLocationAsync = () => {
    return new Promise(async resolve => {
      try {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          Platform.OS === 'ios' ?
            Alert.alert('Permission to use location required!', 'Please grant permission to use location service in your settings and try again.', [
              {
                text: 'Grant Permission', onPress: async () => {
                  let permission = await checkPermissions()
                  if (permission === false) {
                    resolve(false)
                  }
                }
              }
            ]) :
            Alert.alert('Permission to use location required!', 'Please grant location service permission in order to continue using the app.', [
              {
                text: 'Grant Permission', onPress: () => {
                  setLocationLoaded(false)
                  resolve(false)
                }
              }
            ])
          setLocationLoaded(false)
        }
        let location = await Location.getCurrentPositionAsync({})
        location.coords.lat = location.coords.latitude
        location.coords.lon = location.coords.longitude
        setLocationLoaded(true)
        resolve(true)
      } catch (error) {
        console.log(error)
      }
    })
  }

  checkPermissions = async () => {
    return new Promise(async resolve => {
      let { status } = await Permissions.getAsync(Permissions.LOCATION);
      setLocationLoaded(status !== 'granted')
      resolve(status !== 'granted')
    })
  }


  useEffect(async () => {
    let locationPermission = await checkPermissions()
    if (locationPermission === false) {
      do {
        await findCurrentLocationAsync()
      } while (locationLoaded === false)
    } else {

    }
  }, [])

  return (<ContextCreatorProvider theApp={locationLoaded ? <ThemeProvider theme={styles}>
    <View style={{ flex: 1, backgroundColor: styles.lightGreyColor }}>
      <StackNavigation />
    </View>
  </ThemeProvider> : <AppLoading />}>
  </ContextCreatorProvider>
  )
}