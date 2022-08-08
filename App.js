
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from './src/screens/LandingPage';
import Login from './src/screens/Login';
import ProfilePage from './src/screens/ProfilePage';
import Registration from './src/screens/Registration';
import Signup from './src/screens/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} /> 
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
      </Stack.Navigator>  
    </NavigationContainer>
    // <Registration/>
      
  );
}

const styles = StyleSheet.create({});
