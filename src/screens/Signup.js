import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react';
import apiClient from '../Services/apiClient'
import { TextInput } from 'react-native-paper';
import { colors, parameters } from '../globals/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Signup = ({ route,navigation }) => {
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    id: route.params.id,
    fullName: route.params.fullName,
    userName: "",
    password: "",

  })
  const [modalVisible, setModalVisible] = useState(false);
  const handleOnSubmit = async () => {
    setErrors((e) => ({ ...e, form: null }))
    const { data, error } = await apiClient.sendOtp({
      id:form.id,
      userName:form.userName
    })
    // console.log(data.respond)
    // data.respond="taken"
    if(data.respond!="taken"){
      navigation.navigate("Verification",{id:form.id,userName:form.userName,password:form.password})
    }else{
      setModalVisible(true)
    }

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
            <Text style={styles.alertTitle}>This username is already taken!</Text>
            <TouchableOpacity style={styles.confirmbtn} onPress={()=>setModalVisible(!modalVisible)}><Text style={styles.confirmbtnText}>OK</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>  
      <View style={styles.topic}>

        <Image source={require('../../assets/images/logo.jpg')} style={styles.logo} />
        <Text style={styles.text2}>Let's</Text>
        <Text style={styles.text2}>get started!</Text>
        <Text style={styles.text1}>Sign up</Text>
      </View>
      <View style={styles.body}>
        <TextInput style={styles.textInput}
          mode='outlined'
          label={"Name: "+form.fullName}
          editable={false}
          theme={{ colors: { primary: '#FF8C01', underlineColor: '#FF8C01', } }}
          left={<TextInput.Icon name="account" />}
        />
        <TextInput style={styles.textInput}
          mode='outlined'
          label="Username"
          onChangeText={(text) => setForm({ ...form, userName: text })}
          theme={{ colors: { primary: '#FF8C01', underlineColor: '#FF8C01', } }}
          left={<TextInput.Icon name="account" />}
        />
        <TextInput style={styles.textInput}
          mode='outlined'
          label="Password"
          secureTextEntry
          theme={{ colors: { primary: '#FF8C01', underlineColor: '#FF8C01', } }}
          onChangeText={(text) => setForm({ ...form, password: text })}
          left={<TextInput.Icon name="lock" />}
          right={<TextInput.Icon name="eye" />}
        />
        <View style={styles.buttonSet}>
          <TouchableOpacity style={styles.button} onPress={handleOnSubmit}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textLink}><Text>Already have an account?</Text></TouchableOpacity>
        </View>

      </View>

      <View style={styles.footer}>
        <TouchableOpacity><Text style={styles.footerText}>Terms & conditions</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.footerText}>Contact us</Text></TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default Signup

const styles = StyleSheet.create({
  container: {
    // flex:1,
    display: "flex",
    backgroundColor: colors.white,
    // paddingBottom:30,
    // justifyContent:'center',
    height: parameters.SCREEN_HEIGHT,
    paddingTop: parameters.statusBarHeight,
    alignItems: 'center'
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
  homeLink: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: parameters.SCREEN_HEIGHT / 20,
    width: parameters.SCREEN_WIDTH,
    backgroundColor: colors.grey
  },
  homeText: {
    fontSize: 20,
  },
  topic: {
    backgroundColor: colors.white,
    paddingTop: parameters.SCREEN_HEIGHT / 35,
    marginTop: parameters.SCREEN_HEIGHT / 25,
    width: parameters.SCREEN_WIDTH * 5 / 6,
    height: parameters.SCREEN_HEIGHT * 2 / 5,
    paddingBottom: 10,
    paddingLeft: parameters.SCREEN_WIDTH / 20,
    alignSelf: 'flex-start',
  },
  body: {
    display: 'flex',
    alignSelf: 'flex-start',
    width: parameters.SCREEN_WIDTH * 5 / 6,
    marginTop: parameters.SCREEN_HEIGHT / 100,
    height: parameters.SCREEN_HEIGHT * 0.8 / 5,
    paddingLeft: parameters.SCREEN_WIDTH / 20,
    alignItems: "flex-start",
    justifyContent: "flex-start"
    // justifyContent:"center",

    // borderBottomRightRadius:80,
  },
  textInput: {
    width: parameters.SCREEN_WIDTH * 5 / 6,
    height: 40,
    marginBottom: 10,
    backgroundColor: 'white',

  },
  scrollview: {
    padding: 30
  },
  text1: {
    color: colors.black,
    fontSize: 50,
    fontFamily: "sans-serif-medium",
    fontWeight: 'bold',
    paddingBottom: 10
  },

  text2: {
    color: colors.black,
    fontFamily: "sans-serif-medium",
    fontSize: 22,
    marginBottom: 5
  },
  button: {
    height: 40,
    width: parameters.SCREEN_WIDTH * 2.5 / 6,
    backgroundColor: colors.orange,
    borderRadius: 20,
    alignSelf: "flex-start",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20

  },
  logo: {
    width: parameters.SCREEN_WIDTH * 2 / 8,
    height: parameters.SCREEN_HEIGHT * 1 / 8,
    marginBottom: parameters.SCREEN_WIDTH * 1 / 10
  },
  buttonText: {
    alignSelf: "center",
    justifyContent: "center",
    color: colors.white,
    fontSize: 20,
    marginTop: -2

  },
  footer: {
    display: "flex",
    flexDirection: 'row',
    width: parameters.SCREEN_WIDTH,
    height: parameters.SCREEN_HEIGHT / 14,
    backgroundColor: colors.grey,
    // alignItems:'center',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between'
  },
  footerText: {
    marginTop: 20,
    fontSize: 16,
    color: 'white'
  },
  textLink: {
    marginTop: 15,
    opacity: 0.4
  },
  buttonSet: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})