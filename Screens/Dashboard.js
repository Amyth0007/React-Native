import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from '@rneui/themed'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Edit, Trash, SearchZoomIn } from 'iconsax-react-native'

const Dashboard = (props) => {
  const { navigation } = props
  const [data, setData] = useState([]);

  const getdata = async () => {
    let d = await AsyncStorage.getItem("Data");
    setData(JSON.parse(d));
    console.log(d);
  }

  async function deleteItem(id) { // Renamed from delet to deleteItem for clarity
    try {
      console.log("delete " + id);
      alert("data deleted");
      await fetch(`https://tiny-pear-elk-gown.cyclic.cloud/deletuser/${id}`, {
        method: 'DELETE'
      });
      getdata();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
  useEffect(() => {
    getdata();
  }, []);
  return (
      <>
<Text style={{marginTop:'5%', fontSize:26}}>Local Storage Data</Text>
  {data ? <View>{data.map((item, index)=>(
    <View key={item._id} style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles.cardText}>{item.email}</Text>
            <Text style={styles.cardText}>{item.phone}</Text>
            <View style={styles.flexx}>
              <Trash size="32" color="#FF8A65" onPress={() => deleteItem(item._id)} />
              <Edit size="32" color="#FF8A65" />
            </View>
          </View>
        </View>
  ))}</View>:<Text>Data not Fetched yet, wait or Refresh once</Text>}
      </>
    
  
  )
}

      export default Dashboard

      const styles = StyleSheet.create({
        container: {
        flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardContainer: {
      marginTop:'13%',
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
  
  })