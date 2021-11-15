import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import Home from "../pages/Home";
import Hovers from "../pages/Hovers";
import Filter from "../pages/Filter";
import Gallery from "../pages/Gallery";

const screens = {
    Home: {
        screen: Home
    },
    Hovers: {
        screen: Hovers
    },
    Filter: {
        screen: Filter
    },
    Gallery: {
        screen: Gallery
    }
}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)