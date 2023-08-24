import React, { useEffect, useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = (props) => {
    const {navigation} = props
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const setup = async () =>{
     await AsyncStorage.setItem("islogin", "true");
     const  t  = await AsyncStorage.getItem("islogin")
       console.log("setup "+t);
    }


    const submitted = async ()=> {
    
        console.log(email);
        const response = await axios.post('https://tiny-pear-elk-gown.cyclic.cloud/login', { email: email, password: password });
    
    
        const data = await response.data;
        console.log(data);
        if (data.user) {
           await AsyncStorage.removeItem('islogin');
           await AsyncStorage.removeItem('username');
       AsyncStorage.setItem("islogin", JSON.stringify(true));
        AsyncStorage.setItem("username", JSON.stringify(email));
        console.log("token genrated ");
          navigation.navigate('Mytab');
        } else {
          alert("invalid data");
        }
    
    
      }
   const Sigunpp = ()=>{
    console.log(email);
    navigation.navigate('Signup');
   }

    return (
        <ImageBackground source={require('./assets/leaves.jpg')} style={styles.image}>
            <View style={styles.card}>
                <Text style={styles.heading}>Login</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                        <TouchableOpacity style={styles.button} onPress={submitted}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAlt} onPress={Sigunpp}>
                            <Text style={styles.buttonAltText}>{'Signup'}</Text>
                        </TouchableOpacity>
                    </View>    
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },  
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '80%',
        marginTop: '40%',
        borderRadius: 20,
        maxHeight: 380,
        paddingBottom: '30%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '30%',
        color: 'black',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },  
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
    },
    button: {
        width: '80%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
});

export default Login;