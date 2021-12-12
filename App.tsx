import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./src/pages/Home";
import Rovers from "./src/pages/Rovers";
import Favorites from "./src/pages/Favorites";
import Filter from "./src/pages/Filter";
import Gallery from "./src/pages/Gallery";

const RootStack = createBottomTabNavigator()
const RoverStack = createNativeStackNavigator()

const RoverScreenStack = () => {
    return <RoverStack.Navigator>
        <RoverStack.Screen name="Rover" component={Rovers}/>
        <RoverStack.Screen name="Filter" component={Filter}/>
        <RoverStack.Screen name="Gallery" component={Gallery}/>
    </RoverStack.Navigator>
}

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
          <RootStack.Screen name="Home" component={Home}/>
          <RootStack.Screen name="Rovers" component={RoverScreenStack}/>
          <RootStack.Screen name="Favorites" component={Favorites}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;