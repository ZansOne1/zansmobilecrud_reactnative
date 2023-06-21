import React, { Component } from 'react'
import {
    Alert,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import { LinearGradient } from 'expo-linear-gradient';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

  
    const styles = StyleSheet.create({
    input: {
      marginHorizontal:10,
      borderBottomWidth:1,
      borderBottomColor:'#000',
      width:300
    },
    button: {
      paddingHorizontal:10,
      paddingVertical:5,
      backgroundColor:'#87CEFA',
      marginHorizontal:10,
      marginTop:10,
      marginBottom:10,
      borderRadius:5,
    },
    gambarikan: {
        width: 200,
        height: 112,
    },
    container: {
        flex: 1,
        overflow:'scroll',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    view: {
       
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      zanswadah: {
        flex: 1,
        backgroundColor: '#fff',
    },
    zansheader: {
        flex: 0.5,
        borderBottomLeftRadius:60,
        borderBottomRightRadius:60,
        backgroundColor: '#fff',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        elevation:40
      },
    zansisi: {
        flex: 3,
        // alignItems:'center',
        backgroundColor: '#fff',
      },
    zanstextHeader: {
        paddingRight:40,
        fontSize:24,
        fontWeight:'bold',
        color:'#fff'
      },
  });

class Formikan extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        dataIkan:[],
        kode_ikan:'',nama_ikan:'',kategori:'',harga:''
     }

     getdataIkan=()=>{
        fetch('http://192.168.43.122/mobile_backend/public/ikan')
            .then((response)=>response.json())
            .then((json)=>this.setState({dataIkan:json}))
            .catch((err)=>console.log(err))
     }
     saveDataIkan=async()=>{
        let token_key = await AsyncStorage.getItem('@tokenLogin');
        fetch('http://192.168.43.122/mobile_backend/public/ikan',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+token_key
            },
            body:JSON.stringify({
                kode_ikan:this.state.kode_ikan,
                nama_ikan:this.state.nama_ikan,
                kategori:this.state.kategori,
                harga:this.state.harga,
            })
        })
        .then((response)=>response.json())
        .then((json)=>{
            if(json.status==401){
                ToastAndroid.show(`${json.msg}`,ToastAndroid.LONG);
                this.props.navigation.push('Login');
            }else{
                (json.status)==201 ? Alert.alert('Success','Data Ikan Berhasil Disimpan !!'):'';
                this.getdataIkan();
                // this.props.navigation.goBack()
                this.props.navigation.push('DataIkan');

            }
        })
        .catch((err)=>console.log(err))
        .finally(()=>{
            this.getdataIkan();
            this.setState({kode_ikan:''});
            this.setState({nama_ikan:''});
            this.setState({kategori:''});
            this.setState({harga:''});
        })
     }
     componentDidMount = () => {
       this.getdataIkan();
     }
    render() { 
        return ( 
            <SafeAreaView style={styles.zanswadah}>
                <LinearGradient  colors={['#2980B9', '#6DD5FA', '#192f6a']} style={styles.zansheader}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <Text style={{paddingLeft:15}}>
                            <Icon name="arrow-circle-left" size={30} color="#fff" />
                        </Text>
                    </TouchableOpacity>
                        <Text style={styles.zanstextHeader}>
                            Form Data Ikan
                        </Text>
                        <Text></Text>
                    </LinearGradient>
                 <View style={{flexDirection:'row',alignItems:'center'}}>
                 <Text style={{fontSize:20}}>Aplikasi (Ikan Hias Zans)</Text>
                 </View>
                         <Image
                            style={styles.gambarikan}
                            source={require('./assets/images/aquarium.png')}
                        />
                <ScrollView>
            <View style={styles.view}>
                

                <TextInput 
                style={styles.input}
                value={this.state.kode_ikan}
                onChangeText={(value)=>this.setState({kode_ikan:value})}
                placeholder="Kode Ikan"
                />
                <TextInput 
                style={styles.input}
                value={this.state.nama_ikan}
                onChangeText={(value)=>this.setState({nama_ikan:value})}
                placeholder="Nama Ikan"
                />
                <TextInput 
                style={styles.input}
                value={this.state.kategori}
                onChangeText={(value)=>this.setState({kategori:value})}
                placeholder="Kategori"
                />
                <TextInput 
                keyboardType="numeric"
                style={styles.input}
                value={this.state.harga}
                onChangeText={(value)=>this.setState({harga:value})}
                placeholder="Harga"
                />

                <TouchableOpacity onPress={this.saveDataIkan} style={styles.button}>
                    <Text>Save</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            </SafeAreaView>
         );
    }
}
 
export default Formikan;