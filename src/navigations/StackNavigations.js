import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ExploreScreen from '../screens/ExploreScreen';
import AttractionDetail from '../screens/AttractionDetail';
import Itinerary from '../screens/Itinerary';
import AddToItinerary from '../screens/AddToItinerary';
import ConfirmAddToItinerary from '../screens/ConfirmAddToItinerary';

const stackFactory = createStackNavigator({
    Explore: {
        screen: ExploreScreen,
        headerMode: 'none',
        navigationOptions: {
            headerShown: false
        }
    },
    Details: {
        screen: AttractionDetail,
      },
    'Select Itinerary': {
        screen: AddToItinerary
    },
    'Confirm Itinerary': {
        screen: ConfirmAddToItinerary
    }
    },
    {
        initialRouteName: 'Explore',
        mode: 'modal',
        headerMode: 'none',
        transparentCard: true
    }
)

export default createAppContainer(stackFactory)