import React, { useState, useCallback } from 'react';
import { ScrollView, ImageBackground, View, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { Radio, RadioGroup, Text, IndexPath, Select, SelectItem, Autocomplete, AutocompleteItem, CheckBox, CheckBoxProps, Layout  } from '@ui-kitten/components';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


const movies = [
    { title: 'Delhi' },
    { title: 'Gujrat' },
    { title: 'Maharshtra' },
    { title: 'karnataka' },
];

const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

const Signup = (props) => {
    // const {navigation} = props
    const [value, setValue] = React.useState(null);
    const [data, setData] = React.useState(movies);

    const onSelect = useCallback((index) => {
        setValue(data[index].title);
    }, [data]);

    const onChangeText = useCallback((query) => {
        setValue(query);
        setData(movies.filter(item => filter(item, query)));
    }, []);

    const renderOption = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.title}
        />
    );
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [city, setcity] = useState(0);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [number, setNum] = useState('');
    const [password, setPassword] = useState('');
    const [Linkdin, setLinkdin] = useState(false);
    const [frnd, setfrnd] = useState(false);
    const [Jb, setJb] = useState(false);
    const [oth, setoth] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    
    const truth = [];
    const genders = ['male', 'female', 'others'];
  
    const onSubmitHandler = async () => {
        console.log(Linkdin, frnd, Jb);
        console.log(truth);
        const response = await axios.post('https://tiny-pear-elk-gown.cyclic.cloud/register', { name: name, email: email, password: password, gender: genders[selectedIndex], hear: truth[0] , phone : number, stat : value, city: city });
        // await  AsyncStorage.clear();
      await  AsyncStorage.setItem("islogin", JSON.stringify(true));
      await  AsyncStorage.setItem("username", JSON.stringify(name));
        
        const data = await response.data;
        if (data.user) {
        props.navigation.navigate('Mytab');
        let v = JSON.stringify(data.user);

    }else{
        alert("something went wrong");
    }
        
    }

    return (
        // <ImageBackground source={require('./assets/leaves.jpg')} style={styles.image}>
        <ScrollView >
            <View style={styles.container}>
                <Text style={styles.heading}>Signup</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Name" onChangeText={setName}></TextInput>
                        <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                        <TextInput style={styles.input} placeholder="Phone number" onChangeText={setNum}></TextInput>
                        <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>


                        <Text style={styles.RadioLabel}>gender</Text>
                        <RadioGroup
                            selectedIndex={selectedIndex}
                            onChange={index => setSelectedIndex(index)}
                            style={styles.Radiog}
                        >
                            <Radio  >
                                Male
                            </Radio>
                            <Radio>
                                Female
                            </Radio>
                            <Radio>
                                Others
                            </Radio>
                        </RadioGroup>
                        <Autocomplete
                            placeholder='Select your State'
                            value={value}
                            placement='inner top'
                            onSelect={onSelect}
                            onChangeText={onChangeText}
                            style={styles.Radiog}
                        >
                            {data.map(renderOption)}
                        </Autocomplete>
                        <Text style={styles.Radiog}>How do you hear about us</Text>
                        <CheckBox
                            style={styles.ChekLabel}
                            checked={Linkdin}
                            onChange={l => setLinkdin(l)}
                            onPress={truth.push("LInkdin")}
                        >
                            Linkdin
                        </CheckBox>
                        <CheckBox
                            style={styles.ChekLabel}
                            checked={Jb}
                            onPress={truth.push("JOb portal")}
                            onChange={nextChecked => setJb(nextChecked)}
                        >
                            job portal
                        </CheckBox>
                        <CheckBox
                            style={styles.ChekLabel}
                            checked={frnd}
                            onPress={truth.push("Friends")}
                            onChange={frnd => setfrnd(frnd)}
                        >
                            Freinds
                        </CheckBox>
                        <CheckBox
                            style={styles.ChekLabel}
                            checked={oth}
                            onPress={truth.push("oths")}
                            onChange={oth => setoth(oth)}
                        >
                            Others
                        </CheckBox>

                        <Text style={styles.Radiog}>Silect the city</Text>
                        <Select
                            // onChange={e=>setcity(e.rows)}
                            onSelect={i => i.row == 1 ? setcity("Mumbai") : i.row == 2 ? setcity("Pune") : i.row == 3 ? setcity("Ahmedabad") : setcity("None")}
                            style={styles.city}
                            placeholder={city}
                        >
                            <SelectItem value={"None"} title='None' onChangeText={e => setcity(e)} />
                            <SelectItem title='Mumbai' value={"Mumbai"} onSelect={e => setcity(e)} />
                            <SelectItem title='Pune' value={"pune"} onSelect={e => setcity(e)} />
                            <SelectItem title='Ahmedabad' value={"Ahmedabad"} onSelect={e => setcity(e)} />
                        </Select>

                        <TouchableOpacity style={styles.button} onPress={onSubmitHandler}>
                            <Text style={styles.buttonText}>Signup</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAlt} onPress={()=> props.navigation.navigate("Login")}>
                            <Text style={styles.buttonAltText}>{'Log In'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
        // </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    scrollContainer: {
        // flexGrow: 1,             // Allow content to grow inside ScrollView
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center',     // Center the content horizontally
    },
    container: {
        flex: 1,
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center',     // Center the content horizontally
    },
    ChekLabel: {
        width: '80%',
        paddingTop: 0,
        fontSize: 16,
        minHeight: 40,
        marginBottom: '5px',
        color: 'black'
    },
    city: {
        width: '80%',
        paddingTop: 0,
        fontSize: 16,
        minHeight: 40,
        marginBottom: '5px',
        color: 'black'
    },
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '80%',
        marginTop: '40%',
        borderRadius: 20,
        paddingBottom: '30%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '15%',
        marginBottom: '3%',
        color: 'black',
    },
    form: {
        width: '80%', // Adjust the width of the form
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10, // Add some space from the top
    },
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16,
        minHeight: 40,
    },
    Radiog: {
        width: '80%',
        paddingTop: 7,
        fontSize: 16,
        minHeight: 40,
        marginBottom: 2,
        display: 'flex',
        flexDirection: 'row'
    },
    RadioLabel: {
        width: '80%',
        paddingTop: 15,
        fontSize: 16,
        minHeight: 40,
        marginBottom: '5px',
        color: 'black'
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
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 10,
        color: 'black'
    },
    genderLabel: {
        fontSize: 16,
        marginLeft: 6,
        backgroundColor: 'black'
    },

});

export default Signup;


