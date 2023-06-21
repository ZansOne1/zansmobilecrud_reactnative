// import { Link } from "expo-router";
import React,{Component} from "react";
import {
    Alert,
    FlatList,
    Image,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
  } from "react-native";
  import { LinearGradient } from 'expo-linear-gradient';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "react-native";

//   const styles = StyleSheet.create({
//     input: {
//       marginHorizontal:10,
//       borderBottomWidth:1,
//       borderBottomColor:'#000',
//       width:300
//     },
//     button: {
//       paddingHorizontal:10,
//       paddingVertical:5,
//       backgroundColor:'#87CEFA',
//       marginHorizontal:10,
//       marginTop:10,
//       marginBottom:10,
//       borderRadius:5,
//     },
//     gambarikan: {
//         width: 200,
//         height: 112,
//     },
//     container: {
//         flex: 1,
//         overflow:'scroll',
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//       },
//     view: {
       
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//       },
//   });
class Dataikan extends Component {
    constructor(props) {
        super(props);
    }
    state = { 
        dataIkan:[],
        refresh:false
     }

     getdataIkan=async()=>{
        let token_key = await AsyncStorage.getItem('@tokenLogin');
        fetch('http://192.168.43.122/mobile_backend/public/ikan',{
        method:'GET',
        headers:{
            'Authorization':'Bearer '+token_key
        }
        })
            .then((response)=>response.json())
            .then((json)=>{
                if(json.status==401){
                    ToastAndroid.show(`${json.msg}`,ToastAndroid.LONG);
                    this.props.navigation.push('Login');
                }else{
                    this.setState({dataIkan:json})

                }
        })
            .catch((err)=>console.log(err))
     }
    //  saveDataIkan=()=>{
    //     fetch('http://192.168.43.122/mobile_backend/public/ikan',{
    //         method:'POST',
    //         headers:{
    //             Accept:'application/json',
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({
    //             kode_ikan:this.state.kode_ikan,
    //             nama_ikan:this.state.nama_ikan,
    //             kategori:this.state.kategori,
    //             harga:this.state.harga,
    //         })
    //     })
    //     .then((response)=>response.json())
    //     .then((json)=>{
    //         (json.status)==201 ? Alert.alert('Success','Data Ikan Berhasil Disimpan !!'):'';
    //     })
    //     .catch((err)=>console.log(err))
    //     .finally(()=>{
    //         this.getdataIkan();
    //         this.setState({kode_ikan:''});
    //         this.setState({nama_ikan:''});
    //         this.setState({kategori:''});
    //         this.setState({harga:''});
    //     })
    //  }
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
     componentDidMount = () => {
       this.getdataIkan();
     }
     
    render() { 
        return ( 
            // <SafeAreaView style={styles.container}>
            //     <View style={{flexDirection:'row',alignItems:'center'}}>
            //     <Text style={{fontSize:20}}>Aplikasi (Ikan Hias Zans)</Text>
            //     </View>
            //             <Image
            //                 style={styles.gambarikan}
            //                 source={require('./assets/images/aquarium.png')}
            //             />
            //     <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            //         <Text>| No |</Text>
            //         <Text>| Kode Ikan |</Text>
            //         <Text>| Nama Ikan |</Text>
            //             </View>
            //     <FlatList 
            //     data={this.state.dataIkan}
            //     keyExtractor={(item)=>item.id_ikan}
            //     renderItem={({item,index})=>(
            //         <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            //             <Text>{++index}        </Text>
            //             <Text>{item.kode_ikan}            </Text>
            //             <Text>{item.nama_ikan} </Text>
            //         </View>
            //     )}
            //     />
            //     <ScrollView>
            // <View style={styles.view}>
                

            //     <TextInput 
            //     style={styles.input}
            //     value={this.state.kode_ikan}
            //     onChangeText={(value)=>this.setState({kode_ikan:value})}
            //     placeholder="Kode Ikan"
            //     />
            //     <TextInput 
            //     style={styles.input}
            //     value={this.state.nama_ikan}
            //     onChangeText={(value)=>this.setState({nama_ikan:value})}
            //     placeholder="Nama Ikan"
            //     />
            //     <TextInput 
            //     style={styles.input}
            //     value={this.state.kategori}
            //     onChangeText={(value)=>this.setState({kategori:value})}
            //     placeholder="Kategori"
            //     />
            //     <TextInput 
            //     keyboardType="numeric"
            //     style={styles.input}
            //     value={this.state.harga}
            //     onChangeText={(value)=>this.setState({harga:value})}
            //     placeholder="Harga"
            //     />

            //     <TouchableOpacity onPress={this.saveDataIkan} style={styles.button}>
            //         <Text>Save</Text>
            //     </TouchableOpacity>
            // </View>
            // </ScrollView>
            // </SafeAreaView>
            <View style={styles.zanswadah}>
                {/* Jika ingin Horizon */}
                {/* start={{x: 0, y: 0}} end={{x: 1, y: 0}} */}
                    <LinearGradient  colors={['#2980B9', '#6DD5FA', '#192f6a']} style={styles.zansheader}>
                    <TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
                        <Text style={{paddingLeft:15}}>
                            <Icon name="arrow-circle-left" size={30} color="#fff" />
                        </Text>
                    </TouchableOpacity>
                        <Text style={styles.zanstextHeader}>
                            Data Ikan
                        </Text>
                        <Text><Button onPress={()=>this.removeToken()} title='Logout'/></Text>
                    </LinearGradient>
                
                <View style={styles.zansisi}>
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Formikan')} style={styles.zansTambah}>
                        <Text>
                            <Icon name="plus-circle" size={30} color="#fff" />
                        </Text>
                    </TouchableOpacity>
                    </View>
                    <FlatList 
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refresh}
                                onRefresh={()=>{
                                    this.getdataIkan(),
                                    this.setState({refresh:false})
                                }}
                                />
                        }
                        data={this.state.dataIkan}
                        keyExtractor={(item)=>item.id_ikan}
                        renderItem={({item,index})=>(
                    <View style={styles.zanskotak}>
                        {/* <View>
                            <Text>{++index}</Text>
                        </View> */}
                        <View>
                            <Text style={{color:'#000',fontSize:20,fontWeight:'bold'}}>{item.nama_ikan}</Text>
                            <Text style={{color:'#000'}}>{item.kategori}</Text>
                        </View>
                        <View style={{justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Detailikan',{id_ikan:item.id_ikan})} style={styles.zansDetail}>
                            <Text>
                                <Icon name="info-circle" size={20} color="#fff" />
                            </Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                )}
                />
                </View>

            </View>
         );
    }
}
const styles = StyleSheet.create({
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
      zansTambah:{
        backgroundColor: '#200122',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        paddingVertical:10,
        width:50,
        borderRadius:100
      },
      zansDetail:{
        backgroundColor: '#200122',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:5,
        width:30,
        borderRadius:100
      },
      zanskotak:{
        width:'auto',
        marginTop:10,
        marginHorizontal:10,
        borderWidth:1,
        borderColor:'#6DD5FA',
        flexDirection:'row',
        flex:1,
        paddingVertical:12,
        paddingHorizontal:20,
        justifyContent:'space-between',
        elevation:20,
        borderRadius:5,
        backgroundColor:'#fff'
      }
  });
export default Dataikan;