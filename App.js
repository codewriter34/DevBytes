import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./Screen/AuthenScreen";
import LoginScreen from "./Screen/LoginScreen";
import EmployerHome from "./Screen/employer/employerHome";
import PostJobScreen from "./Screen/employer/postJobScreen";
import EmployeeHome from "./Screen/employee/employeeHome";
import JobsPage from "./Screen/employee/JobsPage";
import EmployeeChats from "./Screen/employee/employeeChats";
import EmployeeMessages from "./Screen/employee/employeeMessages";
import EmployeePayment from "./Screen/employee/employeePayment";
import EmployeeProfile from "./Screen/employee/employeeProfile";
import EmployeeAdmin from "./Screen/employee/employeeAdmin";
import LandingScreen from "./Screen/LandingScreen"; // ✅ Import LandingScreen

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen" >
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="employeeHome" component={EmployeeHome} />
        <Stack.Screen name="EmployerDashboard" component={EmployerHome} />
        <Stack.Screen name="PostJobScreen" component={PostJobScreen} />
        <Stack.Screen name="JobsPage" component={JobsPage} />
        <Stack.Screen name="employeeChats" component={EmployeeChats} />
        <Stack.Screen name="employeeMessages" component={EmployeeMessages} />
        <Stack.Screen name="employeePayment" component={EmployeePayment} />
        <Stack.Screen name="employeeProfile" component={EmployeeProfile} />
        <Stack.Screen name="employeeAdmin" component={EmployeeAdmin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
