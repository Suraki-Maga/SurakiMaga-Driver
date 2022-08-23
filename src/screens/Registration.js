import { StyleSheet, Text, View,Image,TouchableOpacity,Modal } from 'react-native'
import React,{ useState,useEffect } from 'react'
import { TextInput } from 'react-native-paper';
import apiClient from '../Services/apiClient'
import { colors,parameters,errors } from '../globals/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';

const Registration = ({navigation}) => {

    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
      nic: "",
      otp: ""

    })
    const [modalVisible, setModalVisible] = useState(false);

    const handleOnSubmit =async ()=>{
      setErrors((e) => ({ ...e, form: null }))

      const { data, error } = await apiClient.verifyUser({
          nic: form.nic,
          otp: form.otp
      })
      if(data.driverId!="no driver"){
        // setResData((resData)=>({...resData,id: data.driverId.id}))
        navigation.navigate("Signup",{id:data.driverId.id,fullName:data.driverId.fullname})
      }else{
        
        // setResData((resData)=>({...resData,msg: data.driverId}))
        setModalVisible(true)
        
      }
      
      if (error) {
        setErrors((e) => ({ ...e, form: error }))
      }
      // clearState()
      
    }

    
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <Modal
        animationType="fade"
        transparent
        style={styles.alert}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.alert}>
          <View style={styles.alertbox}>
            <Text style={styles.alertTitle}>NIC and OTP doesn't match</Text>
            <TouchableOpacity style={styles.confirmbtn} onPress={()=>setModalVisible(!modalVisible)}><Text style={styles.confirmbtnText}>OK</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
        {/* <ScrollView style={styles.scrollview}> */}
            <View style={styles.topic}>
                <Image source={require('../../assets/images/logo.jpg')} style={styles.logo}/>
                <Text style={styles.text1}>Verification</Text>

                <Text style={styles.text2}>Add your verification code</Text>
                <Text style={styles.text2}>with your NIC.</Text>           
            </View>
            <View style={styles.body}>
            <TextInput style={styles.textInput}
            mode='outlined'
            label="National ID card No"
            value={form.nic}
            //add on change
            onChangeText={(text)=>setForm({...form,nic:text})}
            theme={{ colors: { primary: '#FF8C01',underlineColor:'#FF8C01',}}}
            left={<TextInput.Icon name="plus" />}
            
            />
            <TextInput style={styles.textInput}
            mode='outlined'
            label="Verification code"
            value={form.otp}
            //add on change
            onChangeText={(text)=>setForm({...form,otp:text})}
            theme={{ colors: { primary: '#FF8C01',underlineColor:'#FF8C01',}}}
            left={<TextInput.Icon name="plus" />}
            />
        </View>
        
        
        <TouchableOpacity style ={styles.button} onPress={handleOnSubmit}>
            <Text style={styles.buttonText}>Verify me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textLink}  onPress={() => navigation.navigate('Login')}><Text>Already have an account?</Text></TouchableOpacity>
        {/* </ScrollView> */}  
        <View style={styles.footer}>
                <TouchableOpacity><Text style={styles.footerText}>Terms & conditions</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.footerText}>Contact us</Text></TouchableOpacity>
         </View>  
    </KeyboardAwareScrollView> 
  )
  
}

export default Registration

const styles = StyleSheet.create({
    container:{
        // flex:1,
        display:"flex",
        backgroundColor:colors.white,
        // paddingBottom:30,
        // justifyContent:'center',
        height:parameters.SCREEN_HEIGHT,
        paddingTop:parameters.statusBarHeight,
        alignItems:'center'
    },
    alert:{
      flex:1,
      backgroundColor:'#00000090',
      alignItems:'center',
      justifyContent:'center',
      width:parameters.SCREEN_WIDTH,
      height:parameters.SCREEN_HEIGHT,
     
      // backgroundColor:'red',

    },
    alertbox:{
      paddingTop:5,
      display:'flex',
      borderRadius:5,
      justifyContent:'space-evenly',
      alignItems:'center',
      width:parameters.SCREEN_WIDTH*3/4,
      height:parameters.SCREEN_HEIGHT*4/20,
      backgroundColor:colors.midBoxWhite,
      // shadowColor: '#171717',
      // shadowOffset: {width: -3, height: 4},
      // shadowOpacity: 1,
      // shadowRadius: 3,
    },
    alertTitle:{
      fontSize:20
    },
    confirmbtn:{
      height:40,
      width:parameters.SCREEN_WIDTH/4,
      backgroundColor:colors.orange,
      borderRadius:5,
      alignSelf:"center",
      justifyContent:"center",
      marginTop:20,
      marginBottom:20
    },
    confirmbtnText:{
      alignSelf:"center",
      justifyContent:"center",
      color:colors.white,
      fontSize:20,
      marginTop:-2
    },
    topic:{
        
        backgroundColor:colors.white,
        marginTop:parameters.SCREEN_HEIGHT/15,
        width:parameters.SCREEN_WIDTH*5/6,
        height:parameters.SCREEN_HEIGHT*2/5,
        paddingBottom:20,
        alignItems:"center",
        justifyContent:"center",
        
        // borderBottomRightRadius:80,
       
      },
    body:{
        display:'flex',
        
        marginTop:parameters.SCREEN_HEIGHT/15,
        width:parameters.SCREEN_WIDTH*5/6,
        height:parameters.SCREEN_HEIGHT*0.8/5,
        alignItems:"center",
        justifyContent:"space-between"
        // justifyContent:"center",
        
        // borderBottomRightRadius:80,
      },
      textInput:{
        width:parameters.SCREEN_WIDTH*4/6,
        height:50,
        marginBottom:10,
        backgroundColor:'white',

    },
      scrollview:{
        padding:30
      },
      text1:{
        color:colors.black,
        fontSize:50,
        fontWeight:'bold',
        fontFamily:"sans-serif-medium",
        paddingBottom:10
       },
       
       text2:{
        color:colors.black,
        fontFamily:"sans-serif-medium",
        fontSize:22,
        marginBottom:5
       },
       button:{
          height:50,
          width:parameters.SCREEN_WIDTH*4/6,
          backgroundColor:colors.orange,
          borderRadius:20,
          alignSelf:"center",
          justifyContent:"center",
          marginTop:20,
          marginBottom:20
    
        },
        logo:{
            width:parameters.SCREEN_WIDTH*3/8,
            height:parameters.SCREEN_HEIGHT*1.5/8,
            marginBottom:parameters.SCREEN_WIDTH*1/8
        },
        buttonText:{
            alignSelf:"center",
            justifyContent:"center",
            color:colors.white,
            fontSize:20,
            marginTop:-2
        
        },
        footer:{
            display:"flex",
            flexDirection:'row',
            width:parameters.SCREEN_WIDTH,
            height:parameters.SCREEN_HEIGHT/20,
            backgroundColor:colors.grey,
            // alignItems:'center',
            position:'absolute',
            bottom:0,
            paddingLeft:20,
            paddingRight:20,
            justifyContent:'space-between'
        },
        footerText:{
            marginTop:10,
            fontSize:16,
            color:'white'
        },
        errorText:{
          color:errors.fontColor
        },
        textLink: {
          marginTop: 15,
          opacity: 0.4
        },
          
        
        
})

