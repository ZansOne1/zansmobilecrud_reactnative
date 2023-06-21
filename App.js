import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import DataIkan from './src/ikan/Dataikan'
import Formikan from './src/ikan/Formikan'
import Detailikan from './src/ikan/Detailikan'
import Login from './src/Login';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const DrawerNav = createDrawerNavigator();

// function Login({navigation}) {
//   return (
//     <View style={styles.container}>
//       <Text>Login</Text>
//       <Button onPress={()=>navigation.navigate('Signup')} title='Butuh Akun?'/>
//       <Button onPress={()=>navigation.navigate('Tab')} title='Login'/>
//     </View>
//   );
// }
removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@tokenLogin');
    this.props.navigation.push('Login');
  } catch(e) {
    // remove error
    console.log(e);
  }

  console.log('Done.')
}
function Signup({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Signup</Text>
      <Button onPress={()=>navigation.navigate('Login')} title='Butuh Login?'/>
    </View>
  );
}
function Dashboard({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <Button onPress={()=>this.removeToken()} title='Logout'/>
    </View>
  );
}
function Setting({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Setting</Text>
      <Button onPress={()=>this.removeToken()} title='Logout'/>
    </View>
  );
}
function Profile({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button onPress={()=>this.removeToken()} title='Logout'/>
    </View>
  );
}
// function DataIkan({navigation}) {
//   return (
//     <View style={styles.container}>
//       <Text>DataIkan</Text>
//       <Button onPress={()=>navigation.navigate('Login')} title='Logout'/>
//     </View>
//   );
// }
function Drawer(){
  return (
    <DrawerNav.Navigator>
      <DrawerNav.Screen name='Dashboard ' component={Dashboard}/>
      <DrawerNav.Screen name='Profile' component={Profile}/>
      <DrawerNav.Screen name='DataIkan' component={DataIkan}/>
    </DrawerNav.Navigator>
  );
}
function Tab() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name='Dashboard' component={Drawer} options={{headerShown:false}}/>
      <BottomTab.Screen name='Setting' component={Setting}/>
    </BottomTab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='DataIkan'>
      {/* <Stack.Screen name="Drawer" component={Drawer} /> */}
      <Stack.Screen name="Tab" component={Tab} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Formikan" component={Formikan} />
      <Stack.Screen name="Detailikan" component={Detailikan} />
      <Stack.Screen name='DataIkan' component={DataIkan}/>
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
