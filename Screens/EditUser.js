import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Mytab from './Mytab'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@rneui/base'

const EditUser = (props) => {
  return (
    <View>
        <SafeAreaView></SafeAreaView>
            <Text>EditUser</Text>
            <Button onPress={props.navigation.navigate('Mytab')}>Go back</Button>
        </View>
  )
}

export default EditUser

const styles = StyleSheet.create({})