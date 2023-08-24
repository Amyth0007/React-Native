import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import tabs from './componts/BottamTablist';
import { Key } from 'iconsax-react-native';
import Dashboard from './Dashboard';
import UserProfile from './UserProfile';
import EditUser from './EditUser';
import LogUser from './LogUser';

const Tab = createBottomTabNavigator();



function Mytab(props) {

  return (<>

    <SafeAreaView></SafeAreaView>

    <Tab.Navigator screenOptions={{ headerShown: false }} options={styles.container}>


      {tabs.map((t) => {
        return (
          <Tab.Screen Key={t.id * 2 - 12 + 3} name={t.name} component={ t.component} options={{
            tabBarIcon: () => t.ic
          }} onPress={() =>props.navigation.navigate(`${t.name}`)} />

        )
      })
      }

    </Tab.Navigator>

  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  }
})

export default Mytab;
