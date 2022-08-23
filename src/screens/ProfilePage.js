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
        contact:"xxxxxxxxxx",
        licenceno:"xxxxxxx",
        nic:"xxxxxxxxx"
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

            setFetchData({ name:data.result.fullname,contact:data.result.contact,licenceno:data.result.licenceno,nic:data.result.nic })

        }
    
        getKind();
    }, []);
    const logout =()=>{
        console.log("function called")
        apiClient.removeToken()
        navigation.navigate("LandingPage")
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.leftSideOfHeader}>
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
                </View>
            </View>
            <View style={styles.nameBox2}>
                <View style={styles.informationTopic}><Text style={styles.informationTopicText}>Information</Text></View>
                <View style={styles.informationBody}>
                    <View style={styles.informationDetail}><Text style={styles.informationDetailText}>Contact</Text><Text style={styles.informationDetailText}>{fetchData.contact}</Text></View>
                    <View style={styles.informationDetail}><Text style={styles.informationDetailText}>Licence No</Text><Text style={styles.informationDetailText}>{fetchData.licenceno}</Text></View>
                    <View style={styles.informationDetail}><Text style={styles.informationDetailText}>NIC</Text><Text style={styles.informationDetailText}>{fetchData.nic}</Text></View>
                </View>
            </View>

                <View style={styles.nameBox3}>
                    
                    <TouchableOpacity style={styles.button2} onPress={logout}><Text style={styles.button2Text}>Log out</Text></TouchableOpacity>
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
        marginTop:parameters.statusBarHeight,
        display:"flex",
        flexDirection:"row",
        backgroundColor:colors.midBoxWhite,
        height:parameters.headerHeight,
        borderRadius:10,
        alignItems:"center",
        width:parameters.SCREEN_WIDTH*9/10,
        justifyContent:'space-between',
        shadowColor:'#7F5DF0',
        shadowOffset:{
          width:0,
          height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    
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
        marginLeft:20,
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
        backgroundColor:colors.orange,
        width:parameters.SCREEN_WIDTH*11/12,
        height:parameters.SCREEN_HEIGHT/3.2,
        alignItems:'center',
        marginTop:'4%',
        paddingTop:'5%',
        borderRadius:10,
        justifyContent:'space-around',
        shadowColor:'#7F5DF0',
        shadowOffset:{
          width:0,
          height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    },
    profilePicBig:{
        width:170,
        height:170,
        borderRadius:100
    },
    nameAndEdit:{
        height:parameters.SCREEN_HEIGHT/10,
        justifyContent:'space-between'
    },
    nameContainer:{
        fontFamily:'sans-serif-medium',
        marginTop:'3%',
        fontSize:25,
        color:'white',
        shadowColor:'#7F5DF0',
        shadowOffset:{
          width:0,
          height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
        
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
    button2:{
        height:45,
        width:240,
        backgroundColor:'white',
        borderRadius:20,
        borderWidth: 2,
        borderColor:colors.orange,
        alignItems:"center",
        justifyContent:"center",
    },
    nameBox2:{
        display:'flex',
        backgroundColor:colors.midBoxWhite,
        width:parameters.SCREEN_WIDTH*11/12,
        height:parameters.SCREEN_HEIGHT/4,
        alignItems:'center',
        marginTop:'7%',
        borderRadius:10,
        shadowColor:'#7F5DF0',
        shadowOffset:{
          width:0,
          height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    },
    informationTopic:{
        display:'flex',
        borderRadius:10,
        width:'85%',
        height:'30%',
        justifyContent:'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,

    },
    informationTopicText:{
        color:colors.grey,
        fontWeight:'bold',
        fontSize:20,
    },
    informationDetailText:{
        color:colors.grey,
        fontSize:18,
    },
    informationBody:{
        display:'flex',
        borderRadius:10,
        width:'100%',
        height:'70%',
        alignItems:'center',
        justifyContent:'space-evenly' 
    },
    informationDetail:{
        display:'flex',
        width:'85%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    nameBox3:{
        display:'flex',
        backgroundColor:colors.white,
        width:parameters.SCREEN_WIDTH*11/12,
        height:parameters.SCREEN_HEIGHT/12,
        alignItems:'center',
        marginTop:'5%',
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