import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import Rovers from "../pages/Rovers";
import Favorites from "../pages/Favorites";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator
            tabBar={{}}
        >
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Rovers" component={Rovers} />
            <Tab.Screen name="Favorites" component={Favorites} />
        </Tab.Navigator>
    )
}

export default Tabs;

