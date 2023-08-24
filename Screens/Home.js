
import { SafeAreaView, StyleSheet, View, Text, BackHandler, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Radio, RadioGroup, Select, SelectItem, TextInput, TouchableOpacity, Autocomplete, Button, AutocompleteItem, Modal, Card, CheckBox, CheckBoxProps, Layout, Input } from '@ui-kitten/components';
import { EmojiHappy, Profile2User } from 'iconsax-react-native';
import React, { useState, useEffect } from 'react';
import { Edit, Trash, SearchZoomIn } from 'iconsax-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


const Home = (props) => {

  const [city, setCity] = useState("None"); // Default value should be a string
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOption, setFilterOption] = useState('az');
  const [filterOrder, setFilterOrder] = useState('asc');
  const [Render, setRender] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [Number, setNumber] = useState('');

  const { navigation } = props;

  async function fetchData() { // Renamed from amit to fetchData for clarity
    try {
      const response = await fetch('https://tiny-pear-elk-gown.cyclic.cloud/getuser');
      const result = await response.json();
      setData(result.user);
      console.log(result.user);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function deleteItem(id) { // Renamed from delet to deleteItem for clarity
    try {
      console.log("delete " + id);
      alert("data deleted");
      await fetch(`https://tiny-pear-elk-gown.cyclic.cloud/deletuser/${id}`, {
        method: 'DELETE'
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  const sortData = (data) => {
    return [...data].sort((a, b) => {
      if (filterOption === 'az' || filterOption === 'za') {
        const comparison = a.name.localeCompare(b.name);
        return filterOrder === 'asc' ? comparison : -comparison;
      } else if (filterOption === 'lastModified') {
        const aDateTime = new Date(`${a.date} ${a.time}`);
        const bDateTime = new Date(`${b.date} ${b.time}`);
        return filterOrder === 'asc' ? aDateTime - bDateTime : bDateTime - aDateTime;
      } else if (filterOption === 'lastInserted') {
        const aDateTime = new Date(a.insertedAt);
        const bDateTime = new Date(b.insertedAt);
        return filterOrder === 'asc' ? aDateTime - bDateTime : bDateTime - aDateTime;
      }
      return 0;
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Savetomemory = async () => {
    await AsyncStorage.setItem("Data", JSON.stringify(data));
  }

  const filteredAndSortedData = sortData(data);

  const handleSearch = () => {
    const searchTerms = searchQuery.toLowerCase().split(' ');
    setRender(true);
    const searchResults = data.filter(item =>
      searchTerms.some(term =>
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        (item.phone && item.phone.toString().includes(term))
      )
    );
    setSearchResults(searchResults);
  };
  async function submitted(e) {
    e.preventDefault();
    console.log(email);

    const response = await axios.post('https://tiny-pear-elk-gown.cyclic.cloud/adduser', { username: name, email: email, phone: Number });


    const data = await response.data;
    console.log(data);
    if (data.user) {

      navigation.navigate('Home');
    } else {
      alert("invalid data");
    }


  }


  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.radiog}>Search By Filter</Text>
      <Select
        onSelect={i => {
          if (i.row === 1) {
            setCity("lastModified");
          } else if (i.row === 2) {
            setCity("lastInserted");
          } else if (i.row === 3) {
            setCity("az");
          } else {
            setCity("za");
          }
        }}
        style={styles.city}
        placeholder={city}
      >
        <SelectItem title='Last Modified' value={"Last Modified"} />
        <SelectItem title='Last inserted' value={"Last inserted"} />
        <SelectItem title='A-Z' value={"A-Z"} />
        <SelectItem title='Z-A' value={"Z-A"} />
      </Select>
      <View style={styles.flexx}>
        <Input
          style={styles.input}
          value={searchQuery}
          placeholder='Search By Phone , Name, Email'
          onChangeText={nextValue => setSearchQuery(nextValue)}
        />
        <Button style={{ }} onPress={handleSearch}>
          Search
        </Button>
      </View>
      <Button style={{ width: '10', height: 'auto', marginTop: '10%', marginBottom: '10%' }} onPress={Savetomemory}>
        Save Data to Local Storage
      </Button>

      {Render ? <View>{(searchResults.length > 0 ? searchResults : data).map((item, index) => (
        <View key={item._id} style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles.cardText}>{item.email}</Text>
            <Text style={styles.cardText}>{item.phone}</Text>
            <View style={styles.flexx}>
              <Trash size="32" color="#FF8A65" onPress={() => deleteItem(item._id)} />
              <Edit size="32" color="#FF8A65" onPress={() => alert("network error 401")} />
            </View>
          </View>
        </View>
      ))}
      </View>
        : filteredAndSortedData ? <View>{filteredAndSortedData.map((item, index) => (
          <View key={item._id} style={styles.cardContainer}>
            <View style={styles.card}>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardText}>{item.email}</Text>
              <Text style={styles.cardText}>{item.phone}</Text>
              <View style={styles.flexx}>
                <Trash size="32" color="#FF8A65" onPress={() => deleteItem(item._id)} />
                <Edit size="32" color="#FF8A65" onPress={() => alert("network error, 401")} />
              </View>
            </View>
          </View>))
        }
        </View>
          : true}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%'
  },
  container: {
    flex: 1,
    padding: 16,
  },
  radiog: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  city: {
    marginBottom: 10,
  },
  cardContainer: {
    marginBottom: 10,
    alignItems: 'center',
    // width: '80%'
  },
  flexx: {
    display: 'flex',
    flexDirection: 'row'
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    width: '80%',
    padding: 10,
    borderRadius: 20,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
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
});

export default Home;
