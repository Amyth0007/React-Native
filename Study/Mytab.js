import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Dashboard from './Dashboard';

const Tab = createBottomTabNavigator();
function Mytab(props) {
  const {navigation} = props;
  return (<>
        <Text style={{color: "red"}} >hello from bottom of my heart</Text>
    <Tab.Navigator >
      <Tab.Screen name="Home" component={Home} onPress={()=>navigation.navigate("Dash")} />
      <Tab.Screen name="Dash" component={Dashboard} onPress={()=>navigation.navigate("Dash")} />
    </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
})

export default Mytab;
