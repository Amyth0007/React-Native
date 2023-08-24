import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed'

const Dashboard = (props) => {
    const {navigation, route} = props
   const {title, desc} = route.params;
    return (
    <View>
      <Text>Dashboard</Text>
      <Text>{title}</Text>
      <Text>{desc}</Text>
      <Button onPress={()=>navigation.navigate("Home")}>Go to Home</Button>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})