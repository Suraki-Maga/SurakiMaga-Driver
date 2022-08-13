import { StyleSheet, Text, View,TouchableOpacity,Image, ScrollView} from 'react-native'
import React, { useState, useEffect } from 'react';
import apiClient from '../Services/apiClient'
import { Icon } from 'react-native-elements'
import { colors,parameters } from '../globals/styles'

const ProfilePage = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [errors, setErrors] = useState({})
    const [fetchData,setFetchData]=useState({
        name:"john Doe",
        location:"ICC Complex,Piliyandala",
        location1:"D.S. Senanayake College,Colombo",
        location2:"Royal College,Colombo"
    })
    
    useEffect(() => {
        apiClient.getToken().then(data => data).then(value => {
            if(value==""){
                navigation.navigate("Login")
            }else{
                apiClient.setToken(value)
            }
        })
        .catch(err => console.log(err))
    });

    useEffect(() => {
        async function getKind() { 
            const{data,error}=await apiClient.loadDetails()
            console.log(data)

            setFetchData({ name:data.result.fullname })

        }
    
        getKind();
    }, []);

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.leftSideOfHeader}>
                <TouchableOpacity style={styles.icon1}> 
                    <Icon type="material-community"
                        name="menu"
                        color={colors.orange}
                        size={40} />
                </TouchableOpacity>

                <Image source={require('../../assets/images/logo.jpg')} style={styles.logo}/> 
            </View>
            <View style={styles.rightSideOfHeader}>
            <TouchableOpacity style={styles.icon2}> 
                <Icon type="material-community"
                    name="bell"
                    color={colors.grey}
                    size={30} />
            </TouchableOpacity>
            <Image source={require('../../assets/images/profilePic.jpg')} style={styles.profilePicSmall}/>   
            </View>   
        </View>
        <ScrollView style={styles.scrollview}
        showsVerticalScrollIndicator={false}>
            <View style={styles.nameBox}>
                <Image source={require('../../assets/images/profilePic.jpg')} style={styles.profilePicBig}/> 
                <View style={styles.nameAndEdit}>
                    <Text style={styles.nameContainer}>{fetchData.name}</Text>
                    <TouchableOpacity style={styles.button1}><Text style={styles.button1Text}>edit profie</Text></TouchableOpacity>
                </View>
            </View>
            <Text style={styles.topic}>Today's Trip</Text>
                <Text style={styles.locationText1}>Starting Point</Text>
                <TouchableOpacity style={styles.location}>
                <Icon type="material-community"
                        name="map-marker"
                        color={colors.grey}
                        size={30} />
                <Text style={styles.locationText2}>{fetchData.location}</Text>
                </TouchableOpacity>
            
                <Text style={styles.locationText1}>Ending Point</Text>
                <TouchableOpacity style={styles.location}>
                <Icon type="material-community"
                        name="map-marker"
                        color={colors.grey}
                        size={30} />
                <Text style={styles.locationText2}>{fetchData.location1}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.location}>
                <Icon type="material-community"
                        name="map-marker"
                        color={colors.grey}
                        size={30} />
                <Text style={styles.locationText2}>{fetchData.location2}</Text>
                </TouchableOpacity>
                <View style={styles.nameBox2}>
                    <TouchableOpacity style={styles.button2}><Text style={styles.button2Text}>Morning student list</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button2}><Text style={styles.button2Text}>Evening student list</Text></TouchableOpacity>
                </View>

        </ScrollView>
    </View>
  )
}

export default ProfilePage

const styles = StyleSheet.create({
    container:{
        display:"flex",
        backgroundColor:colors.white,
        height:parameters.SCREEN_HEIGHT,
        paddingTop:parameters.statusBarHeight,
        alignItems:'center'
    },
    header:{
        display:"flex",
        flexDirection:"row",
        backgroundColor:colors.white,
        height:parameters.headerHeight,
        alignItems:"center",
        width:parameters.SCREEN_WIDTH,
        justifyContent:'space-between'
        // height:parameters.SCREEN_HEIGHT/7,
    },
    leftSideOfHeader:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
    //   paddingLeft:parameters.SCREEN_WIDTH/20
        
    },
    rightSideOfHeader:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:parameters.SCREEN_WIDTH/20
    },
    profilePicSmall:{
        width:50,
        height:50,
        borderRadius:50
    },
    logo:{
        
        width:parameters.SCREEN_WIDTH*1/8,
        height:parameters.SCREEN_HEIGHT*0.5/8
    },
    icon1:  {
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:80,
        height:100,
    },
    icon2:  {
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:80,
        height:100,
    },
    scrollview:{
        marginBottom:20
    },
    nameBox:{
        display:'flex',
        flexDirection:'row',
        backgroundColor:colors.orange,
        width:parameters.SCREEN_WIDTH*11/12,
        height:parameters.SCREEN_HEIGHT/4,
        alignItems:'center',
        marginTop:'4%',
        borderRadius:10,
        justifyContent:'space-around',
    },
    profilePicBig:{
        width:100,
        height:100,
        borderRadius:50
    },
    nameAndEdit:{
        height:parameters.SCREEN_HEIGHT/10,
        justifyContent:'space-between'
    },
    nameContainer:{
        fontFamily:'sans-serif-medium',
        fontSize:25,
        color:'white'
    },
    button1:{
        height:35,
        width:110,
        backgroundColor:'white',
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        // marginTop:50
    },
    button1Text:{
        color:colors.orange,
        fontSize:20,
        fontFamily:'sans-serif-medium',
        marginTop:-2
    },
    topic:{
        marginTop:parameters.SCREEN_HEIGHT/25,
        marginBottom:parameters.SCREEN_HEIGHT/45,
        fontSize:40,
        fontFamily:'sans-serif-medium',
    },
    location:{
        width:parameters.SCREEN_WIDTH*2/3,
        display:'flex',
        marginTop:'2%',
        marginBottom:'2%',
        borderRadius:5,
        flexDirection:'row',
        backgroundColor:'white',
        alignItems:'center',
        shadowColor: '#ffffff',
        shadowOffset: {width: 6, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    locationText1:{
        fontFamily:'sans-serif-medium',
        fontSize:20,
        marginTop:'4%',
        marginBottom:'4%',
    },
    locationText2:{
        fontFamily:'sans-serif-medium',
        fontSize:15,
    },
    button2:{
        height:45,
        width:240,
        backgroundColor:'white',
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
    },
    nameBox2:{
        display:'flex',
        backgroundColor:colors.orange,
        width:parameters.SCREEN_WIDTH*11/12,
        height:parameters.SCREEN_HEIGHT/4,
        alignItems:'center',
        marginTop:'4%',
        borderRadius:10,
        justifyContent:'space-evenly',
    },
    button2Text:{
        color:colors.orange,
        fontSize:22,
        fontFamily:'sans-serif-medium',
        marginTop:-2
    },
})