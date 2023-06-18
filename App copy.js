import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();
const DrawerNav = createDrawerNavigator();

function Login({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button onPress={()=>navigation.navigate('Signup')} title='Butuh Akun?'/>
      <Button onPress={()=>navigation.navigate('Tab')} title='Login'/>
    </View>
  );
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
      <Button onPress={()=>navigation.navigate('Login')} title='Logout'/>
    </View>
  );
}
function Setting({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Setting</Text>
      <Button onPress={()=>navigation.navigate('Login')} title='Logout'/>
    </View>
  );
}
function Profile({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
      <Button onPress={()=>navigation.navigate('Login')} title='Logout'/>
    </View>
  );
}
function DataIkan({navigation}) {
  return (
    <View style={styles.container}>
      <Text>DataIkan</Text>
      <Button onPress={()=>navigation.navigate('Login')} title='Logout'/>
    </View>
  );
}
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
    <Stack.Navigator screenOptions={{headerShown:false}}>
      {/* <Stack.Screen name="Drawer" component={Drawer} /> */}
      <Stack.Screen name="Tab" component={Tab} />
      <Stack.Screen name="Login" component={Login} />
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
