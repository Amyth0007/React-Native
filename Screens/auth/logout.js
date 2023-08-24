import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const logout = (props) => {

    const token = true;
    const getData =  async() =>{
        await AsyncStorage.removeItem('islogin', ()=>props.naviagtion.navigate('Profile'));
    }
    getData();
  return (
    <View>
      {getData()}
    </View>
  )
}

export default logout