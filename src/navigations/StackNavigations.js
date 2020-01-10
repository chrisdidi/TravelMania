import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ExploreScreen from '../screens/ExploreScreen';
import AttractionDetail from '../screens/AttractionDetail';
import ItineraryList from '../screens/ItineraryList';
import Itinerary from '../screens/Itinerary';

const stackFactory = createStackNavigator({
    Explore: {
        screen: ExploreScreen,
        headerMode: 'none',
        navigationOptions: {
            headerShown: false
        }
    },
})

export default createAppContainer(stackFactory)