
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from './src/screens/LandingPage';
import Login from './src/screens/Login';
import ProfilePage from './src/screens/ProfilePage';
import Registration from './src/screens/Registration';
import Signup from './src/screens/Signup';
import Verification from './src/screens/Verification';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabNavigator from './src/navigations/TabNavigator';
import StudentList from './src/screens/StudentList';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} /> 
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Verification" component={Verification} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="StudentList" component={StudentList} />
      </Stack.Navigator> 
      
    </NavigationContainer>
    
      
  );
}

const styles = StyleSheet.create({});
