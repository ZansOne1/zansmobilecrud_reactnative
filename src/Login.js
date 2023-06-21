import { StatusBar } from "expo-status-bar";
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    margin: 20,
    width: 200,
    height: 112,
  },
  loginText: {
    color: "#fff",
  },
  inputView: {
    backgroundColor: "#EDE7F6",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 0,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#4F2DA4",
  },
});
class Login extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        iduser:'',
        password:'',
        msgError:''
     }
     saveToken = async(value)=>{
        try {
            await AsyncStorage.setItem('@tokenLogin', value)
          } catch (error) {
            // saving error
            console.log(error);
          }
     }
     loginProcessing=()=>{
        fetch('http://192.168.43.122/mobile_backend/public/login',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                iduser:this.state.iduser,
                password:this.state.password,
            })
        })
        .then((response)=>response.json())
        .then((json)=>{
            if(json.status==404){
                this.setState({msgError:json.messages.error})
                console.log(json);
            }
            if(json.status==200){
                this.saveToken(json.token);
                this.props.navigation.push('DataIkan');
                console.log(json);
            }
            // (json.status)==201 ? Alert.alert('Success','Data Ikan Berhasil Disimpan !!'):'';
            // this.getdataIkan();
            // this.props.navigation.goBack()
        })
        .catch((err)=>console.log(err))
     }
    render() { 
        return ( 
            <View style={styles.container}>
                <Text style={{fontSize:24,color:'#4F2DA4'}}>LOGIN</Text>
      <Image
        style={styles.image}
        source={require("./ikan/assets/images/aquarium.png")}
      />
      <StatusBar style="auto" />
      {(this.state.msgError)?<Text style={{color:'red',marginVertical:20}}>{this.state.msgError}</Text>:''}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Input Username"
          placeholderTextColor="#003f5c"
          onChangeText={(value) => this.setState({iduser:value})}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Input Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(value) => this.setState({password:value})}
        //   onChangeText={(password) => setPassword(password)}
        />
      </View>
      {/* <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password ?</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.loginBtn} onPress={()=>this.loginProcessing()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
         );
    }
}
 
export default Login;
