import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ExploreScreen from '../screens/ExploreScreen';
import AttractionDetail from '../screens/AttractionDetail';
import Itinerary from '../screens/Itinerary';
import styles from "../styles/Theme";

const stackFactory = createStackNavigator({
    Explore: {
        screen: ExploreScreen,
        headerMode: 'none',
        navigationOptions: {
            headerShown: false
        }
    },
    ItineraryList: {
        screen: Itinerary,
        navigationOptions: {
            headerTitle: 'My Trips',
            headerBackTitle: ' ',
            headerTintColor: styles.pinkColor,
            headerTitleStyle: { color: 'black' }
        },
    }
})

export default createAppContainer(stackFactory)