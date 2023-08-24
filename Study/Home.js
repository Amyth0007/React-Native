import {SafeAreaView,StyleSheet, View, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Button } from '@rneui/themed';
import { EmojiHappy } from 'iconsax-react-native';
import React from 'react'

const Home = (props) => {
    const {navigation} = props;
  return (
    <>
    <View style={styles.container}>
        <SafeAreaView>
        <StatusBar style="auto">
</StatusBar>
    <Text>Open up App.js to start hello amit </Text>
    <View style={{display:'flex' , flexDirection: 'row'}} align="center" spacing={4}>
<Button title="Solid" disabled />
<Button><EmojiHappy color="#eee" variant="Bulk" size={54} /></Button>
<Button onPress={()=> navigation.navigate("Dash")}>Go to Home</Button>

</View>
</SafeAreaView>
  </View>
  </>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default Home