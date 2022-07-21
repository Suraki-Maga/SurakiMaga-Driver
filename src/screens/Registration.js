import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper';
import { colors,parameters } from '../globals/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const Registration = () => {
    
    
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
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
            theme={{ colors: { primary: '#FF8C01',underlineColor:'#FF8C01',}}}
            left={<TextInput.Icon name="plus" />}
            
            />
            <TextInput style={styles.textInput}
            mode='outlined'
            label="Verification code"
            theme={{ colors: { primary: '#FF8C01',underlineColor:'#FF8C01',}}}
            left={<TextInput.Icon name="plus" />}
            />
        </View>
        <TouchableOpacity style ={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

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
    // scrollview:{
    //     display:'flex',
    //     // justifyContent:'space-around',
    //     marginBottom:10,
    //     backgroundColor:colors.orange

    // },
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
            height:parameters.SCREEN_HEIGHT/14,
            backgroundColor:colors.grey,
            // alignItems:'center',
            position:'absolute',
            bottom:0,
            paddingLeft:20,
            paddingRight:20,
            justifyContent:'space-between'
        },
        footerText:{
            marginTop:20,
            fontSize:16,
            color:'white'
        },
        
})