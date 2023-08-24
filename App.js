import { StatusBar } from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { EmojiHappy} from 'iconsax-react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screens/Home'
import Dashboard from './Screens/Dashboard';
import MyTab  from './Screens/Mytab';
import Signup from './Screens/auth/Signup';
import Login from './Screens/auth/Login';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import UserProfile from './Screens/UserProfile';
import LogUser from './Screens/LogUser';
import EditUser from './Screens/EditUser';
const Stack = createNativeStackNavigator();



export default function App(props) {
  const [login, setlogin] = useState(false);






  
  
  const { navigation } = props;
  
  console.log("outside my tab " + login);
const getData = async()=>{
    let a = await AsyncStorage.getItem('islogin');
    setlogin(a);
    console.log("islogin");

   }

  useEffect( ()=>{

    getData();
  })
  

  return (
   <ApplicationProvider   {...eva} theme={eva.light}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Mytab' screenOptions={{headerShown: false}}>
        
        <Stack.Screen name="Mytab" component={ MyTab}/>
        <Stack.Screen name="Home" component={login ? Home : UserProfile}/>
        <Stack.Screen name='Profile' component={UserProfile }/>
        <Stack.Screen name='LogUser' component={LogUser}/>
        <Stack.Screen name='EditUser' component={login ? EditUser: UserProfile}/>
        <Stack.Screen name='Dash' component={login ? Dashboard : UserProfile}/>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>   
    </NavigationContainer>
    </ApplicationProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
