import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddUser = (props) => {



    const {navigation} = props
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [Number, setNumber] = useState('');


    const setup = async () =>{
     await AsyncStorage.setItem("islogin", "true");
     const  t  = await AsyncStorage.getItem("islogin")
       console.log("setup "+t);
    }


    async function submitted(e) {
        e.preventDefault();
        console.log(email);
    
        const response = await axios.post('https://tiny-pear-elk-gown.cyclic.cloud/adduser', { username: name, email: email, phone: Number});
    
    
        const data = await response.data;
        console.log(data);
        if (data.user) {

          navigation.navigate('Home');
        } else {
          alert("invalid data");
        }
    
    
      }
  return (
    <View>
        <View style={styles.card}>
                <Text style={styles.heading}>Add user</Text>
                <View style={styles.form}>
                    <View >
                        <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                        <TextInput style={styles.input} placeholder="Name" autoCapitalize="none" onChangeText={setName}></TextInput>
                        <TextInput  style={styles.input} placeholder="Phone Number" onChangeText={setNumber}></TextInput>
                        <TouchableOpacity style={styles.button} onPress={submitted}>
                            <Text style={styles.buttonText}>Add User</Text>
                        </TouchableOpacity>

                    </View>    
                </View>
            </View>
    </View>
  )
}

export default AddUser

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },  
    card: {
        marginTop: '20%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '80%',
        padding: 10,
        borderRadius: 20,
          display: 'flex', 
        alignContent:'center',
         justifyContent: 'center',
         marginLeft: '10%'
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '3%'
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
        marginVertical: 10,
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
