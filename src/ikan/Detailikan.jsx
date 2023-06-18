import React, { Component } from 'react';
import {
    Alert,
    FlatList,
    Image,
    ToastAndroid,
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

const styles = StyleSheet.create({
    input: {
        marginHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: 300
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#87CEFA',
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    gambarikan: {
        width: 200,
        height: 112,
    },
    container: {
        flex: 1,
        overflow: 'scroll',
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
        justifyContent: 'center',
    },
    zansheader: {
        flex: 0.3,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        elevation: 40
    },
    zansisi: {
        marginTop: 100,
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    zanstextHeader: {
        paddingRight: 40,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff'
    },
    zansviewtombol: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        alignItems: 'center'
    },
    zanstombolupdate: {
        backgroundColor: '#FFC107',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        paddingLeft: 20,
    },
    zanstomboldelete: {
        backgroundColor: '#F44336',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        paddingLeft: 20,

    },
    zanstext: {
        paddingLeft: 20
    }
});
class Detailikan extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        idikan: this.props.route.params.id_ikan,
        dataIkan: [],
        kodeikan: '',
        namaikan: '',
        kategory: '',
        price: '',
        // kode_ikan: this.props.route.params.kode_ikan,
        // nama_ikan: this.props.route.params.nama_ikan,
        // kategori: this.props.route.params.kategori,
        // harga: this.props.route.params.harga
    }
    getdetailikan = () => {
        fetch('http://192.168.43.122/mobile_backend/public/ikan/' + this.state.idikan)
            .then((response) => response.json())
            .then((json) => {
                // console.log(json);
                this.setState({ dataIkan: json });
                // this.setState({ idikan: this.state.dataIkan.kode_ikan });
                this.setState({ kodeikan: this.state.dataIkan.kode_ikan });
                this.setState({ namaikan: this.state.dataIkan.nama_ikan });
                this.setState({ kategory: this.state.dataIkan.kategori });
                this.setState({ price: this.state.dataIkan.harga });
            })
            .catch((err) => console.log(err))
    }
    deleteIkan = () => {
        fetch('http://192.168.43.122/mobile_backend/public/ikan/' + this.state.idikan, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((json) => {
                // console.log(json);
                (json.status) == 200 ? Alert.alert('Success', 'Data Ikan Berhasil Dihapus !!') : '';
                this.props.navigation.push('DataIkan');
                // this.getdataIkan();
            })
            .catch((err) => console.log(err))
    }

    updateIkan = () => {
        fetch('http://192.168.43.122/mobile_backend/public/ikan/' + this.state.idikan, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                kode_ikan: this.state.kodeikan,
                nama_ikan: this.state.namaikan,
                kategori: this.state.kategory,
                harga: this.state.price,
            })
        })
            .then((response) => response.json())
            .then((json) => {
                // console.log(json);
                ToastAndroid.show(`Data Ikan ${this.state.namaikan} Berhasil Diupdate !!`, ToastAndroid.SHORT);
                // (json.status) == 201 ? Alert.alert('Success', 'Data Ikan Berhasil Diupdate !!') : '';
                this.props.navigation.push('DataIkan');
            })
            .catch((err) => console.log(err))
    }
    componentDidMount = () => {
        this.getdetailikan();
    }
    render() {
        return (
            <SafeAreaView style={styles.zanswadah} >
                <LinearGradient colors={['#2980B9', '#6DD5FA', '#192f6a']} style={styles.zansheader}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Text style={{ paddingLeft: 15 }}>
                            <Icon name="arrow-circle-left" size={30} color="#fff" />
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.zanstextHeader}>
                        Detail Ikan
                    </Text>
                    <Text></Text>
                </LinearGradient>
                <ScrollView>
                    <View style={styles.zansisi}>
                        {/* <Text> {this.props.route.params.id_ikan}</Text>
                        <Text> {this.props.route.params.harga}test</Text>
                        <TextInput
                            style={styles.input}
                            value={this.state.idikan}
                            placeholder="ID Ikan"
                            hidden
                        /> */}
                        <TextInput
                            style={styles.input}
                            value={this.state.kodeikan}
                            onChangeText={(value) => this.setState({ kodeikan: value })}
                            placeholder="Kode Ikan"
                        />
                        <TextInput
                            style={styles.input}
                            value={this.state.namaikan}
                            onChangeText={(value) => this.setState({ namaikan: value })}
                            placeholder="Nama Ikan"
                        />
                        <TextInput
                            style={styles.input}
                            value={this.state.kategory}
                            onChangeText={(value) => this.setState({ kategory: value })}
                            placeholder="Kategori"
                        />
                        <TextInput
                            keyboardType="numeric"
                            style={styles.input}
                            value={this.state.price}
                            onChangeText={(value) => this.setState({ price: value })}
                            placeholder="Harga"
                        />


                    </View>
                    <View style={styles.zansviewtombol}>
                        <TouchableOpacity onPress={() => this.updateIkan()} style={styles.zanstombolupdate}>
                            <Text><Icon style={{ color: '#000' }} name="pen-square" size={20} color="#fff" /></Text>
                            <Text style={styles.zanstext}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Alert.alert('Warning', 'Apakah anda yakin akan menghapus data ini ?', [{
                            text: 'Cancel',
                            style: 'cancel',
                            onPress: () => null
                        },
                        {
                            text: 'Ya, Hapus',
                            onPress: () => this.deleteIkan()
                        },
                        ])} style={styles.zanstomboldelete}>
                            <Text><Icon style={{ color: '#000' }} name="trash-alt" size={20} color="#fff" /></Text>
                            <Text style={styles.zanstext}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ SafeAreaView>
        );
    }
}

export default Detailikan;

