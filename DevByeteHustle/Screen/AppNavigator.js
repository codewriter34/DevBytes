import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Import your screens
import EmployeeHome from './EmployeeHome';
import Profile from './Profile';
import Applications from './Applications';
import MyJobs from './MyJobs';
import Payments from './Payments';
import Settings from './Settings';
import Jobs from './Jobs';
import Messages from './Messages';
import Earnings from './Earnings';
import ProfilePage from './ProfilePage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EmployeeHome">
        <Stack.Screen name="EmployeeHome" component={EmployeeHome} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Applications" component={Applications} />
        <Stack.Screen name="MyJobs" component={MyJobs} />
        <Stack.Screen name="Payments" component={Payments} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Jobs" component={Jobs} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Earnings" component={Earnings} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
