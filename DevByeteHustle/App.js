// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./Screen/AuthenScreen";
import LoginScreen from "./Screen/LoginScreen";
import EmployerHome from "./Screen/employer/employerHome";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EmployerDashboard" component={EmployerHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
