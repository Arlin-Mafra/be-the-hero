import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import Incidents from "./pages/Incidents";
import Details from "./pages/Details";

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Incidents"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Incidents" component={Incidents} />
        <Stack.Screen name="Detail" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
