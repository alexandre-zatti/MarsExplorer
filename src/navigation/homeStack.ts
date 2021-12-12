import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../pages/Home";
import Rovers from "../pages/Rovers";
import Filter from "../pages/Filter";
import Gallery from "../pages/Gallery";
import Favorites from "../pages/Favorites";


const screens = {
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
        }
    },
    Rovers: {
        screen: Rovers,
        navigationOptions: {
            headerShown: false,
        }
    },
    Filter: {
        screen: Filter,
        navigationOptions: {
            headerShown: false,
        }
    },
    Gallery: {
        screen: Gallery,
        navigationOptions: {
            headerShown: false,
        }
    },
    Favorites: {
        screen: Favorites,
        navigationOptions: {
            headerShown: false,
        }
    }
};


const HomeStack = createStackNavigator(screens);


export default createAppContainer(HomeStack);