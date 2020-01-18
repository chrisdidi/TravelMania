import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ExploreScreen from '../screens/ExploreScreen';
import AttractionDetail from '../screens/AttractionDetail';
import Itinerary from '../screens/Itinerary';
import AddToItinerary from '../screens/AddToItinerary';
import ConfirmAddToItinerary from '../screens/ConfirmAddToItinerary';
import AttractionsList from '../screens/AttractionsScreen'
import styles from "../styles/Theme";

const stackFactory = createStackNavigator({
    Explore: {
        screen: ExploreScreen,
        navigationOptions: {
            headerShown: false,
            headerTitle: "TravelMania"
        }
    },
    Details: {
        navigationOptions: {
            headerShown: false
        },
        screen: AttractionDetail,
    },
    'Select Itinerary': {
        screen: AddToItinerary,
        navigationOptions: {
            headerShown: false
        },
    },
    'Confirm Itinerary': {
        screen: ConfirmAddToItinerary,
        navigationOptions: {
            headerShown: false
        },
    },
    ItineraryList: {
        screen: Itinerary,
        navigationOptions: {
            headerShown: true,
            headerTitle: 'My Trips',
            headerBackTitle: ' ',
            headerTintColor: styles.pinkColor,
            headerTitleStyle: { color: 'black' }
        },
    },
    AttractionsList: {
        screen: AttractionsList,
        navigationOptions: {
            headerShown: true,
            headerTitle: 'Attractions',
            headerBackTitle: ' ',
            headerTintColor: styles.pinkColor,
            headerTitleStyle: { color: 'black' }
        },
    }
},
    {
        initialRouteName: 'Explore',
        mode: 'modal',
        transparentCard: true
    }
)

export default createAppContainer(stackFactory)