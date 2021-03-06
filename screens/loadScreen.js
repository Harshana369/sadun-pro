import React, { Component } from 'react';
import { View, Text, Button, StyleSheet,TouchableOpacity,TextInput, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ProfileScreen from './ProfileScreen';
import DetailsScreen from './DetailsScreen';


export default class loadScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid:'',
          }
      }

      getData(uid) {
            console.log(uid)
        return fetch('http://192.168.1.4:3000/detail/alldata/'+ uid, { method: 'GET' })
          .then((response) => response.json())
          .then((responseJson) => { 
    
            this.setState({
              dataSource: responseJson,
    
            }, function () {
    
            });
    
          })
          .catch((error) => {
            console.error(error);
          });
      }

      profile =()=> {
        this.props.navigation.navigate(ProfileScreen);
      }
    //   detail =()=> {
    //     this.props.navigation.navigate(DetailsScreen,);
    //   }
      load =()=> {
        this.props.navigation.navigate(loadScreen);
      }



      flatlistref = null;

      render() {
        const { uid } = this.props.route.params
        return (
            <View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                style={styles.btnSize}
                onPress={()=>this.props.navigation.navigate('DetailsScreen',{uid:uid})}
                    >
                        <LinearGradient
                        colors={['#08d4c4','#01ab9d']}
                        style={styles.btnSize}
                        >
                            <Text style={styles.textSign}>Money</Text>
                        </LinearGradient>
                    </TouchableOpacity>


                    <TouchableOpacity
                style={styles.btnSize}
                    onPress={this.load}
                    >
                        <LinearGradient
                        colors={['#08d4c4','#01ab9d']}
                        style={styles.btnSize}
                        >
                            <Text style={styles.textSign}>Details</Text>
                        </LinearGradient>
                    </TouchableOpacity>
            </View>

            <View>
            <TouchableOpacity
                style={styles.btnSize1}
                onPress={this.profile}
                    >
                        <LinearGradient
                        colors={['#08d4c4','#01ab9d']}
                        style={styles.btnSize1}
                        >
                            <Text style={styles.textSign}>Profile</Text>
                        </LinearGradient>
                    </TouchableOpacity>
            </View>
            <View style={styles.id}>
            <TouchableOpacity
                onPress={this.getData(this.state.uid)}
                    >
            <Text style={styles.text_footer}>ID</Text>
            </TouchableOpacity> 
            <View style={styles.action}>
                    <TextInput
                    placeholder="Your Id"
                    style={styles.textInput}
                    value={uid}
                    onChangeText={(value) => {
                        this.setState({
                          uid: value
                        })
                    }}
                    /> 

                     
            </View>
             
            </View>

            <View>

            <FlatList
                ref={(ref) => this.flatlistref = ref}
                style={styles.Fatlist}
                data={this.state.dataSource}
                renderItem={({ item }) =>
                  <View style={styles.Card}>

                    <Text style={styles.Date}>{item.uid}</Text>
                    <Text style={styles.Date}>{item.date}</Text>
                    <Text style={styles.Date}>{item.details}</Text>
                    <Text style={styles.Value}>withdrawal $: {item.withdrawal}</Text>
                    <Text style={styles.Value}>deposit $: {item.deposit}</Text>
                    {/* <Text style={styles.Type}>Type : {item.details}</Text> */}
                    {/* <Text style={styles.Category}>Transaction Category : {item.category}</Text> */}
                  </View>

                }

                keyExtractor={( item , index ) => index.toString()}
              />

            </View>
            </View>
        )};
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    title1:{
        fontSize: 25,
        fontWeight: "bold",
        textAlign:'center',
    },
    title2:{
        fontSize: 25,
        fontWeight: "bold",
        textAlign:'left'
    },
    title3:{
        fontSize: 25,
        fontWeight: "bold",
        textAlign:'right'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    },
    btnSize:{
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    btnSize1:{
        width: '50%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft:65
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    id:{
        marginTop:30,
        marginLeft:270
    },
    name:{
        marginTop:30,
        marginLeft:50
    },
    email:{
        marginTop:30,
        marginLeft:50
    },
    password:{
        marginTop:30,
        marginLeft:50
    },
    reason:{
        marginTop:30,
        marginLeft:50
    },
    cost:{
        marginTop:30,
        marginLeft:50
    },
    Fatlist: {
        marginTop: 13
      
      },
      
      Card: {
        backgroundColor: '#00FA9A',
        marginLeft: 13,
        marginRight: 13,
        marginBottom: 8,
        padding: 13,
        borderRadius: 35,
        borderWidth: 1,
        borderColor: '#05375a'
      
      },
      
      Date: {
      
        flexDirection: 'row',
        left: 238,
        color: '#05375a',
        fontFamily:'Quicksand-SemiBold'
      },
      Value: {
        fontSize: 25,
        color: '#05375a',
        fontFamily:'Quicksand-SemiBold'
      
      
      
      },
      Type: {
        flexDirection: 'row',
        color: '#05375a',
        fontFamily:'Quicksand-SemiBold'
      
      
      },
      Category: {
        flexDirection: 'column',
        color: '#05375a',
        fontFamily:'Quicksand-SemiBold'
      
      
      },
      Descrpiton: {
        flexDirection: 'column',
        color: '#05375a',
        fontFamily:'Quicksand-SemiBold'
      
      },
      Footer: {
              
        backgroundColor: '#05375a',
      },
      Icon: {
        
        color: '#fff',
      }
      

});