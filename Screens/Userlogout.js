import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Background from './auth/Background';
import Btn from './auth/Btn';
import { darkGreen, green } from './auth/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevSettings } from 'react-native';
// import logout from './auth/logout';

const Userlogout = (props) => {
const [login, setlogin] =useState(false);

  
  const logout = async () =>{
    console.log("logg out");
      await  AsyncStorage.removeItem('islogin', ()=>alert("you are logged out"));
          
         AsyncStorage.clear().then((v)=>setlogin(false));
        //  DevSettings.reload();
      setlogin(false);
  }
 const loginhandle = ()=>{
    setlogin(true);
    props.navigation.navigate('Login');
 }

 useEffect( ()=>{
  const dataa = async()=>{
    await AsyncStorage.removeItem('username');
  }
  dataa();
 }, [])
  
  // userStatus();
  
  return (
    <>
    <Background>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
      <Text style={{ color: 'white', fontWeight:'bold', fontSize: 43 }}>Login to</Text>
      <Text style={{ color: 'white', fontWeight:'bold', fontSize: 43 }}>Lo</Text>
   
     <Btn bgColor={green} textColor='white' btnLabel="Login" Press={loginhandle} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
      </View>
    </Background>
    </>
  );
}

const styles = StyleSheet.create({})

export default Userlogout;
