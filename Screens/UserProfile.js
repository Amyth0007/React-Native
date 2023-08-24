import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Background from './auth/Background';
import Btn from './auth/Btn';
import { darkGreen, green } from './auth/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevSettings } from 'react-native';
import { Js } from 'iconsax-react';
// import logout from './auth/logout';

const UseProfile = (props) => {
const [login, setlogin] =useState(false);
const [nam, setnam] = useState(null);

  
  const logout = async () =>{
    console.log("logg out");
      await  AsyncStorage.removeItem('islogin', ()=>alert("you are logged out"));
          
         AsyncStorage.clear().then((v)=>setlogin(false));
         props.navigation.navigate('LogUser')
        //  DevSettings.reload();
      setlogin(false);
  }
 const loginhandle = ()=>{
    setlogin(true);
    props.navigation.navigate('Login');
 }
  

  useEffect( () => {
    const userStatus = async  ()=>{
      let k = await AsyncStorage.getItem('islogin');
      let n = await AsyncStorage.getItem('username');
      setnam(JSON.parse(n));
      console.log(!k);
      if(k){
        setlogin( !JSON.parse(k));
      }
      console.log(k);
    }

  userStatus();
  
    
  }, [])
  // userStatus();
  
  return (
    <>
    <Background>
      <View style={{ marginHorizontal: 6, marginVertical: 100 }}>
      <Text style={{ color: 'white', fontWeight:'bold', fontSize: 43 }}>Welcome {`:)`} </Text>
      <Text style={{ color: 'white', fontWeight:'bold', fontSize: 43 }}>{"user"}</Text>
   <Btn bgColor={green} textColor='white' btnLabel="Logout" Press={logout} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
      </View>
    </Background>
    </>
  );
}

const styles = StyleSheet.create({})

export default UseProfile;
