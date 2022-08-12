import { StyleSheet, Text, View,TouchableOpacity,Modal,Image } from 'react-native'
import React,{ useState,useEffect } from 'react'
import { TextInput } from 'react-native-paper';
import apiClient from '../Services/apiClient'
import { colors,parameters,errors } from '../globals/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Verification = ({ route,navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    id:route.params.id,
    userName:route.params.userName,
    password:route.params.password,
    otp: ""
  })
  const handleOnSubmit =async ()=>{
    setErrors((e) => ({ ...e, form: null }))
    const { data, error } = await apiClient.submitCredentials({
      id:form.id,
      userName:form.userName,
      password:form.password,
      otp:form.otp
    })
    console.log(data)
    if(data.respond=="false"){
      setModalVisible(true)
    }else{
      navigation.navigate("ProfilePage")
    }
    
    
    if (error) {
      setErrors((e) => ({ ...e, form: error }))
    }
    // clearState()
    
  }
  const otpAgain =async()=>{
    const { data, error } = await apiClient.resendOtp()
    // console.log(data.respond)
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
            <Text style={styles.alertTitle}>The otp you entered is incorrect!</Text>
            <TouchableOpacity style={styles.confirmbtn} onPress={()=>setModalVisible(!modalVisible)}><Text style={styles.confirmbtnText}>OK</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>
        {/* <ScrollView style={styles.scrollview}> */}
            <View style={styles.topic}>
                <Image source={require('../../assets/images/logo.jpg')} style={styles.logo}/>
                <Text style={styles.text1}>OTP Verification</Text>

                <Text style={styles.text2}>You will get the OTP</Text>
                <Text style={styles.text2}>via SMS</Text>           
            </View>
            <View style={styles.body}>
            <TextInput style={styles.textInput}
            mode='outlined'
            label="OTP"
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
        <View></View><TouchableOpacity style={styles.textLink} onPress={otpAgain}><Text>RESEND OTP</Text></TouchableOpacity>
        {/* </ScrollView> */}  
        <View style={styles.footer}>
                <TouchableOpacity><Text style={styles.footerText}>Terms & conditions</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.footerText}>Contact us</Text></TouchableOpacity>
         </View>  
    </KeyboardAwareScrollView> 
  )
}

export default Verification

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
    height:parameters.SCREEN_HEIGHT*0.8/7,
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
    }
})