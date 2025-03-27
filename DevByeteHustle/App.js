// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./Screen/AuthenScreen";
import LandingScreen from "./Screen/LandingScreen";
import EmployeeHome from "./Screen/employee/employeeHome"; // Keep this import
import JobsPage from "./Screen/employee/JobsPage";
import EmployeeChats from "./Screen/employee/employeeChats";
import EmployeeMessages from "./Screen/employee/employeeMessages";
import EmployeePayment from "./Screen/employee/employeePayment";
import EmployeeProfile from "./Screen/employee/employeeProfile";
import EmployeeAdmin from "./Screen/employee/employeeAdmin";
import LoginScreen from "./Screen/LoginScreen";
import EmployerHome from "./Screen/employer/employerHome";
import PostJobScreen from "./Screen/employer/postJobScreen";
import AdminHome from "./Screen/admin/AdminHome";
import KYCVerifications from "./Screen/admin/KYCVerifications";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen">
        <Stack.Screen name="LandingScreen" component={LandingScreen} 
                 options={{
                  headerShown: false,
                  headerTitle: '',
                  headerBackTitle: 'Back',
                }}/>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="EmployeeDashboard" component={EmployeeHome} />
        <Stack.Screen name="employeeChats" component={EmployeeChats} />
        <Stack.Screen name="employeeMessages" component={EmployeeMessages} />
        <Stack.Screen name="employeePayment" component={EmployeePayment} />
        <Stack.Screen name="employeeProfile" component={EmployeeProfile} />
        <Stack.Screen name="employeeAdmin" component={EmployeeAdmin} />
        <Stack.Screen name="JobsPage" component={JobsPage} />
        <Stack.Screen name="EmployerDashboard" component={EmployerHome} />
        <Stack.Screen name="PostJobScreen" component={PostJobScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminHome} />
        <Stack.Screen name="KYCVerifications" component={KYCVerifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
