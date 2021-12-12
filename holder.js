import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../pages/Home";
import Rovers from "../pages/Rovers";
import Filter from "../pages/Filter";
import Gallery from "../pages/Gallery";
import Favorites from "../pages/Favorites";

const screens = {
    Home: {
        screen: Home
    },
    Rovers: {
        screen: Rovers
    },
    Filter: {
        screen: Filter
    },
    Gallery: {
        screen: Gallery
    },
    Favorites: {
        screen: Favorites
    },
};


const HomeStack = createStackNavigator(screens)





export default createAppContainer(HomeStack)